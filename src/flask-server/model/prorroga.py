from base import DataBase
from datetime import date

class Prorroga(DataBase):
       
    #funciones a traves de consultas
    def newProrroga(self,fechaInicio, fechaTermino, prestamo_id):
 
        sql="INSERT INTO `prorroga`( `fecha_inicio`, `fecha_termino`, `pretamo_id`) VALUES ('{}', '{}', {})".format(fechaInicio, fechaTermino, prestamo_id)

        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error : "+str(e.args))
            self.connection.close()
        return False

    def getProrroga(self):
        
        data = ""
        sql = "SELECT prorroga_id, fecha_inicio, fecha_termino, prestamo_id FROM `prorroga`;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            prorrogas = []
            for value in data:
                prorroga= Prorroga(value[0],value[1],value[2],value[3])
                prorrogas.append(prorroga)
            self.prorrogas=prorrogas
            return prorrogas
        except Exception as e:
            raise
        
    def updateProrroga(self, fecha_inicio, fecha_termino, prestamo_id, prorroga_id):

        sql = "UPDATE `prorroga` SET `fecha_inicio`='{}', `fecha_termino`='{}', `prestamo_id`={} WHERE `prorroga_id`={}".format(fecha_inicio, fecha_termino, prestamo_id, prorroga_id)

        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False       


