import sys

sys.path.append("../react-loan-app/flask-server/model")


from model.libros import Libro
from model.prestamo import Prestamo
from model.prorroga import Prorroga
from model.stock import Stock
from model.usuario import Usuario
from model.encargado import Encargado

from main_view import Vista

class Control:
    def __init__(self) -> None:
        self.libros = Libro()
        self.prestamo = Prestamo()
        self.prorroga = Prorroga()
        self.stock = Stock()
        self.usuario = Usuario()
        self.encargado = Encargado()

        self.vista = Vista()

        self.listaUsuarios = self.usuario.getListaUsuarios()
        self.listaEncargados = self.encargado.getListaEncargados()
        self.listaPrestamos = self.prestamo.getListaPrestamos()
        self.listaLibros = self.libros.getListaLibros()

    ##Distinguir entre usuarios docente y alumno
    def verificarTipoUsuario(self):
        rut = self.vista.getRut()
        
        for user in self.listaUsuarios:
            if user.getRut() == rut:
                docente = user.getDocente()
                usuario = user
                
        return docente, usuario
    
    ##Realizar préstamo (requiere ingreso de código del libro y rut del usuario
    ##Registrar fecha de devolución

    def realizarPrestamo(self):
        codigoLibro=self.vista.getCodigoLibro()
        docente, user = self.verificarTipoUsuario()

        print(codigoLibro,str(docente),user)
        fechaInicio = self.vista.getFechaInicio()
        fechaDevolucion = self.vista.getFechaDevolucion()
        

  
    ##Otorgar prórroga

    ##Aplicar multas

    ##Verificar límites (Lleva a verificar multas impagas y verificar libros permitidos)
    def verificarLimites(self,user):
        id_user = user.getId()
        self.verificarMultas(id_user)
    ##Verificar limites de libros (requiere tipo de usuario)
    
    def limitarLibro(self, user, libros):
        codigoLibro=self.vista.getCodigoLibro()
        docente, user = self.verificarTipoUsuario()
        
    ##Verificar multas impagas
    def verificarMultas(self,id_user):
        self.prestamo.getMultaTotal() #funcion en desarrollo xd

    def controlStock(self):
        self.vista.mostrarStockLibros(self.stock.getStock())
        accion = self.vista.getDecision()
            


contrl = Control()

contrl.verificarTipoUsuario()

