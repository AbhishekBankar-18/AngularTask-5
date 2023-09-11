import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataHandlerService } from '../service/data-handler.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registeredData : any;

    constructor( private dataServe : DataHandlerService){

    }

  ngOnInit(): void {
    this.registeredData = new FormGroup({
      fname : new FormControl('', Validators.required),
      lname : new FormControl('', Validators.required),
      email : new FormControl('', Validators.required),
      contact : new FormControl('', Validators.required),
      dept : new FormControl('', Validators.required),
      uname : new FormControl('', Validators.required),
      pass : new FormControl('', Validators.required),
      desg : new FormControl('', Validators.required),
    })
  }
  onSubmit(){
    console.log(this.registeredData.value)
    this.dataServe.postUser(this.registeredData.value).subscribe();
    this.registeredData.reset();
    
  }


  
}
