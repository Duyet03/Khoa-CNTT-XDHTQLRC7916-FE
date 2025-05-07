<template>
    <div class="event-detail">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="card border-0 shadow-sm">
                        <img :src="su_kien.hinh_anh" class="card-img-top event-image" :alt="su_kien.ten_su_kien">
                        <div class="card-body p-4">
                            <h1 class="event-title mb-3">{{ su_kien.ten_su_kien }}</h1>
                            <div class="event-meta mb-4">
                                <span class="me-3">
                                    <i class="far fa-calendar-alt me-1"></i>
                                    Bắt đầu: {{ formatDate(su_kien.ngay_bat_dau) }}
                                </span>
                                <span class="me-3">
                                    <i class="far fa-calendar-check me-1"></i>
                                    Kết thúc: {{ formatDate(su_kien.ngay_ket_thuc) }}
                                </span>
                            </div>
                            <div class="event-description mb-4">
                                <div class="description-content">{{ su_kien.mo_ta }}</div>
                            </div>
                            <div class="event-content" v-html="su_kien.noi_dung"></div>
                        </div>
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
            su_kien: {},
        }
    },
    mounted() {
        this.layChiTietSuKien();
    },
    methods: {
        layChiTietSuKien() {
            const id = this.$route.params.id;
            axios
                .get(`http://127.0.0.1:8000/api/su-kien/client/chi-tiet/${id}`)
                .then((res) => {
                    this.su_kien = res.data.data;
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải dữ liệu sự kiện");
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }
    }
}
</script>
<style>
    .event-detail {
        background-color: #f8f9fa;
        min-height: 100vh;
        padding: 40px 0;
    }

    .card {
        transition: all 0.3s ease;
        border-radius: 15px;
        overflow: hidden;
    }

    .card:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
    }

    .event-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }

    .event-title {
        font-size: 2.8rem;
        font-weight: 700;
        color: #2c3e50;
        line-height: 1.3;
        margin-bottom: 1.5rem;
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }

    .event-meta {
        color: #666;
        font-size: 1rem;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        margin-bottom: 2rem;
    }

    .event-meta i {
        color: #ff4d4d;
    }

    .event-description {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid #eee;
    }

    .description-content {
        font-size: 1.1rem;
        line-height: 1.6;
        color: #444;
    }

    .event-content {
        font-size: 1.2rem;
        line-height: 1.9;
        color: #444;
        font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    }

    .event-content p {
        margin-bottom: 1.5rem;
    }

    /* Responsive adjustments */
    @media (max-width: 1200px) {
        .event-title {
            font-size: 2.4rem;
        }
        
        .event-image {
            height: 450px;
        }
    }

    @media (max-width: 992px) {
        .event-title {
            font-size: 2.2rem;
        }
        
        .event-image {
            height: 400px;
        }
    }

    @media (max-width: 768px) {
        .event-title {
            font-size: 1.8rem;
        }
        
        .event-image {
            height: 350px;
        }
        
        .event-content {
            font-size: 1.1rem;
        }
    }

    @media (max-width: 576px) {
        .event-image {
            height: 250px;
        }
        
        .event-title {
            font-size: 1.6rem;
        }
        
        .event-content {
            font-size: 1rem;
            line-height: 1.7;
        }
    }
</style>