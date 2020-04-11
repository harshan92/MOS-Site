import { Component, OnInit } from '@angular/core';
import { RestApiService} from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  username='';
  email='';
  first_name='';
  last_name='';
  password='';
  password1='';
  isSeller=false;

  btnDisabled=false;
  constructor(private router:Router, private data:DataService, private rest:RestApiService ) { }

  ngOnInit(): void {
  }

  validate(){
    if(this.username){
      if(this.first_name){
        if(this.last_name){
          if(this.email){
            if(this.password){
              if(this.password1){
                if(this.password1===this.password){
                  return true;
                }else{
                  return false;
                }
              }else{
                this.data.error("Confirm password is not entered.");
              }
            }else{
              this.data.error("Password is not entered.");
            }
          }else{
            this.data.error("Email is not entered.");
          }
        }else{
          this.data.error("Last name is not entered.");
        }
      }else{
        this.data.error("First name is not entered.");
      }
    }else{
      this.data.error("Username is not entered.");
    }
  }

  async register(){
    this.btnDisabled=true;
    try{
      if(this.validate()){
        const data=await this.rest.post(
          "http://localhost:3030/api/accounts/signup",
          {
            username:this.username,
            first_name:this.first_name,
            last_name:this.last_name,
            email:this.email,
            password:this.password,
            isSeller:this.isSeller
          }
        );
        if(data["success"]){
          localStorage.setItem("token", data["token"]);
          this.data.success("Registration Successfull!");
        }else{
          this.data.error(data["message"]);
        }
      }
    }catch(error){
      this.data.error(error["message"]);
    }
    this.btnDisabled=false;
  }
}
