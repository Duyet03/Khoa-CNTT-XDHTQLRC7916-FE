<template>
    <div>
        <!-- Video Trailer -->
        <div style="margin: 10px;">
            <iframe class="d-block w-100" style="height: 650px;" v-if="phim_chi_tiet.trailer_ytb"
                :src="phim_chi_tiet.trailer_ytb + '&autoplay=1&mute=1'" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

        <!-- Main Content -->
        <div class="container">
            <div class="row g-0 movie-details mb-3 mt-3">
                <!-- Poster -->
                <div class="col-md-3">
                    <img :src="phim_chi_tiet.hinh_anh" class="img-fluid rounded-start movie-poster" alt="..."
                        style="width: 100%; height: auto; max-height: 400px; object-fit: cover;">
                </div>

                <!-- Movie Info -->
                <div class="col-md-9">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-2 movie-font">
                            <b>{{ phim_chi_tiet.ten_phim }}</b>
                            <span class="badge bg-warning text-dark ms-2">T18</span>
                        </h4>
                        <p class="card-text mb-1 movie-font">
                            <i class="bi bi-clock me-1"></i> {{ phim_chi_tiet.thoi_gian || '122' }} Phút
                            <i class="bi bi-calendar-event ms-3 me-1"></i> {{ phim_chi_tiet.ngay_chieu }}
                        </p>
                        <p class="card-text mb-1 movie-font">
                            <i class="bi bi-star-fill text-warning me-1"></i>
                            <b>{{ phim_chi_tiet.danh_gia || '8.3' }}</b> (261 votes)
                        </p>
                        <p class="card-text mb-1 movie-font">
                            <strong>Quốc gia:</strong> {{ phim_chi_tiet.quoc_gia || 'Việt Nam' }}
                        </p>
                        <p class="card-text mb-1 movie-font">
                            <strong>Nhà sản xuất:</strong> {{ phim_chi_tiet.nha_san_xuat || 'Đang cập nhật' }}
                        </p>
                        <p class="card-text mb-1 movie-font">
                            <strong>Thể loại:</strong> {{ phim_chi_tiet.ten_the_loai || 'Kinh Dị' }}
                        </p>
                        <p class="card-text mb-1 movie-font">
                            <strong>Đạo diễn:</strong> {{ phim_chi_tiet.dao_dien || 'Pom Nguyên' }}
                        </p>
                        <p class="card-text mb-3 movie-font">
                            <strong>Diễn viên:</strong> {{ phim_chi_tiet.dien_vien || 'Quang Tuấn, Khả Như' }}
                        </p>
                        <div class="text-end">
                            <router-link :to="'/dat-suat/' + phim_id">
                                <button class="btn btn-danger">Đặt vé ngay</button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <!-- Review Section -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="ms-3 mt-2">
                                <p>ĐÁNH GIÁ</p>
                            </h5>
                        </div>
                        <div class="card-body">
                            <textarea v-model="noi_dung" class="form-control"
                                placeholder="Bạn có thể đánh giá sau khi đăng nhập..." name="" id=""
                                rows="5"></textarea>
                        </div>
                        <div class="card-footer text-end">
                            <button @click="themDanhGia()" class="btn btn-danger">Đánh giá ngay</button>
                        </div>
                    </div>

                    <!-- Review History -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mt-2">
                                <p>LỊCH SỬ ĐÁNH GIÁ</p>
                            </h5>
                        </div>
                        <div class="card-body">
                            <template v-for="(value, index) in danh_sach_danh_gia" :key="index">
                                <p class="card-title"><b>{{ value.ten_khach_hang }}</b> : {{ value.noi_dung }}</p>
                            </template>
                        </div>
                        <div class="card-footer text-center">
                            <a class="mt-2" href="">
                                <h5>
                                    <p>Xem thêm đánh giá</p>
                                </h5>
                            </a>
                        </div>
                    </div>

                    <!-- Related Movies Carousel (Unchanged) -->
                    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from 'axios';

export default {
    props: ['phim_id', 'slug_phim'],
    data() {
        return {
            list_phim: [
                {
                    img: "",
                    name: "",
                    ngay: "",
                    tinh_trang: "",
                    slide1: "",
                    slide2: "",
                    slide3: "",
                    slide4: "",
                    xep_hang: "",
                    thoi_gian: "",
                    loai: "",
                    tom_tat: "",
                    danh_gia1: "",
                    danh_gia2: "",
                    danh_gia3: "",
                }],
            phim_chi_tiet: {},
            phim_id: null,
            danh_sach_danh_gia: [],
            noi_dung: ''
        }
    },
    mounted() {
        this.phim_id = this.$route.params.phim_id;
        console.log(this.phim_id);
        this.loadDataPhimChiTiet();
        this.layDanhGia();
    },
    methods: {
        loadDataPhimChiTiet() {
            axios
                .get('http://127.0.0.1:8000/api/phim-chi-tiet/' + this.phim_id)
                .then((res) => {
                    this.phim_chi_tiet = res.data.data
                })
        },
        layDanhGia() {
            axios
                .get("http://127.0.0.1:8000/api/lay-danh-gia/data/" + this.phim_id)
                .then((res) => {
                    this.danh_sach_danh_gia = res.data.data;
                    console.log(this.danh_sach_danh_gia);
                });
        },
        themDanhGia() {
            if (!this.noi_dung.trim()) {
                toaster.warning("Nội dung đánh giá không được để trống.");
                return;
            }

            const payload = {
                noi_dung: this.noi_dung,
                id_khach_hang: localStorage.getItem("id_khach_hang"),
                phim_id: this.phim_id,
            };

            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia", payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDanhGia();
                        this.noi_dung = "";
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    toaster.error("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        },
    },
}
</script>

<style scoped>
/* Movie Details */
.movie-details {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.movie-poster {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-body {
    padding: 1.5rem;
}

.movie-font {
    font-family: 'Poppins', sans-serif;
}

.card-title {
    font-size: 1.8rem;
}

.card-title .badge {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
}

.card-text {
    font-size: 1rem;
    color: #333;
}

.card-text strong {
    color: #666;
}

.text-warning {
    color: #ff6200 !important;
}

.btn-danger {
    background-color: #dc3545;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-radius: 5px;
}

.btn-danger:hover {
    background-color: #c82333;
}

/* Bootstrap Icons */
.bi {
    font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .movie-details {
        margin: 0 10px;
    }

    .movie-poster {
        max-height: 300px;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-title .badge {
        font-size: 0.9rem;
    }

    .card-text {
        font-size: 0.9rem;
    }

    .btn-danger {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }

    .col-md-3,
    .col-md-9 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

@media (max-width: 576px) {
    iframe {
        height: 200px;
    }

    .movie-poster {
        max-height: 250px;
    }

    .card-title {
        font-size: 1.2rem;
    }

    .card-title .badge {
        font-size: 0.8rem;
    }

    .card-text {
        font-size: 0.85rem;
    }

    .btn-danger {
        padding: 0.3rem 0.6rem;
        font-size: 0.85rem;
    }
}

/* Section Title */
.section-title {
    position: relative;
    padding-bottom: 10px;
    font-weight: 600;
    color: #333;
}

.section-title:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #e50914;
}
</style>