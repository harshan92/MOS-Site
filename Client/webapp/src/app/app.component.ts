import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchTerm='';
  isCollapse=true;

  constructor(private router:Router, private data:DataService){
  }

  get token(){
    return localStorage.getItem("token");
  }

  collapse(){
    this.isCollapse=true;
  }

  closeDropdown(dropdown){
    dropdown.close();
  }

  logout(){}

  search(){}
}
