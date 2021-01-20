import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  data: any;

  alertType: string;
  displayAlert: boolean = false;
  alertMessage: string;

  constructor(private formBuilder: FormBuilder,
    // tslint:disable-next-line:align
    private router: Router,
    // tslint:disable-next-line:align
    private http: HttpClient) { }
  baseUrl: string = 'http://10.117.189.102:7770';
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      adharId: ['', [Validators.required]],
      addresss: ['', Validators.required]
    });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const reqObj = {
      id: null,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };
    this.http.post('http://localhost:3000/login', reqObj).subscribe((response: any) => {
      console.log(response);
      if (response) {
        console.log(response);
        if (reqObj) {
          // alert(this.registerForm.value.userName + ' Registerd success');

          this.alertType = 'success';
          this.displayAlert = true;
          this.alertMessage = ` ${this.registerForm.value.userName} Registration Successfull`;

        } else {
          this.alertType = 'warning';
          this.displayAlert = true;
          this.alertMessage = ` ${response.message} `;
        }
        this.router.navigate(['/list']);
      }

      console.log(this.registerForm);


    }, (err) => {
      console.log('rerror', err);
      // alert(err.message);
    });
  }
  closeAlert() {
    this.displayAlert = false;
    this.router.navigate(['login']);
  }
}
