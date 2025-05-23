<template>
    <div class="container mt-5">
            <div class="row">
                <!-- Main content - Movies -->
                <div class="col-12">
                    <h3 class="section-title mb-4">Phim Sắp Chiếu</h3>
                    <div class="row product-grid">
                        <template v-for="(value, index) in paginatedMovies" :key="index">
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
        </div>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            list_phim_sap_chieu: [],
            currentPage: 1,
            itemsPerPage: 8,
        }
    },
    computed: {
        paginatedMovies() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.list_phim_sap_chieu.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.list_phim_sap_chieu.length / this.itemsPerPage);
        }
    },
    mounted() {
        this.getDataPhimSapChieu();
    },
    methods: {
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
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
                .catch((error) => {
                    console.error('Error fetching movies:', error);
                });
        },
    }
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
}

.card:hover {
    transform: translateY(-5px);
}

.card-img {
    width: 100%;
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
}

/* Button Styles */
.btn-primary {
    padding: 0.5rem 1.5rem;
    font-weight: bold;
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
    background-color: #1976d2;
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
    color: red;
    border: 1px solid #dee2e6;
    padding: 0.5rem 0.75rem;
    margin: 0 3px;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.page-link:hover {
    color: #fff;
    background-color: #1976d2;
    border-color: #1976d2;
}

.page-item.active .page-link {
    background-color: #1976d2;
    border-color: #1976d2;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}
</style>