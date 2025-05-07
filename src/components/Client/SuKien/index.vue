<template>
    <div class="su-kien">
        <div class="container">
            <div class="page-header">
                <h1 class="page-title">Sự Kiện</h1>
                <p class="page-description">Khám phá các sự kiện hấp dẫn đang diễn ra</p>
            </div>

            <div class="row">
                <template v-for="(event, index) in paginatedEvents" :key="index">                  
                    <div class="col-md-6 col-lg-4 mb-4">
                        <router-link :to="`/su-kien/${event.id}`">
                            <div class="event-card">
                                <div class="event-image">
                                    <img :src="event.hinh_anh" :alt="event.ten_su_kien" class="img-fluid">
                                </div>
                                <div class="event-content">
                                    <div class="event-date">
                                        <i class="far fa-calendar-alt"></i>
                                        {{ formatDate(event.ngay_bat_dau) }} - {{ formatDate(event.ngay_ket_thuc) }}
                                    </div>
                                </div>
                            </div>
                        </router-link>
                    </div>  
                </template>
            </div>

            <!-- Pagination Controls -->
            <div class="pagination-container" v-if="totalPages > 1">
                <div class="pagination">
                    <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="page-btn">
                        <i class="fas fa-chevron-left"></i>
                    </button>
                    <button 
                        v-for="page in displayedPages" 
                        :key="page" 
                        @click="changePage(page)"
                        :class="['page-number', { active: currentPage === page }]"
                    >
                        {{ page }}
                    </button>
                    <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="page-btn">
                        <i class="fas fa-chevron-right"></i>
                    </button>
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
            ds_su_kien: [],
            currentPage: 1,
            itemsPerPage: 6,
        }
    },
    computed: {
        totalPages() {
            return Math.ceil(this.ds_su_kien.length / this.itemsPerPage);
        },
        paginatedEvents() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.ds_su_kien.slice(start, end);
        },
        displayedPages() {
            const pages = [];
            const maxVisiblePages = 5;
            let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        }
    },
    mounted() {
        this.layDuLieuSuKien();
    },
    methods: {
        layDuLieuSuKien() {
            axios
                .get('http://127.0.0.1:8000/api/su-kien/client/data')
                .then((res) => {
                    this.ds_su_kien = res.data.data;
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải dữ liệu sự kiện");
                    console.error('Error:', error);
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }
}
</script>

<style scoped>
.su-kien {
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

.event-card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    height: 100%;
}

.event-card:hover {
    transform: translateY(-5px);
}

.event-image {
    position: relative;
    overflow: hidden;
    height: 350px;
}

.event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.event-card:hover .event-image img {
    transform: scale(1.05);
}

.event-content {
    padding: 20px;
}

.event-title {
    color: #333;
    font-size: 1.3em;
    margin-bottom: 10px;
    font-weight: bold;
}

.event-date {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.event-description {
    color: #666;
    line-height: 1.6;
    margin-bottom: 0;
}

@media (max-width: 768px) {
    .page-title {
        font-size: 2em;
    }
    
    .event-image {
        height: 180px;
    }
    
    .event-content {
        padding: 15px;
    }
    
    .event-title {
        font-size: 1.2em;
    }
}

.pagination-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

.pagination {
    display: flex;
    gap: 10px;
    align-items: center;
}

.page-btn {
    background: #fff;
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-number {
    background: #fff;
    border: 1px solid #ddd;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-number.active {
    background: #ff4d4d;
    color: #fff;
    border-color: #ff4d4d;
}

.page-btn:hover:not(:disabled),
.page-number:hover:not(.active) {
    background: #f0f0f0;
}

@media (max-width: 768px) {
    .pagination {
        gap: 5px;
    }

    .page-btn,
    .page-number {
        padding: 6px 12px;
    }
}
</style>