<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-white shadow-sm py-4">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="#">
                    <router-link to="/home-page">
                        <img src="https://i.pinimg.com/originals/84/10/0f/84100f5bcc9d55b504010cdf2fb37e46.jpg" alt="Cinema"
                        height="60">
                    </router-link>
                </a>

                <!-- Nút Toggle trên Mobile -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Menu -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item mx-2">
                            <router-link to="/home-page" class="nav-link" :class="{'btn btn-warning text-white px-3 me-3': $route.path === '/home-page'}">
                                Phim đang chiếu
                            </router-link>
                        </li>
                        <!-- <li class="nav-item mx-2">
                            <a class="nav-link" href="#">Phim sắp ra mắt</a>
                        </li> -->
                        <li class="nav-item mx-2">
                            <router-link to="/goc-dien-anh" class="nav-link" :class="{'btn btn-warning text-white px-3 me-3': $route.path === '/goc-dien-anh'}">
                                Góc Điện Ảnh
                            </router-link>
                        </li>
                        <li class="nav-item mx-2">
                            <router-link to="/su-kien" class="nav-link" :class="{'btn btn-warning text-white px-3 me-3': $route.path === '/su-kien'}">
                                Sự Kiện
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Chức năng đăng nhập -->
                <div class="d-flex align-items-center">
                    <template v-if="is_check == false">
                        <router-link to="/login">
                            <a class="nav-link text-dark me-3" title="Đăng nhập" href="/login">Đăng nhập</a>
                        </router-link>
                        <router-link to="/khach-hang/dang-ky">
                            <a class="nav-link text-dark me-3" title="Đăng ký" href="/khach-hang/dang-ky">Đăng
                                ký</a>
                        </router-link>
                    </template>

                    <template v-else>
                        <div class="user-box dropdown">
                            <a class="d-flex align-items-center nav-link dropdown-toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <div class="user-info d-flex align-items-center">
                                    <i class="bx bx-user-circle me-2" style="font-size: 24px;"></i>
                                    <p class="user-name1 mb-0"><b>{{ ten_hien_thi }}</b></p>
                                </div>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end custom-dropdown">
                                <li>
                                    <router-link class="dropdown-item" to="/khach-hang/tai-khoan-ca-nhan">
                                        <i class="fa-solid fa-user me-2"></i>
                                        <span>Thông tin cá nhân</span>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/khach-hang/hoa-don">
                                        <i class="fa-solid fa-file-invoice me-2"></i>
                                        <span>Lịch sử hóa đơn</span>
                                    </router-link>
                                </li>
                                <li>
                                    <a v-on:click="dangXuat()" class="dropdown-item">
                                        <i class="bx bx-log-out-circle me-2"></i>
                                        <span>Đăng Xuất</span>
                                    </a>
                                </li>
                                <li>
                                    <a v-on:click="dangXuatAll()" class="dropdown-item">
                                        <i class="bx bx-log-out-circle me-2"></i>
                                        <span>Đăng Xuất Tất Cả</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </nav>
    </header>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            ten_hien_thi: 'Chưa đăng nhập',
            is_check: false,

        }
    },
    mounted() {

        this.checkLogin();

    },
    methods: {
        checkLogin() {
            axios
                .post('http://127.0.0.1:8000/api/kiem-tra-token-khach-hang', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.is_check = true;
                        this.ten_hien_thi = localStorage.getItem('ho_ten_khach_hang');
                    }
                });
        },
        layDuLieuReview() {
            axios
                .get('http://127.0.0.1:8000/api/review/data')
                .then((res) => {
                    this.ds_review = res.data.review;
                })
        },

        dangXuat() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        window.localStorage.removeItem('token_khachhang');
                        window.localStorage.removeItem('ho_ten');
                        window.localStorage.removeItem('id_khach_hang');
                        window.localStorage.removeItem('ho_ten_khach_hang');
                        this.is_check = false;
                        this.$router.push('/');
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        dangXuatAll() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/dang-xuat-all', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        window.localStorage.removeItem('token_khachhang');
                        window.localStorage.removeItem('ho_ten');
                        this.is_check = false;
                        this.$router.push('/');
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        }
    },
}
</script>
<style>
.hover-text {
    color: rgb(129, 129, 129);
    transition: color 0.3s ease;
}

.hover-text:hover {
    color: red;
}

/* New menu styling */
.navbar {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1) !important;
}

.navbar-nav .nav-item {
    position: relative;
    margin: 0 5px;
}

.navbar-nav .nav-link {
    font-weight: 500;
    padding: 8px 15px;
    color: #333;
    transition: all 0.3s ease;
    border-radius: 5px;
}

.navbar-nav .nav-link:hover {
    color: #ff9800;
    background-color: rgba(255, 152, 0, 0.1);
}

.navbar-nav .nav-link.btn-warning {
    background-color: #ff9800 !important;
    border: none;
    font-weight: 600;
}

.navbar-nav .nav-link.btn-warning:hover {
    background-color: #f57c00 !important;
    color: white !important;
    transform: translateY(-1px);
}

/* Dropdown styling */
.custom-dropdown {
    border: none;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 8px 0;
}

.custom-dropdown .dropdown-item {
    padding: 8px 20px;
    transition: all 0.2s ease;
}

.custom-dropdown .dropdown-item:hover {
    background-color: rgba(255, 152, 0, 0.1);
    color: #ff9800;
}

.custom-dropdown .dropdown-item i {
    width: 20px;
    text-align: center;
}

/* User info styling */
.user-info {
    padding: 5px 10px;
    border-radius: 25px;
    transition: all 0.3s ease;
}

.user-info:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.user-name1 {
    margin-left: 5px;
    color: #333;
}
</style>