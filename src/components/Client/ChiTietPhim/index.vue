<template>
    <div>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
        <!-- Video Trailer -->
        <div style="margin: 10px">
            <iframe class="d-block w-100" style="height: 650px" v-if="phim_chi_tiet.trailer_ytb"
                :src="phim_chi_tiet.trailer_ytb + '&autoplay=1&mute=1'" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>

        <!-- Main Content -->
        <div class="container">
            <div class="row g-0 movie-details mb-3 mt-3">
                <!-- Poster -->
                <div class="col-md-3">
                    <img :src="phim_chi_tiet.hinh_anh" class="img-fluid rounded-start movie-poster" alt="..."
                        style="width: 100%; height: auto; object-fit: cover" />
                </div>

                <!-- Movie Info -->
                <div class="col-md-9">
                    <div class="card-body p-4">
                        <div class="movie-header mb-4">
                            <h4 class="card-title mb-2 movie-font d-flex align-items-center">
                                <b>{{ phim_chi_tiet.ten_phim }}</b>
                                <span class="badge bg-warning text-dark ms-2">T18</span>
                            </h4>
                            <div class="movie-meta d-flex align-items-center gap-4 mb-3">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-clock me-2"></i>
                                    <span>{{ phim_chi_tiet.thoi_gian || "122" }} Phút</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-calendar-event me-2"></i>
                                    <span>{{ phim_chi_tiet.ngay_chieu }}</span>
                                </div>
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-star-fill text-warning me-2"></i>
                                    <span><b>{{ phim_chi_tiet.danh_gia || "8.3" }}</b> (261
                                        votes)</span>
                                </div>
                            </div>
                        </div>

                        <div class="movie-details-grid">
                            <div class="detail-item">
                                <div class="detail-label">Quốc gia</div>
                                <div class="detail-value">
                                    {{ phim_chi_tiet.quoc_gia || "Việt Nam" }}
                                </div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Nhà sản xuất</div>
                                <div class="detail-value">
                                    {{ phim_chi_tiet.nha_san_xuat || "Đang cập nhật" }}
                                </div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Thể loại</div>
                                <div class="detail-value">
                                    {{ phim_chi_tiet.ten_the_loai || "Kinh Dị" }}
                                </div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Đạo diễn</div>
                                <div class="detail-value">
                                    {{ phim_chi_tiet.dao_dien || "Pom Nguyên" }}
                                </div>
                            </div>
                            <div class="detail-item">
                                <div class="detail-label">Diễn viên</div>
                                <div class="detail-value">
                                    {{ phim_chi_tiet.dien_vien || "Quang Tuấn, Khả Như" }}
                                </div>
                            </div>
                        </div>

                        <div class="text-end mt-4">
                            <router-link :to="'/dat-suat/' + phim_id">
                                <button class="btn btn-danger btn-lg">
                                    <i class="bi bi-ticket-perforated me-2"></i>
                                    Đặt vé ngay
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <!-- Review Section -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="ms-3 mt-2">
                                <p>ĐÁNH GIÁ</p>
                            </h5>
                        </div>
                        <div class="card-body">
                            <textarea v-model="noi_dung" class="form-control"
                                placeholder="Bạn có thể đánh giá sau khi đăng nhập..." name="" id=""
                                rows="5"></textarea>
                        </div>
                        <div class="card-footer text-end">
                            <button @click="themDanhGia()" class="btn btn-danger">
                                Đánh giá ngay
                            </button>
                        </div>
                    </div>

                    <!-- Review History -->
                    <div class="card mb-4">
                        <div class="card-header">
                            <h5 class="mt-2">LỊCH SỬ ĐÁNH GIÁ</h5>
                        </div>
                        <div class="card-body">
                            <template v-for="(value, index) in paginatedDanhGia" :key="index">
                                <div class="review-item position-relative">
                                    <div class="action-icons" v-if="isOwner(value.id_khach_hang)">
                                        <i class="fas fa-edit edit-icon"
                                            @click="toggleEdit(getOriginalIndex(index))"></i>
                                        <i class="fas fa-trash-alt delete-icon" data-bs-toggle="modal"
                                            data-bs-target="#xacnhanModal" v-on:click="id_can_xoa = value.id"></i>
                                    </div>
                                    <div v-if="!value.isEditing">
                                        <p class="card-title1">
                                            <b>{{ value.ten_khach_hang }}</b> : {{ value.noi_dung }}
                                        </p>
                                    </div>
                                    <div v-else class="edit-form">
                                        <textarea v-model="value.noi_dung_edit" class="form-control mb-2"
                                            rows="3"></textarea>
                                        <div class="text-end">
                                            <button class="btn btn-sm btn-secondary me-2"
                                                @click="huyChinhSua(getOriginalIndex(index))">
                                                Hủy
                                            </button>
                                            <button class="btn btn-sm btn-primary" @click="luuChinhSua(value)">
                                                Lưu
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- Phân trang -->
                            <div class="d-flex justify-content-center align-items-center mt-4" v-if="totalPages > 1">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination mb-0">
                                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
                                                <i class="fas fa-chevron-left"></i>
                                            </a>
                                        </li>
                                        <li class="page-item" v-for="page in totalPages" :key="page"
                                            :class="{ active: currentPage === page }">
                                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page
                                                }}</a>
                                        </li>
                                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
                                                <i class="fas fa-chevron-right"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <!-- Modal xác nhận xóa -->
                    <div class="modal fade" id="xacnhanModal" tabindex="-1" aria-labelledby="xacnhanModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Xác nhận xóa</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Bạn có chắc chắn muốn xóa đánh giá này?
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Hủy
                                    </button>
                                    <button type="button" class="btn btn-danger" @click="xoaDanhGia(id_can_xoa)"
                                        data-bs-dismiss="modal">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from "axios";

