import { FormControl } from '@angular/forms';

export function passwordMatchValidator(field: FormControl): { [key: string]: boolean } {
  let validation = null;

  if (!!field.parent && field.value !== field.parent.get('password').value) {
    validation = { passwordmatch: true };
  }

  return validation;
}

export function phoneValidator(field: FormControl): { [key: string]: boolean } {
  let validation = null;

  if (!isPhoneNumber(field.value)) {
    validation = { phone: true };
  }

  return validation;

  function isPhoneNumber(value) {
    const regex = /^(\+?\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}([ -]?x\d{2,4})?$/;
    return !value || regex.test(value);
  }
}
