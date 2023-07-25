from .base import DataBase

class Encargado(DataBase):

# Funciones
    def newEncargado(self, nombre_usuario, rut, password):
        
        sql = "INSERT INTO `encargado` (`nombre_usuario`, `rut`, `password`) VALUES ('{}', '{}', '{}')".format(nombre_usuario, rut, password)

        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
            
    def updateEncargado(self, nombre_usuario, rut, password, id_encargado):
        
        sql = "UPDATE `encargado` SET `nombre_usuario`='{}', `rut`='{}', `password`='{}' WHERE `id_encargado`={}".format(nombre_usuario, rut, password, id_encargado)

        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False 

    def getListaEncargados(self, nombre_usuario, rut, password, id_encargado ):
        data = ""
        sql = "SELECT id_encargado, nombre_usuario, rut, password FROM `encargado`;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            encargados = []
            for value in data:
                encargado = Encargado(value[0], value[1], value[2], value[3])
                encargados.append(encargado)
            self.encargados = encargados
            return encargados
        except Exception as e:
            raise
    
    
    def encargadoExiste(self, rut, password):  
        sql = f"SELECT COUNT(*) FROM `encargado` WHERE rut = '{rut}' AND password = '{password}';"
        try:
            self.cursor.execute(sql)
            count = self.cursor.fetchone()[0]
            if count > 0:
                return 1
            else:
                return 0
        except Exception as e:
            raise
    def getEncargadoId(self, rut):  
        sql = f"SELECT id_encargado  FROM `encargado` WHERE rut = '{rut}';"
        try:
            self.cursor.execute(sql)
            id = self.cursor.fetchone()[0]
            return id
        except Exception as e:
            raise
