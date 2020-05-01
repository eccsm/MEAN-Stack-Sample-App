import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

declare let alertify;
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category:any = [];
  

  constructor(private apiService: ApiService) { 
    
    this.readCategory();
  }
  keyword;
  ngOnInit() {}

  readCategory(){
    this.apiService.getCategoriess().subscribe((data) => {
     this.category = data;
    })    
  }

  addCategory()
  {
    let input = (<HTMLInputElement>document.getElementById("cName")).value;
     this.apiService.createCategory(input).subscribe(
      
       (res) => {
         alertify.success(input + " has added..");
         window.location.reload();
       }, (error) => {
        console.log(error);
       });
  }

  removeCategory(category, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteCategory(category._id).subscribe((data) => {
          this.category.splice(index, 1);
        }
      )    
    }
}

updateCategory(category) {
  
  let input = (<HTMLInputElement>document.getElementById("cName")).value;
      this.apiService.updateCategory(category._id,input)
        .subscribe(res => {
            alertify.success(input + " has updated..");
            window.location.reload();
          }, (error) => {
          console.log(error)
        })
        
}
}
