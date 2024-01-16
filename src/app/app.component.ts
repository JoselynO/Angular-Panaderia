import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  art={
    producto:"",
    precio:0,
    cantidad:0 
  }

  articulos = [{producto:'papas', precio:10.55,cantidad:1},
               {producto:'manzanas', precio:12.10,cantidad:1},
               {producto:'melon', precio:52.30, cantidad:1},
               {producto:'cebollas', precio:17,cantidad:1},
               {producto:'calabaza', precio:20,cantidad:1},
              ];

  hayRegistros() {
    return this.articulos.length>0;              
  }

  borrar(cantidad:number) {
    for(let x=0;x<this.articulos.length;x++)
      if (this.articulos[x].cantidad==cantidad)
      {
        this.articulos.splice(x,1);
        return;
      }
  }

  agregar() {
    if (this.art.cantidad==0) {
      alert('Debe ingresar un código de articulo distinto a cero');
      return;
    }
    for(let x=0;x<this.articulos.length;x++)
    if (this.articulos[x].cantidad==this.art.cantidad)
    {
      alert('ya existe un articulo con dicho codigo');
      return;
    }        
    this.articulos.push({cantidad:this.art.cantidad,
                         producto:this.art.producto,
                         precio:this.art.precio });
  
    this.art.producto="";	
    this.art.precio=0; 
    this.art.cantidad=0;   
  }

  seleccionar(art: { codigo: number; descripcion: string; precio: number; }) {
    this.art.cantidad=art.codigo;
    this.art.producto=art.descripcion;
    this.art.precio=art.precio;
  }

  modificar() {
    for(let x=0;x<this.articulos.length;x++)
      if (this.articulos[x].cantidad==this.art.cantidad)
      {
        this.articulos[x].producto=this.art.producto;
        this.articulos[x].precio=this.art.precio;
        return;
      }        
    alert('No existe el código de articulo ingresado');
  }
}