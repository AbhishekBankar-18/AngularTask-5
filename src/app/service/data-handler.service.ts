import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";

@Injectable( {
    providedIn : 'root'
})
export class DataHandlerService{
    
    uId :any
    baseUrl = 'https://ntask-5-default-rtdb.asia-southeast1.firebasedatabase.app/data.json'

    leaveUrl = 'https://ntask-5-default-rtdb.asia-southeast1.firebasedatabase.app/LeaveApp.json'

    

    leaveBeahSub : BehaviorSubject<any> = new BehaviorSubject("loading...")

    


    constructor( private http : HttpClient){

    }
    postUser(obj : any){
        return this.http.post(this.baseUrl,obj)
    }
    getUser(){
        return this.http.get(this.baseUrl).pipe(map((rawData : any)=>{
            let arr = [];
            console.log(rawData)
            for(let data in rawData){
                arr.push({...rawData[data], id : data})
            }
            return arr;
        }))
    }

    postLeave(newObj : any){
        return this.http.post(this.leaveUrl, newObj);
    }

    getLeaves(){
        return this.http.get(this.leaveUrl, {
            headers : new HttpHeaders({
                "name" : 'Abhhishek'
            })
        }).pipe(map((rawData:any)=>{
            let LeaveArr = [];
            for(let data in rawData){
                LeaveArr.push({...rawData[data],id:data})
            }
            this.leaveBeahSub.next(LeaveArr);
            return LeaveArr;
        }))
    }

    approve(obj:any, id:any){
        let updUrl = `https://ntask-5-default-rtdb.asia-southeast1.firebasedatabase.app/LeaveApp/${id}.json`;
        console.log(this.uId);
        return this.http.patch(updUrl, {status : obj})
    }

    getId(id :any){
        console.log(id)
       this.uId = id 
    }
}