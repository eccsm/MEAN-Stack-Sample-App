import { Product } from './../../model/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare let alertify:any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  ProductData: Product[];
  product:Product;
  id = this.actRoute.snapshot.paramMap.get('id');
  wasDelete:boolean = false;
  category: any =[]; 

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

 

  ngOnInit() {
    this.updateProduct();
    this.apiService.getCategoriess().subscribe((data) => {
      this.category = data;
     })
    this.getProduct(this.id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  get myForm() {
    return this.editForm.controls;
  }

  getProduct(id) {
    this.apiService.getproduct(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        description: data['description'],
        imageUrl: data['imageUrl'],
        price: data['price'],
        category: data['category']
      });
    });
  }

  updateProduct() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  removeproduct() {
        this.apiService.deleteproduct(this.id).subscribe((data) => {
          this.wasDelete = true;
        }
      )    
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
        this.apiService.updateproduct(this.id, this.editForm.value)
          .subscribe(res => {
            if(this.wasDelete){
            alertify.error(this.editForm.get("name").value + " has deleted..");
            }
            else{
              alertify.success(this.editForm.get("name").value + " has updated..");
            }
            this.router.navigateByUrl('/products');
          }, (error) => {
            console.log(error)
          })
          
         
      }
    }
  }