import { SPINNER } from 'ngx-ui-loader';

// app loader: ngx-ui-loader configuration
export const AppLoaderConfig = {
    fgsColor: '#e63719',
    fgsType: SPINNER.doubleBounce,
    fgsOpacity: 0.99,
    pbThickness: 5,
    pbColor: '#e63719',
    minTime: 300,
};

// app notification: ngx-toastr configuration
export const AppNotificationConfig = {
    easeTime: '200',
    progressBar: true,
    tapToDismiss: true,
};