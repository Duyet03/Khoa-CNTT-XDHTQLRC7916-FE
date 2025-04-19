<template>
    <div class="position-relative vh-100">
            <!-- Background Blur Layer -->
            <div class="bg-blur-layer"></div>
    
            <!-- Foreground Content -->
            <div class="container row bg-light rounded shadow overflow-hidden position-absolute top-50 start-50 translate-middle"
                style="z-index: 2; width: 100%; max-width: 1200px;">
                <!-- Left Section -->
                <div class="col-md-8 d-flex flex-column justify-content-between text-white bg-dark p-5" style="
                background: url(https://media.lottecinemavn.com/Media/WebAdmin/14c5e422f2e84c06b04861f3a7c14cab.jpg) no-repeat;
                background-size: cover;
                background-position: center;">
                    <h2 class="mb-4"><i class="bx bxl-xing"></i> Cinema Movie</h2>
                    <div>
                        <h2>Welcome! <br /><span>To Our Cinema</span></h2>
                        <p>Rạp chiếu phim - Nơi cảm xúc thăng hoa cùng từng khung hình!</p>
                        <div class="d-flex mt-3">
                            <a href="#" class="text-white me-3"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="text-white me-3"><i class="bx bxl-twitter"></i></a>
                            <a href="#" class="text-white me-3"><i class="bx bxl-youtube"></i></a>
                            <a href="#" class="text-white me-3"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="text-white"><i class="bx bxl-linkedin"></i></a>
                        </div>
                    </div>
                </div>
    
                <!-- Right Section -->
                <div class="col-md-4 p-5">
                    <div class="text-center">
                                    <h3 class="">Đăng Ký</h3>
                                    <p>Bạn đã có tài khoản thì <router-link to="/login"><a href="/login">đăng nhập tại
                                                đây</a></router-link>
                                    </p>
                                </div>
                                <div class="form-body">
                                    <form class="row g-3">
                                        <div class="col-6">
                                            <label class="form-label">Tên Khách Hàng</label>
                                            <input type="text" class="form-control" v-model="data_dang_ky.ten_khach_hang">
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">Địa Chỉ Email</label>
                                            <input type="email" class="form-control" v-model="data_dang_ky.email">
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">Số Điện Thoại</label>
                                            <input type="text" class="form-control" v-model="data_dang_ky.so_dien_thoai">
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">Mật Khẩu</label>
                                            <input type="password" class="form-control" v-model="data_dang_ky.password">
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">nhập lại mật Khẩu</label>
                                            <input type="password" class="form-control" v-model="data_dang_ky.re_password">
                                        </div>
                                        <div class="col-6">
                                            <label class="form-label">Ngày Sinh</label>
                                            <input type="date" class="form-control" v-model="data_dang_ky.ngay_sinh">
                                        </div>
                                        <div class="col-md-12 text-end">
                                            <router-link to="/quen-mat-khau">
                                                <a href="/quen-mat-khau">Forgot
                                                    Password ?</a>
                                            </router-link>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button type="button" class="btn btn-primary" v-on:click="dangKy()"><i
                                                        class="bx bxs-lock-open"></i>Đăng Ký</button>
                                            </div>
                                        </div>
                                    </form>
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
                data_dang_ky: {}
            }
        },
        mounted() {
    
        },
        methods: {
            dangKy() {
                axios
                    .post('http://127.0.0.1:8000/api/dang-ky', this.data_dang_ky)
                    .then((res) => {
                        if (res.data.status) {
                            toaster.success(res.data.message);
                            this.data_dang_ky = {};
                        } else {
                            toaster.error(res.data.message)
                        }
                    })
                    .catch((res) => {
                        var result = Object.entries(res.response.data.errors);
                        result.forEach((v, k) => {
                            toaster.error(v[1][0]);
                        });
                    });
            }
        },
    }
    </script>
    <style>
    body {
        font-family: "Poppins", sans-serif;
    }
    
    .bg-blur-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url(https://media.lottecinemavn.com/Media/WebAdmin/14c5e422f2e84c06b04861f3a7c14cab.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        filter: blur(10px);
        z-index: 1;
    }
    </style>
    