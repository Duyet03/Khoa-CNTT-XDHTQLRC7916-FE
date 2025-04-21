<template>
    <div>
        <div class="container mt-5">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">
                        <p>Chọn dịch vụ / Thanh toán</p>
                    </h4>
                    <!-- Phần dịch vụ -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h2>Dịch vụ <i class="fa-solid fa-glass-water"></i></h2>
                        </div>
                        <div class="card-body">
                            <div class="row product-grid">
                                <div v-for="(v, k) in ds_dich_vu" :key="k" class="col-lg-3 col-md-6 d-flex">
                                    <div class="card w-100">
                                        <div class="card-body">
                                            <img :src="v.hinh_anh" alt="" style="height: 240px;width: 100%;">
                                            <h5 class="text-center m-1">{{ v.ten_dich_vu }}</h5>
                                        </div>
                                        <div class="card-footer d-flex justify-content-between">
                                            <h5 class="mt-1">Giá: </h5>
                                            <button class="btn btn-primary">{{ formatVND(v.gia_tien) }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Phần thanh toán -->
                    <div class="card">
                        <div class="card-header">
                            <h2>Thanh toán <i class="fa-solid fa-credit-card"></i></h2>
                        </div>
                        <div class="card-body">
                            <!-- Thông tin thanh toán -->
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Thông tin vé</h5>
                                        </div>
                                        <div class="card-body">
                                            <table class="table">
                                                <tbody>
                                                    <tr>
                                                        <th>Ghế đã chọn:</th>
                                                        <td>
                                                            <span v-for="(v, k) in listGheChon" :key="k"
                                                                class="badge bg-success me-2">
                                                                {{ v.ten_ghe }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tổng tiền:</th>
                                                        <td>
                                                            <span class="text-danger fw-bold">
                                                                {{ formatVND(tong_tien) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Phương thức thanh toán</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-check mb-3">
                                                <input class="form-check-input" type="radio"
                                                    v-model="phuong_thuc_thanh_toan" value="TIEN_MAT" id="tienMat">
                                                <label class="form-check-label" for="tienMat">
                                                    <i class="fas fa-money-bill-wave me-2"></i>Tiền mặt
                                                </label>
                                            </div>
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio"
                                                    v-model="phuong_thuc_thanh_toan" value="VNPAY" id="vnpay">
                                                <label class="form-check-label" for="vnpay">
                                                    <img src="https://vnpay.vn/images/logo/vnpay-logo.png" height="30"
                                                        class="me-2">
                                                    Thanh toán VNPay
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer text-end">
                            <button class="btn btn-primary" @click="thanhToan"
                                :disabled="!phuong_thuc_thanh_toan || listGheChon.length === 0">
                                <i class="fas fa-check me-2"></i>Xác nhận thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hiển thị modal đang xử lý thanh toán -->
        <div class="modal fade" id="processingModal" tabindex="-1" aria-labelledby="processingModalLabel"
            aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-body text-center py-4">
                        <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                            <span class="visually-hidden">Đang xử lý...</span>
                        </div>
                        <h4 class="mb-3">Đang xử lý thanh toán</h4>
                        <p class="text-muted">Vui lòng không đóng trang này trong quá trình thanh toán.</p>
                        <p v-if="phuong_thuc_thanh_toan === 'VNPAY'" class="text-info">
                            Bạn sẽ được chuyển hướng đến cổng thanh toán VNPAY sau vài giây...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            ds_dich_vu: [],
            id_suat: null,
            listGheChon: [],
            tong_tien: 0,
            ten_phim: '',
            ten_suat: '',
            phuong_thuc_thanh_toan: '',
            ma_hoa_don: '',
            processing: false
        }
    },

    mounted() {
        // Kiểm tra xem có phải đang ở trang kết quả thanh toán không
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        const vnp_TxnRef = urlParams.get('vnp_TxnRef');

        if (vnp_ResponseCode && vnp_TxnRef) {
            // Nếu đang ở trang kết quả, xử lý kết quả thanh toán
            this.xuLyKetQuaThanhToan(urlParams);
        } else {
            // Nếu không phải trang kết quả, xử lý bình thường
            this.id_suat = this.$route.params.id_suat;
            this.layDichVu();
            this.layThongTinVe();
        }
    },

    methods: {
        layDichVu() {
            axios.get("http://127.0.0.1:8000/api/lay-dich-vu/data")
                .then((res) => {
                    this.ds_dich_vu = res.data.data;
                })
                .catch((error) => {
                    toaster.error("Có lỗi khi lấy dữ liệu dịch vụ!");
                });
        },

        layThongTinVe() {
            axios.get(`http://127.0.0.1:8000/api/lay-ve/data-1/${this.id_suat}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                }
            })
                .then(res => {
                    this.listGheChon = res.data.data;
                    this.tong_tien = res.data.tong_tien;
                    this.ten_phim = res.data.ten_phim;
                    this.ten_suat = res.data.ten_suat;
                })
                .catch(err => {
                    toaster.error("Có lỗi xảy ra khi lấy thông tin vé!");
                });
        },

        async thanhToan() {
            try {
                // Hiển thị modal đang xử lý
                this.processing = true;
                const processingModal = new bootstrap.Modal(document.getElementById('processingModal'));
                processingModal.show();

                const res = await axios.post("http://127.0.0.1:8000/api/thanh-toan",
                    {
                        id_suat: this.id_suat,
                        phuong_thuc_thanh_toan: this.phuong_thuc_thanh_toan
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                if (res.data.status) {
                    if (this.phuong_thuc_thanh_toan === 'VNPAY' && res.data.payment_url) {
                        this.ma_hoa_don = res.data.ma_hoa_don;
                        localStorage.setItem('pending_ma_hoa_don', this.ma_hoa_don);
                        localStorage.setItem('pending_id_suat', this.id_suat);
                        // Hiển thị hướng dẫn trước khi chuyển hướng
                        setTimeout(() => {
                            // Chuyển hướng đến trang thanh toán VNPay
                            window.location.href = res.data.payment_url;
                        }, 1500);
                    } else {
                        processingModal.hide();
                        this.processing = false;
                        toaster.success("Thanh toán thành công!");
                        // Chuyển đến trang chi tiết hóa đơn
                        this.$router.push(`/chi-tiet-hoa-don/${res.data.ma_hoa_don}`);
                    }
                } else {
                    processingModal.hide();
                    this.processing = false;
                    toaster.error(res.data.message || "Có lỗi xảy ra khi thanh toán!");
                }
            } catch (error) {
                const processingModal = document.getElementById('processingModal');
                if (processingModal) {
                    bootstrap.Modal.getInstance(processingModal).hide();
                }
                this.processing = false;
                toaster.error("Có lỗi xảy ra khi thanh toán!");
            }
        },

        // Thêm phương thức mới để xử lý kết quả thanh toán
        async xuLyKetQuaThanhToan(urlParams) {
            try {
                // Hiển thị modal xử lý
                const processingModal = new bootstrap.Modal(document.getElementById('processingModal'));
                processingModal.show();

                // Tạo object chứa tất cả tham số từ VNPay
                const vnpayParams = {};
                for (const [key, value] of urlParams.entries()) {
                    if (key.startsWith('vnp_')) {
                        vnpayParams[key] = value;
                    }
                }

                // Gọi API xác nhận thanh toán
                const response = await axios.post(
                    'http://127.0.0.1:8000/api/thanh-toan/ket-qua',
                    vnpayParams,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                // Đóng modal xử lý
                processingModal.hide();

                if (response.data.status) {
                    // Thanh toán thành công
                    toaster.success("Thanh toán thành công!");
                    // Chuyển đến trang chi tiết hóa đơn
                    this.$router.push(`/chi-tiet-hoa-don/${vnpayParams.vnp_TxnRef}`);
                } else {
                    // Thanh toán thất bại
                    toaster.error(response.data.message || "Thanh toán thất bại!");
                    // Lấy id_suat từ localStorage (đã lưu trước khi chuyển sang VNPay)
                    const id_suat = localStorage.getItem('pending_id_suat');
                    if (id_suat) {
                        this.$router.push(`/dat-ve/${id_suat}`);
                        localStorage.removeItem('pending_id_suat');
                    } else {
                        this.$router.push('/');
                    }
                }
            } catch (error) {
                const processingModal = document.getElementById('processingModal');
                if (processingModal) {
                    bootstrap.Modal.getInstance(processingModal).hide();
                }
                toaster.error("Có lỗi xảy ra khi xử lý thanh toán!");
                this.$router.push('/');
            }
        },


        formatVND(amount) {
            if (!amount) return '0đ';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        }
    }
}
</script>

<style scoped>
.card {
    border: none;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.card-header {
    background-color: #f8f9fa;
    border-bottom: none;
    padding: 15px 20px;
}

.form-check {
    padding: 15px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
}

.form-check:hover {
    background-color: #f8f9fa;
}

.form-check-input:checked+.form-check-label {
    color: #0d6efd;
    font-weight: bold;
}

.btn-primary {
    padding: 10px 20px;
    font-weight: 500;
}

.badge {
    font-size: 14px;
    padding: 8px 12px;
}
</style>