export default {
    props: ["phim_id", "slug_phim"],
    data() {
        return {
            list_phim: [
                {
                    img: "",
                    name: "",
                    ngay: "",
                    tinh_trang: "",
                    slide1: "",
                    slide2: "",
                    slide3: "",
                    slide4: "",
                    xep_hang: "",
                    thoi_gian: "",
                    loai: "",
                    tom_tat: "",
                    danh_gia1: "",
                    danh_gia2: "",
                    danh_gia3: "",
                },
            ],
            phim_chi_tiet: {},
            phim_id: null,
            danh_sach_danh_gia: [],
            noi_dung: "",
            id_can_xoa: null,
            current_user_id: localStorage.getItem("id_khach_hang"),
            currentPage: 1,
            itemsPerPage: 5,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.danh_sach_danh_gia.length / this.itemsPerPage);
        },
        paginatedDanhGia() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.danh_sach_danh_gia.slice(start, end);
        },
    },
    mounted() {
        this.phim_id = this.$route.params.phim_id;
        console.log("Phim ID:", this.phim_id);
        this.loadDataPhimChiTiet();
        this.layDanhGia();
    },
    methods: {
        loadDataPhimChiTiet() {
            axios
                .get("http://127.0.0.1:8000/api/phim-chi-tiet/" + this.phim_id)
                .then((res) => {
                    this.phim_chi_tiet = res.data.data;
                });
        },
        layDanhGia() {
            axios
                .get("http://127.0.0.1:8000/api/lay-danh-gia/data/" + this.phim_id)
                .then((res) => {
                    if (res.data.data) {
                        this.danh_sach_danh_gia = res.data.data.map((item) => ({
                            ...item,
                            isEditing: false,
                            noi_dung_edit: item.noi_dung,
                        }));
                        console.log("Danh sách đánh giá:", this.danh_sach_danh_gia);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy đánh giá:", error);
                });
        },
        themDanhGia() {
            if (!this.noi_dung.trim()) {
                toaster.warning("Nội dung đánh giá không được để trống.");
                return;
            }

            const payload = {
                noi_dung: this.noi_dung,
                id_khach_hang: localStorage.getItem("id_khach_hang"),
                phim_id: this.phim_id,
            };

            axios
                .post("http://127.0.0.1:8000/api/khach-hang/danh-gia", payload, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
                    },
                })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDanhGia();
                        this.noi_dung = "";
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((err) => {
                    toaster.error("Có lỗi xảy ra. Vui lòng thử lại.");
                });
        },
        toggleEdit(index) {
            this.danh_sach_danh_gia[index].isEditing =
                !this.danh_sach_danh_gia[index].isEditing;
            this.danh_sach_danh_gia[index].noi_dung_edit =
                this.danh_sach_danh_gia[index].noi_dung;
        },
        huyChinhSua(index) {
            this.danh_sach_danh_gia[index].isEditing = false;
        },
        async luuChinhSua(danhGia) {
            try {
                const res = await axios.put(
                    "http://127.0.0.1:8000/api/khach-hang/danh-gia/update",
                    {
                        id: danhGia.id,
                        noi_dung: danhGia.noi_dung_edit,
                    },
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token_khachhang"),
                        },
                    }
                );
                if (res.data.status) {
                    toaster.success("Cập nhật đánh giá thành công!");
                    this.layDanhGia();
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi cập nhật đánh giá");
            }
        },
        async xoaDanhGia(id) {
            try {
                const res = await axios.delete(
                    `http://127.0.0.1:8000/api/khach-hang/danh-gia/delete/${id}`,
                    {
                        headers: {
                            Authorization:
                                "Bearer " + localStorage.getItem("token_khachhang"),
                        },
                    }
                );
                if (res.data.status) {
                    toaster.success("Xóa đánh giá thành công!");
                    this.layDanhGia();
                }
            } catch (error) {
                toaster.error("Có lỗi xảy ra khi xóa đánh giá");
            }
        },
        changePage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        getOriginalIndex(paginatedIndex) {
            return (this.currentPage - 1) * this.itemsPerPage + paginatedIndex;
        },
        isOwner(id_khach_hang) {
            return id_khach_hang == this.current_user_id;
        },
    },
};
</script>

