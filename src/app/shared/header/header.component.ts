import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private userSerice: UserService) { }

  ngOnInit(): void {
  }

  logout(){
    this.userSerice.logout();
  }

}
