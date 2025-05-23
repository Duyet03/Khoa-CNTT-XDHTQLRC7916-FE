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
                    <i class="bx bxl-xing"></i> Cinema Movie - Admin Portal
                </h2>
                <div>
                    <h2>Welcome Admin! <br /><span>To Management Portal</span></h2>
                    <p>Quản lý rạp chiếu phim - Nơi điều hành mọi hoạt động!</p>
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
                    <h3 class="fw-bold">Admin Đăng nhập</h3>
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
                    <button @click="dangNhap" type="button" class="btn btn-primary w-100">
                        <i class="bx bxs-lock-open"></i> Sign in
                    </button>
                </form>
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
            login: {},
        }
    },
    mounted() {
        this.checkLogin();
    },
    methods: {
        checkLogin() {
            const token = localStorage.getItem("token_admin");
            if (!token) return;

            axios
                .post('http://127.0.0.1:8000/api/kiem-tra-token-admin', {}, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$router.push('/admin/phan-quyen');
                    }
                })
                .catch(() => {
                    localStorage.removeItem("token_admin");
                }); 
        },
        dangNhap() {
            axios
                .post("http://127.0.0.1:8000/api/admin/dang-nhap", this.login)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message)
                        localStorage.setItem('token_admin', res.data.token);
                        localStorage.setItem('ho_ten_admin', res.data.ho_ten_admin);
                        localStorage.setItem('avatar_admin', res.data.avatar_admin);
                        localStorage.setItem("id_nhan_vien", res.data.id_nhan_vien);
                        localStorage.setItem("id_chuc_vu", res.data.id_chuc_vu);
                        localStorage.setItem("ten_chuc_vu", res.data.ten_chuc_vu);
                        localStorage.setItem("is_master", res.data.is_master);
                        this.$router.push('/admin/chi-tiet-ve');
                    }
                    else {
                        toaster.error(res.data.message)
                    }
                })
                .catch(() => {
                    toaster.error("Đăng nhập thất bại");
                });
        },
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
</style>