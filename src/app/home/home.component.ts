import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  myform: FormGroup;
  data: [];

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  
    this.myform = new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      gender: new FormControl(),
      age: new FormControl(),
      address: new FormControl(),
    });
  
    this.refreshData();
  }

  refreshData(){
    this.homeService.getAllUsers().subscribe((res: any)=>{
      this.data = res;
    });
  }

  editData(data){
    this.myform.patchValue({
      id: data.id,
      name: data.name,
      gender: data.gender,
      age: data.age,
      address: data.address,
    });
  }

  deleteUserById(id){
    this.homeService.deleteUser(id).subscribe((res: any)=>{
      this.refreshData();
    });
  }

  onSubmit(){
    if (this.myform.valid) {
        this.homeService.saveUser(this.myform).subscribe((res: any) => {
          this.refreshData();          
          this.myform.reset();
        });
      }
  }

}
