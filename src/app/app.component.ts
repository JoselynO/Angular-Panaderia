import { AfterContentInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  numeroCodigo = 2;
  cargoTotal = 0;

  productos: { nombre: string, precio: number }[] = [
    { nombre: 'Pistola', precio: 0.45 },
  { nombre: 'Baguette', precio: 0.55 },
  { nombre: 'Chabatta', precio: 0.65 },
  { nombre: 'Pizza', precio: 1.10 },
  { nombre: 'Agua', precio: 1.50 },
  { nombre: 'Donuts', precio: 1.60 }
  ]

  art = {
    codigo: this.numeroCodigo,
    nombre: "",
    precio: 0,
    cantidad: 0,
    total: 0
  }

  codigoPedido = [{ codigo: 1, nombre: 'Pizza', precio: 1.10, cantidad: 3, total: 3.30 }];

  ngAfterContentInit(): void {
    this.calcularPrecio()
  }

  registro() {
    return this.codigoPedido.length > 0;
  }

  setPrecio() {
    for (let i = 0; i < this.productos.length; i++) {
      if (this.productos[i].nombre == this.art.nombre) {
        this.art.precio = this.productos[i].precio;
      }
    }
  }

borrar(codigo:number){
  for(let i = 0; i < this.codigoPedido.length; i++){
    if(this.codigoPedido[i].codigo == codigo){
      this.codigoPedido.splice(i , 1);
      this.art.codigo = --this.numeroCodigo;
    }
  }
  this.calcularPrecio();
  return;
}

calcularPrecio(){
  let sumaTotal = 0;
  for(let i = 0; i < this.codigoPedido.length; i++){
    sumaTotal+= (this.codigoPedido[i].cantidad * this.codigoPedido[i].precio)
  }
  this.cargoTotal = sumaTotal;
}

 imprimirTicket(){
  let mensaje: string = "";
  if(this.codigoPedido.length > 0){
    mensaje+= "FACTURA DE PANADERIA\n"
    for(let i = 0; i < this.codigoPedido.length; i++){
      mensaje+= `${this.codigoPedido[i].codigo}.- ${this.codigoPedido[i].nombre} = ${this.codigoPedido[i].precio} -- ${this.codigoPedido[i].cantidad} -- ${this.codigoPedido[i].total}€` + "\n"
    }
    mensaje += `\nTOTAL: ${this.cargoTotal} €`
    alert(mensaje);
  } else {
    alert("No se ha añadido ningun producto al pedido")
  }
}

seleccionar(art: { codigo: number; nombre: string; precio: number; cantidad:number; total:number}) {
  this.art.codigo=art.codigo;
  this.art.nombre=art.nombre;
  this.art.precio=art.precio;
  this.art.cantidad= art.cantidad;
  this.art.total= art.total;
}

ordenarArray(){
  for(let i = 0; i < this.codigoPedido.length; i++){
    this.codigoPedido[i].codigo = i + 1;
  } 
  return;
}

 modificar() {
    for(let i = 0; i < this.codigoPedido.length; i++){
    if (this.codigoPedido[i].codigo == this.art.codigo){
      if(!this.art.nombre || !this.art.cantidad){
        alert("Debe seleccionar un producto e ingresar una cantidad")
        return;
      } else if(isNaN(this.art.cantidad) || this.art.cantidad < 0){
        alert("La cantidad debe ser un numero entero mayor a 0")
        return;
      } else {
        this.codigoPedido[i].nombre=this.art.nombre;
        this.codigoPedido[i].precio=this.art.precio;
        this.codigoPedido[i].cantidad= this.art.cantidad;
        this.codigoPedido[i].total= this.art.cantidad * this.art.precio;
        this.calcularPrecio();
        return;     
      }
    }
  }
  alert('No existe el codigo de pedido ingresado');
}

anadir(){
  if(!this.art.nombre || !this.art.cantidad){
    alert("Debe seleccionar un producto e ingresar una cantidad")
  } else if(isNaN(this.art.cantidad) || this.art.cantidad < 0){
    alert("La cantidad debe ser un numero entero mayor a 0")
  } else {
    this.codigoPedido.push({codigo:this.numeroCodigo++,
                        nombre:this.art.nombre,
                        precio:this.art.precio,
                        cantidad: this.art.cantidad,
                        total: this.art.precio * this.art.cantidad});
    this.art.codigo=this.numeroCodigo;
    this.art.nombre="";	
    this.art.precio=0;    
    this.art.cantidad=0;
    this.art.total=0;
    this.calcularPrecio();
  }
}

}