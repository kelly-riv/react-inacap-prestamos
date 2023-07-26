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
        sql = "SELECT * FROM libro;"
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

    def habilitarLibro(self, isbn):
        try:
            sql_libro = f'UPDATE libro SET disponibilidad = 1 WHERE ISBN = "{isbn}";'
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
        
    def updateStock(self, isbn):
        try:
            sql_count = f'SELECT COUNT(*) FROM libro WHERE ISBN = "{isbn}"'
            self.cursor.execute(sql_count)
            result = self.cursor.fetchone()
            book_count = result[0] if result else 0
            
            sql_check_stock = f'SELECT * FROM stock WHERE ISBN = "{isbn}"'
            self.cursor.execute(sql_check_stock)
            stock_exists = self.cursor.fetchone() is not None
            
            if stock_exists:
                sql_update = f'UPDATE stock SET cantidad = {book_count} WHERE ISBN = "{isbn}"'
                self.cursor.execute(sql_update)
            else:
                sql_insert = f'INSERT INTO stock (ISBN, cantidad) VALUES ("{isbn}", {book_count})'
                self.cursor.execute(sql_insert)
            
            self.connection.commit()
        
            return True
        except Exception as e:
            print(f"Error al actualizar el stock: {str(e)}")
            return False
        

    def regLibro(self, isbn, cantidad, titulo, autor, editorial, anio_publicacion):
        try:
            sql_comprobar_isbn_existe = f'SELECT * FROM stock WHERE ISBN = "{isbn}"'
            self.cursor.execute(sql_comprobar_isbn_existe)
            results = self.cursor.fetchall()

            if len(results) != 0:  
                sqlCantidadActual = f'SELECT cantidad FROM stock WHERE ISBN = "{isbn}"'
                self.cursor.execute(sqlCantidadActual)
                cantidadActual = self.cursor.fetchone()[0]

                nuevaCantidad = cantidadActual + cantidad
                sql_update = f'UPDATE `stock` SET `cantidad` = {nuevaCantidad} WHERE `ISBN` = "{isbn}"'
                self.cursor.execute(sql_update)
                self.updateStock()
            else: 
                sql_insert = f'INSERT INTO `stock` (`ISBN`, `cantidad`) VALUES ("{isbn}", {cantidad})'
                self.cursor.execute(sql_insert)
                self.updateStock()

            for _ in range(cantidad):
                sql_insert_libro = f'INSERT INTO `libro` (`titulo`, `autor`, `editorial`, `ISBN`, `anio_publicacion`) VALUES ("{titulo}", "{autor}", "{editorial}", "{isbn}", {anio_publicacion})'
                self.cursor.execute(sql_insert_libro)
                self.updateStock()
            
            self.connection.commit()

            return True

        except Exception as e:
            print(f"Error al registrar el libro: {str(e)}")
            return False




