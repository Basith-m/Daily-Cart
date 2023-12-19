import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = this.fb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })
  constructor(private fb:FormBuilder, private api:ApiService, private toaster:ToasterService, private router:Router){}
  register(){
    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user = {username,email,password}
      this.api.registerAPI(user).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.username} registerd successfully...`)
          this.registerForm.reset()
          this.router.navigateByUrl('/user/login')
        },
        error:(data:any)=>{
          this.toaster.showError(data.error)
          this.registerForm.reset()
        }
      })
    }else{
      this.toaster.showWarning("Invalid Form!!!")
    }
  }
}
