import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
declare let alertify:any;

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  submitted = false;
  productForm: FormGroup;
  category: any =[]; 
  
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) { 
    this.mainForm();
  }

  ngOnInit() { 
    this.apiService.getCategoriess().subscribe((data) => {
    this.category = data;
   })    
  }

  mainForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  // Choose designation with select dropdown
  updateProfile(e){
    this.productForm.get('category').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm(){
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.productForm.valid) {
      return false;
    } else {
      this.apiService.createproduct(this.productForm.value).subscribe(
        (res) => {
          alertify.success(this.productForm.get("name").value + " has added..");
          this.ngZone.run(() => this.router.navigateByUrl('/products'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
