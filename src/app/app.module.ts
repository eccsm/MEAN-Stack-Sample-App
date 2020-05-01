import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { CategoriesComponent } from './components/categories/categories.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from '../app/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CreateProductComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductSearchPipe,
    CategoriesComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
