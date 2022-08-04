import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PaqueteServiceService } from 'src/app/components/cliente/formulario-reserva/paquete-service.service';
import { Paquete } from 'src/app/components/cliente/formulario-reserva/Paquete';

// RESERVA
import { ReservaServiceService } from '../calendario-reserva/reserva-service.service';
import { Reserva, IReserva } from '../calendario-reserva/reserva';


@Component({
  selector: 'app-formulario-reserva',
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.scss']
})
export class FormularioReservaComponent implements OnInit {
  @Input()
  habilitar: boolean = false;
  total: number = 0;

  horaCadena: string[] = ['10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00']


  reserva: IReserva = {
    idPaquete: 0,
    fechaRegistro: '',
    fechaReserva: '',
    hora: '',
    cantPersonas: 0,
    idLogin: -1,
    nombres: '',
    apellido: '',
    telefono: '',
    flagTipoReserva: 0,
    acompaniante: 0,
    totalPago: 0
  };



  paquetes: Paquete[] = [];


  constructor(private paqueteService: PaqueteServiceService, private reservaServiceService: ReservaServiceService) {

    // let total = this.reserva.acompaniante * 10;

  }



  ngOnInit(): void {
    this.paqueteService.getPaquete().subscribe(
      paquetes => {
        this.paquetes = paquetes;

      });
  }


  NoRepetir()
  {
    //console.log('Llamando a fecha reserva ' + this.reserva.fechaReserva)
    this.reservaServiceService.getReserva(this.reserva.fechaReserva).subscribe
    (
      reservas => 
      {
        for (let i = 0; i < reservas.length; i++)
        {
          //console.log(reservas[i].hora);
          if (this.reserva.hora === reservas[i].hora)
          {
            alert("El horario escogido se encuentra reservado. Por favor elija otra horario!!")
            return;
          }
        }
        this.RegistrarReserva()
      }
    )
  }

  RegistrarReserva()
  {
    console.log(this.reserva);
    console.log("aaaaeaaaaa")
    let guardandoidPaquete = this.reserva.idPaquete;
    let pruebita = guardandoidPaquete.toString().split(" ");
    this.reserva.idPaquete = parseInt(pruebita[0]);
    this.reservaServiceService.CrearReserva(this.reserva).subscribe(() => {
      alert("Reserva registrada correctamente!!")
    });
    this.reserva.idPaquete = 0;
    
    //console.log("Creando Reserva test...")
  }

  ValueDelPaquete(xd: any) {

  }

  aea() {
    console.log("aea funcionando")
    //this.total = this.reserva.acompaniante; //* this.reserva.idPaquete
  }

  parse(aea: any) {
    return parseInt(aea);
  }


  onchangeValues(cantPersona: number, acompaniante: number, paquete: string) {
    console.log("cantPersona: ", cantPersona);
    console.log("acompaniante: ", acompaniante);
    /*if (Number(paquete) == 0)
    {
      this.total = 0
    }*/

    const paqueteSplit = paquete.split(" ")
    let precio = 0
    if (paqueteSplit.length <= 1)
    {
      this.total = 0
      console.log("No selecciono paquete")
      
    }
    else
    {
      precio = Number(paqueteSplit[1])
      console.log("paquete: ", precio);
      const precioAcompaniante = 6
      this.total = cantPersona * Number(precio) + acompaniante * precioAcompaniante
    }
    this.reserva.totalPago = this.total;
    
  }

  fechaprobando()
  {
    console.log(this.reserva.fechaReserva)
  }

  /*darValores(oa : any)
  {
    this.reserva = oa;
  }*/
}

