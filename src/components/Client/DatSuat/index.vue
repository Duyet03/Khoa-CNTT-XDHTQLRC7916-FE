<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-3 mb-md-0">
                                <h4 class="card-title text-primary mb-3 mt-3">Chọn ngày xem phim</h4>
                            </div>
                            <div class="d-flex align-items-center">
                                <input v-model="ngayTuyChon" class="form-control" type="date" :min="layNgayHienTai()" />
                                <button @click="layDuLieuSuatChieuTheoNgay()" class="btn btn-primary ms-2 text-nowrap">
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
                                    <router-link :to="isSuatDaQua(suat) ? '#' : '/dat-ve/' + suat.id" :class="[
                                        'text-decoration-none',
                                        { 'disabled-link': isSuatDaQua(suat) },
                                    ]" @click.prevent="
                                        isSuatDaQua(suat) && $event.preventDefault()
                                        ">
                                        <div :class="[
                                            'card h-100 shadow-sm border-0 hover-card',
                                            { 'disabled-card': isSuatDaQua(suat) },
                                        ]" :title="isSuatDaQua(suat)
                                            ? 'Không thể chọn suất chiếu đã chiếu'
                                            : ''
                                            ">
                                            <div class="card-header bg-light text-center py-2">
                                                {{ suat.gio_bat_dau.substring(0, 5) }}
                                            </div>
                                            <div class="card-body text-center">
                                                <div class="mb-2 text-primary fw-bold">
                                                    {{ suat.phong.ten_phong }}
                                                </div>
                                                <div class="text-muted small">
                                                    {{ formatCurrency(suat.gia_ve) }}
                                                </div>
                                            </div>
                                            <div class="card-footer text-center bg-white py-2">
                                                <span :class="[
                                                    'badge',
                                                    suat.so_ghe_trong > 10
                                                        ? 'bg-success'
                                                        : 'bg-warning',
                                                ]">
                                                    {{ suat.so_ghe_trong }}/{{ suat.tong_so_ghe }} ghế
                                                    trống
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
                    <p class="mb-0">
                        Vui lòng chọn ngày khác hoặc kiểm tra lại lịch chiếu.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            phim_id: null,
            ds_suat: [],
            suatTheoFormat: {},
            danhSachNgayChieu: [],
            ngayDaChon: "",
            ngayTuyChon: "",
            daTimKiem: false,
        };
    },
    mounted() {
        this.phim_id = this.$route.params.phim_id;
        this.ngayTuyChon = this.layNgayHienTai();
        this.layDuLieuSuatChieu();
    },
    methods: {
        layNgayHienTai() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0");
            const day = String(today.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        },

        formatDate(dateString) {
            if (!dateString) return "";
            const date = new Date(dateString);
            const options = { weekday: "long", day: "numeric", month: "long" };
            return date.toLocaleDateString("vi-VN", options);
        },

        formatCurrency(value) {
            return new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(value);
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
                .get("http://127.0.0.1:8000/api/lay-suat-chieu/data/" + this.phim_id)
                .then((res) => {
                    if (
                        res.data &&
                        res.data.ngay_chieu &&
                        res.data.ngay_chieu.length > 0
                    ) {
                        this.danhSachNgayChieu = res.data.ngay_chieu;
                        this.ds_suat = res.data.suat;

                        // Tự động chọn ngày đầu tiên
                        if (this.danhSachNgayChieu.length > 0) {
                            this.ngayDaChon = this.danhSachNgayChieu[0];
                            this.ngayTuyChon = this.danhSachNgayChieu[0];
                            this.layDuLieuSuatChieuTheoNgay();
                        }
                    } else {
                        toaster.info("Không tìm thấy lịch chiếu cho phim này");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu suất chiếu:", error);
                    toaster.error("Đã xảy ra lỗi khi tải lịch chiếu");
                });
        },

        layDuLieuSuatChieuTheoNgay() {
            if (!this.ngayTuyChon) {
                toaster.error("Vui lòng chọn ngày");
                return;
            }

            this.daTimKiem = true;

            axios
                .post(
                    "http://127.0.0.1:8000/api/lay-suat-chieu/open-data/" + this.phim_id,
                    {
                        ngay: this.ngayTuyChon,
                    }
                )
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


                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu suất chiếu theo ngày:", error);
                    toaster.error("Đã xảy ra lỗi khi tải lịch chiếu");
                });
        },

        nhomSuatTheoDinhDang(danhSachSuat) {
            const result = {};
            danhSachSuat.forEach((suat) => {
                if (!result[suat.dinh_dang]) {
                    result[suat.dinh_dang] = [];
                }
                result[suat.dinh_dang].push(suat);
            });
            return result;
        },

        isSuatDaQua(suat) {
            const now = new Date();
            const showingTime = new Date(this.ngayTuyChon + " " + suat.gio_bat_dau);
            const oneHourAfterShowing = new Date(
                showingTime.getTime() + 30 * 60 * 1000
            );
            return now > oneHourAfterShowing;
        },
    },
};
</script>

<style scoped>
.card {
    border: none;
    box-shadow: 0 0 15px rgba(220, 53, 69, 0.1);
    border-radius: 15px;
    transition: all 0.3s ease;
}

.card-title {
    color: #dc3545 !important;
}

.text-primary {
    color: #dc3545 !important;
}

.bg-primary {
    background-color: #dc3545 !important;
}

.btn-primary {
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #c82333 !important;
    border-color: #bd2130 !important;
    transform: translateY(-2px);
}

.hover-card {
    transition: all 0.3s ease;
}

.hover-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(220, 53, 69, 0.2);
}

.card-header {
    background-color: rgba(220, 53, 69, 0.1) !important;
    border-bottom: none;
    color: #dc3545;
    font-weight: bold;
}

.disabled-card {
    opacity: 0.6;
    cursor: not-allowed;
}

.disabled-link {
    pointer-events: none;
}

.badge.bg-success {
    background-color: #28a745 !important;
}

.badge.bg-warning {
    background-color: #ffc107 !important;
    color: #000;
}

.form-control:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

/* Alert Styling */
.alert-warning {
    background-color: rgba(220, 53, 69, 0.1);
    border: none;
    color: #dc3545;
}

.alert-warning i {
    color: #dc3545;
}

/* Responsive Design */
@media (max-width: 768px) {
    .card {
        margin-bottom: 1rem;
    }
    
    .btn-primary {
        width: 100%;
        margin-top: 1rem;
    }
    
    .d-flex {
        flex-direction: column;
    }
    
    .ms-2 {
        margin-left: 0 !important;
    }
}

/* Movie Format Badge */
.badge {
    padding: 0.5em 1em;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* Showtime Card */
.card-body {
    padding: 1.25rem;
}

.fw-bold {
    color: #dc3545;
}

.text-muted {
    color: #6c757d !important;
}

/* Date Input */
input[type="date"] {
    border-color: rgba(220, 53, 69, 0.2);
    border-radius: 8px;
}

input[type="date"]:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}
</style>
