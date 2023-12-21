import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router){}

  loginUsername:string = ""
  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.loginUsername = sessionStorage.getItem("username") || ""
    }
    else{
      this.loginUsername = ""
    }
  }

  logout(){
    this.loginUsername = ""
    sessionStorage.removeItem("username")
    sessionStorage.getItem("token")
    this.router.navigateByUrl("/")
  }
}
