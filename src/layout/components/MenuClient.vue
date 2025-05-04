<template>
    <header>
        <nav class="navbar navbar-expand-lg bg-white shadow-sm py-4">
            <div class="container">
                <!-- Logo -->
                <a class="navbar-brand" href="#">
                    <img src="https://i.pinimg.com/originals/84/10/0f/84100f5bcc9d55b504010cdf2fb37e46.jpg" alt="Cinema"
                        height="60">
                </a>

                <!-- Nút Toggle trên Mobile -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Menu -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item mx-2">
                            <a class="nav-link btn btn-warning text-white px-3 me-3" href="#">Mua Vé</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="#">Phim</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="#">Góc Điện Ảnh</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="#">Sự Kiện</a>
                        </li>
                        <li class="nav-item mx-2">
                            <a class="nav-link" href="#">Rạp/Giá Vé</a>
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
    /* Màu chữ ban đầu */
    transition: color 0.3s ease;
    /* Hiệu ứng mượt mà */
}

/* Khi rê chuột vào */
.hover-text:hover {
    color: red;
    /* Màu chữ khi rê chuột */
}
</style>