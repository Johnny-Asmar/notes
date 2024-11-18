import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = emailRegex.test(control.value);
    return isValid ? null : { 'invalidEmail': true };
  };
}

export function noSpacesValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Check if the control value contains any space.
    const hasSpace = control.value?.includes(' ');
    // If a space is found, return the validation error.
    return hasSpace ? { 'noSpacesAllowed': true } : null;
  };
}





