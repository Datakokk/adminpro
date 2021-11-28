import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {
  public progress: number = 50;
  
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
