<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12">
                <ul class="nav nav-tabs mb-3">
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tabActive === 'list' }" @click="tabActive = 'list'"
                            href="javascript:void(0)">
                            <i class="bx bx-list-ul me-1"></i>Danh sách ghế
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" :class="{ active: tabActive === 'map' }" @click="tabActive = 'map'"
                            href="javascript:void(0)">
                            <i class="bx bx-grid-alt me-1"></i>Sơ đồ ghế
                        </a>
                    </li>
                </ul>

                <div v-if="tabActive === 'list'" class="card">
                    <div class="card-header">
                        <h5 class="mb-3">Danh Sách Ghế</h5>
                        <div class="row">
                            <div class="col-md-4 mb-2">
                                <select v-model="selectedPhongId" class="form-select" @change="layGheTheoPhong">
                                    <option value="">Tất cả phòng</option>
                                    <option v-for="(phong, index) in listPhong" :key="index" :value="phong.id">
                                        {{ phong.ten_phong }}
                                    </option>
                                </select>
                            </div>
                            <div class="col-md-8 mb-2">
                                <div class="input-group">
                                    <input v-model="filter.search" type="text" class="form-control"
                                        placeholder="Tìm kiếm theo tên ghế..." />
                                    <button @click="searchSeat()" class="btn btn-primary">
                                        <i class="bx bx-search me-1"></i>Tìm Kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Tên ghế</th>
                                        <th class="text-center">Phòng</th>
                                        <th class="text-center">Hàng/Cột</th>
                                        <th class="text-center">Loại ghế</th>
                                        <th class="text-center">Tình Trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in listGhe" :key="k">
                                        <tr>
                                            <th class="text-center align-middle">{{ k + 1 }}</th>
                                            <td class="text-center align-middle">{{ v.ten_ghe }}</td>
                                            <td class="text-center align-middle">{{ getPhongName(v.phong_id) }}</td>
                                            <td class="text-center align-middle">Hàng {{ v.hang }}, Cột {{ v.cot }}</td>
                                            <td class="text-center align-middle">
                                                <span v-if="v.loai_ghe == 1" class="badge bg-warning"
                                                    @click="doiLoaiGhe(v)" style="cursor: pointer">
                                                    VIP
                                                </span>
                                                <span v-else-if="v.loai_ghe == 0" class="badge bg-secondary"
                                                    @click="doiLoaiGhe(v)" style="cursor: pointer">
                                                    Thường
                                                </span>
                                                <span v-else class="badge bg-info" @click="doiLoaiGhe(v)"
                                                    style="cursor: pointer">
                                                    Đôi
                                                </span>
                                            </td>
                                            <td class="align-middle text-center">
                                                <button v-if="v.trang_thai == 1" @click="doiTrangThai(v)"
                                                    class="btn btn-success btn-sm">
                                                    Hoạt Động
                                                </button>
                                                <button v-else @click="doiTrangThai(v)" class="btn btn-danger btn-sm">
                                                    Bảo Trì
                                                </button>
                                            </td>

                                        </tr>
                                        <tr v-if="listGhe.length === 0">
                                            <td colspan="7" class="text-center py-3 text-muted">Không có dữ liệu ghế
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div v-if="tabActive === 'map'" class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Sơ đồ ghế</h5>
                        <select v-model="selectedPhongId" class="form-select w-auto" @change="layGheTheoPhong">
                            <option value="">-- Chọn phòng --</option>
                            <option v-for="(phong, index) in listPhong" :key="index" :value="phong.id">
                                {{ phong.ten_phong }}
                            </option>
                        </select>
                    </div>
                    <div class="card-body">
                        <div v-if="!selectedPhongId" class="text-center py-5">
                            <i class="bx bx-film text-muted" style="font-size: 4rem;"></i>
                            <p class="mt-3">Vui lòng chọn phòng để xem sơ đồ ghế</p>
                        </div>
                        <div v-else-if="Object.keys(soDoGhe).length === 0" class="text-center py-5">
                            <div class="spinner-border text-primary" role="status" v-if="isLoading">
                                <span class="visually-hidden">Đang tải...</span>
                            </div>
                            <div v-else>
                                <i class="bx bx-error-circle text-muted" style="font-size: 4rem;"></i>
                                <p class="mt-3">Không có dữ liệu ghế cho phòng này</p>
                            </div>
                        </div>
                        <div v-else>
                            <div class="text-center mb-4">
                                <div class="bg-secondary text-white py-2 rounded" style="width: 80%; margin: 0 auto;">
                                    <h5 class="mb-0">MÀN HÌNH</h5>
                                </div>
                            </div>

                            <div class="seat-map">
                                <div v-for="(hangGhe, hang) in soDoGhe" :key="hang"
                                    class="d-flex justify-content-center mb-2">
                                    <div class="seat-row-label me-3 d-flex align-items-center">
                                        <span class="badge bg-light text-dark">Hàng {{ hang }}</span>
                                    </div>
                                    <div v-for="(ghe, cot) in hangGhe" :key="cot" class="seat-item mx-1">
                                        <button :class="[
                                            'btn btn-sm',
                                            ghe.loai_ghe == 1 ? 'btn-warning' : ghe.loai_ghe == 2 ? 'btn-info' : 'btn-primary',
                                            ghe.trang_thai == 0 ? 'disabled opacity-50' : ''
                                        ]" @click="chonGhe(ghe)"
                                            :title="`${ghe.ten_ghe} - ${ghe.loai_ghe == 1 ? 'VIP' : 'Thường'}`">
                                            {{ ghe.ten_ghe }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex justify-content-center mt-4 flex-wrap">
                                <div class="d-flex align-items-center me-4 mb-2">
                                    <div class="btn-sm btn-primary me-2" style="width: 30px; height: 30px;"></div>
                                    <span>Ghế thường</span>
                                </div>
                                <div class="d-flex align-items-center me-4 mb-2">
                                    <div class="btn-sm btn-warning me-2"
                                        style="width: 30px; height: 30px; background-color: #ffc107;">
                                    </div>
                                    <span>Ghế VIP </span>
                                </div>
                                <div class="d-flex align-items-center me-4 mb-2">
                                    <div class="btn-sm me-2"
                                        style="width: 30px; height: 30px; background-color: #0dcaf0 ; "></div>
                                    <span>Ghế Đôi</span>
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
import baseRequest from '../../../core/baseRequest';

export default {
    data() {
        return {
            listGhe: [],
            listPhong: [],
            create_ghe: {
                ten_ghe: "",
                phong_id: "",
                hang: "",
                cot: "",
                loai_ghe: "0",
                trang_thai: "1"
            },
            update_ghe: {},
            delete_ghe: "",
            filter: {
                phong_id: "",
                search: ""
            },
            createMultiple: {
                phong_id: "",
                so_hang: 8,
                so_cot: 10,
                xoa_ghe_cu: false
            },

            tabActive: 'list',
            selectedPhongId: '',
            soDoGhe: {},
            isLoading: false,
            gheSelected: null,
            foundSeat: null,
            filteredSeats: [] // Danh sách ghế sau khi lọc
        };
    },
    mounted() {
        this.layDuLieuGhe();
        this.layDuLieuPhong();
    },
    methods: {
        //tim kiem ghe
        searchSeat() {
            console.log(this.filter.search);
            const query = (this.filter.search || '').toUpperCase(); // Đảm bảo query không bị undefined hoặc null

            // Lọc các ghế có tên giống hoặc chứa từ khóa tìm kiếm
            const foundSeats = this.listGhe.filter(
                ghe => ghe.ten_ghe.toUpperCase() === query
            );

            // Lưu kết quả vào foundSeat (mảng các đối tượng ghế tìm được)
            this.foundSeat = foundSeats;
            this.listGhe = this.foundSeat;
            console.log(this.foundSeat);
        }

        ,
        layDuLieuGhe() {
            baseRequest.get("ghe/search", { params: this.filter })
                .then((res) => {
                    this.listGhe = res.data.data;
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi tải dữ liệu ghế!");
                });
        },

        layDuLieuPhong() {
            baseRequest.get("phong/data")
                .then((res) => {
                    this.listPhong = res.data.phong;
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy dữ liệu phòng:", error);
                    toaster.error("Đã xảy ra lỗi khi tải dữ liệu phòng!");
                });
        },

        getPhongName(phongId) {
            const phong = this.listPhong.find(p => p.id == phongId);
            return phong ? phong.ten_phong : phongId;
        },

        doiTrangThai(ghe) {
            baseRequest.put("ghe/doi-trang-thai", { id: ghe.id })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDuLieuGhe();

                        // Cập nhật lại sơ đồ ghế nếu đang ở tab map
                        if (this.tabActive === 'map' && this.selectedPhongId) {
                            this.layGheTheoPhong();
                        }
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi đổi trạng thái ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi đổi trạng thái ghế!");
                });
        },

        doiLoaiGhe(ghe) {
            baseRequest.put("ghe/doi-loai-ghe", { id: ghe.id })
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDuLieuGhe();

                        // Cập nhật lại sơ đồ ghế nếu đang ở tab map
                        if (this.tabActive === 'map' && this.selectedPhongId) {
                            this.layGheTheoPhong();
                        }
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi đổi loại ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi đổi loại ghế!");
                });
        },

        layGheTheoPhong() {
            if (!this.selectedPhongId) {
                this.soDoGhe = {};
                return;
            }

            this.isLoading = true;
            baseRequest.get(`ghe/theo-phong/${this.selectedPhongId}`)
                .then((res) => {
                    if (res.data.status && res.data.so_do_ghe) {
                        this.soDoGhe = res.data.so_do_ghe;
                        this.listGhe = res.data.danh_sach_ghe;
                    } else {
                        this.soDoGhe = {};
                        toaster.info("Không có dữ liệu ghế cho phòng này");
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi lấy sơ đồ ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi tải sơ đồ ghế!");
                    this.soDoGhe = {};
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },

        chonGhe(ghe) {
            this.gheSelected = ghe;
            const modal = new bootstrap.Modal(document.getElementById('chiTietGheModal'));
            modal.show();
        },
    }
};
</script>

<style>
.card {
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    margin-bottom: 1.5rem;
}

.card-header {
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem;
}

.card-body {
    padding: 1rem;
}

.card-footer {
    background-color: #fff;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem;
}

.table th {
    background-color: #f8f9fa;
}

.badge {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.25rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
}

.badge:hover {
    opacity: 0.8;
    transform: translateY(-2px);
}

.btn {
    border-radius: 0.35rem;
    padding: 0.375rem 0.75rem;
    font-weight: 500;
    transition: all 0.2s;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}

.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}

