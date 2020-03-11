import { ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
    static confirmPassword(nameRe: RegExp): ValidatorFn {
        return (group: AbstractControl): { [key: string]: any } | null => {
            const password: AbstractControl = group.get('newPassword');
            const confirmPassword: AbstractControl = group.get('confirmPassword');
            return password.value === confirmPassword.value ? { 'confirmPassword': true } : null;
        };
    }
}