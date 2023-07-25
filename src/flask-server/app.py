from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from model.prestamo import Prestamo
from model.encargado import Encargado
from model.usuario import Usuario
from model.libros import Libro
from model.stock import Stock

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, send_wildcard=True, allow_headers=['Content-Type'])

encargado = Encargado()
usuario = Usuario()
prestamo = Prestamo()
stock = Stock()

rut_encargado = ""

@app.route('/obtener_prestamos', methods=['GET'])
def obtener_prestamos():
    lista_prestamos = prestamo.getListaPrestamos()
    prestamos_json = [{'id_prestamo': p.id_prestamo, 'fecha_inicio': p.fecha_inicio, 'fecha_devolucion': p.fecha_devolucion, 'id_user': p.id_user, 'id_encargado': p.id_encargado, 'multa_total': p.multa_total} for p in lista_prestamos]
    return jsonify(prestamos_json)

@app.route('/obtener_stock', methods=['GET'])
def obtener_stock_libros():
    stock = Stock()
    lista_libros_stock = stock.getDisponibilidad()
    stock_json = [{'isbn':s.ISBN,'titulo':s.titulo,'cantidad':s.cantidad}for s in lista_libros_stock]
    return jsonify(stock_json)


@app.route('/insertar_prestamos', methods=['POST'])
def insertar_prestamo():
    data = request.get_json()
    fecha_inicio = data.get('startDate')
    fecha_devolucion = data.get('endDate')
    id_User = data.get('idUser')
    id_libros = data.get('selectedBooks')
    global rut_encargado
    print(rut_encargado)
    id_encargado = encargado.getEncargadoId(rut_encargado)
    
    
    agregar_prestamo = prestamo.insertarPrestamo(fecha_inicio, fecha_devolucion, id_User, id_encargado)
    id_prestamo = prestamo.getIdPrestamo(fecha_inicio,fecha_devolucion,id_User,id_encargado)
    detalle = prestamo.setDetalle(id_prestamo,id_libros)

    if agregar_prestamo:
        return jsonify({'message': 'Prestamo realizado correctamente'})
    else:
        return jsonify({'message': 'Error al realizar el prestamo'})

@app.route('/encargado_existe', methods=['POST'])
def encargado_existe():
    data = request.get_json()
    global rut_encargado
    rut_encargado = data.get('rut')
    password = data.get('password')
    result = encargado.encargadoExiste(rut_encargado, password)  
    return jsonify(result)

@app.route('/obtener_tipo_usuario', methods=['POST'])
def obtener_tipo_usuario():
    data = request.get_json()
    rut = data.get('rut')
    result = usuario.obtener_tipo_usuario(rut)  
    return jsonify(result)

@app.route('/obtener_libros', methods=['GET'])
def obtener_libros():
    libro = Libro()
    lista_libros = libro.getListaLibros()
    libros_json = [{'id_libro': l.getId(), 'titulo': l.getTitulo()} for l in lista_libros]
    return jsonify(libros_json)

@app.route('/obtener_multas',methods=['GET'])
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

@app.route('/dar_baja_libro', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def dar_baja_libro():
    data = request.get_json()
    isbn = data.get('isbn')
    cantidad_baja = data.get('cantidadBaja')
    
    try:
        stock.darBajaLibro(isbn, cantidad_baja)
        return jsonify({'message': 'Se ha dado de baja el libro correctamente'})
    except Exception as e:
        app.logger.error(f"Error al dar de baja el libro: {str(e)}")
        return jsonify({'message': 'Error al dar de baja el libro', 'error': str(e)})


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


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001)




