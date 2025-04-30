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
                                <div v-for="(v, k) in paginatedServices" :key="k" class="col-lg-3 col-md-6 d-flex">
                                    <div class="card w-100">
                                        <div class="card-body" @click="datDichVu(v.id)">
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
                            <!-- Phân trang -->
                            <div class="d-flex justify-content-center mt-4">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination">
                                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                                <i class="fas fa-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li v-for="page in totalPages" :key="page" class="page-item"
                                            :class="{ active: page === currentPage }">
                                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page
                                            }}</a>
                                        </li>
                                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                                <i class="fas fa-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
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
                                    <!-- Thêm phần hiển thị dịch vụ đã đặt -->
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Dịch vụ đã đặt</h5>
                                        </div>
                                        <div class="card-body">
                                            <div v-if="ds_dich_vu_da_dat.length > 0">
                                                <div class="table-responsive">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                                <th>Tên dịch vụ</th>
                                                                <th>Số lượng</th>
                                                                <th>Giá tiền</th>
                                                                <th>Thao tác</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in paginatedBookedServices" :key="index" class="align-middle">
                                                                <td>
                                                                    <div class="d-flex align-items-center">
                                                                        <img :src="item.hinh_anh" alt="" class="me-2"
                                                                            style="width: 50px; height: 50px; object-fit: cover;">
                                                                        {{ item.ten_dich_vu }}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div class="d-flex align-items-center">
                                                                        <button class="btn btn-sm btn-outline-secondary me-2" 
                                                                            @click="giamDichVu(item.id_dich_vu)"
                                                                            :disabled="item.so_luong <= 1">
                                                                            <i class="fas fa-minus"></i>
                                                                        </button>
                                                                        <span>{{ item.so_luong }}</span>
                                                                        <button class="btn btn-sm btn-outline-secondary ms-2" 
                                                                            @click="tangDichVu(item.id_dich_vu)">
                                                                            <i class="fas fa-plus"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>{{ formatVND(item.gia_tien) }}</td>
                                                                <td>
                                                                    <button class="btn btn-sm btn-danger" 
                                                                        @click="huyDichVu(item.id_dich_vu)">
                                                                        <i class="fas fa-trash"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <!-- Phân trang cho dịch vụ đã đặt -->
                                                <div class="d-flex justify-content-center mt-3" v-if="totalPagesBookedServices > 1">
                                                    <nav aria-label="Booked services pagination">
                                                        <ul class="pagination pagination-sm">
                                                            <li class="page-item" :class="{ disabled: currentPageDichVuDaDat === 1 }">
                                                                <a class="page-link" href="#" @click.prevent="changePageBookedServices(currentPageDichVuDaDat - 1)">
                                                                    <i class="fas fa-chevron-left"></i>
                                                                </a>
                                                            </li>
                                                            <li v-for="page in totalPagesBookedServices" :key="page" 
                                                                class="page-item" 
                                                                :class="{ active: page === currentPageDichVuDaDat }">
                                                                <a class="page-link" href="#" @click.prevent="changePageBookedServices(page)">{{ page }}</a>
                                                            </li>
                                                            <li class="page-item" :class="{ disabled: currentPageDichVuDaDat === totalPagesBookedServices }">
                                                                <a class="page-link" href="#" @click.prevent="changePageBookedServices(currentPageDichVuDaDat + 1)">
                                                                    <i class="fas fa-chevron-right"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                            <div v-else class="text-center text-muted">
                                                Chưa có dịch vụ nào được đặt
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-lg-6">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>Phương thức thanh toán</h5>
                                        </div>
                                        <div class="card-body">
                                            <div class="form-check">
                                                <input class="form-check-input" type="radio"
                                                    v-model="phuong_thuc_thanh_toan" value="VNPAY" id="vnpay">
                                                <label class="form-check-label" for="vnpay">
                                                    <img src="https://stcd02206177151.cloud.edgevnpay.vn/assets/images/logo-icon/logo-primary.svg"
                                                        height="30" class="me-2">
                                                    Thanh toán VNPay
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
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
                                                                {{ formatVND(tong_tien + tong_tien_dich_vu) }}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
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
            ds_dich_vu_da_dat: [],
            id_suat: null,
            listGheChon: [],
            tong_tien: 0,
            tong_tien_dich_vu: 0,
            ten_phim: '',
            ten_suat: '',
            phuong_thuc_thanh_toan: '',
            ma_hoa_don: '',
            processing: false,
            currentPage: 1,
            currentPageDichVuDaDat: 1,
            itemsPerPage: 4,
            itemsPerPageDichVuDaDat: 2,
        }
    },

    computed: {
        // Tính toán các dịch vụ sẽ hiển thị trên trang hiện tại
        paginatedServices() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.ds_dich_vu.slice(start, end);
        },
        // Tính tổng số trang
        totalPages() {
            return Math.ceil(this.ds_dich_vu.length / this.itemsPerPage);
        },
        // Tính toán các dịch vụ đã đặt sẽ hiển thị trên trang hiện tại
        paginatedBookedServices() {
            const start = (this.currentPageDichVuDaDat - 1) * this.itemsPerPageDichVuDaDat;
            const end = start + this.itemsPerPageDichVuDaDat;
            return this.ds_dich_vu_da_dat.slice(start, end);
        },
        // Tính tổng số trang cho dịch vụ đã đặt
        totalPagesBookedServices() {
            return Math.ceil(this.ds_dich_vu_da_dat.length / this.itemsPerPageDichVuDaDat);
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
            this.layDichVuDaDat();
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
                        phuong_thuc_thanh_toan: this.phuong_thuc_thanh_toan,
                        tong_tien: this.tong_tien + this.tong_tien_dich_vu
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
        },

        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },

        async datDichVu(id_dich_vu) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/dat-dich-vu",
                    {
                        id_dich_vu: id_dich_vu,
                        id_suat: localStorage.getItem('pending_id_suat'),
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                if (res.data.status) {
                    toaster.success("Đặt dịch vụ thành công!");
                    // Cập nhật lại danh sách dịch vụ đã đặt
                    this.layDichVuDaDat();
                } else {
                    toaster.error(res.data.message || "Có lỗi xảy ra khi đặt dịch vụ!");
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi đặt dịch vụ!");
            }
        },

        async layDichVuDaDat() {
            try {
                const id_suat = localStorage.getItem('pending_id_suat');
                const res = await axios.get(`http://127.0.0.1:8000/api/danh-sach-dich-vu/${id_suat}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                    }
                });

                if (res.data.status) {
                    this.ds_dich_vu_da_dat = res.data.data;
                    this.tong_tien_dich_vu = res.data.tong_tien_dich_vu;
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi lấy danh sách dịch vụ đã đặt!");
            }
        },

        async huyDichVu(id_dich_vu) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/huy-dich-vu", 
                    {
                        id_dich_vu: id_dich_vu,
                        id_suat: localStorage.getItem('pending_id_suat')
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.layDichVuDaDat(); // Cập nhật lại danh sách
                } else {
                    toaster.error(res.data.message);
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi hủy dịch vụ!");
            }
        },

        async tangDichVu(id_dich_vu) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/tang-dich-vu", 
                    {
                        id_dich_vu: id_dich_vu,
                        id_suat: localStorage.getItem('pending_id_suat')
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.layDichVuDaDat(); // Cập nhật lại danh sách
                } else {
                    toaster.error(res.data.message);
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi tăng số lượng dịch vụ!");
            }
        },

        async giamDichVu(id_dich_vu) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/giam-dich-vu", 
                    {
                        id_dich_vu: id_dich_vu,
                        id_suat: localStorage.getItem('pending_id_suat')
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_khachhang")
                        }
                    }
                );

                if (res.data.status) {
                    toaster.success(res.data.message);
                    this.layDichVuDaDat(); // Cập nhật lại danh sách
                } else {
                    toaster.error(res.data.message);
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi giảm số lượng dịch vụ!");
            }
        },

        // Thêm phương thức chuyển trang cho dịch vụ đã đặt
        changePageBookedServices(page) {
            if (page >= 1 && page <= this.totalPagesBookedServices) {
                this.currentPageDichVuDaDat = page;
            }
        },
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

.pagination {
    margin-bottom: 0;
}

.page-link {
    color: #0d6efd;
    border: 1px solid #dee2e6;
    padding: 8px 12px;
}

.page-link:hover {
    background-color: #e9ecef;
    border-color: #dee2e6;
    color: #0a58ca;
}

.page-item.active .page-link {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}
</style>