from .base import DataBase

class Stock(DataBase):
    
    def __init__(self, libro="", ISBN="", cantidad=0,cantidadReal=0) -> None:
        super().__init__()
        self.titulo = libro
        self.ISBN = ISBN
        self.cantidad = cantidad
        self.cantidadReal = cantidadReal

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
        sql = "SELECT libro.id_libro, libro.titulo, libro.ISBN, stock.cantidad, libro.condicion, libro.disponibilidad FROM libro LEFT JOIN stock ON libro.ISBN=stock.ISBN;"
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

    def darBajaLibro(self, isbn, is_damaged):
            
        if is_damaged == True:
            condicion = 0
        else:
            condicion = 1
        try:
            sql_libro = f'UPDATE libro SET disponibilidad = 0, condicion = {condicion} WHERE ISBN = "{isbn}";'
            self.cursor.execute(sql_libro)

            sqlCantidadLibros = f'SELECT COUNT(*) as count FROM libro WHERE ISBN = "{isbn}";' 
            self.cursor.execute(sqlCantidadLibros)

            row = self.cursor.fetchone()
            if row is not None:
                cantidad = row[0]
            else:
                cantidad = 0

            sql_stock = f'UPDATE stock SET cantidad = {cantidad} WHERE ISBN = "{isbn}";'
            self.cursor.execute(sql_stock)
            self.connection.commit()
            self.getStock()

            return True 

        except Exception as e:
            print(f"Error al dar de baja el libro: {str(e)}")
            return False 


