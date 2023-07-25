from .base import DataBase

class Stock(DataBase):
    
    def __init__(self, libro="", ISBN="", cantidad=0,cantidadReal=0) -> None:
        super().__init__()
        self.titulo = libro
        self.ISBN = ISBN
        self.cantidad = cantidad
        self.cantidadReal = cantidadReal
    
    # Getters    

    # Setters
    def setISBN(self, newISBN):
        self.ISBN = newISBN
        self.updateISBN()
        return True
    
    def setCantidad(self, newCantidad):
        self.cantidad = newCantidad
        self.updateCantidad()
        return True

    def updateCantidades(self):
        sql = "SELECT ISBN, count(*) as cantidad FROM libro WHERE disponibilidad = 1 AND condicion = 0 GROUP BY isbn;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            for value in data:
                sql2 = "UPDATE `stock` SET `cantidad` = {} WHERE `stock`.`ISBN` = '{}';".format(value[1],value[0])
                try:
                    self.cursor.execute(sql2)
                    self.connection.commit()
                except Exception as e:
                    print("Error: " + str(e.args))
                    self.connection.close()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False

    def getStock(self):
        sql = "SELECT libro.id_libro, libro.titulo, libro.ISBN, stock.cantidad, libro.condicion FROM libro LEFT JOIN stock ON libro.ISBN=stock.ISBN;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            return data
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return []
    
    def newStock(self, stock_item):
        ISBN = stock_item.ISBN
        cantidad = stock_item.cantidad
        
        sql = "INSERT INTO `stock` (`ISBN`, `cantidad`) VALUES ('{}', {})".format(ISBN, cantidad)
        
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
    
    def updateISBN(self):
        ISBN = self.ISBN
        sql = "UPDATE `stock` SET `ISBN`='{}' WHERE `ISBN`='{}'".format(ISBN, ISBN)
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
    
    def updateCantidad(self):
        ISBN = self.ISBN
        sql = "SELECT COUNT(*) FROM libro WHERE ISBN='{}';".format(ISBN) 
        try:
            self.cursor.execute(sql)
            result = self.cursor.fetchone()
            cantidad = result[0]
            sql_update = "UPDATE `stock` SET `cantidad`={} WHERE `ISBN`='{}'".format(cantidad, ISBN)
            self.cursor.execute(sql_update)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False

    def darBajaLibro(self, isbn, cantidad_baja, is_damaged):
        condicion = 1 if is_damaged else 0
        sql = f'UPDATE libro SET disponibilidad = 0, condicion = {condicion} WHERE ISBN = "{isbn}" AND disponibilidad = 1 LIMIT {cantidad_baja};'
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            self.updateCantidad()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
