import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../service/data-handler.service';

@Component({
  selector: 'app-staff-dash',
  templateUrl: './staff-dash.component.html',
  styleUrls: ['./staff-dash.component.css']
})
export class StaffDashComponent implements OnInit {

  registeredDataLeave : any;
  TotalDays: any;
  currentUser: any;
  userId: any;
  list: any;
  leavLists: any;
  uid: any;
  totalLeave :any
  approveLeaves : any = 0
  pendingLeaves : any = 0
  rejectedLeaves : any = 0
  

  constructor(private fb: FormBuilder, private httpServe: DataHandlerService, private activeRoute: ActivatedRoute){

  }
  ngOnInit(): void {
    this.registeredDataLeave =  this.fb.group({
      fDate :this.fb.control('',Validators.required),
      tDate : this.fb.control('',Validators.required),
      section : this.fb.control('',Validators.required)
    })
    this.getUserList()
    
  }

  onSubmit(){
    
    
    // console.log(this.registeredDataLeave.value);
    // console.log(this.registeredDataLeave.value.fDate);
    let date1 = new Date(this.registeredDataLeave.value.fDate)
    let date2 = new Date(this.registeredDataLeave.value.tDate)

    let totalTime = date2.getTime()-date1.getTime()
    console.log(totalTime)
    this.TotalDays = totalTime / (1000 * 3600 * 24)
    console.log(this.TotalDays)

    let newObj = {
      fDate: this.registeredDataLeave.value.fDate,
      tDate: this.registeredDataLeave.value.tDate,
      TotalDays: this.TotalDays,
      lReason: this.registeredDataLeave.value.section,
      designation: this.currentUser.desg,
      firstName: this.currentUser.fname,
      lastName: this.currentUser.lname,
      dep: this.currentUser.dept,
      lid: this.currentUser.id,
      status: 'pending',
    }
    console.log(newObj);
     this.httpServe.postLeave(newObj).subscribe((res: any) => {
      console.log(res);
      this.getUserList()
    })
    
    this.registeredDataLeave.reset();
  }
  getUserList(){
    this.activeRoute.paramMap.subscribe((res : any)=>{
      // this.uid = res.get('id')
      this.uid = this.httpServe.uId
      console.log(this.uid)
      this.httpServe.getUser().subscribe((res : any)=>{
        this.list = res
        console.log(this.list)
        this.list.forEach((uId : any)=>{
          if(uId.id === this.uid){
            this.currentUser = uId
            console.log(this.currentUser)
          }
        })
      })
    })


    this.httpServe.getLeaves().subscribe((res: any) => {
        
      this.leavLists = res.filter((user: any) => {
        return user.dep === this.currentUser?.dept && user.lid === this.uid;
      })
      console.log(this.leavLists);
      this.CalculateLeaves()
    })
  }



  CalculateLeaves(){
    this.totalLeave = this.leavLists.length
    this.leavLists.forEach((user: any) => {
      if (user.status == "Approved") {
        this.approveLeaves++
      } else if (user.status == "pending") {
        this.pendingLeaves++
      } else if (user.status == "Rejected") {
        this.rejectedLeaves++
      }
    })
  }

}
