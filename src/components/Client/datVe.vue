<template>
    <div class="container mt-4">
        <div class="row">
            <div class="col-lg-12">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-gradient-dark text-white">
                        <h2 class="mb-0"><i class="fa-solid fa-couch me-2"></i>Chọn ghế xem phim</h2>
                    </div>
                    <div class="card-body p-4">
                        <!-- Màn hình -->
                        <div class="text-center mb-4">
                            <div class="bg-secondary text-white py-3 rounded screen-container">
                                <h3 class="mb-0">MÀN HÌNH</h3>
                            </div>
                            <div class="screen-shadow"></div>
                        </div>

                        <!-- Khu vực ghế ngồi -->
                        <div class="seat-area-container">
                            <!-- Tổ chức ghế theo hàng và cột -->
                            <div class="seat-map">
                                <!-- Động tạo các hàng ghế dựa trên dữ liệu -->
                                <div v-for="hangGhe in cacHangGhe" :key="hangGhe"
                                    class="d-flex justify-content-center mb-3">
                                    <div class="seat-row-label me-3 d-flex align-items-center">
                                        <span class="badge bg-light text-dark">Hàng {{ hangGhe }}</span>
                                    </div>
                                    <div class="d-flex">
                                        <template v-for="(v, k) in listVe" :key="k">
                                            <div v-if="v.id_suat == id_suat && v.ten_ghe.startsWith(hangGhe)"
                                                class="seat-item mx-1">
                                                <!-- Ghế đã chọn bởi user hiện tại -->
                                                <button v-if="v.tinh_trang == 1" v-on:click="huy(v.id_suat, v.id_ghe)"
                                                    class="btn btn-sm btn-success">
                                                    {{ v.ten_ghe }}
                                                </button>
                                                <!-- Ghế chưa đặt -->
                                                <button v-if="v.tinh_trang == 0" v-on:click="datVe(v.id_suat, v.id_ghe)"
                                                    :class="[
                                                        'btn btn-sm',
                                                        v.loai_ghe == 1 ? 'btn-warning' : 'btn-primary'
                                                    ]">
                                                    {{ v.ten_ghe }}
                                                </button>
                                                <!-- Ghế đã đặt bởi người khác -->
                                                <button v-if="v.tinh_trang == 2"
                                                    class="btn btn-sm btn-danger disabled opacity-50">
                                                    {{ v.ten_ghe }}
                                                </button>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Chú thích -->
                        <div class="d-flex justify-content-center mt-4 flex-wrap seat-legend">
                            <div class="d-flex align-items-center me-4 mb-2">
                                <div class="btn-sm btn-primary me-2" style="width: 30px; height: 30px;"></div>
                                <span>Ghế thường chưa đặt</span>
                            </div>
                            <div class="d-flex align-items-center me-4 mb-2">
                                <div class="btn-sm btn-warning me-2" style="width: 30px; height: 30px;"></div>
                                <span>Ghế VIP chưa đặt</span>
                            </div>
                            <div class="d-flex align-items-center me-4 mb-2">
                                <div class="btn-sm btn-success me-2" style="width: 30px; height: 30px;"></div>
                                <span>Ghế bạn đã chọn</span>
                            </div>
                            <div class="d-flex align-items-center mb-2">
                                <div class="btn-sm btn-danger disabled opacity-50 me-2"
                                    style="width: 30px; height: 30px;"></div>
                                <span>Ghế đã có người đặt</span>
                            </div>
                        </div>

                        <!-- Thông tin đặt vé -->
                        <div class="row mt-5">
                            <div class="col-lg-8 mx-auto">
                                <div class="card shadow-sm border-0">
                                    <div class="card-header bg-light">
                                        <h4 class="mb-0"><i class="fa-solid fa-ticket me-2"></i>Thông tin đặt vé</h4>
                                    </div>
                                    <div class="card-body">
                                        <table class="table table-bordered">
                                            <tbody>
                                                <tr>
                                                    <th class="w-25">Ghế đã chọn: </th>
                                                    <td class="text-center">
                                                        <template v-for="(v, k) in listGheChon" :key="k">
                                                            <span class="badge bg-success me-2"
                                                                style="font-size: 16px;">{{ v.ten_ghe }}</span>
                                                        </template>
                                                        <span v-if="listGheChon.length === 0"
                                                            class="text-muted fst-italic">
                                                            Vui lòng chọn ghế
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Tổng tiền</th>
                                                    <td class="text-center">
                                                        <span class="badge bg-danger p-2" style="font-size: 16px;">
                                                            {{ formatVND(tong_tien) }}
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="card-footer text-end">
                                        <router-link :to="'/thanh-toan/' + id_suat">
                                            <button v-on:click="taoHoaDon()" class="btn btn-danger"
                                                :disabled="listGheChon.length === 0">
                                                <i class="fa-solid fa-credit-card me-2"></i>Thanh toán
                                            </button>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
