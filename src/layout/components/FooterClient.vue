<template>
    <footer class="footer">
    <div class="container">
            <div class="footer-content">
                <div class="row g-4">
                    <div class="col-md-3 footer-column">
                        <div class="footer-logo">
                            <h3 class="cinema-title">
                                <i class="fas fa-film"></i> CINEMA VIỆT NAM
                            </h3>
                            <p class="company-description">
                                Hệ thống rạp chiếu phim hiện đại, mang đến trải nghiệm xem phim tuyệt vời nhất cho khán giả.
                            </p>
                        </div>
                    </div>

                    <div class="col-md-3 footer-column">
                        <h5 class="footer-title">Thông Tin Công Ty</h5>
                        <div class="company-info">
                            <p class="company-name">CÔNG TY TNHH 5 THÀNH VIÊN CINEMA VIỆT NAM</p>
                            <p class="company-details">
                                <i class="fas fa-file-alt"></i> Giấy CNĐKDN: 0302575928
                            </p>
                            <p class="company-details">
                                <i class="fas fa-calendar-alt"></i> Đăng ký lần đầu: 02/05/2025
                            </p>
                        </div>
                    </div>

                    <div class="col-md-3 footer-column">
                        <h5 class="footer-title">Liên Hệ</h5>
                        <div class="contact-info">
                            <p class="address">
                                <i class="fas fa-map-marker-alt"></i> Tầng 5, Đại học Duy Tân, số 03 đường Quang Trung, Thành phố Đà Nẵng
                            </p>
                            <p class="hotline">
                                <i class="fas fa-phone"></i> <a href="tel:0357287014">(028) 3775 2524</a>
                            </p>
                            <p class="email">
                                <i class="fas fa-envelope"></i> <a href="mailto:dovandai2905@gmail.com">dovandai2905@gmail.com</a>
                            </p>
                        </div>
                    </div>

                    <div class="col-md-3 footer-column">
                        <h5 class="footer-title">Liên Kết</h5>
                        <div class="footer-links">
                            <a href="#" class="footer-link">
                                <i class="fas fa-user-friends"></i> Chính Sách Khách Hàng
                            </a>
                            <a href="#" class="footer-link">
                                <i class="fas fa-shield-alt"></i> Chính Sách Bảo Mật
                            </a>
                            <a href="#" class="footer-link">
                                <i class="fas fa-file-contract"></i> Điều Khoản Sử Dụng
                            </a>
                            <a href="#" class="footer-link">
                                <i class="fas fa-question-circle"></i> Hỗ Trợ
                            </a>
                        </div>
                        <div class="social-links">
                            <h5 class="social-title">Kết Nối Với Chúng Tôi</h5>
                            <div class="social-icons">
                                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                            </div>
                </div>

                <div class="footer-copyright">
                    <p>COPYRIGHT @CINEMA VIỆT NAM - ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </div>
    </footer>
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

<style scoped>
.footer {
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
    padding: 40px 0;
    margin-top: 20px;
    border-top: 4px solid #ff4d4d;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer-column {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.footer-logo {
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.cinema-title {
    color: #ff4d4d;
    font-size: 1.8em;
    font-weight: bold;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.cinema-title i {
    font-size: 1.2em;
    color: #ff4d4d;
}

.footer-logo img {
    height: 80px;
    width: auto;
    margin-bottom: 15px;
}

.company-description {
    color: #e0e0e0;
    line-height: 1.6;
    font-size: 0.9em;
}

.footer-title {
    color: #ff4d4d;
    font-size: 1.2em;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.footer-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 2px;
    background: #ff4d4d;
}

.company-info, .contact-info, .footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex-grow: 1;
}

.company-name {
    font-weight: bold;
    color: #ffffff;
    margin-bottom: 5px;
}

.company-details, .address, .hotline, .email {
    color: #e0e0e0;
    font-size: 0.9em;
    line-height: 1.5;
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

.company-details i, .address i, .hotline i, .email i {
    color: #ff4d4d;
    margin-top: 0.2rem;
}

.footer-link {
    color: #e0e0e0;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.9em;
    display: flex;
    align-items: center;
    gap: 8px;
}

.footer-link:hover {
    color: #ff4d4d;
    transform: translateX(5px);
}

.footer-link i {
    color: #ff4d4d;
}

.hotline a, .email a {
    color: #ff4d4d;
    text-decoration: none;
}

.hotline a:hover, .email a:hover {
    text-decoration: underline;
}

.social-links {
    margin-top: auto;
}

.social-title {
    color: #ff4d4d;
    font-size: 1.1em;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.social-icons {
    display: flex;
    gap: 15px;
}

.social-icon {
    color: #e0e0e0;
    font-size: 1.5em;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 77, 77, 0.1);
}

.social-icon:hover {
    color: #ffffff;
    background: #ff4d4d;
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(255, 77, 77, 0.3);
}

.footer-copyright {
    text-align: center;
    color: #999;
    font-size: 0.9em;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 77, 77, 0.2);
}

@media (max-width: 768px) {
    .footer {
        padding: 30px 0;
    }
    
    .cinema-title {
        justify-content: center;
    }
    
    .footer-logo {
        text-align: center;
    }
    
    .footer-title {
        text-align: center;
    }
    
    .footer-title::after {
        left: 50%;
        transform: translateX(-50%);
    }
    
    .company-info, .contact-info, .footer-links {
        text-align: center;
    }

    .company-details, .address, .hotline, .email, .footer-link {
        justify-content: center;
    }
    
    .social-icons {
        justify-content: center;
    }
}
</style>