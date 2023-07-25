from .base import DataBase

class Libro(DataBase):
    def __init__(self,id=0,isbn="",titulo="",autor="",editorial="",anio="") -> None:
        super().__init__()
        self.id=id
        self.isbn=isbn
        self.titulo=titulo
        self.autor=autor
        self.editorial=editorial
        self.anio=anio
    
    def getListaLibros(self):
        data = ""
        sql = "SELECT id_libro, ISBN, titulo, autor, editorial, anio_publicacion, FROM `libro` ORDER BY titulo ASC;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            libros = []
            for value in data:
                libro = Libro(value[0], value[1], value[2], value[3], value[4], value[5])
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

