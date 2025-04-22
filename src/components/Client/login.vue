<template>
    <div class="position-relative vh-100">
        <!-- Background Blur Layer -->
        <div class="bg-blur-layer"></div>

        <!-- Foreground Content -->
        <div class="container row bg-light rounded shadow overflow-hidden position-absolute top-50 start-50 translate-middle"
            style="z-index: 2; width: 100%; max-width: 1200px;">
            <!-- Left Section -->
            <div class="col-md-8 d-flex flex-column justify-content-between text-white bg-dark p-5" style="
            background: url('image.png') no-repeat;
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
                        <input v-model="login.email" type="email" id="email" class="form-control"
                            placeholder="Email Address" />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Enter Password</label>
                        <input v-model="login.password" type="password" id="password" class="form-control"
                            placeholder="Enter Password" />
                    </div>
                    <div class="d-flex justify-content-end mb-3">
                        <router-link to="/quen-mat-khau">
                            <a href="/quen-mat-khau" class="text-decoration-none">Quên mật khẩu</a>
                        </router-link>
                    </div>
                    <button @click="loginGoogle" type="button" class="btn btn-secondary w-100">
                        <i class="bx bxs-lock-open"></i> Đăng nhập với Google
                    </button>
                    <button @click="dangNhap" type="button" class="btn btn-primary w-100 mt-3">
                        <i class="bx bxs-lock-open"></i> Sign in
                    </button>
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
            login: {},
        };
    },
    mounted() {
        this.checkLogin();
    },
    methods: {
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
                const res = await axios.get("http://127.0.0.1:8000/api/auth/google");
                window.location.href = res.data.url;
            } catch (error) {
                toaster.error("Lỗi đăng nhập Google");
            }
        },


        dangNhap() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/dang-nhap", this.login)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        localStorage.setItem("token_khachhang", res.data.token);
                        localStorage.setItem("ho_ten_khach_hang", res.data.ho_ten_khach_hang);
                        localStorage.setItem("id_khach_hang", res.data.id_khach_hang);
                        this.$router.push("/home-page");
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(() => toaster.error("Đăng nhập thất bại"));
        },
    },
};
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
