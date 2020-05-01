import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }


  createproduct(data): Observable<any> {
    let url = this.baseUri + "/product/create";
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getproducts() {
    return this.http.get(this.baseUri + "/product");
  }

  getproduct(id): Observable<any> {
    let url = this.baseUri + "/product/get/" + id;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  updateproduct(id, data): Observable<any> {
    let url = this.baseUri + "/product/update/" + id;
    return this.http.put(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteproduct(id): Observable<any> {
    let url = this.baseUri + "/product/delete/" + id;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  createCategory(data): Observable<any> {
    let url = this.baseUri + "/category/create";
    return this.http.post(url, { name: data })
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  getCategoriess() {
    return this.http.get(this.baseUri + "/category");
  }

  getCategory(id): Observable<any> {
    let url = this.baseUri + "/category/get/" + id;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }
 
  updateCategory(id, data): Observable<any> {
    let url = this.baseUri + "/category/update/" + id;
    return this.http.put(url, { name: data }).pipe(
      catchError(this.errorMgmt)
    )
  }

  deleteCategory(id): Observable<any> {
    let url = this.baseUri + "/category/delete/" + id;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.baseUri + "/user");
  }

  getUser(id): Observable<any> {
    let url = this.baseUri + "/user/get/" + id;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  register(data) {
    return this.http.post(this.baseUri + "/user/create", data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUri + "/user/" + id);
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}





