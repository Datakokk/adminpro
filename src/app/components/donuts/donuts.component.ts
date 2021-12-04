import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';


@Component({
  selector: 'app-donuts',
  templateUrl: './donuts.component.html',
  styles: [
  ]
})
export class DonutsComponent implements OnInit {
  @Input() title = "Whitout title"
  
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059']}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
