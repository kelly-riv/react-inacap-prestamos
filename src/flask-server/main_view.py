import sys

class Vista:
    def __init__(self) -> None:
        pass
    def getRut(self):
        rut = str(input("Ingrese el RUT: "))
        return rut
    def getCodigoLibro(self):
        codigoLibro = str(input("Ingrese el código del libro: "))
        return codigoLibro 
    def getFechaInicio(self):
        fechaInicio = str(input("Ingrese la de inicio del prestamo: "))
        return fechaInicio
    def getFechaDevolucion(self):
        fechaDevolucion = str(input("Ingrese la fecha devolucion del libro: "))
        return fechaDevolucion
    
    def mostrarStockLibros(self,stock):
        for libro in stock:
            print("libro:"+libro.getTitulo()+" isbn:"+str(libro.getISBN()))
    def getDecision(self):
        decision = int(input("¿Qué desea realizar?"))
        return decision
        
    

    
