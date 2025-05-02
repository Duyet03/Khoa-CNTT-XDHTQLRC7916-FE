<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-12">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">Thêm Ghế Mới</h6>
                        <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                            data-bs-target="#taoNhieuGheModal">
                            <i class="bx bx-grid"></i> Tạo nhiều ghế
                        </button>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">Tên ghế</label>
                            <input v-model="create_ghe.ten_ghe" type="text" class="form-control"
                                placeholder="Ví dụ: A1, B2..." />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phòng</label>
                            <select v-model="create_ghe.phong_id" class="form-select">
                                <option value="">-- Chọn phòng --</option>
                                <option v-for="(phong, index) in listPhong" :key="index" :value="phong.id">
                                    {{ phong.ten_phong }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Hàng</label>
                            <input v-model="create_ghe.hang" type="number" class="form-control"
                                placeholder="Số thứ tự hàng" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Cột</label>
                            <input v-model="create_ghe.cot" type="number" class="form-control"
                                placeholder="Số thứ tự cột" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Loại ghế</label>
                            <select v-model="create_ghe.loai_ghe" class="form-select">
                                <option value="0">Ghế thường</option>
                                <option value="1">Ghế VIP</option>
                                <option value="2">Ghế Đôi</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tình trạng ghế</label>
                            <select v-model="create_ghe.trang_thai" class="form-select">
                                <option value="1">Hoạt Động</option>
                                <option value="0">Đang Bảo Trì</option>
                            </select>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-grid">
                            <button v-on:click="themMoiGhe()" class="btn btn-primary">
                                <i class="bx bx-plus-circle me-1"></i>Thêm Mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-9 col-md-12">
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
                                <select v-model="filter.phong_id" class="form-select" @change="layDuLieuGhe()">
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
                                    <button @click="layDuLieuGhe()" class="btn btn-primary">
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
                                        <th class="text-center">Thao tác</th>
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
                                            <span v-if="v.loai_ghe == 1" class="badge bg-warning" @click="doiLoaiGhe(v)"
                                                style="cursor: pointer">
                                                VIP
                                            </span>
                                            <span v-else-if="v.loai_ghe == 0" class="badge bg-secondary" @click="doiLoaiGhe(v)"
                                                style="cursor: pointer">
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
                                        <td class="text-center align-middle">
                                            <button v-on:click="suaGhe(v)" class="btn btn-sm btn-info me-1">
                                                <i class="bx bx-edit-alt me-1"></i>Sửa
                                            </button>
                                            <button v-on:click="xacNhanXoa(v.id)" class="btn btn-sm btn-danger">
                                                <i class="bx bx-trash me-1"></i>Xóa
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="listGhe.length === 0">
                                        <td colspan="7" class="text-center py-3 text-muted">Không có dữ liệu ghế</td>
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
                                            ghe.loai_ghe == 1 ? 'btn-warning' : 'btn-primary',
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
                                    <div class="btn-sm btn-warning me-2" style="width: 30px; height: 30px;"></div>
                                    <span>Ghế VIP</span>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <div class="btn-sm btn-primary disabled opacity-50 me-2"
                                        style="width: 30px; height: 30px;"></div>
                                    <span>Ghế đang bảo trì</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal cập nhật ghế -->
        <div class="modal fade" id="capnhapgheModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bx bx-edit me-1"></i>Cập nhật ghế
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Tên ghế</label>
                            <input v-model="update_ghe.ten_ghe" class="form-control" type="text" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phòng</label>
                            <select v-model="update_ghe.phong_id" class="form-select">
                                <option v-for="(phong, index) in listPhong" :key="index" :value="phong.id">
                                    {{ phong.ten_phong }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Hàng</label>
                            <input v-model="update_ghe.hang" class="form-control" type="number" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Cột</label>
                            <input v-model="update_ghe.cot" class="form-control" type="number" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Loại ghế</label>
                            <select v-model="update_ghe.loai_ghe" class="form-select">
                                <option value="0">Ghế thường</option>
                                <option value="1">Ghế VIP</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tình Trạng</label>
                            <select v-model="update_ghe.trang_thai" class="form-select">
                                <option value="0">Bảo Trì</option>
                                <option value="1">Hoạt Động</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Đóng
                        </button>
                        <button v-on:click="capNhapGhe()" type="button" class="btn btn-primary" data-bs-dismiss="modal">
                            <i class="bx bx-save me-1"></i>Lưu Thay Đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal xóa ghế -->
        <div class="modal fade" id="xoagheModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">
                            <i class="bx bx-trash me-1"></i>Xóa Ghế
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <div class="mb-3">
                            <i class="bx bx-error-circle text-danger" style="font-size: 4rem;"></i>
                        </div>
                        <h5 class="mb-2">Xác nhận xóa</h5>
                        <p class="text-muted">Bạn có chắc chắn muốn xóa ghế này không? Hành động này không thể hoàn tác.
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Hủy
                        </button>
                        <button v-on:click="xoaGhe()" type="button" data-bs-dismiss="modal" class="btn btn-danger">
                            <i class="bx bx-trash me-1"></i>Xác nhận xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal tạo nhiều ghế -->
        <div class="modal fade" id="taoNhieuGheModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            <i class="bx bx-grid me-1"></i>Tạo nhiều ghế cùng lúc
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Chọn phòng</label>
                            <select v-model="createMultiple.phong_id" class="form-select">
                                <option value="">-- Chọn phòng --</option>
                                <option v-for="(phong, index) in listPhong" :key="index" :value="phong.id">
                                    {{ phong.ten_phong }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Số hàng (1-26, A-Z)</label>
                            <input v-model="createMultiple.so_hang" type="number" min="1" max="26"
                                class="form-control" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Số cột</label>
                            <input v-model="createMultiple.so_cot" type="number" min="1" class="form-control" />
                        </div>
                        <div class="form-check mb-3">
                            <input v-model="createMultiple.xoa_ghe_cu" class="form-check-input" type="checkbox"
                                id="xoaGheCu" />
                            <label class="form-check-label" for="xoaGheCu">
                                Xóa tất cả ghế cũ của phòng này
                            </label>
                        </div>
                        <div class="alert alert-info">
                            <i class="bx bx-info-circle me-1"></i>
                            Hệ thống sẽ tạo ra một sơ đồ ghế dạng lưới với các hàng là chữ cái (A, B, C...) và các cột
                            là số (1, 2, 3...)
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Đóng
                        </button>
                        <button v-on:click="taoNhieuGhe()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">
                            <i class="bx bx-check me-1"></i>Tạo Ghế
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal chi tiết ghế -->
        <div class="modal fade" id="chiTietGheModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Chi tiết ghế</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" v-if="gheSelected">
                        <div class="text-center mb-3">
                            <span class="badge" :class="gheSelected.loai_ghe == 1 ? 'bg-warning' : 'bg-primary'"
                                style="font-size: 1.5rem;">
                                {{ gheSelected.ten_ghe }}
                            </span>
                        </div>
                        <table class="table">
                            <tr>
                                <th>Phòng:</th>
                                <td>{{ getPhongName(gheSelected.phong_id) }}</td>
                            </tr>
                            <tr>
                                <th>Vị trí:</th>
                                <td>Hàng {{ gheSelected.hang }}, Cột {{ gheSelected.cot }}</td>
                            </tr>
                            <tr>
                                <th>Loại ghế:</th>
                                <td>
                                    <span class="badge"
                                        :class="gheSelected.loai_ghe == 1 ? 'bg-warning' : 'bg-secondary'">
                                        {{ gheSelected.loai_ghe == 1 ? 'VIP' : 'Thường' }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Trạng thái:</th>
                                <td>
                                    <span class="badge"
                                        :class="gheSelected.trang_thai == 1 ? 'bg-success' : 'bg-danger'">
                                        {{ gheSelected.trang_thai == 1 ? 'Hoạt động' : 'Bảo trì' }}
                                    </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-info" @click="suaGhe(gheSelected)" data-bs-dismiss="modal">
                            <i class="bx bx-edit me-1"></i>Sửa ghế
                        </button>
                        <button type="button" class="btn btn-primary" @click="doiLoaiGhe(gheSelected)"
                            data-bs-dismiss="modal">
                            <i class="bx bx-transfer me-1"></i>Đổi loại ghế
                        </button>
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
            gheSelected: null
        };
    },
    mounted() {
        this.layDuLieuGhe();
        this.layDuLieuPhong();
    },
    methods: {
        layDuLieuGhe() {
            let params = {};
            if (this.filter.phong_id) {
                params.phong_id = this.filter.phong_id;
            }
            if (this.filter.search) {
                params.search = this.filter.search;
            }

            baseRequest.get("ghe/data", { params: params })
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

        themMoiGhe() {
            if (!this.create_ghe.ten_ghe || !this.create_ghe.phong_id || !this.create_ghe.hang || !this.create_ghe.cot) {
                toaster.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
                return;
            }

            baseRequest.post("ghe/create", this.create_ghe)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDuLieuGhe();
                        this.create_ghe = {
                            ten_ghe: "",
                            phong_id: "",
                            hang: "",
                            cot: "",
                            loai_ghe: "0",
                            trang_thai: "1"
                        };
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi thêm ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi thêm ghế mới!");
                });
        },

        suaGhe(ghe) {
            this.update_ghe = JSON.parse(JSON.stringify(ghe));
            const modal = new bootstrap.Modal(document.getElementById('capnhapgheModal'));
            modal.show();
        },

        capNhapGhe() {
            if (!this.update_ghe.ten_ghe || !this.update_ghe.phong_id || !this.update_ghe.hang || !this.update_ghe.cot) {
                toaster.error("Vui lòng nhập đầy đủ thông tin bắt buộc!");
                return;
            }

            baseRequest.put("ghe/update", this.update_ghe)
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
                    console.error("Lỗi khi cập nhật ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi cập nhật ghế!");
                });
        },

        xacNhanXoa(id) {
            this.delete_ghe = id;
            const modal = new bootstrap.Modal(document.getElementById('xoagheModal'));
            modal.show();
        },

        xoaGhe() {
            baseRequest.delete("ghe/delete/" + this.delete_ghe)
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
                    console.error("Lỗi khi xóa ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi xóa ghế!");
                });
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

        taoNhieuGhe() {
            if (!this.createMultiple.phong_id || !this.createMultiple.so_hang || !this.createMultiple.so_cot) {
                toaster.error("Vui lòng nhập đầy đủ thông tin!");
                return;
            }

            if (this.createMultiple.so_hang > 26) {
                toaster.error("Số hàng không được vượt quá 26 (A-Z)!");
                return;
            }

            baseRequest.post("ghe/create-multiple", this.createMultiple)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layDuLieuGhe();
                        this.createMultiple = {
                            phong_id: "",
                            so_hang: 8,
                            so_cot: 10,
                            xoa_ghe_cu: false
                        };
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi tạo nhiều ghế:", error);
                    toaster.error("Đã xảy ra lỗi khi tạo nhiều ghế!");
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