.modal-content {
    border: none;
    border-radius: 0.5rem;
    overflow: hidden;
}

.modal-header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem;
}

.modal-body {
    padding: 1.5rem;
}

.modal-footer {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem;
}

/* Responsive */
@media (max-width: 768px) {

    .card-header,
    .card-body,
    .card-footer {
        padding: 0.75rem;
    }

    .btn-sm {
        display: block;
        width: 100%;
        margin-bottom: 0.5rem;
    }
}

.seat-map {
    max-width: 800px;
    margin: 0 auto;
    overflow-x: auto;
}

.seat-item {
    margin: 3px;
}

.seat-item button {
    width: 40px;
    height: 40px;
    padding: 0;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.seat-item button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.seat-row-label {
    width: 70px;
    text-align: right;
}

.nav-tabs .nav-link {
    cursor: pointer;
    padding: 0.75rem 1rem;
    border-radius: 0;
    color: #6c757d;
}

.nav-tabs .nav-link.active {
    color: #6e45e2;
    border-bottom: 2px solid #6e45e2;
    font-weight: 500;
}

/* Responsive cho sơ đồ ghế */
@media (max-width: 768px) {
    .seat-item button {
        width: 35px;
        height: 35px;
        font-size: 0.7rem;
    }

    .seat-row-label {
        width: 50px;
    }
}
</style>