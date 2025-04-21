import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default function(to, from, next) {
    axios
        .post('http://127.0.0.1:8000/api/kiem-tra-token-khach-hang', {}, {
            headers : {
                Authorization : 'Bearer ' +  localStorage.getItem("token_khachhang")
            }
        })
        .then((res) => {
            if(res.data.status) {
                next();
            } else {
                next('/login');
                toaster.error(res.data.message);
            }
        });
}