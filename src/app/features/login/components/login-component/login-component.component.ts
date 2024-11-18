import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validEmailValidator, noSpacesValidator } from '../../../../shared/custom-validators';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent{
  @Input() formGroup!: FormGroup;
  @Input() infoErrorMessage!: { message?: string; type?: string };
  @Input() hidePassword = true;
  @Input() isLoading = false;

  @Output() onSubmitForm = new EventEmitter<void>();
  @Output() togglePasswordVisibility = new EventEmitter<void>();
}
