import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export function kiemTraTrangThaiGheAPI(id_suat, id_ghe, id_khach_hang, onDone) {
    axios
        .post("http://127.0.0.1:8000/api/lay-ve/kiem-tra-trang-thai", {
            id_suat,
            id_ghe,
            id_khach_hang
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token_khachhang")
            }
        })
        .then((res) => {
            if (res.data.status) {
                toaster.error(res.data.message);
                if (typeof onDone === "function") {
                    onDone(); // Gọi callback để cập nhật dữ liệu lại trong component
                }
                setTimeout(() => {
                    window.location.reload();
                }, 10000); 
            }
        })
        .catch((error) => {
            console.error("Lỗi khi kiểm tra trạng thái ghế:", error);
        });
}
