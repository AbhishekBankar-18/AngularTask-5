import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataHandlerService } from '../service/data-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loggedUser : any;
  allUsers : any;
  uid : any
  constructor( private dataServe : DataHandlerService, private router: Router){}
  ngOnInit(): void {
    
    this.loggedUser = new FormGroup({
      uname : new FormControl('', Validators.required),
      upass : new FormControl('', Validators.required)
    })
    this.dataServe.getUser().subscribe((res : any)=>{
      // console.log(res)
      this.allUsers = res;
      console.log(this.allUsers)
    })
  }
  login(){
    console.log(this.loggedUser.value);

    // console.log(this.loggedUser.value);
    // console.log(this.loggedUser.value.uname)
    this.allUsers = this.allUsers.find((user : any) =>{
      // console.log(user.uname== this.loggedUser.value.uname)
       
      return user.uname == this.loggedUser.value.uname;
    })

    if(this.loggedUser.value.uname === this.allUsers?.uname && this.loggedUser.value.upass ==this.allUsers?.pass){
      console.log('success')
      // this.router.navigate(['/hodDash'])

      if(this.allUsers.desg === 'hod'){
        this.router.navigate(['/hodDash',this.allUsers.id])
      }
      else{
        this.router.navigate(['/staffDash',this.allUsers.id])
      }
    }
    else{
      console.log('Fails')
    }

    this.uid = this.allUsers.id
    console.log(this.uid)
    this.dataServe.getId(this.uid)
  }


}
