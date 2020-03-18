// Class to handle custom validators

import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(group: AbstractControl): { [key: string]: any } | null {
    const password: AbstractControl = group.get('newPassword');
    const confirmPassword: AbstractControl = group.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}

export function noWhitespaceValidator(control: AbstractControl): { [key: string]: any } | null {
    return control.value.trim().length === 0 && control.value.length !== 0 ? { 'whiteSpace': true } : null;
}

