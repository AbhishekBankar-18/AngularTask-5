import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataHandlerService } from '../service/data-handler.service';

@Component({
  selector: 'app-hod-dash',
  templateUrl: './hod-dash.component.html',
  styleUrls: ['./hod-dash.component.css']
})
export class HodDashComponent implements OnInit{

  list: any;
  currentUser: any;
  leaveLists:any
  approved:any;
  rejected:any;
  uid:any
  constructor(private activeRoute: ActivatedRoute, private httpServe: DataHandlerService) { }

  ngOnInit(): void {
    this.getUsersList()
  }
  getUsersList() {
    this.activeRoute.paramMap.subscribe((res: any) => {
      this.uid = res.get('id');
      console.log(this.uid);
      this.httpServe.getUser().subscribe((res: any) => {
        this.list = res;
        console.log(this.list);
        this.list.forEach((uId: any) => {
          if (uId.id == this.uid) {
            this.currentUser = uId;
            console.log(this.currentUser);

          }
        })
        this.getLeavesList()
      })
    })
  }


  getLeavesList(){
    this.httpServe.getLeaves().subscribe((res:any)=>{
      // this.leaveLists = res;
      this.leaveLists = res.filter((user:any)=>{
        return user.dep === this.currentUser?.dept
      })
      console.log(this.leaveLists)
    })
  }
  
  approveReq(str : any, id:any, eve:any){
    
    console.log(eve);
    this.httpServe.approve(str, id).subscribe((res : any)=>{
      console.log(res);
      this.httpServe.getLeaves().subscribe((res:any)=>{
        this.leaveLists = res.filter((user:any)=>{
          return user.dep === this.currentUser?.dept
        })
        console.log(this.leaveLists)
      })
    })
  }

}
