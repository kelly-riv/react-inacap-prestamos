from .base import DataBase
from datetime import date

class Prorroga(DataBase):
       
    def newProrroga(self, fechaTermino, id_libro, id_prestamo):

        docente = (f"SELECT usuario.docente FROM `prestamo` LEFT JOIN usuario ON usuario.id_user = prestamo.id_user WHERE prestamo.id_prestamo = {id_prestamo};")
        self.cursor.execute(f"SELECT COUNT(*) FROM prestamo WHERE prestamo_id = {id_libro}")
        n_prorroga = self.cursor.fetchone()[0]

        if docente == 0 and n_prorroga >= 1:
            print("Error: Ya ha solicitado una prórroga.")
            return False

        if docente == 1 and n_prorroga >= 3:
            print("Error: Ha alcanzado el límite de prórrogas consecutivas.")
            return False
        try:
            fechaInicio = (f"SELECT fecha_termino FROM prestamo WHERE prestamo_id = {id_prestamo}")
            self.cursor.execute(f"INSERT INTO `prorroga` (`fecha_inicio`, `fecha_termino`, `prestamo_id`) VALUES ('{fechaInicio}', '{fechaTermino}', {id_prestamo})")
            self.cursor.execute(f"UPDATE `prestamo_libros` SET `multa_total` = 0, fecha_termino ='{fechaTermino}' WHERE `id_prestamo_libros` = {id_prestamo}")
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


