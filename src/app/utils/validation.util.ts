import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * return true when string value is valid
 * if value is not string, just check existence
 * @param value string value to check
 */
export function isValidString(value: string): boolean {
  if (typeof value === 'string') {
    return !!(value && value.trim());
  } else {
    return !!value;
  }
}

/**
 * return true when value is float format
 * @param value value
 */
export function isFloat(value: string): boolean {
  const floatReg = /^(([+-])?(0|([1-9][0-9]*))(\.[0-9]+)?)$/gm;

  return !!floatReg.exec(value);
}

/**
 * return true when phone number is valid format
 * @param value value
 */
export function isValidPhoneNumber(value: string): boolean {
  const phoneNumberReg = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

  return !!phoneNumberReg.exec(value);
}

/**
 * return true when decimel format is valid format
 * @param value value
 */
export function isValidDecimal(value: string): boolean {
  const decimalReg = /^\d*(\.\d*)$/gm;

  return !!decimalReg.exec(value);
}

/**
 * return true when value is integer format
 * @param value value
 */
export function isInteger(value: string | number): boolean {
  const integerReg = /^[0-9]+$/gm;

  return !!integerReg.exec(typeof value === 'string' ? value : value.toString());
}

/**
 * return true when value is date format
 * @param value value
 */
export function isDate(value: string): boolean {
  const dateReg = /(\d{1,2})\s(\w{3}),\s(\d{4})\s(\d{1,2}):(\d{1,2})\s(AM|PM)/gm;
  const dateReg1 = /(\d{2})\/(\d{2})\/(\d{4})/g;
  const dateReg2 = /(\d{4})-(\d{2})-(\d{2})/g;
  const dateReg3 = /(\d{1,2})\s(\w{3})\s(\d{4}),\s(\d{1,2}):(\d{1,2})\s(AM|PM)/gm;
  const dateReg4 = /(\d{1,2})\s(\w{3})\s(\d{4})/gm;

  return (
    !!dateReg.exec(value) ||
    !!dateReg1.exec(value) ||
    !!dateReg2.exec(value) ||
    !!dateReg3.exec(value) ||
    !!dateReg4.exec(value) ||
    !isNaN(new Date(value).getTime())
  );
}

/**
 * return true when value is not undefined and not null
 * @param value value
 */
export function isDefined(value: unknown): boolean {
  return value !== undefined && value !== null;
}

/**
 * return true when base string contains search string (case-insensitive)
 * @param base base
 * @param search search
 */
export function containsString(base: string, search: string): boolean {
  if (!base || !search) {
    return true;
  }
  return base.toLowerCase().indexOf(search.toLowerCase()) !== -1;
}

/**
 * Validator for the Phone Number format.
 * @returns ValidatorFn
 */
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // skip validation when empty
    if (!control.value) {
      return null;
    }
    const isValid = isValidPhoneNumber(control.value);
    return !isValid ? { invalidFormat: { value: control.value } } : null;
  };
}
