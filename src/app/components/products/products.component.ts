import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {

  product: any = [];


  constructor(private apiService: ApiService) {
    this.readproduct();
  }
  keyword;
  ngOnInit() {
    if(localStorage.getItem("needReload")){
      localStorage.removeItem("needReload");
      window.location.reload()
    }
  }
  readproduct() {
    this.apiService.getproducts().subscribe((data) => {
      this.product = data;
    })
  }



}