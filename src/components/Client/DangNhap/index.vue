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
                <h2 class="mb-4"
                    style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;color: aliceblue;">
                    <i class="bx bxl-xing"></i> Cinema Movie
                </h2>
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
                    <h3 class="fw-bold">Đăng nhập</h3>
                    <p>
                        <router-link to="/khach-hang/dang-ky">
                            Don't have an account yet? <a href="/khach-hang/dang-ky">Sign up here</a>
                        </router-link>
                    </p>
                </div>
                <form>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                            <input v-model="login.email" type="email" id="email" class="form-control"
                                placeholder="Email Address" @keyup.enter="dangNhap" />
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Enter Password</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                            <input v-model="login.password" :type="showPassword ? 'text' : 'password'" id="password" 
                                class="form-control" placeholder="Enter Password" @keyup.enter="dangNhap" />
                            <span class="input-group-text cursor-pointer" @click="togglePassword">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </span>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <router-link to="/quen-mat-khau" class="text-decoration-none forgot-password">
                            Quên mật khẩu?
                        </router-link>
                    </div>
                    <button @click="loginGoogle" type="button" class="btn btn-google w-100 mb-3">
                        <i class="fab fa-google me-2"></i> Đăng nhập với Google
                    </button>
                    <button @click="dangNhap" type="button" class="btn btn-primary w-100">
                        <i class="fas fa-sign-in-alt me-2"></i> Đăng nhập
                    </button>
                    <div class="text-center mt-4">
                        <p class="mb-0">Chưa có tài khoản? 
                            <router-link to="/khach-hang/dang-ky" class="text-decoration-none register-link">
                                Đăng ký ngay
                            </router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
            showPassword: false,
            rememberMe: false,
            isLoading: false
        };
    },
    mounted() {
        this.checkLogin();
        this.loadSavedCredentials();
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },

        loadSavedCredentials() {
            const savedEmail = localStorage.getItem('saved_email');
            if (savedEmail) {
                this.login.email = savedEmail;
                this.rememberMe = true;
            }
        },

        saveCredentials() {
            if (this.rememberMe) {
                localStorage.setItem('saved_email', this.login.email);
            } else {
                localStorage.removeItem('saved_email');
            }
        },

        async checkLogin() {
            const token = localStorage.getItem("token_khachhang");
            if (!token) return;

            try {
                const res = await axios.post(
                    "http://127.0.0.1:8000/api/kiem-tra-token-khach-hang",
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (res.data.status) {
                    this.$router.push("/home-page");
                }
            } catch (error) {
                localStorage.removeItem("token_khachhang");
            }
        },

        async loginGoogle() {
            try {
                window.location.href = "http://127.0.0.1:8000/auth/google";
            } catch (error) {
                toaster.error("Lỗi đăng nhập Google");
            }
        },

        async dangNhap() {
            if (!this.login.email || !this.login.password) {
                toaster.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (!this.validateEmail(this.login.email)) {
                toaster.error("Email không hợp lệ!");
                return;
            }

            this.isLoading = true;
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.login);
                if (res.data.status) {
                    this.saveCredentials();
                    toaster.success(res.data.message);
                    localStorage.setItem("token_khachhang", res.data.token);
                    localStorage.setItem("ho_ten_khach_hang", res.data.ho_ten_khach_hang);
                    localStorage.setItem("id_khach_hang", res.data.id_khach_hang);
                    this.$router.push("/home-page");
                } else {
                    toaster.error(res.data.message);
                }
            } catch (error) {
                toaster.error("Đăng nhập thất bại");
            } finally {
                this.isLoading = false;
            }
        },

        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    },
};
</script>

<style scoped>
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

.btn-google {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #757575;
    transition: all 0.3s ease;
}

.btn-google:hover {
    background-color: #f8f9fa;
    color: #dc3545;
    border-color: #dc3545;
}

.btn-primary {
    background-color: #dc3545;
    border-color: #dc3545;
    transition: all 0.3s ease;
}

.btn-primary:hover {
    background-color: #c82333;
    border-color: #bd2130;
    transform: translateY(-2px);
}

.forgot-password {
    color: #6c757d;
    transition: all 0.3s ease;
}

.forgot-password:hover {
    color: #dc3545;
}

.register-link {
    color: #dc3545;
    font-weight: 600;
    transition: all 0.3s ease;
}

.register-link:hover {
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
</style>
