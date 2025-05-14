<template>
    <div>
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <template v-for="(v, k) in ds_slide.filter(slide => slide.tinh_trang == 1)" :key="k">
                    <div :class="['carousel-item', { 'active': k === 0 }]">
                        <img v-bind:src="v.link_hinh_anh" class="d-block w-100 carousel-img" alt="...">
                    </div>
                </template>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

        <div class="container mt-5">
            <div class="row">
                <!-- Main content - Movies -->
                <div class="col-12">
                    <h3 class="section-title mb-4">Phim Đang Chiếu</h3>
                    <div class="row product-grid">
                        <template v-for="(value, index) in paginatedMovies" :key="index">
                            <div class="col-6 col-md-4 col-lg-3 d-flex mb-4">
                                <router-link :to="'/chi-tiet-phim/' + value.id + '-' + value.slug_phim" class="w-100">
                                    <div class="card h-100">
                                        <img class="img-fluid card-img" :src="value.hinh_anh" alt="">
                                        <div class="card-body d-flex flex-column">
                                            <div class="text-center flex-grow-1">
                                                <h6 class="card-title">{{ value.ten_phim }}</h6>
                                            
                                                <div class="release-info">
                                                    <span>{{ value.ngay_chieu }} | {{ value.the_loais ? value.the_loais.map(tl => tl.ten_the_loai).join(', ') : "Đang cập nhật" }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                    <div class="d-flex justify-content-center mt-4 mb-5">
                        <nav aria-label="Page navigation">
                            <ul class="pagination">
                                <li :class="['page-item', { disabled: currentPage === 1 }]">
                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                                <li v-for="page in totalPages" :key="page"
                                    :class="['page-item', { active: currentPage === page }]">
                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                </li>
                                <li :class="['page-item', { disabled: currentPage === totalPages }]">
                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div class="row">
                <!-- Main content - Movies -->
                <div class="col-12">
                    <h3 class="section-title mb-4">Phim Sắp Chiếu</h3>
                    <div class="row product-grid">
                        <template v-for="(value, index) in list_phim_sap_chieu.slice(0, 4)" :key="index">
                            <div class="col-6 col-md-4 col-lg-3 d-flex mb-4">
                                <router-link :to="'/chi-tiet-phim/' + value.id + '-' + value.slug_phim" class="w-100">
                                    <div class="card h-100">
                                        <img class="img-fluid card-img" :src="value.hinh_anh" alt="">
                                        <div class="card-body d-flex flex-column">
                                            <div class="text-center flex-grow-1">
                                                <h6 class="card-title">{{ value.ten_phim }}</h6>
                                                <hr>
                                                <div class="release-info">
                                                    <span>{{ value.ngay_chieu }} | {{ value.ten_the_loai }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </div>
                    <div class="d-flex justify-content-center mt-4 mb-5">
                        <router-link to="/phim-sap-chieu" class="btn btn-primary">Xem thêm</router-link>
                    </div>
                </div>
            </div>
        </div>
        <FloatingChatbot />
    </div>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import FloatingChatbot from '../ChatBot/FloatingChatbot.vue';

const toaster = createToaster({ position: "top-right" });

export default {
    components: {
        FloatingChatbot
    },
    data() {
        return {
            list_phim: [],
            ds_slide: [],
            currentPage: 1,
            itemsPerPage: 8,
            list_phim_sap_chieu: [],
        }
    },
    computed: {
        paginatedMovies() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.list_phim.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.list_phim.length / this.itemsPerPage);
        }
    },
    mounted() {
        this.getDataHomePage();
        this.layDuLieuSlide();
        this.getDataPhimSapChieu();
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        getDataHomePage() {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            var payload = {
                date : `${yyyy}-${mm}-${dd}`
            }
            axios
                .post('http://127.0.0.1:8000/api/trang-chu/data',payload)
                .then((res) => {
                    this.list_phim = res.data.listPhim;
                })
        },
        layDuLieuSlide() {
            axios
                .get('http://127.0.0.1:8000/api/slide/data')
                .then((res) => {
                    console.log("Dữ liệu từ API:", res.data.slide);
                    this.ds_slide = res.data.slide;
                })
        },
        getDataPhimSapChieu() {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            var payload = {
                date : `${yyyy}-${mm}-${dd}`
            }
            axios
                .post('http://127.0.0.1:8000/api/trang-chu/phim-sap-chieu/data',payload)
                .then((res) => {
                    this.list_phim_sap_chieu = res.data.data;
                })
        },
    },
}
</script>

<style scoped>
/* Carousel Styles */
.carousel-img {
    height: 500px;
    object-fit: cover;
}

/* Card Styles */
.card {
    border-radius: 15px;
    border: none;
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 5px rgba(220, 53, 69, 0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(220, 53, 69, 0.2);
}

.card-img {
    width: 100%;
    height: 400%;
    object-fit: cover;
    border-radius: 15px 15px 0 0;
}

.card-body {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-title {
    margin: 0.5rem 0;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.release-info {
    font-size: 0.85rem;
    color: #666;
    margin-top: auto;
    border-top: 1px solid rgba(220, 53, 69, 0.1);
    padding-top: 0.5rem;
}

/* Button Styles */
.btn-primary {
    padding: 0.5rem 1.5rem;
    font-weight: bold;
    background-color: #dc3545 !important;
    border-color: #dc3545 !important;
}

.btn-primary:hover {
    background-color: #c82333 !important;
    border-color: #bd2130 !important;
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
    background-color: #dc3545;
}

/* Responsive Design */
@media (max-width: 992px) {
    .carousel-img {
        height: 400px;
    }

    .card-img {
        height: 220px;
    }
}

@media (max-width: 768px) {
    .carousel-img {
        height: 300px;
    }

    .card-img {
        height: 200px;
    }

    .card-title {
        font-size: 0.9rem;
    }

    .release-info {
        font-size: 0.75rem;
    }
}

@media (max-width: 576px) {
    .carousel-img {
        height: 200px;
    }

    .card-img {
        height: 180px;
    }

    .card-body {
        padding: 0.75rem;
    }

    .container {
        margin-top: 2rem;
    }

    .col-6 {
        padding-left: 8px;
        padding-right: 8px;
    }

    .card-title {
        font-size: 0.85rem;
    }

    .release-info {
        font-size: 0.7rem;
    }
}

/* Pagination Styles */
.pagination {
    margin: 0;
}

.page-link {
    color: #e75c68;
    border: 1px solid #dee2e6;
    padding: 0.5rem 0.75rem;
    margin: 0 3px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.page-link:hover {
    color: #fff;
    background-color: #dc3545;
    border-color: #dc3545;
}

.page-item.active .page-link {
    background-color: #dc3545;
    border-color: #dc3545;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

/* Card hover effect with red accent */
.card:hover .card-title {
    color: #dc3545;
}
</style>