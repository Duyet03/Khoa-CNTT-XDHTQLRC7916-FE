<template>
    <div class="goc-dien-anh">
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Góc Điện Ảnh</h1>
                <p class="page-description">Cập nhật tin tức, review phim và những thông tin thú vị về điện ảnh</p>
            </div>

            <div class="row">
                <div class="col-md-8">
                    <div class="news-list">
                        <div v-for="(news, index) in ds_tin_tuc" :key="index" class="news-item">
                            <div class="news-image">
                                <img :src="news.hinh_anh" :alt="news.tieu_de" class="img-fluid">
                            </div>
                            <div class="news-content">
                                <h2 class="news-title">{{ news.tieu_de }}</h2>
                                <div class="news-meta">
                                    <span class="news-date">
                                        <i class="far fa-calendar-alt"></i> {{ formatDate(news.ngay_dang) }}
                                    </span>
                                </div>
                                <p class="news-excerpt">{{ news.noi_dung }}</p>
                                <router-link :to="'/goc-dien-anh/' + news.id" class="read-more">
                                    Đọc thêm <i class="fas fa-arrow-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="sidebar">
                        <div class="sidebar-widget">
                            <h3 class="widget-title">Tin Mới Nhất</h3>
                            <div class="recent-news">
                                <div v-for="(news, index) in ds_tin_tuc.slice(0, 5)" :key="index" class="recent-news-item">
                                    <div class="recent-news-image">
                                        <img :src="news.hinh_anh" :alt="news.tieu_de">
                                    </div>
                                    <div class="recent-news-content">
                                        <h4>{{ news.tieu_de }}</h4>
                                        <span class="date">{{ formatDate(news.ngay_dang) }}</span>
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
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            ds_tin_tuc: [],
        }
    },
    mounted() {
        this.layDuLieuTinTuc();
    },
    methods: {
        layDuLieuTinTuc() {
            axios
                .get('http://127.0.0.1:8000/api/goc-dien-anh/data')
                .then((res) => {
                    this.ds_tin_tuc = res.data.data;
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải dữ liệu tin tức");
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
.goc-dien-anh {
    padding: 40px 0;
    background-color: #f8f9fa;
}

.page-header {
    text-align: center;
    margin-bottom: 40px;
}

.page-title {
    color: #ff4d4d;
    font-size: 2.5em;
    font-weight: bold;
    margin-bottom: 15px;
    text-transform: uppercase;
}

.page-description {
    color: #666;
    font-size: 1.1em;
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.news-item {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.news-item:hover {
    transform: translateY(-5px);
}

.news-image {
    position: relative;
    overflow: hidden;
    height: 300px;
}

.news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.news-item:hover .news-image img {
    transform: scale(1.05);
}

.news-content {
    padding: 25px;
}

.news-title {
    color: #333;
    font-size: 1.5em;
    margin-bottom: 15px;
    font-weight: bold;
}

.news-meta {
    margin-bottom: 15px;
    color: #666;
    font-size: 0.9em;
}

.news-date {
    display: inline-flex;
    align-items: center;
    gap: 5px;
}

.news-excerpt {
    color: #666;
    line-height: 1.6;
    margin-bottom: 20px;
}

.read-more {
    color: #ff4d4d;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    transition: all 0.3s ease;
}

.read-more:hover {
    color: #ff3333;
    gap: 10px;
}

.sidebar {
    position: sticky;
    top: 20px;
}

.sidebar-widget {
    background: #fff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.widget-title {
    color: #333;
    font-size: 1.3em;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #ff4d4d;
}

.recent-news {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.recent-news-item {
    display: flex;
    gap: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.recent-news-item:last-child {
    border-bottom: none;
    padding-bottom: 0;
}

.recent-news-image {
    width: 80px;
    height: 60px;
    border-radius: 5px;
    overflow: hidden;
}

.recent-news-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.recent-news-content h4 {
    font-size: 0.9em;
    margin-bottom: 5px;
    color: #333;
}

.recent-news-content .date {
    font-size: 0.8em;
    color: #666;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 2em;
    }
    
    .news-image {
        height: 200px;
    }
    
    .news-content {
        padding: 20px;
    }
    
    .news-title {
        font-size: 1.3em;
    }
    
    .sidebar {
        margin-top: 30px;
    }
}
</style>
