<template>
    <div class="container my-5">
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Đang tải...</span>
            </div>
            <p class="mt-2">Đang tải thông tin hóa đơn...</p>
        </div>

        <div v-else class="card border-0 shadow">
            <div class="card-header bg-primary text-white p-4">
                <div class="d-flex justify-content-between align-items-center">
                    <h2 class="mb-0"><i class="fas fa-receipt me-2"></i>Chi tiết hóa đơn</h2>
                </div>
            </div>

            <div class="card-body p-4">
                <div class="row mb-4">
                    <div class="col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-header bg-light">
                                <h5 class="mb-0"><i class="fas fa-info-circle me-2"></i>Thông tin hóa đơn</h5>
                            </div>
                            <div class="card-body">
                                <div class="mb-3">
                                    <span class="badge bg-primary p-2 fs-6 d-block mb-3">Mã hóa đơn: {{
                                        hoaDon.ma_hoa_don }}</span>
                                </div>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between px-0">
                                        <span class="fw-semibold text-muted">Trạng thái:</span>
                                        <span :class="trangThaiClass">{{ trangThaiText }}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between px-0">
                                        <span class="fw-semibold text-muted">Phương thức thanh toán:</span>
                                        <span>
                                            <span v-if="hoaDon.phuong_thuc_thanh_toan === 'VNPAY'">
                                                <img src="https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg" height="20"
                                                    class="me-1"> VNPay
                                            </span>
                                            <span v-else-if="hoaDon.phuong_thuc_thanh_toan === 'TIEN_MAT'">
                                                <i class="fas fa-money-bill-wave me-1 text-success"></i> Tiền mặt
                                            </span>
                                        </span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between px-0">
                                        <span class="fw-semibold text-muted">Ngày thanh toán:</span>
                                        <span>{{ formatDate(hoaDon.ngay_thanh_toan) }}</span>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between px-0">
                                        <span class="fw-semibold text-muted">Tổng tiền:</span>
                                        <span class="fw-bold text-danger">{{ formatVND(hoaDon.tong_tien) }}</span>
                                    </li>
                                    <li v-if="hoaDon.ghi_chu" class="list-group-item px-0">
                                        <span class="fw-semibold text-muted">Ghi chú:</span>
                                        <p class="mt-1 mb-0">{{ hoaDon.ghi_chu }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card border-0 shadow-sm h-100">
                            <div class="card-header bg-light">
                                <h5 class="mb-0"><i class="fas fa-film me-2"></i>Thông tin phim</h5>
                            </div>
                            <div class="card-body text-center">
                                <div v-if="suatChieu">
                                    <img :src="suatChieu.hinh_anh" class="img-fluid rounded mb-3"
                                        style="max-height: 180px; object-fit: cover;" alt="Poster phim">
                                    <h4 class="mb-1">{{ suatChieu.ten_phim }}</h4>
                                    <p class="text-muted mb-3">{{ suatChieu.theloai }}</p>

                                    <div class="d-flex justify-content-between bg-light p-2 rounded mb-2">
                                        <span class="fw-semibold"><i class="far fa-calendar-alt me-1"></i> Ngày
                                            chiếu:</span>
                                        <span>{{ formatShortDate(suatChieu.ngay_chieu) }}</span>
                                    </div>

                                    <div class="d-flex justify-content-between bg-light p-2 rounded mb-2">
                                        <span class="fw-semibold"><i class="far fa-clock me-1"></i> Giờ chiếu:</span>
                                        <span>{{ suatChieu.gio_bat_dau }}</span>
                                    </div>

                                    <div class="d-flex justify-content-between bg-light p-2 rounded">
                                        <span class="fw-semibold"><i class="fas fa-door-open me-1"></i> Phòng
                                            chiếu:</span>
                                        <span>{{ suatChieu.ten_phong }}</span>
                                    </div>
                                </div>
                                <div v-else class="text-center py-4">
                                    <i class="fas fa-film fa-3x text-muted mb-2"></i>
                                    <p>Không có thông tin suất chiếu</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Chi tiết vé -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-ticket-alt me-2"></i>Chi tiết ghế đã đặt</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên ghế</th>
                                        <th>Vị trí</th>
                                        <th>Loại ghế</th>
                                        <th class="text-end">Giá vé</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(ve, index) in chiTietVes" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <span class="badge bg-primary">{{ ve.ten_ghe }}</span>
                                        </td>
                                        <td>Hàng {{ ve.hang }} - Cột {{ ve.cot }}</td>
                                        <td>
                                            <span v-if="ve.loai_ghe === 1" class="badge bg-warning text-dark">
                                                <i class="fas fa-star me-1"></i>VIP
                                            </span>
                                            <span v-else class="badge bg-secondary">
                                                <i class="fas fa-couch me-1"></i>Thường
                                            </span>
                                        </td>
                                        <td class="text-end fw-semibold">{{ formatVND(ve.gia_tien) }}</td>
                                    </tr>
                                </tbody>                              
                            </table>
                        </div>
                    </div>
                </div>


                <!-- Chi tiết dịch vụ đã đặt -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-light">
                        <h5 class="mb-0"><i class="fas fa-ticket-alt me-2"></i>Chi tiết dịch vụ đã đặt</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="table-light">
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Hình ảnh</th>
                                        <th class="text-end">Số lượng</th>
                                        <th class="text-end">Giá</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(ve, index) in chi_tiet_ve_dich_vus" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td>
                                            <span class="badge bg-primary">{{ ve.ten_dich_vu }}</span>
                                        </td>
                                        <td>
                                            <img :src="ve.hinh_anh" class="img-fluid rounded mb-3"
                                                style="height: 50px;width: 50px; object-fit: cover;" alt="Poster phim">
                                        </td>                            
                                        <td class="text-end fw-semibold">{{ ve.so_luong }}</td>          
                                        <td class="text-end fw-semibold">{{ formatVND(ve.gia_tien) }}</td>
                                        
                                    </tr>
                                </tbody>
                                <tfoot class="table-light">
                                    <tr>
                                        <td colspan="4" class="text-end fw-bold">Tổng tiền:</td>
                                        <td class="text-end fw-bold text-danger fs-5">{{ formatVND(hoaDon.tong_tien) }}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Mã QR -->
                <div class="row mb-4">
                    <div class="col-md-6 mx-auto">
                        <div class="card border-0 shadow-sm text-center">
                            <div class="card-header bg-light">
                                <h5 class="mb-0"><i class="fas fa-qrcode me-2"></i>Mã QR vé</h5>
                            </div>
                            <div class="card-body pb-4">
                                <p class="mb-3">Vui lòng trình mã QR tại rạp khi xem phim</p>
                                <div class="d-flex justify-content-center">
                                    <template v-if="hoaDon.qr_code_svg">
                                        <div class="qr-code-container position-relative" 
                                             :class="{ 'checked-in': isAllTicketsCheckedIn }">
                                            <img :src="hoaDon.qr_code_svg" 
                                                 class="img-fluid" 
                                                 style="max-width: 300px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                                                 alt="QR Code" />
                                            <div v-if="isAllTicketsCheckedIn" class="checked-in-overlay">
                                                <span class="checked-in-text">
                                                    <i class="fas fa-check-circle me-2"></i>Đã check-in
                                                    <div class="checked-in-time" v-if="chiTietVes[0]?.thoi_gian_check_in">
                                                        {{ formatDate(chiTietVes[0].thoi_gian_check_in) }}
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </template>
                                    <div v-else class="alert alert-warning">
                                        <i class="fas fa-exclamation-triangle me-2"></i>
                                        QR code chưa được tạo hoặc hóa đơn chưa thanh toán
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
import axios from 'axios';
import { createToaster } from '@meforma/vue-toaster';

const toaster = createToaster({ position: 'top-right' });

export default {
    data() {
        return {
            hoaDon: {
                qr_code_svg: null,
                chi_tiet_qr: null
            },
            chiTietVes: [],
            chi_tiet_ve_dich_vus: [],
            suatChieu: null,
            loading: true
        }
    },
    computed: {
        trangThaiText() {
            const trangThai = this.hoaDon.trang_thai;
            if (trangThai === 1) return 'Đã thanh toán';
            if (trangThai === 0) return 'Chờ thanh toán';
            if (trangThai === 2) return 'Đã hủy';
            return 'Không xác định';
        },
        trangThaiClass() {
            const trangThai = this.hoaDon.trang_thai;
            if (trangThai === 1) return 'text-success fw-bold';
            if (trangThai === 0) return 'text-warning fw-bold';
            if (trangThai === 2) return 'text-danger fw-bold';
            return 'text-muted';
        },
        isAllTicketsCheckedIn() {
            return this.chiTietVes.length > 0 && this.chiTietVes.every(ve => ve.checked_in === 1);
        }
    },
    mounted() {
        this.layThongTinHoaDon();
    },
    methods: {
        async layThongTinHoaDon() {
            try {
                this.loading = true;
                const maHoaDon = this.$route.params.ma_hoa_don;
                // const token = localStorage.getItem("token_admin");

                // if (!token) {
                //     toaster.error("Vui lòng đăng nhập để xem chi tiết hóa đơn");
                //     this.$router.push('/admin/dang-nhap');
                //     return;
                // }

                const res = await axios.get(
                    `http://127.0.0.1:8000/api/thanh-toan/chi-tiet-hoa-don/${maHoaDon}`,
                    {
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token_admin"),
                            'Accept': 'application/json'
                        }
                    }
                );

                if (res.data.status) {
                    const { hoa_don, chi_tiet_ves, suat_chieu, chi_tiet_ve_dich_vus } = res.data.data;
                    this.hoaDon = {
                        ...hoa_don,
                        qr_code_svg: res.data.data.qr_code || null,
                        chi_tiet_qr: res.data.data.chi_tiet_qr || null
                    };
                    this.chiTietVes = chi_tiet_ves || [];
                    this.suatChieu = suat_chieu || null;
                    this.chi_tiet_ve_dich_vus = chi_tiet_ve_dich_vus || [];
                } else {
                    toaster.error(res.data.message);
                    this.$router.push('/');
                }
            } catch (error) {
                console.error('Error:', error);
                if (error.response && error.response.status === 401) {
                    toaster.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
                    this.$router.push('/dang-nhap');
                } else {
                    toaster.error("Có lỗi xảy ra khi tải thông tin hóa đơn");
                    this.$router.push('/');
                }
            } finally {
                this.loading = false;
            }
        },
        formatVND(amount) {
            if (!amount) return '0₫';
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(amount);
        },
        formatDate(dateString) {
            if (!dateString) return 'Chưa thanh toán';
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
        formatShortDate(dateString) {
            if (!dateString) return '';
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },
    }
}
</script>

<style scoped>
.card {
    border-radius: 10px;
    overflow: hidden;
}

.badge {
    font-weight: 500;
    border-radius: 5px;
}

/* Styling cho QR code đã check-in */
.qr-code-container {
    position: relative;
    display: inline-block;
}

.qr-code-container.checked-in img {
    opacity: 0.2;
    filter: grayscale(100%) blur(1px);
    transition: all 0.3s ease;
}

.checked-in-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.qr-code-container.checked-in:hover .checked-in-overlay {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
}

.checked-in-text {
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
}

.checked-in-time {
    font-size: 0.8em;
    margin-top: 5px;
    opacity: 0.8;
}

/* Định dạng in ấn */
@media print {
    body * {
        visibility: hidden;
    }

    .card,
    .card * {
        visibility: visible;
    }

    .card {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .btn {
        display: none !important;
    }
}
</style>