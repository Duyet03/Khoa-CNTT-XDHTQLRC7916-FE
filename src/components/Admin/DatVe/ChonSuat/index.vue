<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-3 mb-md-0">
                                <h4 class="card-title text-primary mb-3">Chọn ngày xem phim <span class="text-warning"><b>{{ phim_chi_tiet.ten_phim }}</b></span></h4>
                                <div class="d-flex flex-wrap" v-if="danhSachNgayChieu.length > 0">
                                    <button v-for="(ngay, index) in danhSachNgayChieu" :key="index"
                                        @click="chonNgay(ngay)"
                                        :class="['btn me-2 mb-2', ngayDaChon === ngay ? 'btn-primary' : 'btn-outline-primary']">
                                        {{ formatDate(ngay) }}
                                    </button>
                                </div>
                                <div v-else class="alert alert-info">
                                    Không có suất chiếu sắp tới cho phim này
                                </div>
                            </div>
                            <div class="d-flex align-items-center">
                                <input v-model="ngayTuyChon" class="form-control" type="date" :min="layNgayHienTai()">
                                <button @click="layDuLieuSuatChieuTheoNgay()" class="btn btn-primary ms-2">
                                    <i class="fa-solid fa-magnifying-glass me-1"></i>Tìm suất
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hiển thị suất chiếu theo định dạng -->
            <div class="col-lg-12 mt-4" v-if="Object.keys(suatTheoFormat).length > 0">
                <div class="card">
                    <div class="card-body">
                        <div v-for="(suatList, format) in suatTheoFormat" :key="format" class="mb-4">
                            <h5 class="text-primary mb-3">
                                <span class="badge bg-primary me-2">{{ format }}</span>
                                <span v-if="format === '2D'" class="text-muted">Định dạng thường</span>
                                <span v-else-if="format === '3D'" class="text-muted">Định dạng không gian 3 chiều</span>
                                <span v-else-if="format === 'IMAX'" class="text-muted">Chất lượng hình ảnh và âm thanh
                                    đỉnh cao</span>
                            </h5>
                            <div class="row">
                                <div v-for="suat in suatList" :key="suat.id"
                                    class="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                                    <router-link :to="isSuatDaQua(suat) ? '#' : '/admin/dat-ve/' + suat.id"
                                        :class="['text-decoration-none', { 'disabled-link': isSuatDaQua(suat) }]"
                                        @click.prevent="isSuatDaQua(suat) && $event.preventDefault()">
                                        <div :class="['card h-100 shadow-sm border-0 hover-card', { 'disabled-card': isSuatDaQua(suat) }]"
                                            :title="isSuatDaQua(suat) ? 'Không thể chọn suất chiếu đã chiếu' : ''">
                                            <div class="card-header bg-light text-center py-2">
                                                {{ suat.gio_bat_dau.substring(0, 5) }}
                                            </div>
                                            <div class="card-body text-center">
                                                <div class="mb-2 text-primary fw-bold">Phòng: {{ suat.phong.ten_phong }}
                                                </div>
                                                <div class="text-muted small">
                                                    {{ formatCurrency(suat.gia_ve) }}
                                                </div>
                                            </div>
                                            <div class="card-footer text-center bg-white py-2">
                                                <span
                                                    :class="['badge', suat.so_ghe_trong > 10 ? 'bg-success' : 'bg-warning']">
                                                    {{ suat.so_ghe_trong }}/{{ suat.tong_so_ghe }} ghế trống
                                                </span>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Thông báo khi không có suất chiếu -->
            <div class="col-lg-12 mt-4" v-else-if="daTimKiem">
                <div class="alert alert-warning text-center py-4">
                    <i class="fa-solid fa-calendar-xmark fa-2x mb-3"></i>
                    <h5>Không có suất chiếu nào cho ngày đã chọn</h5>
                    <p class="mb-0">Vui lòng chọn ngày khác hoặc kiểm tra lại lịch chiếu.</p>
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
            phim_id: null,
            ds_suat: [],
            suatTheoFormat: {},
            danhSachNgayChieu: [],
            ngayDaChon: '',
            ngayTuyChon: '',
            daTimKiem: false,
            phim_chi_tiet: {}
        }
    },
    mounted() {
        this.phim_id = this.$route.params.phim_id;
        this.ngayTuyChon = this.layNgayHienTai();
        this.layDuLieuSuatChieu();
        this.loadDataPhimChiTiet()
    },
    methods: {
        loadDataPhimChiTiet() {
            axios
                .get("http://127.0.0.1:8000/api/phim-chi-tiet/" + this.phim_id)
                .then((res) => {
                    this.phim_chi_tiet = res.data.data;
                });
        },
        layNgayHienTai() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },

        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            const options = { weekday: 'long', day: 'numeric', month: 'long' };
            return date.toLocaleDateString('vi-VN', options);
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },

        tongSoGhe(suat) {
            // Tính tổng số ghế dựa trên số ghế trống + số ghế đã đặt
            // Nếu không có thông tin số ghế đã đặt, hiển thị ước tính
            return suat.so_ghe_trong + (suat.so_ghe_da_dat || 0);
        },

        chonNgay(ngay) {
            this.ngayDaChon = ngay;
            this.ngayTuyChon = ngay;
            this.layDuLieuSuatChieuTheoNgay();
        },

        layDuLieuSuatChieu() {
            axios
                .get('http://127.0.0.1:8000/api/lay-suat-chieu/data/' + this.phim_id)
                .then((res) => {
                    if (res.data && res.data.ngay_chieu && res.data.ngay_chieu.length > 0) {
                        this.danhSachNgayChieu = res.data.ngay_chieu;
                        this.ds_suat = res.data.suat;

                        // Tự động chọn ngày đầu tiên
                        if (this.danhSachNgayChieu.length > 0) {
                            this.ngayDaChon = this.danhSachNgayChieu[0];
                            this.ngayTuyChon = this.danhSachNgayChieu[0];
                            this.layDuLieuSuatChieuTheoNgay();
                        }
                    } else {
                        toaster.info('Không tìm thấy lịch chiếu cho phim này');
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu suất chiếu:', error);
                    toaster.error('Đã xảy ra lỗi khi tải lịch chiếu');
                });
        },

        layDuLieuSuatChieuTheoNgay() {
            if (!this.ngayTuyChon) {
                toaster.error('Vui lòng chọn ngày');
                return;
            }

            this.daTimKiem = true;

            axios
                .post('http://127.0.0.1:8000/api/lay-suat-chieu/open-data/' + this.phim_id, {
                    ngay: this.ngayTuyChon
                })
                .then((res) => {
                    if (res.data) {
                        this.ds_suat = res.data.suat || [];

                        // Nhóm suất chiếu theo định dạng
                        if (res.data.suat_theo_dinh_dang) {
                            this.suatTheoFormat = res.data.suat_theo_dinh_dang;
                        } else {
                            // Nếu backend không trả về suất theo định dạng, ta tự nhóm
                            this.suatTheoFormat = this.nhomSuatTheoDinhDang(this.ds_suat);
                        }

                        if (this.ds_suat.length === 0) {
                            toaster.info('Không có suất chiếu nào cho ngày đã chọn');
                        }
                    }
                })
                .catch(error => {
                    console.error('Lỗi khi lấy dữ liệu suất chiếu theo ngày:', error);
                    toaster.error('Đã xảy ra lỗi khi tải lịch chiếu');
                });
        },

        nhomSuatTheoDinhDang(danhSachSuat) {
            const result = {};
            danhSachSuat.forEach(suat => {
                if (!result[suat.dinh_dang]) {
                    result[suat.dinh_dang] = [];
                }
                result[suat.dinh_dang].push(suat);
            });
            return result;
        },

        isSuatDaQua(suat) {
            const now = new Date();
            const showingTime = new Date(this.ngayTuyChon + ' ' + suat.gio_bat_dau);
            const oneHourAfterShowing = new Date(showingTime.getTime() + 30 * 60 * 1000);
            return now > oneHourAfterShowing;
        }
    }
}
</script>

<style scoped>
.hover-card {
    transition: all 0.3s;
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
}

.disabled-card {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    position: relative;
}

.disabled-card:hover {
    transform: none !important;
    box-shadow: none !important;
}

.disabled-card::before {
    content: attr(title);
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    z-index: 10;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.disabled-card::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.disabled-card:hover::before,
.disabled-card:hover::after {
    opacity: 1;
    visibility: visible;
}

.disabled-link {
    pointer-events: auto !important;
    cursor: not-allowed;
}
</style>