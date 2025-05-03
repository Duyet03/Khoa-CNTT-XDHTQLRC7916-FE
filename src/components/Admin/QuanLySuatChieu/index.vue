<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row align-items-center">
                            <div class="col-lg-3 col-xl-2">
                                <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                    data-bs-target="#taoSuatModal">
                                    <i class="bx bxs-plus-square"></i>Tạo Mới Suất Chiếu</button>
                            </div>
                        </div>
                        <div class="modal fade" id="taoSuatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Tạo Mới Suất Chiếu</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-2">
                                            <label>Chọn Phim</label>
                                            <select v-model="suat_create.phim_id" class="form-control mt-2">
                                                <option value="">-- Chọn phim --</option>
                                                <option v-for="(quan_ly_phim, k) in ds_phim" :key="k"
                                                    :value="quan_ly_phim.id">
                                                    {{ quan_ly_phim.ten_phim }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label>Chọn Phòng</label>
                                            <select v-model="suat_create.phong_id" class="form-control mt-2">
                                                <option value="">-- Chọn phòng --</option>
                                                <option v-for="(phong, k) in list_phong" :key="k" :value="phong.id">
                                                    {{ phong.ten_phong }}
                                                </option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label>Ngày Chiếu</label>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label class="small">Từ ngày</label>
                                                    <input type="date" v-model="suat_create.ngay_bat_dau"
                                                        class="form-control mt-2" :min="getCurrentDate()">
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="small">Đến ngày</label>
                                                    <input type="date" v-model="suat_create.ngay_ket_thuc"
                                                        class="form-control mt-2" :min="suat_create.ngay_bat_dau">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label>Cài đặt suất chiếu</label>
                                            <div class="form-check mt-2">
                                                <input class="form-check-input" type="checkbox" v-model="suat_create.tu_dong_chia_suat" id="autoTimeSlots">
                                                <label class="form-check-label" for="autoTimeSlots">
                                                    Tự động chia suất (mỗi 2.5 tiếng/suất, bắt đầu từ 00:00)
                                                </label>
                                            </div>
                                            <div v-if="!suat_create.tu_dong_chia_suat" class="mt-2">
                                                <label>Giờ Bắt Đầu</label>
                                                <input v-model="suat_create.gio_bat_dau" type="time"
                                                    class="form-control mt-2">
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé</label>
                                            <input v-model="suat_create.gia_ve" type="number" class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé Vip</label>
                                            <input v-model="suat_create.gia_ve_vip"  type="number" class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé Đôi</label>
                                            <input v-model="suat_create.gia_ve_doi"  type="number" class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Định Dạng</label>
                                            <select v-model="suat_create.dinh_dang" class="form-control mt-2">
                                                <option value="2D">2D</option>
                                                <option value="3D">3D</option>
                                                <option value="IMAX">IMAX</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label>Ngôn Ngữ</label>
                                            <select v-model="suat_create.ngon_ngu" class="form-control mt-2">
                                                <option value="Phụ đề">Phụ đề</option>
                                                <option value="Lồng tiếng">Lồng tiếng</option>
                                                <option value="Nguyên bản">Nguyên bản</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <label>Trạng Thái</label>
                                            <select v-model="suat_create.trang_thai" class="form-control">
                                                <option value="Sắp chiếu">Sắp chiếu</option>
                                                <option value="Đang chiếu">Đang chiếu</option>
                                                <option value="Hết vé">Hết vé</option>
                                                <option value="Hủy">Hủy</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Đóng</button>
                                        <button v-on:click="themMoiSuat()" type="button" class="btn btn-primary">Thêm
                                            Mới</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="card">
                <div class="card-body">
                    <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
                        <li class="nav-item" role="presentation" v-on:click="loadSuat()">
                            <a class="nav-link active" data-bs-toggle="tab" role="tab" aria-selected="true">
                                <div class="d-flex align-items-center">
                                    <div class="tab-icon me-1 text-danger fa-2x">
                                    </div>
                                    <div class="tab-title">Tất cả</div>
                                </div>
                            </a>
                        </li>
                        <template v-for="(v, k) in list_phong" :key="k">
                            <li class="nav-item" role="presentation" v-on:click="loadSuatTheoPhong(v)">
                                <a class="nav-link" data-bs-toggle="tab" v-bind:href="'#suat' + k" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon"><i class="bx bx-bookmark-alt font-18 me-1"></i>
                                        </div>
                                        <div class="tab-title">{{ v.ten_phong }}</div>
                                    </div>
                                </a>
                            </li>
                        </template>
                    </ul>
                    <div class="tab-content pt-3">
                        <div class="tab-pane fade show active" id="suat" role="tabpanel">
                            <div class="col-lg-12">
                                <div class="card">
                                    <div class="card-header d-flex justify-content-between align-items-center">
                                        <h5 class="mt-2">Danh Sách Suất Chiếu</h5>
                                        <button class="btn btn-outline-primary" v-on:click="capNhatTrangThaiTuDong()">
                                            <i class="bx bx-refresh me-1"></i>Cập nhật trạng thái tự động
                                        </button>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">#</th>
                                                        <th class="text-center">Phim</th>
                                                        <th class="text-center">Phòng</th>
                                                        <th class="text-center">Ngày Chiếu</th>
                                                        <th class="text-center">Giờ Bắt Đầu</th>
                                                        <th class="text-center">Giờ Kết Thúc</th>
                                                        <th class="text-center">Định Dạng</th>
                                                        <th class="text-center">Giá Vé</th>
                                                        <th class="text-center">Ghế Trống</th>
                                                        <th class="text-center">Trạng Thái</th>
                                                        <th class="text-center">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(v, k) in ds_suat" :key="k">
                                                        <th class="text-center align-middle">{{ k + 1 }}</th>
                                                        <td class="align-middle">{{ getTenPhim(v.phim_id) }}</td>
                                                        <td class="align-middle">{{ getTenPhong(v.phong_id) }}</td>
                                                        <td class="align-middle">{{ formatDate(v.ngay_chieu) }}</td>
                                                        <td class="align-middle">{{ v.gio_bat_dau }}</td>
                                                        <td class="align-middle">{{ v.gio_ket_thuc }}</td>
                                                        <td class="align-middle">{{ v.dinh_dang }}</td>
                                                        <td class="align-middle">{{ formatCurrency(v.gia_ve) }}</td>
                                                        <td class="align-middle text-center">
                                                            <button class="btn btn-sm btn-outline-info"
                                                                v-on:click="kiemTraGheTrong(v.id)">
                                                                Kiểm tra
                                                            </button>
                                                        </td>
                                                        <td class="text-center align-middle">
                                                            <span v-if="v.trang_thai === 'Sắp chiếu'"
                                                                class="badge bg-info">Sắp chiếu</span>
                                                            <span v-else-if="v.trang_thai === 'Đang chiếu'"
                                                                class="badge bg-success">Đang
                                                                chiếu</span>
                                                            <span v-else-if="v.trang_thai === 'Đã chiếu'"
                                                                class="badge bg-secondary">Đã
                                                                chiếu</span>
                                                            <span v-else-if="v.trang_thai === 'Hết vé'"
                                                                class="badge bg-warning">Hết
                                                                vé</span>
                                                            <span v-else-if="v.trang_thai === 'Hủy'"
                                                                class="badge bg-danger">Hủy</span>
                                                            <span v-else class="badge bg-primary">{{ v.trang_thai
                                                                }}</span>
                                                        </td>
                                                        <td class="text-center text-nowrap align-middle">
                                                            <button v-on:click="suaSuatChieu(v)" data-bs-toggle="modal"
                                                                data-bs-target="#updateModal"
                                                                class="btn btn-info me-1">Cập
                                                                Nhật</button>
                                                            <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                                                                v-on:click="id_can_xoa = v.id"
                                                                class="btn btn-danger">Xoá
                                                                Bỏ</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="modal fade" id="deleteModal" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá Suất
                                                            Chiếu
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="alert alert-danger" role="alert">
                                                            Bạn thật sự có muốn xoá suất chiếu này không?
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Đóng</button>
                                                        <button v-on:click="xoaSuat()" type="button"
                                                            class="btn btn-danger" data-bs-dismiss="modal">Xác Nhận
                                                            Xoá</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="updateModal" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật
                                                            Suất
                                                            Chiếu
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="mb-2">
                                                            <label>Chọn Phim</label>
                                                            <select v-model="suat_update.phim_id"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                                <option v-for="(phim, k) in ds_phim" :key="k"
                                                                    :value="phim.id">
                                                                    {{ phim.ten_phim }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Chọn Phòng</label>
                                                            <select v-model="suat_update.phong_id"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                                <option v-for="(phong, k) in list_phong" :key="k"
                                                                    :value="phong.id">
                                                                    {{ phong.ten_phong }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Ngày Chiếu</label>
                                                            <input v-model="suat_update.ngay_chieu" type="date"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Giờ Bắt Đầu</label>
                                                            <input v-model="suat_update.gio_bat_dau" type="time"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Giá Vé</label>
                                                            <input v-model="suat_update.gia_ve" type="number"
                                                                class="form-control mt-2">
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Định Dạng</label>
                                                            <select v-model="suat_update.dinh_dang"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                                <option value="2D">2D</option>
                                                                <option value="3D">3D</option>
                                                                <option value="IMAX">IMAX</option>
                                                            </select>
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Ngôn Ngữ</label>
                                                            <select v-model="suat_update.ngon_ngu"
                                                                class="form-control mt-2"
                                                                :disabled="suat_update.da_co_nguoi_dat">
                                                                <option value="Phụ đề">Phụ đề</option>
                                                                <option value="Lồng tiếng">Lồng tiếng</option>
                                                                <option value="Nguyên bản">Nguyên bản</option>
                                                            </select>
                                                        </div>
                                                        <div class="mb-2">
                                                            <label>Trạng Thái</label>
                                                            <select v-model="suat_update.trang_thai"
                                                                class="form-control">
                                                                <option value="Sắp chiếu">Sắp chiếu</option>
                                                                <option value="Đang chiếu">Đang chiếu</option>
                                                                <option value="Hết vé">Hết vé</option>
                                                                <option value="Hủy">Hủy</option>
                                                            </select>
                                                        </div>
                                                        <div v-if="suat_update.da_co_nguoi_dat"
                                                            class="alert alert-warning">
                                                            <i class="bx bx-info-circle me-1"></i>
                                                            Suất chiếu này đã có người đặt vé. Bạn chỉ có thể thay đổi
                                                            giá
                                                            vé và trạng thái.
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Đóng</button>
                                                        <button v-on:click="capNhatSuat()" type="button"
                                                            class="btn btn-info" data-bs-dismiss="modal">Xác Nhận Cập
                                                            Nhật</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal fade" id="gheTrongModal" tabindex="-1"
                                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thông tin
                                                            ghế
                                                        </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="text-center mb-3">
                                                            <h5>{{ thong_tin_ghe.ten_phim }}</h5>
                                                            <p>{{ formatDate(thong_tin_ghe.ngay_chieu) }} - {{
                                                                thong_tin_ghe.gio_bat_dau }}
                                                            </p>
                                                            <p>Phòng: {{ thong_tin_ghe.ten_phong }}</p>
                                                        </div>
                                                        <div class="row text-center">
                                                            <div class="col-md-4">
                                                                <div class="card bg-light">
                                                                    <div class="card-body">
                                                                        <h3>{{ thong_tin_ghe.tong_so_ghe }}</h3>
                                                                        <p>Tổng số ghế</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="card bg-success text-white">
                                                                    <div class="card-body">
                                                                        <h3>{{ thong_tin_ghe.so_ghe_trong }}</h3>
                                                                        <p>Ghế trống</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="card bg-danger text-white">
                                                                    <div class="card-body">
                                                                        <h3>{{ thong_tin_ghe.so_ghe_da_dat }}</h3>
                                                                        <p>Ghế đã đặt</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Đóng</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
            ds_suat: [],
            ds_phim: [],
            suat_create: {
                phim_id: '',
                phong_id: '',
                ngay_bat_dau: '',
                ngay_ket_thuc: '',
                gio_bat_dau: '',
                gia_ve: 50000,
                gia_ve_vip: 70000,
                gia_ve_doi: 100000,
                dinh_dang: '2D',
                ngon_ngu: 'Phụ đề',
                tu_dong_chia_suat: false,
                trang_thai: 'Sắp chiếu'
            },
            suat_update: {
                da_co_nguoi_dat: false
            },
            id_can_xoa: '',
            list_phong: [],
            thong_tin_ghe: {
                ten_phim: '',
                ten_phong: '',
                ngay_chieu: '',
                gio_bat_dau: '',
                tong_so_ghe: 0,
                so_ghe_trong: 0,
                so_ghe_da_dat: 0
            }
        }
    },
    mounted() {
        this.loadSuat();
        this.layDuLieuPhong();
        this.layDuLieuPhim();
    },
    methods: {
        getCurrentDate() {
            return new Date().toISOString().split('T')[0];
        },
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },

        formatDate(dateString) {
            if (!dateString) return '';
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString('vi-VN', options);
        },

        getTenPhim(phimId) {
            const phim = this.ds_phim.find(p => p.id == phimId);
            return phim ? phim.ten_phim : phimId;
        },

        getTenPhong(phongId) {
            const phong = this.list_phong.find(p => p.id == phongId);
            return phong ? phong.ten_phong : phongId;
        },

        layDuLieuPhong() {
            baseRequest
                .get('phong/data')
                .then((res) => {
                    this.list_phong = res.data.phong;
                })
                .catch(error => {
                    toaster.error("Lỗi khi lấy dữ liệu phòng: " + error.message);
                });
        },

        layDuLieuPhim() {
            baseRequest
                .get('admin/quan-ly-phim/lay-du-lieu')
                .then((res) => {
                    this.ds_phim = res.data.quan_ly_phim;
                })
                .catch(error => {
                    toaster.error("Lỗi khi lấy dữ liệu phim: " + error.message);
                });
        },

        loadSuat() {
            baseRequest
                .get('suat-chieu/data')
                .then((res) => {
                    this.ds_suat = res.data.suat;
                })
                .catch(error => {
                    toaster.error("Lỗi khi lấy dữ liệu suất chiếu: " + error.message);
                });
        },

        loadSuatTheoPhong(v) {
            baseRequest
                .get('suat-chieu/open-data?id=' + v.id)
                .then((res) => {
                    this.ds_suat = res.data.suat;
                })
                .catch(error => {
                    toaster.error("Lỗi khi lấy dữ liệu suất chiếu theo phòng: " + error.message);
                });
        },

        kiemTraGheTrong(suatId) {
            baseRequest
                .get('suat-chieu/so-ghe-trong/' + suatId)
                .then((res) => {
                    if (res.data.status) {
                        // Tìm thông tin suất chiếu
                        const suatChieu = this.ds_suat.find(s => s.id == suatId);
                        if (suatChieu) {
                            this.thong_tin_ghe = {
                                ten_phim: this.getTenPhim(suatChieu.phim_id),
                                ten_phong: this.getTenPhong(suatChieu.phong_id),
                                ngay_chieu: suatChieu.ngay_chieu,
                                gio_bat_dau: suatChieu.gio_bat_dau,
                                tong_so_ghe: res.data.tong_so_ghe,
                                so_ghe_trong: res.data.so_ghe_trong,
                                so_ghe_da_dat: res.data.so_ghe_da_dat
                            };

                            // Hiển thị modal
                            const gheTrongModal = new bootstrap.Modal(document.getElementById('gheTrongModal'));
                            gheTrongModal.show();
                        }
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(error => {
                    toaster.error("Lỗi khi kiểm tra ghế trống: " + error.message);
                });
        },

        capNhatTrangThaiTuDong() {
            baseRequest
                .get('suat-chieu/cap-nhat-trang-thai-tu-dong')
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch(error => {
                    toaster.error("Lỗi khi cập nhật trạng thái tự động: " + error.message);
                });
        },

        themMoiSuat() {
            const today = new Date().setHours(0, 0, 0, 0);
            const ngayBatDau = new Date(this.suat_create.ngay_bat_dau).setHours(0, 0, 0, 0);

            if (ngayBatDau < today) {
                toaster.error("Không thể tạo suất chiếu cho ngày trong quá khứ!");
                return;
            }

            // Kiểm tra dữ liệu đầu vào
            if (!this.suat_create.phim_id || !this.suat_create.phong_id ||
                !this.suat_create.ngay_bat_dau || !this.suat_create.ngay_ket_thuc ||
                (!this.suat_create.tu_dong_chia_suat && !this.suat_create.gio_bat_dau) ||
                !this.suat_create.gia_ve) {
                toaster.error("Vui lòng điền đầy đủ thông tin!");
                return;
            }

            // Kiểm tra ngày kết thúc phải sau ngày bắt đầu
            if (new Date(this.suat_create.ngay_ket_thuc) < new Date(this.suat_create.ngay_bat_dau)) {
                toaster.error("Ngày kết thúc phải sau ngày bắt đầu!");
                return;
            }

            let danhSachSuat = [];
            const ngayBatDauObj = new Date(this.suat_create.ngay_bat_dau);
            const ngayKetThucObj = new Date(this.suat_create.ngay_ket_thuc);

            // Lặp qua từng ngày
            for (let d = new Date(ngayBatDauObj); d <= ngayKetThucObj; d.setDate(d.getDate() + 1)) {
                if (this.suat_create.tu_dong_chia_suat) {
                    // Tạo các suất tự động, mỗi suất cách nhau 2.5 tiếng
                    const suatTrongNgay = this.taoSuatTuDong(new Date(d));
                    danhSachSuat = [...danhSachSuat, ...suatTrongNgay];
                } else {
                    // Tạo một suất với giờ được chọn
                    danhSachSuat.push({
                        ...this.suat_create,
                        ngay_chieu: new Date(d).toISOString().split('T')[0],
                    });
                }
            }

            // Gửi request tạo nhiều suất
            baseRequest
                .post("suat-chieu/create-multiple", { danh_sach_suat: danhSachSuat })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                        // Reset form
                        this.suat_create = {
                            phim_id: '',
                            phong_id: '',
                            ngay_bat_dau: '',
                            ngay_ket_thuc: '',
                            gio_bat_dau: '',
                            gia_ve: 50000,
                            gia_ve_vip: 70000,
                            gia_ve_doi: 100000,
                            dinh_dang: '2D',
                            ngon_ngu: 'Phụ đề',
                            tu_dong_chia_suat: false,
                            trang_thai: 'Sắp chiếu'
                        };
                        // Đóng modal
                        const modal = bootstrap.Modal.getInstance(document.getElementById('taoSuatModal'));
                        modal.hide();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Đã xảy ra lỗi: " + (error.response?.data?.message || error.message));
                });
        },

        taoSuatTuDong(ngay) {
            const danhSachSuat = [];
            const khoangThoiGian = 3 * 60; // 2.5 tiếng = 150 phút
            const soSuatTrongNgay = Math.floor(24 * 60 / khoangThoiGian); // Số suất có thể có trong 1 ngày

            for (let i = 0; i < soSuatTrongNgay; i++) {
                const phutBatDau = i * khoangThoiGian;
                const gio = Math.floor(phutBatDau / 60).toString().padStart(2, '0');
                const phut = (phutBatDau % 60).toString().padStart(2, '0');

                danhSachSuat.push({
                    ...this.suat_create,
                    ngay_chieu: ngay.toISOString().split('T')[0],
                    gio_bat_dau: `${gio}:${phut}`,
                });
            }

            return danhSachSuat;
        },

        suaSuatChieu(suat) {
            // Kiểm tra xem suất chiếu đã có người đặt vé chưa
            baseRequest
                .get('chi-tiet-ve/kiem-tra-dat-ve?suat_chieu_id=' + suat.id)
                .then((res) => {
                    // Sao chép dữ liệu suất chiếu vào biến suat_update
                    this.suat_update = JSON.parse(JSON.stringify(suat));

                    // Đánh dấu nếu đã có người đặt vé
                    this.suat_update.da_co_nguoi_dat = res.data.da_co_nguoi_dat;
                })
                .catch((error) => {
                    toaster.error("Đã xảy ra lỗi: " + (error.response?.data?.message || error.message));
                    // Vẫn hiển thị form cập nhật nhưng không đánh dấu đã có người đặt
                    this.suat_update = JSON.parse(JSON.stringify(suat));
                    this.suat_update.da_co_nguoi_dat = false;
                });
        },

        xoaSuat() {
            baseRequest
                .delete("suat-chieu/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Đã xảy ra lỗi: " + (error.response?.data?.message || error.message));
                });
        },

        capNhatSuat() {
            baseRequest
                .put("suat-chieu/update", this.suat_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Đã xảy ra lỗi: " + (error.response?.data?.message || error.message));
                });
        },

        doiTrangThai(suat) {
            baseRequest
                .put('suat-chieu/doi-trang-thai', { id: suat.id })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Đã xảy ra lỗi: " + (error.response?.data?.message || error.message));
                });
        },
    },
}
</script>

<style></style>