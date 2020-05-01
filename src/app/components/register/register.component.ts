import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from './../../service/api.service';
import { AuthenticationService } from "../../service/authentication.service";
declare let alertify;

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private apiService: ApiService
    ) {
        if (localStorage.getItem("loggedIn")) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.apiService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    alertify.success('Registration successful please Login', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    alertify.error(error);
                    this.loading = false;
                });
    }
}
