import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  public linkTheme = document.querySelector('#theme');
  public url: any = "";

  constructor() { }

  ngOnInit(): void {
    this.url = localStorage?.getItem('theme');
    
    this.linkTheme?.setAttribute('href', this.url);
  }

}
