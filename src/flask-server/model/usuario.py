from .base import DataBase

class Usuario(DataBase):
    def __init__(self,id=0,rut="",nombre="",telefono ="",email = "",docente = False) -> None:
        super().__init__()
        self.__id = id
        self.__rut = rut
        self.__nombre = nombre
        self.__telefono = telefono
        self.__email = email
        self.__docente = docente

    def getListaUsuarios(self):
        data = ""
        sql = "SELECT `id_usuario`, `rut`,`nombre`, `telefono`,`email`,`docente` FROM `usuario`"        
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            users = []
            for value in data:
                if value[5] == 0:
                    user= Usuario(value[0],value[1],value[2],value[3],value[4],False)
                else:
                    user= Usuario(value[0],value[1],value[2],value[3],value[4],True)

                users.append(user)
            self.users=users
            return users
        except Exception as e:
            raise
    def setNombre(self,newNombre):
        self.__nombre = newNombre
        self.updateUser()
        return True

    def setTelefono(self,newTelefono):
        self.__telefono = newTelefono
        self.updateUser()
        return True

    def setEmail(self,newEmail):
        self.__email = newEmail
        self.updateUser()
        return True

    def setDocente(self,newEstadoDocente):
        self.__docente = newEstadoDocente
        self.updateUser()
        return True
        
    def newUser(self,rut,nombre,telefono,email,docente):

        sql="INSERT INTO `usuario`( `rut`, `nombre`, `telefono`, `email`, `docente`) VALUES ('{}','{}','{}','{}',{})".format(rut,nombre,telefono,email,docente)
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            exito = True
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
        return exito


    def updateUser(self, nombre,telefono,email,docente,id_user):

        sql = "UPDATE `usuario` SET `nombre`='{}',`telefono`='{}',`email`='{}',`docente`={} WHERE `id_usuario`={}".format(nombre,telefono,email,docente,id_user)

        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
            return False
    
    def obtener_tipo_usuario(self, rut):
        sql = f"SELECT docente FROM `usuario` WHERE rut = '{rut}'"
        try:
            self.cursor.execute(sql)
            result = self.cursor.fetchone()
            if result is None:
                return {"success": False, "message": "Este usuario no existe, intenta ingresar un RUT correspondiente a un alumno o profesor existente"}
            elif result[0] == 1:
                docente = True
                return {"success": True, "message": "Este usuario es un docente", "docente": docente}
            else:
                docente = False
                return {"success": True, "message": "Este usuario no es un docente", "docente": docente}
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
            return {"success": False, "message": "Error al obtener el tipo de usuario: " + str(e)}


        
user = Usuario()
user.obtener_tipo_usuario("21439593-3")
