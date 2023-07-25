from .base import DataBase

class Libro(DataBase):
    def __init__(self, id=0, isbn="", titulo="", autor="", editorial="", anio="", id_prestamo=None) -> None:
        super().__init__()
        self.id=id
        self.isbn=isbn
        self.titulo=titulo
        self.autor=autor
        self.editorial=editorial
        self.anio=anio
        self.id_prestamo=id_prestamo
    
    def getListaLibros(self):
        data = ""
        sql = "SELECT L.id_libro, L.ISBN, L.titulo, L.autor, L.editorial, L.anio_publicacion, P.id_prestamo FROM libro AS L JOIN prestamo_libros AS PL ON L.id_libro = PL.id_libro JOIN prestamo AS P ON PL.id_prestamo = P.id_prestamo ORDER BY L.titulo ASC; "
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            libros = []
            for value in data:
                libro = Libro(value[0], value[1], value[2], value[3], value[4], value[5],value[6])
                libros.append(libro)
            self.prestamos = libros
            return libros
        except Exception as e:
            raise
    
    def newLibro(self,titulo,autor,editorial,publicacion):

        sql = "INSERT INTO `libro`(`titulo`, `autor`, `editorial`, `anio_publicacion`) VALUES ('{}','{}','{}',{})".format(titulo,autor,editorial,publicacion)
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            exito = True
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
            exito = False  # Agrega esta línea
        return exito
    
    def getDisponibilidadPrestamo(self):
        sql = "SELECT DISTINCT libro.id_libro, stock.cantidad, libro.titulo FROM `stock`  LEFT JOIN libro ON stock.ISBN = libro.ISBN WHERE libro.disponibilidad=1 AND libro.condicion=0;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            stock = []
            for value in data:
                libro = (value[2],value[0],value[1])
                stock.append(libro)
            return stock
        except Exception as e:
            raise

    
    def updateLibro(self,titulo,autor,editorial,publicacion,id_libro):

        sql = "UPDATE `libro` SET `titulo`='{}',`autor`='{}',`editorial`='{}',`anio_publicacion`='{}' WHERE `id_libro`={}".format(titulo,autor,editorial,publicacion,id_libro)
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
            return False


    def getDisponibilidad(self,id_libro):
        sql = f"SELECT disponibilidad FROM libro WHERE id_libro = {id_libro}"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchone()
            if data is None:
                return data
            return data[0]
        except Exception as e:
            raise
