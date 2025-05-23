<template>
    <div class="news-detail">
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <div class="card border-0 shadow-sm">
                        <img :src="tin_tuc.hinh_anh" class="card-img-top news-image" :alt="tin_tuc.tieu_de">
                        <div class="card-body p-4">
                            <h1 class="news-title mb-3">{{ tin_tuc.tieu_de }}</h1>
                            <div class="news-meta mb-4">
                                <span class="me-3">
                                    <i class="far fa-calendar-alt me-1"></i>
                                    {{ formatDate(tin_tuc.ngay_dang) }}
                                </span>
                            </div>
                            <div class="news-content" v-html="tin_tuc.noi_dung"></div>
                        </div>
                    </div>

                    <!-- Related News Section -->
                    <div class="related-news mt-5">
                        <h3 class="mb-6">Tin tức liên quan</h3>
                        <div class="row">
                            <div v-for="(news, index) in related_news" :key="index" class="col-md-6 mb-4">
                                <router-link :to="`/goc-dien-anh/${news.id}`" class="text-decoration-none">
                                    <div class="card h-100 border-0 shadow-sm hover-effect">
                                        <img :src="news.hinh_anh" class="card-img-top related-news-image" :alt="news.tieu_de">
                                        <div class="card-body">
                                            <h5 class="card-title">{{ news.tieu_de }}</h5>
                                            <p class="card-text text-muted">
                                                <small>
                                                    <i class="far fa-calendar-alt me-1"></i>
                                                    {{ formatDate(news.ngay_dang) }}
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </router-link>
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
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            tin_tuc: {},
            related_news: []
        }
    },
    mounted() {
        this.layChiTietTinTuc();
    },
    methods: {
        layChiTietTinTuc() {
            const id = this.$route.params.id;
            axios
                .get(`http://127.0.0.1:8000/api/goc-dien-anh/data-by-id/${id}`)
                .then((res) => {
                    this.tin_tuc = res.data.data;
                    this.layTinTucLienQuan();
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải dữ liệu tin tức");
                });
        },
        layTinTucLienQuan() {
            axios
                .get('http://127.0.0.1:8000/api/goc-dien-anh/data')
                .then((res) => {
                    // Filter out current news and get only 4 related items
                    this.related_news = res.data.data
                        .filter(news => news.id !== this.tin_tuc.id)
                        .slice(0, 4);
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải tin tức liên quan");
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

<style scoped>
.news-detail {
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

.news-image {
    width: 100%;
    height: 500px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.news-title {
    font-size: 2.8rem;
    font-weight: 700;
    color: #2c3e50;
    line-height: 1.3;
    margin-bottom: 1.5rem;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.news-meta {
    color: #666;
    font-size: 1rem;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    margin-bottom: 2rem;
}

.news-meta i {
    color: #ff4d4d;
}

.news-content {
    font-size: 1.2rem;
    line-height: 1.9;
    color: #444;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

.news-content p {
    margin-bottom: 1.5rem;
}

.related-news {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #eee;
}

.related-news h3 {
    font-size: 2rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 2rem;
    text-align: center;
    position: relative;
}

.related-news h3:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #ff4d4d;
    margin: 15px auto 0;
    border-radius: 2px;
}

.related-news-image {
    height: 220px;
    object-fit: cover;
    border-radius: 10px;
}

.hover-effect {
    transition: all 0.3s ease;
    border-radius: 10px;
}

.hover-effect:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.hover-effect .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.75rem;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.hover-effect:hover .card-title {
    color: #ff4d4d;
}

.card-text {
    color: #666;
}

.card-text i {
    color: #ff4d4d;
}

/* Responsive adjustments */
@media (max-width: 1200px) {
    .news-title {
        font-size: 2.4rem;
    }
    
    .news-image {
        height: 450px;
    }
}

@media (max-width: 992px) {
    .news-title {
        font-size: 2.2rem;
    }
    
    .news-image {
        height: 400px;
    }
}

@media (max-width: 768px) {
    .news-title {
        font-size: 1.8rem;
    }
    
    .news-image {
        height: 350px;
    }
    
    .news-content {
        font-size: 1.1rem;
    }
    
    .related-news h3 {
        font-size: 1.8rem;
    }
    
    .related-news-image {
        height: 200px;
    }
    
    .hover-effect .card-title {
        font-size: 1.1rem;
    }
}

@media (max-width: 576px) {
    .news-image {
        height: 250px;
    }
    
    .news-title {
        font-size: 1.6rem;
    }
    
    .news-content {
        font-size: 1rem;
        line-height: 1.7;
    }
}
</style>