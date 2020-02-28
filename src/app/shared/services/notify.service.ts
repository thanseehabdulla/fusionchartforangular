import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppNotificationConfig } from '../../config/common.config'

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    constructor(
        private toastrService: ToastrService
    ) { }

    showSuccess(message: string, title: string = 'success') {
        this.toastrService.success(message, title, AppNotificationConfig);
    }

    showError(message: string, title: string = 'error') {
        this.toastrService.error(message, title, AppNotificationConfig);
    }

    showInfo(message: string, title: string = 'info') {
        this.toastrService.info(message, title, AppNotificationConfig);
    }

    showWarning(message: string, title: string = 'warning') {
        this.toastrService.warning(message, title, AppNotificationConfig);
    }
}
