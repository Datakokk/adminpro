import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-increasing',
  templateUrl: './increasing.component.html',
  styles: [
  ]
})
export class IncreasingComponent implements OnInit {

  progress: number = 50;
  
  constructor() { }

  ngOnInit(): void {
  }

  getPercentage(){
    return `${this.progress}%`
  }

  changeValue(value: number){
    if(this.progress >= 100 && value >=0){
      return this.progress = 100;
    }
    if(this.progress <= 0 && value < 0){
      return this.progress = 0;
    }
     return this.progress = this.progress + value;
  }

}
