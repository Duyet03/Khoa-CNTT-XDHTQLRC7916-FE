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
                <div class="form-body">
                    <form class="row g-3">
                        <h4 class="font-weight-bold text-center">Quên Mật Khẩu?</h4>
                        <p class="text-muted">Vui lòng nhập email tài khoản của bạn để có thể đổi lại mật khẩu mới
                        </p>
                        <div class="col-12">
                            <label class="form-label">Email</label>
                            <div class="input-group mb-3 mt-1">
                                <span class="input-group-text"><i class="fa-solid fa-envelope"></i></span>
                                <input v-model="tai_khoan.email" type="email" class="form-control form-control-lg"
                                    placeholder="example@user.com">
                            </div>
                        </div>
                        <div class="col-12">
                            <button v-on:click="gui()" type="button" class="btn btn-primary w-100">Gửi</button>
                        </div>
                        <div class="col-12 text-end me-2">
                            <router-link to="/login">
                                <a href="/login"><i class='bx bx-arrow-back m-2'></i>Quay Lại Đăng Nhập</a>
                            </router-link>
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
            tai_khoan: {},
        }
    },
    methods: {
        gui() {
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/quen-mat-khau", this.tai_khoan)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.$router.push('/login');
                    } else {
                        toaster.error(res.data.message);
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