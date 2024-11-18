import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { validEmailValidator, noSpacesValidator } from '../../../../shared/custom-validators';
import { FirebaseService } from '../../../../services/firebase.service';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.css'
})
export class LoginContainerComponent implements OnInit{
  formSubmitted = false;
  infoErrorMessage: { message?: string; type?: string } = {};
  hidePassword = true;
  isLoading = false;

  loginForm = this._formBuilder.group({
    email: ['', [Validators.required, validEmailValidator()]],
    password: ['', [Validators.required, noSpacesValidator()]]
  });

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService,
  ) {}
  ngOnInit(): void {
    this.redirectUserToNotesIfAlreadyLoggedIn()
  }

  redirectUserToNotesIfAlreadyLoggedIn(){
    this.firebaseService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/section/notes');
      }
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.infoErrorMessage = {};
    this.isLoading = true;

    const email = this.loginForm.get("email")?.value ?? '';
    const password = this.loginForm.get("password")?.value ?? '';

    this.firebaseService.login(email, password)
    .then(() => {
      this._onSuccessLogin()
    })
    .catch((error) => {
      this._onFailedLogin(error)
    });  
    
  }

  _onSuccessLogin() {
    this.router.navigateByUrl('/section/notes');
    this.isLoading = false;
  }

  _onFailedLogin(error: any) {
    this.isLoading = false
    let errorMessage = 'An unexpected error occurred. Please try again.';

  if (error.code === 'auth/invalid-credential') {
    errorMessage = 'The credentials provided are invalid. Please try again.';
  } else if (error.code === 'auth/user-not-found') {
    errorMessage = 'No user found with this email. Please sign up.';
  } else if (error.code === 'auth/wrong-password') {
    errorMessage = 'The password is incorrect. Please try again.';
  } else if (error.code === 'auth/too-many-requests') {
    errorMessage = 'Too many attempts. Please try again later.';
  }

  this.infoErrorMessage = { message: errorMessage, type: 'error' };

  }

  

  onTogglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
