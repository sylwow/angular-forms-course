import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Directive({
  selector: '[passwordStrength]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordStrengthDirective, multi: true }],
  exportAs: 'passwordStrength'
})
export class PasswordStrengthDirective implements Validator {

  private validator = createPasswordStrengthValidator();

  constructor() { }

  validate(control: AbstractControl): ValidationErrors {
    return this.validator(control);
  }
}
