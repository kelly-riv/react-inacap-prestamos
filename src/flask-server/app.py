from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from model.prestamo import Prestamo
from model.encargado import Encargado
from model.usuario import Usuario
from model.libros import Libro
from model.stock import Stock
from model.prorroga import Prorroga
from model.base import DataBase

from datetime import datetime

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, send_wildcard=True, allow_headers=['Content-Type'])

encargado = Encargado()
usuario = Usuario()
prestamo = Prestamo()
stock = Stock()
libro = Libro()
prorroga = Prorroga()
bd = DataBase()

rut_encargado = ""

rut_usuario = ""
tipo_usuario = 0

@app.route('/obtener_prestamos', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def obtener_prestamos():
    lista_prestamos = prestamo.getListaPrestamos()
    prestamos_json = [{'id_prestamo': p.id_prestamo, 'fecha_inicio': p.fecha_inicio, 'fecha_devolucion': p.fecha_devolucion, 'id_user': p.id_user, 'id_encargado': p.id_encargado, 'multa_total': p.multa_total} for p in lista_prestamos]
    return jsonify(prestamos_json)

@app.route('/obtener_prestamos_prorroga', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def obtener_prestamos_prorroga():
    lista_prestamos = prestamo.getListaPrestamosProrroga()
    prestamos_json = [{'id_prestamo': p[0], 'fecha_inicio': p[1], 'fecha_termino': p[2], 'multa_total': p[3]} for p in lista_prestamos]
    return jsonify(prestamos_json)

@app.route('/insertar_prestamos', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])

def insertar_prestamo():
    data = request.get_json()
    fecha_inicio = data.get('startDate')
    fecha_devolucion = data.get('endDate')
    date_format = "%Y-%m-%d"

    date_inicio = datetime.strptime(fecha_inicio,date_format)
    date_final = datetime.strptime(fecha_devolucion,date_format)
    time_difference = date_final-date_inicio

    global rut_usuario
    id_User = usuario.getIdUsuario(rut_usuario)
    global tipo_usuario
    tipo_usuario = usuario.getDocente(rut_usuario)
    id_libros = data.get('selectedBooks')
    if str(id_libros) == "[]":
        return jsonify({'message': 'Error al realizar el prestamo, no se seleccionaron libros'})
    libros_previos = prestamo.getLibrosEnPrestamo(id_libros[0][0],id_User)
    print(libros_previos)
    if libros_previos is not None:
        return jsonify({'message': 'Error al realizar el prestamo, este usuario ya posee este libro en préstamo'})
    multas = prestamo.getMultasUser(id_User)
    if multas is not None:
        return jsonify({'message': 'Error al realizar el prestamo, este usuario tiene deudas en el sistema'})

    if tipo_usuario == 0:
        if prestamo.getCantidadPrestamos(id_User) >=4:
            print("Fail")
            return jsonify({'message': 'Error al realizar el prestamo, este usuario no puede tener más de 4 libros'})
        if time_difference.days>7:
            print("Fail")
            return jsonify({'message': 'Error al realizar el prestamo, este usuario no puede solicitar préstamos de más de 7 días'})

    else:
        if time_difference.days<7:
            print("Fail")
            return jsonify({'message': 'Error al realizar el prestamo, este usuario no puede solicitar préstamos de menos de 7 días'})
        if time_difference.days>20:
            print("Fail")
            return jsonify({'message': 'Error al realizar el prestamo, este usuario no puede solicitar préstamos de más de 20 días'})
    print("Continue")
    global rut_encargado
    id_encargado = encargado.getEncargadoId(rut_encargado)
    for libro in id_libros:
        for libro_id in libro:
            agregar_prestamo = prestamo.insertarPrestamo(fecha_inicio, fecha_devolucion, id_User, id_encargado,libro_id)
            print("No disponible")
            prestamo.setNoDisponible(libro_id)
            if agregar_prestamo:
                prestamo.getMultas()
                return jsonify({'message': 'Prestamo realizado correctamente'})
    return jsonify({'message': 'Error al realizar el prestamo'})

@app.route('/encargado_existe', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def encargado_existe():
    data = request.get_json()
    global rut_encargado
    rut_encargado = data.get('rut')
    password = data.get('password')
    result = encargado.encargadoExiste(rut_encargado, password)  
    return jsonify(result)

@app.route('/obtener_tipo_usuario', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def obtener_tipo_usuario():
    data = request.get_json()
    global rut_usuario
    rut_usuario = data.get('rut')
    docente = usuario.obtener_tipo_usuario(rut_usuario)  
    return jsonify(docente)

@app.route('/obtener_libros', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def obtener_libros():
    libro = Libro()
    lista_libros = libro.getDisponibilidadPrestamo()
    libros_json = [{'id_libro': l[1], 'titulo': l[0], 'id_prestamo': l[2]} for l in lista_libros]
    return jsonify(libros_json)

@app.route('/obtener_multas',methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def obtener_multas():
    lista_multas = prestamo.getMultas()
    multas_json = [{'id_prestamo': p[0], 'multa_total': p[1], 'rut': p[2]} for p in lista_multas]
    return jsonify(multas_json)

@app.route('/registrar_pago', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def registrar_pago():
    data = request.get_json()
    id_prestamo = data.get('id_prestamo')
    
    regMulta = prestamo.registrarPagoMulta(id_prestamo)

    if regMulta:
        return jsonify({'message': 'Pago registrado correctamente'})
    else:
        return jsonify({'message': 'Error al registrar pago'})
    
#MANEJO DE STOCK

@app.route('/dar_baja_libro', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def dar_baja_libro():
    data = request.get_json()
    isbn = data.get('isbn')
    is_damaged = data.get('isDamaged') 

    try:
        if stock.darBajaLibro(isbn, is_damaged):
            return jsonify({'message': 'Se ha dado de baja el libro correctamente'})
        else:
            return jsonify({'message': 'Ha ocurrido un error'})

    except Exception as e:
        app.logger.error(f"Error al dar de baja el libro: {str(e)}")
        return jsonify({'message': 'Error al dar de baja el libro', 'error': str(e)})


    
@app.route('/obtener_stock', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def obtener_stock_libros():
    #stock.updateCantidades() 
    lista_libros_stock = stock.getStock()
    stock_json = [{'id_libro': s[0], 'titulo': s[1], 'ISBN': s[4], 'cantidad': s[3], 'condicion': s[6], 'disponibilidad':s[5]} for s in lista_libros_stock]
    return jsonify(stock_json)

@app.route('/habilitar_libro', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def habilitar_libro():
    data = request.get_json()
    isbn = data.get('isbn')

    try:
        if stock.habilitarLibro(isbn):
            return jsonify({'message': 'Se ha habilitado el libro correctamente'})
        else:
            return jsonify({'message': 'Ha ocurrido un error'})

    except Exception as e:
        app.logger.error(f"Error al habilitar el libro: {str(e)}")
        return jsonify({'message': 'Error al habilitar el libro', 'error': str(e)})

@app.route('/registrar_libro', methods=['POST'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def registrar_libro():
    data = request.get_json()

    titulo = data.get('titulo')
    autor = data.get('autor')
    editorial = data.get('editorial')
    isbn = data.get('isbn')
    year = data.get('year')

    print(titulo,autor,editorial,isbn,year)

    try:
        if stock.regLibro(isbn,titulo,autor,editorial,year):
            return jsonify({'message': 'Se ha habilitado el libro correctamente'})
        else:
            return jsonify({'message': 'Ha ocurrido un error'})

    except Exception as e:
        app.logger.error(f"Error al habilitar el libro: {str(e)}")
        return jsonify({'message': 'Error al habilitar el libro', 'error': str(e)})

######################

@app.route('/generar_reporte_fecha', methods =['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def generar_reporte_fecha():
    data = request.get_json()
    fecha = data.get('loanDate')
    try:
        lista_prestamos = prestamo.getListaPrestamosFecha(fecha)
        print(lista_prestamos)
        prestamos_json = [{'id_prestamo': p.id_prestamo, 'fecha_inicio': p.fecha_inicio, 'fecha_devolucion': p.fecha_devolucion, 'multa_total': p.multa_total} for p in lista_prestamos]
        print(prestamos_json)
        return jsonify(prestamos_json)
    except Exception as e:
        app.logger.error(f"Error al obtener libros en esa fecha")
        return jsonify({'message':'Error al realizar prestamo'})
    
@app.route('/entregar_libro', methods =['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def entregar_libro():
    data = request.get_json()
    codigo = data.get('bookCode')
    estado = libro.getDisponibilidad(codigo)
    print(estado)
    if estado is None:
        return jsonify({'message': 'Este libro no existe'})
    if estado == 1:
        return jsonify({'message': 'Este libro ya se ha devuelto'})
    else:
        retornar = prestamo.setDisponible(codigo)
        if retornar:
            return jsonify({'message': 'Se ha devuleto correctamente'})
        else:
            return jsonify({'message': 'Ha ocurrido un error al devolder el libro'})

#PRORROGA
        
@app.route('/insertar_prorroga', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def insertar_prorroga():
    data = request.get_json()
    fecha_inicio = data.get('startDate')
    fecha_termino = data.get('endDate')
    id_libro = data.get('id_libro')
    id_prestamo = data.get('id_prestamo')
    print(id_prestamo)

    if prorroga.newProrroga(fecha_termino, id_libro, id_prestamo):
        return jsonify({'message': 'Prórroga insertada correctamente'})
    else:
        return jsonify({'message': 'Error al insertar la prórroga'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)