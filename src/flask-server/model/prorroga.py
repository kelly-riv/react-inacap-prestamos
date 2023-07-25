from .base import DataBase
from datetime import date

class Prorroga(DataBase):
       
    def newProrroga(self,fechaInicio, fechaTermino, libros_prestamo_id, user_id, is_docente):

        self.cursor.execute(f"SELECT n_prorroga FROM prestamo_libros WHERE id_prestamo_libros = {libros_prestamo_id}")
        n_prorroga = self.cursor.fetchone()[0]

        if not is_docente and n_prorroga >= 1:
            print("Error: Ya ha solicitado una prórroga.")
            return False

        if is_docente and n_prorroga >= 3:
            print("Error: Ha alcanzado el límite de prórrogas consecutivas.")
            return False
        try:
            self.cursor.execute(f"INSERT INTO `prorroga` (`fecha_inicio`, `fecha_termino`, `detalle_id`) VALUES ('{fechaInicio}', '{fechaTermino}', '{prestamo_id}')")

            self.cursor.execute(f"UPDATE `prestamo_libros` SET `n_prorroga` = `n_prorroga` + 1 WHERE `id_prestamo_libros` = '{libros_prestamo_id}'")

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


