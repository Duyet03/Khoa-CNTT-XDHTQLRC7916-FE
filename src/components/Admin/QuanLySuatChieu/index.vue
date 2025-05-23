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
                                                <input class="form-check-input" type="checkbox"
                                                    v-model="suat_create.tao_nhieu_suat" id="multipleTimeSlots">
                                                <label class="form-check-label" for="multipleTimeSlots">
                                                    Tạo nhiều suất chiếu
                                                </label>
                                            </div>
                                            <div v-if="suat_create.tao_nhieu_suat" class="mt-3">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <label>Thời gian dọn dẹp (phút)</label>
                                                        <input v-model="suat_create.thoi_gian_don_dep" type="number"
                                                            class="form-control mt-2" min="0" value="10">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label>Thời gian quảng cáo (phút)</label>
                                                        <input v-model="suat_create.thoi_gian_quang_cao" type="number"
                                                            class="form-control mt-2" min="0" value="10">
                                                    </div>
                                                </div>
                                                <div class="mt-3">
                                                    <label class="d-block mb-2">Chọn suất chiếu đầu tiên</label>
                                                    <div class="input-group">
                                                        <input type="time" class="form-control"
                                                            v-model="suat_create.gio_bat_dau">
                                                        <button @click="tinhToanSuatChieu" class="btn btn-primary">
                                                            <i class="fas fa-calculator me-1"></i>Tính toán suất chiếu
                                                        </button>
                                                    </div>
                                                </div>
                                                <div v-if="suat_create.danh_sach_suat.length > 0" class="mt-3">
                                                    <label class="d-block mb-2">Danh sách suất chiếu trong ngày</label>
                                                    <div class="list-group">
                                                        <div v-for="(suat, index) in suat_create.danh_sach_suat"
                                                            :key="index"
                                                            class="list-group-item d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <span class="badge bg-primary me-2">Suất {{ index + 1
                                                                    }}</span>
                                                                <span>{{ suat }}</span>
                                                            </div>
                                                            <button @click="xoaSuat1(index)"
                                                                class="btn btn-danger btn-sm">
                                                                <i class="fas fa-times"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else class="mt-2">
                                                <label>Giờ Bắt Đầu</label>
                                                <input v-model="suat_create.gio_bat_dau" type="time"
                                                    class="form-control mt-2">
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé</label>
                                            <input v-model="suat_create.gia_ve" type="number" min="0" step="1000"
                                                class="form-control mt-2" oninput="this.value = Math.abs(this.value)">
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé Vip</label>
                                            <input v-model="suat_create.gia_ve_vip" type="number" min="0" step="1000"
                                                class="form-control mt-2" oninput="this.value = Math.abs(this.value)">
                                        </div>
                                        <div class="mb-2">
                                            <label>Giá Vé Đôi</label>
                                            <input v-model="suat_create.gia_ve_doi" type="number" min="0" step="1000"
                                                class="form-control mt-2" oninput="this.value = Math.abs(this.value)">
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
                                        <div class="d-flex align-items-center">
                                            <div class="btn-group me-3">
                                                <button class="btn btn-outline-primary" @click="chuyenNgay(-1)"
                                                    :disabled="!coNgayTruoc">
                                                    <i class="fas fa-chevron-left"></i>
                                                </button>
                                                <button class="btn btn-outline-primary" style="min-width: 200px">
                                                    {{ formatDate(ngayHienTai) || 'Chọn ngày' }}
                                                </button>
                                                <button class="btn btn-outline-primary" @click="chuyenNgay(1)"
                                                    :disabled="!coNgaySau">
                                                    <i class="fas fa-chevron-right"></i>
                                                </button>
                                            </div>
                                            <button class="btn btn-outline-primary"
                                                v-on:click="capNhatTrangThaiTuDong()">
                                                <i class="bx bx-refresh me-1"></i>Cập nhật trạng thái tự động
                                            </button>
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center">#</th>
                                                        <th class="text-center">Phim</th>
                                                        <th class="text-center">Phòng</th>
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
                                                    <template v-if="suatTheoNgayHienTai.length > 0">
                                                        <tr v-for="(v, k) in suatTheoNgayHienTai" :key="v.id">
                                                            <th class="text-center align-middle">{{ k + 1 }}</th>
                                                            <td class="align-middle">{{ getTenPhim(v.phim_id) }}</td>
                                                            <td class="align-middle">{{ getTenPhong(v.phong_id) }}</td>
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
                                                                    class="badge bg-success">Đang chiếu</span>
                                                                <span v-else-if="v.trang_thai === 'Đã chiếu'"
                                                                    class="badge bg-secondary">Đã chiếu</span>
                                                                <span v-else-if="v.trang_thai === 'Hết vé'"
                                                                    class="badge bg-warning">Hết vé</span>
                                                                <span v-else-if="v.trang_thai === 'Hủy'"
                                                                    class="badge bg-danger">Hủy</span>
                                                                <span v-else class="badge bg-primary">{{ v.trang_thai
                                                                    }}</span>
                                                            </td>
                                                            <td class="text-center text-nowrap align-middle">
                                                                <button v-on:click="suaSuatChieu(v)"
                                                                    data-bs-toggle="modal" data-bs-target="#updateModal"
                                                                    class="btn btn-info me-1">Cập Nhật</button>
                                                                <button data-bs-toggle="modal"
                                                                    data-bs-target="#deleteModal"
                                                                    v-on:click="id_can_xoa = v.id"
                                                                    class="btn btn-danger">Xoá Bỏ</button>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                    <tr v-else>
                                                        <td colspan="10" class="text-center py-4">
                                                            <div class="text-muted">
                                                                <i class="fas fa-calendar-times fa-2x mb-3"></i>
                                                                <h5>Không có suất chiếu nào trong ngày này</h5>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <!-- Modal xoá suất chiếu -->
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
                                                            <div class="mb-2">
                                                                <label>Giá Vé</label>
                                                                <input v-model="suat_update.gia_ve" type="number"
                                                                    min="0" step="1000" class="form-control mt-2"
                                                                    oninput="this.value = Math.abs(this.value)">
                                                            </div>
                                                            <div class="mb-2">
                                                                <label>Giá Vé Vip</label>
                                                                <input v-model="suat_update.gia_ve_vip" type="number"
                                                                    min="0" step="1000" class="form-control mt-2"
                                                                    oninput="this.value = Math.abs(this.value)">
                                                            </div>
                                                            <div class="mb-2">
                                                                <label>Giá Vé Đôi</label>
                                                                <input v-model="suat_update.gia_ve_doi" type="number"
                                                                    min="0" step="1000" class="form-control mt-2"
                                                                    oninput="this.value = Math.abs(this.value)">
                                                            </div>
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
                tao_nhieu_suat: false,
                thoi_gian_don_dep: 10,
                thoi_gian_quang_cao: 10,
                danh_sach_suat: [],
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
            },
            timeSlotGroups: [
                ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
                ['06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
                ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
                ['18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
            ],
            customTime: '',
            ngayHienTai: '',
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
                    // Nếu chưa có ngày được chọn, chọn ngày đầu tiên
                    if (!this.ngayHienTai && this.danhSachNgay.length > 0) {
                        this.ngayHienTai = this.danhSachNgay[0];
                    }
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

        themSuatTuyChon() {
            if (this.customTime && !this.suat_create.danh_sach_suat.includes(this.customTime)) {
                this.suat_create.danh_sach_suat.push(this.customTime);
                this.customTime = '';
            } else if (this.suat_create.danh_sach_suat.includes(this.customTime)) {
                toaster.warning('Suất chiếu này đã được chọn!');
            }
        },

        resetForm() {
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
                tao_nhieu_suat: false,
                thoi_gian_don_dep: 10,
                thoi_gian_quang_cao: 10,
                danh_sach_suat: [],
                trang_thai: 'Sắp chiếu'
            };
            this.customTime = '';
        },

        themMoiSuat() {
            const today = new Date().setHours(0, 0, 0, 0);
            const ngayBatDau = new Date(this.suat_create.ngay_bat_dau).setHours(0, 0, 0, 0);

            if (ngayBatDau < today) {
                toaster.error("Không thể tạo suất chiếu cho ngày trong quá khứ!");
                return;
            }

            // Validate ticket prices
            if (this.suat_create.gia_ve < 0 || this.suat_create.gia_ve_vip < 0 || this.suat_create.gia_ve_doi < 0) {
                toaster.error("Giá vé không được nhỏ hơn 0!");
                return;
            }

            // Kiểm tra dữ liệu đầu vào
            if (!this.suat_create.phim_id || !this.suat_create.phong_id ||
                !this.suat_create.ngay_bat_dau || !this.suat_create.ngay_ket_thuc ||
                (!this.suat_create.tao_nhieu_suat && !this.suat_create.gio_bat_dau) ||
                (this.suat_create.tao_nhieu_suat && this.suat_create.danh_sach_suat.length === 0) ||
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

            // Sắp xếp danh sách suất theo thời gian
            const sortedSuatList = [...this.suat_create.danh_sach_suat].sort();

            // Lặp qua từng ngày
            for (let d = new Date(ngayBatDauObj); d <= ngayKetThucObj; d.setDate(d.getDate() + 1)) {
                if (this.suat_create.tao_nhieu_suat) {
                    // Tạo các suất theo danh sách đã chọn
                    sortedSuatList.forEach(gio => {
                        danhSachSuat.push({
                            ...this.suat_create,
                            ngay_chieu: new Date(d).toISOString().split('T')[0],
                            gio_bat_dau: gio,
                        });
                    });
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
                .post("suat-chieu/create-multiple", {
                    danh_sach_suat: danhSachSuat,
                    thoi_gian_don_dep: this.suat_create.thoi_gian_don_dep,
                    thoi_gian_quang_cao: this.suat_create.thoi_gian_quang_cao
                })
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.loadSuat();
                        // Reset form
                        this.resetForm();
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

        tinhToanSuatChieu() {
            if (!this.suat_create.phim_id || !this.suat_create.gio_bat_dau) {
                toaster.error("Vui lòng chọn phim và giờ bắt đầu!");
                return;
            }

            const phim = this.ds_phim.find(p => p.id == this.suat_create.phim_id);
            if (!phim || !phim.thoi_luong) {
                toaster.error("Không tìm thấy thông tin thời lượng phim!");
                return;
            }

            // Reset danh sách suất
            this.suat_create.danh_sach_suat = [];

            // Thời lượng một suất = thời lượng phim + thời gian dọn dẹp + thời gian quảng cáo
            const tongThoiLuong = parseInt(phim.thoi_luong) +
                parseInt(this.suat_create.thoi_gian_don_dep) +
                parseInt(this.suat_create.thoi_gian_quang_cao);

            // Tính toán các suất chiếu trong ngày
            let gioHienTai = this.parseTime(this.suat_create.gio_bat_dau);
            // Làm tròn giờ bắt đầu lên 10 phút
            gioHienTai = this.lamTronThoiGian(gioHienTai);

            const gioKetThuc = new Date(gioHienTai);
            gioKetThuc.setHours(23, 59, 59);

            while (gioHienTai <= gioKetThuc) {
                // Thêm suất hiện tại vào danh sách
                this.suat_create.danh_sach_suat.push(this.formatTime(gioHienTai));

                // Tính giờ bắt đầu suất tiếp theo và làm tròn
                gioHienTai = new Date(gioHienTai.getTime() + tongThoiLuong * 60000);
                gioHienTai = this.lamTronThoiGian(gioHienTai);
            }

            if (this.suat_create.danh_sach_suat.length === 0) {
                toaster.warning("Không thể tạo thêm suất chiếu nào trong ngày với thời lượng này!");
            }
        },

        lamTronThoiGian(date) {
            const minutes = date.getMinutes();
            const roundedMinutes = Math.ceil(minutes / 10) * 10;
            const newDate = new Date(date);

            if (roundedMinutes === 60) {
                // Nếu làm tròn lên 60 phút, tăng giờ lên 1 và đặt phút về 0
                newDate.setHours(date.getHours() + 1, 0, 0, 0);
            } else {
                newDate.setMinutes(roundedMinutes, 0, 0);
            }

            return newDate;
        },

        parseTime(timeString) {
            const [hours, minutes] = timeString.split(':').map(Number);
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        },

        formatTime(date) {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`;
        },

        xoaSuat1(index) {
            this.suat_create.danh_sach_suat.splice(index, 1);
        },

        chuyenNgay(buoc) {
            const viTriHienTai = this.danhSachNgay.indexOf(this.ngayHienTai);
            const viTriMoi = viTriHienTai + buoc;
            if (viTriMoi >= 0 && viTriMoi < this.danhSachNgay.length) {
                this.ngayHienTai = this.danhSachNgay[viTriMoi];
            }
        },
    },
    computed: {
        danhSachNgay() {
            const ngayChieu = [...new Set(this.ds_suat.map(suat => suat.ngay_chieu))];
            return ngayChieu.sort();
        },

        suatTheoNgayHienTai() {
            if (!this.ngayHienTai) return [];
            return this.ds_suat
                .filter(suat => suat.ngay_chieu === this.ngayHienTai)
                .sort((a, b) => a.gio_bat_dau.localeCompare(b.gio_bat_dau));
        },

        coNgayTruoc() {
            const viTriHienTai = this.danhSachNgay.indexOf(this.ngayHienTai);
            return viTriHienTai > 0;
        },

        coNgaySau() {
            const viTriHienTai = this.danhSachNgay.indexOf(this.ngayHienTai);
            return viTriHienTai < this.danhSachNgay.length - 1;
        }
    },
}
</script>

<style scoped>
.time-slots .btn-group {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    width: 100%;
}

.time-slots .btn {
    flex: 1;
    min-width: 90px;
    margin: 0;
    border-radius: 4px !important;
}

.time-slots .btn-check:checked+.btn {
    background-color: #0d6efd;
    color: white;
}

.btn-group-vertical {
    align-items: flex-start;
}

.list-group-item {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    margin-bottom: 0.5rem;
    border-radius: 0.25rem;
}

.badge {
    font-size: 0.875rem;
}

.btn-sm {
    padding: 0.25rem 0.5rem;
}
</style>