import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminData } from './admin.module';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  formValue !: FormGroup
  adminModelObj:AdminData=new AdminData;
  allClientData: any;
  showAdd!:boolean
  showbtn!:boolean;
  constructor(private formBuilder: FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      C_Id: [''],
      C_Name: [''],
      App_Name: [''],
      Serverinfo: [''],
      Portinfo: [''],
      BlackoutTime: ['']
    })
    this.getAllData()
  }
//break 
  clickAddClient(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
// now subscribing data which is mapped via services
addAdmin(){
  this.adminModelObj.C_Id=this.formValue.value.C_Id;
  this.adminModelObj.C_Name=this.formValue.value.C_Name;
  this.adminModelObj.App_Name=this.formValue.value.App_Name;
  this.adminModelObj.Serverinfo=this.formValue.value.Serverinfo;
  this.adminModelObj.Portinfo=this.formValue.value.Portinfo;
  this.adminModelObj.BlackoutTime=this.formValue.value.BlackoutTime;

  this.api.postClient(this.adminModelObj).subscribe(res=>{
    console.log(res);
    alert("Client records added successfully");
    let ref=document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();
  },
  err=>{
    alert("Something went wrong")

  })
}

getAllData(){
  this.api.getClient().subscribe(res=>{
    this.allClientData=res;
  })
}

//Delete records

deleteClientData(data:any){
  this.api.deleteClient(data.id).subscribe(res=>{
  alert("Client Record deleted successfully")
  this.getAllData();
  })

}

onEditClient(data:any){
  this.showAdd=false;
  this.showbtn=true;
  this.adminModelObj.id=data.id;
  this.formValue.controls['C_Name'].setValue(data.C_Name);
  this.formValue.controls['App_Name'].setValue(data.App_Name);
  this.formValue.controls['Serverinfo'].setValue(data.Serverinfo);
  this.formValue.controls['Portinfo'].setValue(data.Portinfo);
  this.formValue.controls['BlackoutTime'].setValue(data.BlackoutTime);
}

UpdateAdmin(){
  this.adminModelObj.C_Id=this.formValue.value.C_Id;
  this.adminModelObj.C_Name=this.formValue.value.C_Name;
  this.adminModelObj.App_Name=this.formValue.value.App_Name;
  this.adminModelObj.Serverinfo=this.formValue.value.Serverinfo;
  this.adminModelObj.Portinfo=this.formValue.value.Portinfo;
  this.adminModelObj.BlackoutTime=this.formValue.value.BlackoutTime;

  this.api.updateClient(this.adminModelObj,this.adminModelObj.id).subscribe(res=>{
    alert("Client records updated successfully");
    let ref=document.getElementById('clear');
    ref?.click();

    this.formValue.reset()
    this.getAllData();
  })

}

}
