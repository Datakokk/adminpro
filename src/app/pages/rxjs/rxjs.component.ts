import { Component, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy{

  public intervalSubcription?: Subscription;

  constructor() { 
    
    
    // this.returnObservable().pipe(
    //   retry(2)
    // )
    // .subscribe({
    //   next: value => console.log('Subs: ',value),
    //   error: err => console.warn('Erro: ', err), 
    //   complete: () => console.info('Obs terminado'),
    // })

    this.intervalSubcription = this.returnInterval()
                                .subscribe(console.log)
  }
  
  ngOnDestroy(): void {
    this.intervalSubcription?.unsubscribe();
  };

  returnInterval(): Observable<number>{

    return interval(500)
                      .pipe(
                        //take( 10),
                        map( value => value + 1),
                        filter( value => value%2===0),
                      );

  }


  returnObservable(): Observable<number>{
    let i = -1;
    
    const obs$ = new Observable<number>( observer => {

      const interval = setInterval( () => {

        console.log('tick');
        i++;
        observer.next(i);

        if(i === 4){
          clearInterval( interval ); 
          observer.complete();
        }

        if(i === 2){
          console.log('i = 2.... error')
          observer.error('i llego al valor de 2');
        }

      }, 1000 )
    });
    return obs$;
  }
  

}
