<template>
    <div class="container">
        <div class="slide">
            <div id="carouselExampleControlsNoTouching" class="carousel slide" data-bs-touch="false">
                <div class="carousel-inner">
                    <template v-for="(v, k) in ds_slide.filter(slide => slide.tinh_trang == 1)" :key="k">
                        <template v-if="k == 0">
                            <div class="carousel-item active">
                                <img v-bind:src="v.link_hinh_anh" class="d-block w-100" style="height: 300px;"
                                    alt="...">
                            </div>
                        </template>
                        <template v-else>
                            <div class="carousel-item">
                                <img v-bind:src="v.link_hinh_anh" class="d-block w-100" style="height: 300px;"
                                    alt="...">
                            </div>
                        </template>
                    </template>
                </div>

                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching"
                    data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    </div>
    <div class="footer text-center" style="background-color: darkgrey;">
        <img style="height: 100px;width: 300px;" alt="Lotte Cinema Logo"
            src="../../assets/images/Screen Shot 2024-12-21 at 15.10.30.png" />
        <p>
            <a href="#">
                Chính Sách Khách Hàng Thường Xuyên
            </a>
            |
            <a href="#">
                Chính Sách Bảo Mật Thông Tin
            </a>
            |
            <a href="#">
                Điều Khoản Sử Dụng
            </a>
        </p>
        <p>
            CÔNG TY TNHH 5 THÀNH VIÊN CINEMA VIỆT NAM
        </p>
        <p>
            Giấy CNĐKDN: 0302575928, đăng ký lần đầu ngày 02/05/2008, đăng ký thay đổi lần thứ 10 ngày
            30/03/2018, cấp
            bởi Sở KHĐT Thành phố Hồ Chí Minh
        </p>
        <p>
            Địa chỉ: Tầng 3, TTTM Lotte, số 469 đường Nguyễn Hữu Thọ, Phường Tân Hưng, Quận 7, TPHCM, Việt Nam
        </p>
        <p>
            Hotline: (028) 3775 2524
        </p>
        <p>
            COPYRIGHT @ LOTTECINEMAVN.COM - ALL RIGHTS RESERVED.
        </p>
    </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {

            ds_slide: [],
        }
    },
    mounted() {

        this.layDuLieuSlide();
    },
    methods: {
        layDuLieuReview() {
            axios
                .get('http://127.0.0.1:8000/api/review/data')
                .then((res) => {
                    this.ds_review = res.data.review;
                })
        },
        layDuLieuSlide() {
            axios
                .get('http://127.0.0.1:8000/api/slide/data')
                .then((res) => {
                    this.ds_slide = res.data.slide;
                })
        },
    },
}
</script>
<style></style>