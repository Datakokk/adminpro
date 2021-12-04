import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncreasingComponent } from './increasing/increasing.component';
import { FormsModule } from '@angular/forms';
import { DonutsComponent } from './donuts/donuts.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    IncreasingComponent,
    DonutsComponent
  ],
  exports: [
    IncreasingComponent,
    DonutsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
