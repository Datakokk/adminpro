import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent implements OnInit {

  @Input('value') progress: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output('value') outputValue: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  changeValue(value: number){
    if(this.progress >= 100 && value >=0){
      this.outputValue.emit(100);
      return this.progress = 100;
    }
    if(this.progress <= 0 && value < 0){
      this.outputValue.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    return this.outputValue.emit(this.progress)
  }

  onChange(value: number){
    
    if(value >= 100){
      this.progress = 100;
    }else if(value <= 0){
      this.progress = 0;
    }else{
      this.progress = value;
    }
    
    this.outputValue.emit(this.progress)
  }

}
