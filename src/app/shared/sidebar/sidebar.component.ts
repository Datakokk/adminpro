import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {


  public menuItems!: any[];
  public user!: User;
  constructor(private sideSevice: SidebarService,
              private userService: UserService) { 

    this.menuItems = this.sideSevice.menu; 
    console.log(this.menuItems)

    this.user = userService.user;


  }

  ngOnInit(): void {
  }

}
