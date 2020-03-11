import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(group: AbstractControl): { [key: string]: any } | null {
    const password: AbstractControl = group.get('newPassword');
    const confirmPassword: AbstractControl = group.get('confirmPassword');
    return password.value === confirmPassword.value ? null : { 'passwordMismatch': true };
}
