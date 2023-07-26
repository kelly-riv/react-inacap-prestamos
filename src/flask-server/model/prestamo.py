from model.base import DataBase
from datetime import datetime


class Prestamo(DataBase):
    
    def setDetalle(self,id_prestamo,libros):

        for libro_id in libros:
            for value in libro_id:
                sql= "INSERT INTO `prestamo_libros`(`id_prestamo`, `id_libro`) VALUES ({},{})".format(id_prestamo,value)
                try:
                    self.cursor.execute(sql)
                    self.connection.commit()
                except Exception as e:
                    print("Error: " + str(e.args))
                    self.connection.close()

    def getIdPrestamo(self,fecha_inicio,fecha_devolucion,id_user,id_encargado):
        data = ""
        sql = "SELECT id_prestamo FROM `prestamo` WHERE fecha_inicio='{}' AND id_user={} AND id_encargado={} AND fecha_devolucion='{}';".format(fecha_inicio,id_user,id_encargado,fecha_devolucion)
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            id_prestamo = data[0]
            return id_prestamo
        except Exception as e:
            raise
    def __init__(self, id_prestamo=None, fecha_inicio=None, fecha_devolucion=None, id_user=None, id_encargado=None, multa_total=None):
        super().__init__()
        self.id_prestamo = id_prestamo
        self.fecha_inicio = fecha_inicio
        self.fecha_devolucion = fecha_devolucion
        self.id_user = id_user
        self.id_encargado = id_encargado
        self.multa_total = multa_total

    def setDetalle(self,id_prestamo,libros):
        for libro_id in libros:
            for value in libro_id:
                sql= "INSERT INTO `prestamo_libros`(`id_prestamo`, `id_libro`) VALUES ({},{})".format(id_prestamo,value)
                try:
                    self.cursor.execute(sql)
                    self.connection.commit()
                except Exception as e:
                    print("Error: " + str(e.args))
                    self.connection.close()

    def getIdPrestamo(self,fecha_inicio,fecha_devolucion,id_user,id_encargado):
        data = ""
        sql = "SELECT id_prestamo FROM `prestamo` WHERE fecha_inicio='{}' AND id_user={} AND id_encargado={} AND fecha_devolucion='{}';".format(fecha_inicio,id_user,id_encargado,fecha_devolucion)
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            id_prestamo = data[0]
            return id_prestamo
        except Exception as e:
            raise
     
    # Funciones a través de consultas
    def getListaPrestamos(self):
        data = ""
        sql = "SELECT prestamo.id_prestamo, prestamo.fecha_inicio, prestamo.fecha_termino, usuario.rut, prestamo.id_libro FROM `prestamo` LEFT JOIN usuario ON prestamo.id_user = usuario.id_user ORDER BY fecha_inicio ASC LIMIT 20;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            prestamos = []
            for value in data:
                estado = self.getEstado(value[0])
                fecha_inicio = value[1].strftime("%d/%m/%Y")
                fecha_termino = value[2].strftime("%d/%m/%Y")
                prestamo = (value[0], fecha_inicio, fecha_termino, value[3],estado,value[4])
                prestamos.append(prestamo)
            self.prestamos = prestamos
            return prestamos
        except Exception as e:
            raise

    def getListaPrestamosFecha(self, fecha):
        data = ""
        sql = f"SELECT prestamo.id_prestamo, prestamo.fecha_inicio, prestamo.fecha_termino, usuario.rut, prestamo.id_libro FROM `prestamo` LEFT JOIN usuario ON prestamo.id_user = usuario.id_user  WHERE fecha_inicio = '{fecha}' ORDER BY fecha_inicio ASC LIMIT 20;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            prestamos = []
            for value in data:
                estado = self.getEstado(value[0])
                fecha_inicio = value[1].strftime("%d/%m/%Y")
                fecha_termino = value[2].strftime("%d/%m/%Y")
                prestamo = (value[0], fecha_inicio, fecha_termino, value[3],estado,value[4])
                prestamos.append(prestamo)
            self.prestamos = prestamos
            return prestamos
        except Exception as e:
            raise

    def getEstado(self,id_prestamo):
        sql = f"SELECT CURRENT_DATE,fecha_termino,entregado FROM prestamo WHERE id_prestamo = {id_prestamo};"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            fecha_actual = data[0]
            fecha_termino= data[1]
            entregado = data[2]
            dias_diferencia = (fecha_actual-fecha_termino).days
            if entregado == 1:
                return "ENTREGADO"
            elif dias_diferencia<=0 and entregado == 0:
                return "VIGENTE"
            else:
                return "CON RETRASO"


        except Exception as e:
            raise


    def getListaPrestamosProrroga(self):
        data = ""
        sql = "SELECT id_prestamo, fecha_inicio, fecha_termino, multa_total FROM `prestamo` WHERE fecha_termino >= current_date() ORDER BY fecha_inicio ASC LIMIT 20;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            prestamos = []
            for value in data:
                prestamo = (value[0], value[1], value[2], value[3])
                prestamos.append(prestamo)
            self.prestamos = prestamos
            return prestamos
        except Exception as e:
            raise
   

    def getCantidadPrestamos(self,id_user):
        sql = f"SELECT COUNT(*) FROM prestamo WHERE id_user = {id_user} AND entregado = 0;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            return data[0]
        except Exception as e:
            raise

            
    def insertarPrestamo(self, fecha_inicio, fecha_devolucion, id_User,id_encargado, id_libro):
        sql = f"INSERT INTO `prestamo` (`fecha_inicio`, `fecha_termino`, `id_user`, `id_encargado`,`id_libro`) VALUES ('{fecha_inicio}', '{fecha_devolucion}', {id_User}, {id_encargado},{id_libro})"
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
    def setNoDisponible(self,libro_id):
        sql = f"UPDATE libro SET disponibilidad=0 WHERE id_libro = {libro_id}"
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
    
    def setDisponible(self,libro_id):
        sql = f"UPDATE libro SET disponibilidad=1 WHERE id_libro = {libro_id}"
        sql2 =f"UPDATE prestamo SET entregado=1, fecha_entrega = current_date()  WHERE id_libro = {libro_id}"
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            self.cursor.execute(sql2)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False

    def updatePrestamo(self,fecha_inicio, fecha_devolucion, id_user, id_encargado, id_prestamo):
        
        sql = "UPDATE `prestamo` SET `fecha_inicio`='{}', `fecha_devolucion`='{}', `id_user`={}, `id_encargado`={} WHERE `id_prestamo`={}".format(fecha_inicio, fecha_devolucion, id_user, id_encargado, id_prestamo)

        try:
            self.cursor.execute(sql,(fecha_inicio, fecha_devolucion, id_user, id_encargado, id_prestamo))
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
        
    def updateMultas(self):
        data = ""
        sql = "SELECT id_prestamo, fecha_termino, CURRENT_DATE FROM `prestamo` WHERE fecha_termino<CURRENT_DATE AND entregado = 0 ;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            multas = []
            for value in data:
                prestamo = (value[0], value[1],value[2])
                multas.append(prestamo)
            self.setMultas(multas)
            return multas
        except Exception as e:
            raise
    
    def setMultas(self,multas):
        date_format = "%Y-%m-%d"

        for multa in multas:
            dias = multa[2]-multa[1]
            if dias.days>1:
                multa_total = dias.days * 1000
                self.updateMulta(multa[0],multa_total)

    def updateMulta(self,id_multa,multa_total):
        sql = f"UPDATE prestamo SET multa_total = {multa_total} WHERE id_prestamo = {id_multa}"
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False

    def getMultas(self):
        data = ""
        self.updateMultas()
        sql = "SELECT prestamo.id_prestamo, prestamo.multa_total, usuario.rut FROM prestamo LEFT JOIN usuario ON prestamo.id_user = usuario.id_user;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            return data
        except Exception as e:
            raise

    def registrarPagoMulta(self,id_prestamo):
        sql = f"UPDATE prestamo SET multa_total = 0, entregado = 1, fecha_entrega= current_date()  WHERE id_prestamo = {id_prestamo};"
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
        
    def getISBN(self,id_libro):
        sql= f"SELECT ISBN FROM `libro` WHERE id_libro = {id_libro};"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            return data[0]
        except Exception as e:
            raise

    def getMultasUser(self,id_user):
        sql= f"SELECT multa_total FROM `prestamo` WHERE id_user = {id_user} AND multa_total>0;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            if data is None:
                return None
            return data[0]
        except Exception as e:
            raise

    def getLibrosEnPrestamo(self,id_libro,id_user):
        isbn = self.getISBN(id_libro)
        sql = f"SELECT l.id_libro, l.titulo FROM prestamo AS p JOIN libro AS l ON p.id_libro = l.id_libro WHERE p.id_user = {id_user};"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            if data is None:
                return None
            return data[0]
        except Exception as e:
            raise