import { error } from "jquery";
const toaster = createToaster({ position: "top-right" });
export default {
    props: ['id_suat'],
    data() {
        return {
            ///lay-dich-vu/data
            ds_dich_vu: [],
            listGhe: [],
            listVe: [],
            id_suat: null,
            listGheChon: [],
            tong_tien: 0,
            id_hoa_don: ''
        }
    },
    computed: {
        // Tính toán các hàng ghế duy nhất từ danh sách vé
        cacHangGhe() {
            // Lọc các ghế của suất hiện tại
            const gheTheosuat = this.listVe.filter(v => v.id_suat == this.id_suat);
            // Trích xuất ký tự đầu tiên (tên hàng) từ tên ghế
            const hangGhe = gheTheosuat.map(v => v.ten_ghe.charAt(0));
            // Lọc các hàng duy nhất và sắp xếp theo thứ tự bảng chữ cái
            return [...new Set(hangGhe)].sort();
        }
    },
    mounted() {
        this.id_suat = this.$route.params.id_suat;
        console.log(this.id_suat);
        this.layDichVu();
        //this.layDuLieuGhe();
        this.layVe();
        this.layVeChon();
    },
    methods: {
        layDichVu() {
            axios
                .get("http://127.0.0.1:8000/api/lay-dich-vu/data")
                .then((res) => {
                    this.ds_dich_vu = res.data.data;
                    // console.log(this.danh_sach_dich_vu);
                });
        },
        layDuLieuGhe() {
            axios
                .get("http://127.0.0.1:8000/api/ghe-client/data/" + this.id_suat)
                .then((res) => {
                    this.listGhe = res.data.data;
                });
        },
        layVe() {
            axios
                .get("http://127.0.0.1:8000/api/lay-ve/data")
                .then((res) => {
                    this.listVe = res.data.data;
                    // console.log(this.danh_sach_dich_vu);
                });
        },
        layVeChon() {
            axios
                .get("http://127.0.0.1:8000/api/lay-ve/data-1/" + this.id_suat, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    this.listGheChon = res.data.data;
                    this.tong_tien = res.data.tong_tien;
                });
        },
        datVe(id_suat, id_ghe) {
            axios
                .post("http://127.0.0.1:8000/api/lay-ve/doi-trang-thai-dat", {
                    id_suat,
                    id_ghe,
                    id_khach_hang: localStorage.getItem('id_khach_hang')
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layVe();
                        this.layVeChon();
                    } else toaster.error(res.data.message);
                    this.layVe();
                });
        },
        huy(id_suat, id_ghe) {
            axios
                .post("http://127.0.0.1:8000/api/lay-ve/doi-trang-thai-huy", {
                    id_suat,
                    id_ghe,
                    id_khach_hang: localStorage.getItem('id_khach_hang')
                }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layVe();
                        this.layVeChon();
                    } else toaster.error(res.data.message);

                })
                .catch((error) => {
                    if (error.response) {
                        if (error.response.status === 403) {
                            toaster.error("Bạn không thể xoá vé");
                        } else if (error.response.status === 401) {
                            toaster.error("Bạn cần đăng nhập lại để xoá vé");
                        } else {
                            toaster.error("Đã có lỗi xảy ra vui lòng thử lại");
                        }
                    } else {
                        toaster.error("Đã có lỗi xảy ra vui lòng thử lại");
                    }
                })
        },
        formatVND(amount) {
            if (!amount) return '0đ';
            return amount.toLocaleString('vi-VN') + 'đ';
        },
    },
}
</script>

<style scoped>
.bg-gradient-dark {
    background: linear-gradient(to right, #1e3c72, #2a5298);
}

.screen-container {
    width: 80%;
    margin: 0 auto 40px;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.screen-shadow {
    height: 15px;
    background: linear-gradient(rgba(0, 0, 0, 0.2), transparent);
    margin-top: -10px;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    width: 80%;
    margin: 0 auto;
}

.seat-area-container {
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.seat-map {
    max-width: 800px;
    margin: 0 auto;
    overflow-x: auto;
    padding: 20px 0;
}

.seat-item {
    margin: 3px;
}

.seat-item button {
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.seat-item button:hover:not(.disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.seat-row-label {
    width: 70px;
    text-align: right;
}

.seat-legend {
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
}

/* Responsive */
@media (max-width: 768px) {
    .seat-item button {
        width: 35px;
        height: 35px;
        font-size: 0.7rem;
    }

    .seat-row-label {
        width: 50px;
    }

    .screen-container {
        width: 95%;
    }
}
</style>