<style scoped>
/* Movie Details */
.movie-details {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.movie-poster {
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-body {
    padding: 1.5rem;
}

.movie-font {
    font-family: "Poppins", sans-serif;
}

.card-title {
    font-size: 1.8rem;
}

.card-title .badge {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
}

.card-text {
    font-size: 1rem;
    color: #333;
}

.card-text strong {
    color: #666;
}

.text-warning {
    color: #ff6200 !important;
}

.btn-danger {
    background-color: #dc3545;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    border-radius: 5px;
}

.btn-danger:hover {
    background-color: #c82333;
}

/* Bootstrap Icons */
.bi {
    font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
    .movie-details {
        margin: 0 10px;
    }

    .movie-poster {
        max-height: 300px;
    }

    .card-title {
        font-size: 1.5rem;
    }

    .card-title .badge {
        font-size: 0.9rem;
    }

    .card-text {
        font-size: 0.9rem;
    }

    .btn-danger {
        padding: 0.4rem 0.8rem;
        font-size: 0.9rem;
    }

    .col-md-3,
    .col-md-9 {
        flex: 0 0 100%;
        max-width: 100%;
    }
}

@media (max-width: 576px) {
    iframe {
        height: 200px;
    }

    .movie-poster {
        max-height: 250px;
    }

    .card-title {
        font-size: 1.2rem;
    }

    .card-title .badge {
        font-size: 0.8rem;
    }

    .card-text {
        font-size: 0.85rem;
    }

    .btn-danger {
        padding: 0.3rem 0.6rem;
        font-size: 0.85rem;
    }
}

/* Section Title */
.section-title {
    position: relative;
    padding-bottom: 10px;
    font-weight: 600;
    color: #333;
}

.section-title:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 3px;
    background-color: #e50914;
}

.review-item {
    padding: 15px;
    border-bottom: 1px solid #eee;
    position: relative;
}

.action-icons {
    position: absolute;
    top: 10px;
    right: 10px;
}

.edit-icon,
.delete-icon {
    cursor: pointer;
    margin-left: 10px;
    font-size: 16px;
}

.edit-icon {
    color: #2196f3;
}

.delete-icon {
    color: #f44336;
}

.edit-icon:hover,
.delete-icon:hover {
    opacity: 0.7;
}

.edit-form {
    margin-top: 10px;
}

.edit-form textarea {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    border-radius: 3px;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: white;
}

.btn-primary {
    background-color: #0d6efd;
    border-color: #0d6efd;
    color: white;
}

.pagination {
    margin-bottom: 0;
}

.page-link {
    color: #dc3545;
    padding: 0.5rem 0.75rem;
    border-color: #dee2e6;
}

.page-link:hover {
    color: #c82333;
    background-color: #f8f9fa;
    border-color: #dee2e6;
}

.page-item.active .page-link {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
    border-color: #dee2e6;
}

.review-item:last-child {
    border-bottom: none;
}

/* New styles for movie info section */
.movie-header {
    border-bottom: 2px solid #f0f0f0;
}

.movie-meta {
    color: #666;
    font-size: 0.95rem;
}

.movie-details-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 1.5rem;
}

.detail-item {
    padding: 0.5rem;
    transition: all 0.3s ease;
}

.detail-item:hover {
    background-color: #f8f9fa;
    border-radius: 8px;
}

.detail-label {
    font-weight: 600;
    color: #666;
    font-size: 0.9rem;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
}

.detail-value {
    color: #333;
    font-size: 1rem;
}

.btn-lg {
    padding: 0.8rem 2rem;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.btn-lg:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.2);
}

@media (max-width: 768px) {
    .movie-details-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .movie-meta {
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;
    }
}
</style>
