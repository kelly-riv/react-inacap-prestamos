from .base import DataBase
from .base import DataBase

class Stock(DataBase):
    
    def __init__(self, libro="", ISBN="", cantidad=0) -> None:
        super().__init__()
        self.titulo = libro
        self.ISBN = ISBN
        self.cantidad = cantidad
    
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

########################################################

    def updateCantidades(self):
        data = ""
        sql = "SELECT ISBN, count(*) as cantidad FROM libro GROUP BY isbn HAVING count(*) > 1;"
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
            return 
        except Exception as e:
            raise


    def getDisponibilidad(self):
        self.updateCantidades()
        data = ""
        sql = "SELECT DISTINCT stock.ISBN, stock.cantidad, libro.titulo FROM `stock` LEFT JOIN libro ON stock.ISBN = libro.ISBN;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            stock = []
            for value in data:
                libro = Stock(value[2],value[0],value[1])
                stock.append(libro)
            return stock
        except Exception as e:
            raise

    def getStock(self):
        data = ""
        sql = "SELECT libro.titulo, libro.autor,stock.ISBN,stock.cantidad FROM libro LEFT JOIN stock ON libro.ISBN=stock.ISBN;"
        try:
            self.cursor.execute(sql)
            data = self.cursor.fetchall()
            stock_items = []
            for value in data:
                stock_item = Stock(value[0], value[1],value[2],value[3])
                stock_items.append(stock_item)
            self.stock_items = stock_items
            return stock_items
        except Exception as e:
            raise
    
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
        cantidad = self.cantidad
        sql = "UPDATE `stock` SET `cantidad`={} WHERE `ISBN`='{}'".format(cantidad, ISBN)
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False
    
    def darBajaLibro(self, isbn, cantidad_baja):
        sql = f'UPDATE libro SET condicion = 0 WHERE ISBN = "{isbn}" LIMIT {cantidad_baja};'
        try:
            self.cursor.execute(sql)
            self.connection.commit()
            return True
        except Exception as e:
            print("Error: " + str(e.args))
            self.connection.close()
            return False