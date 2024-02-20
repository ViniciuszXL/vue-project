import VueSweetalert2 from "vue-sweetalert2";
import { SweetAlertOptions } from 'sweetalert2';

// CSS
import 'sweetalert2/dist/sweetalert2.min.css'

export default {
    VueSweetalert2,

    notification(e: any, options: SweetAlertOptions) {
        options.toast = true
        options.showConfirmButton = false
        options.timer = !options.timer ? 3000 : options.timer
        options.position = "top-end"
        options.timerProgressBar = true
        options.didOpen = (toast) => {
            toast.onmouseenter = e.$swal.stopTimer;
            toast.onmouseleave = e.$swal.resumeTimer;
        }
        
        return e.$swal(options)
    },

    confirmation(e: any, options: SweetAlertOptions) {
        options.icon = options.icon || 'warning'
        options.showCancelButton = true
        options.confirmButtonColor = '#3085d6';
        options.cancelButtonColor = '#d33';
        options.confirmButtonText = options.confirmButtonText || 'Sim'
        options.cancelButtonText = options.cancelButtonText || "Não"
    
        return e.$swal(options)
    }
};