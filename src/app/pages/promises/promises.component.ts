import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styleUrls: ['./promises.component.css']
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios)
    })
  //   const promise = new Promise((resolve, reject) => {
  //     if(false){
  //       resolve('Hola Mundo');

  //     } else{
  //       reject('Algo salio mal');
  //     }
  //   });

  //   promise
  //     .then(() => {
  //       console.log("Hey termine")
  //     })
  //     .catch( error => console.log('Error en mi promesa', error))

  //   console.log('Fin del Init');
  }

  getUsuarios(){
    const promise = new Promise( resolve => {
      fetch('https://reqres.in/api/users')
        .then( resp => resp.json())
        .then( body => resolve( body.data ));
    });
    return promise;
  }

}
