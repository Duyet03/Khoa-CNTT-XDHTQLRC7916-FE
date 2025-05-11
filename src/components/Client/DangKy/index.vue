<template>
    <div class="position-relative vh-100">
            <!-- Background Blur Layer -->
            <div class="bg-blur-layer"></div>
    
            <!-- Foreground Content -->
            <div class="container row bg-light rounded shadow overflow-hidden position-absolute top-50 start-50 translate-middle"
                style="z-index: 2; width: 100%; max-width: 1200px;">
                <!-- Left Section -->
                <div class="col-md-8 d-flex flex-column justify-content-between text-white bg-dark p-5" style="
                background: url(https://res.cloudinary.com/dfff9gqxw/image/upload/v1745980830/vongtaynang_uhodf8.jpg) no-repeat;
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
                    <div class="text-center mb-4">
                        <h3 class="fw-bold">Đăng Ký</h3>
                        <p class="text-muted">
                            Đã có tài khoản? 
                            <router-link to="/login" class="text-decoration-none login-link">
                                Đăng nhập ngay
                            </router-link>
                        </p>
                    </div>
                    <div class="form-body">
                        <form class="row g-3" @submit.prevent="dangKy">
                            <div class="col-6">
                                <label class="form-label">Họ và Tên</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    <input type="text" class="form-control" v-model="data_dang_ky.ten_khach_hang" 
                                        placeholder="Nhập họ và tên">
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Email</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                    <input type="email" class="form-control" v-model="data_dang_ky.email" 
                                        placeholder="example@email.com">
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Số Điện Thoại</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-phone"></i></span>
                                    <input type="text" class="form-control" v-model="data_dang_ky.so_dien_thoai" 
                                        placeholder="Nhập số điện thoại">
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Mật Khẩu</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <input :type="showPassword ? 'text' : 'password'" class="form-control" 
                                        v-model="data_dang_ky.password" placeholder="Nhập mật khẩu">
                                    <span class="input-group-text cursor-pointer" @click="togglePassword">
                                        <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Nhập Lại Mật Khẩu</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                    <input :type="showPassword ? 'text' : 'password'" class="form-control" 
                                        v-model="data_dang_ky.re_password" placeholder="Nhập lại mật khẩu">
                                </div>
                            </div>
                            <div class="col-6">
                                <label class="form-label">Ngày Sinh</label>
                                <div class="input-group">
                                    <span class="input-group-text"><i class="fas fa-calendar"></i></span>
                                    <input type="date" class="form-control" v-model="data_dang_ky.ngay_sinh">
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" v-model="acceptTerms" id="acceptTerms">
                                    <label class="form-check-label" for="acceptTerms">
                                        Tôi đồng ý với <a href="#" class="text-decoration-none terms-link">điều khoản</a> và 
                                        <a href="#" class="text-decoration-none terms-link">chính sách bảo mật</a>
                                    </label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary w-100" :disabled="isLoading || !acceptTerms">
                                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                                    <i v-else class="fas fa-user-plus me-2"></i>
                                    {{ isLoading ? 'Đang xử lý...' : 'Đăng Ký' }}
                                </button>
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
                data_dang_ky: {
                    ten_khach_hang: '',
                    email: '',
                    so_dien_thoai: '',
                    password: '',
                    re_password: '',
                    ngay_sinh: ''
                },
                showPassword: false,
                acceptTerms: false,
                isLoading: false
            }
        },
        mounted() {
    
        },
        methods: {
            togglePassword() {
                this.showPassword = !this.showPassword;
            },

            validateForm() {
                if (!this.data_dang_ky.ten_khach_hang) {
                    toaster.error("Vui lòng nhập họ và tên!");
                    return false;
                }
                if (!this.data_dang_ky.email) {
                    toaster.error("Vui lòng nhập email!");
                    return false;
                }
                if (!this.validateEmail(this.data_dang_ky.email)) {
                    toaster.error("Email không hợp lệ!");
                    return false;
                }
                if (!this.data_dang_ky.so_dien_thoai) {
                    toaster.error("Vui lòng nhập số điện thoại!");
                    return false;
                }
                if (!this.validatePhone(this.data_dang_ky.so_dien_thoai)) {
                    toaster.error("Số điện thoại không hợp lệ!");
                    return false;
                }
                if (!this.data_dang_ky.password) {
                    toaster.error("Vui lòng nhập mật khẩu!");
                    return false;
                }
                if (this.data_dang_ky.password.length < 6) {
                    toaster.error("Mật khẩu phải có ít nhất 6 ký tự!");
                    return false;
                }
                if (this.data_dang_ky.password !== this.data_dang_ky.re_password) {
                    toaster.error("Mật khẩu nhập lại không khớp!");
                    return false;
                }
                if (!this.data_dang_ky.ngay_sinh) {
                    toaster.error("Vui lòng chọn ngày sinh!");
                    return false;
                }
                if (!this.acceptTerms) {
                    toaster.error("Vui lòng đồng ý với điều khoản và chính sách!");
                    return false;
                }
                return true;
            },

            validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            },

            validatePhone(phone) {
                const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
                return re.test(phone);
            },

            async dangKy() {
                if (!this.validateForm()) return;

                this.isLoading = true;
                try {
                    const res = await axios.post('http://127.0.0.1:8000/api/dang-ky', this.data_dang_ky);
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.data_dang_ky = {
                            ten_khach_hang: '',
                            email: '',
                            so_dien_thoai: '',
                            password: '',
                            re_password: '',
                            ngay_sinh: ''
                        };
                        this.acceptTerms = false;
                        // Chuyển hướng đến trang đăng nhập sau 1.5s
                        setTimeout(() => {
                            this.$router.push('/login');
                        }, 1500);
                    } else {
                        toaster.error(res.data.message);
                    }
                } catch (error) {
                    if (error.response && error.response.data.errors) {
                        Object.values(error.response.data.errors).forEach(errors => {
                            errors.forEach(msg => toaster.error(msg));
                        });
                    } else {
                        toaster.error("Đã có lỗi xảy ra, vui lòng thử lại sau!");
                    }
                } finally {
                    this.isLoading = false;
                }
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
        background: url(https://res.cloudinary.com/dfff9gqxw/image/upload/v1745980830/vongtaynang_uhodf8.jpg) no-repeat;
        background-size: cover;
        background-position: center;
        filter: blur(10px);
        z-index: 1;
    }

    .input-group-text {
        background-color: #fff;
        border-right: none;
    }

    .input-group .form-control {
        border-left: none;
    }

    .input-group .form-control:focus {
        border-color: #dc3545;
        box-shadow: none;
    }

    .input-group-text:last-child {
        border-left: none;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #dc3545;
        border-color: #dc3545;
        transition: all 0.3s ease;
    }

    .btn-primary:hover:not(:disabled) {
        background-color: #c82333;
        border-color: #bd2130;
        transform: translateY(-2px);
    }

    .btn-primary:disabled {
        background-color: #dc3545;
        border-color: #dc3545;
        opacity: 0.65;
    }

    .login-link {
        color: #dc3545;
        font-weight: 600;
        transition: all 0.3s ease;
    }

    .login-link:hover {
        color: #c82333;
    }

    .terms-link {
        color: #dc3545;
        transition: all 0.3s ease;
    }

    .terms-link:hover {
        color: #c82333;
    }

    .form-check-input:checked {
        background-color: #dc3545;
        border-color: #dc3545;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .form-control:focus {
        border-color: #dc3545;
        box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .container {
        animation: fadeIn 0.5s ease-out;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .col-6 {
            width: 100%;
        }
    }
    </style>
    