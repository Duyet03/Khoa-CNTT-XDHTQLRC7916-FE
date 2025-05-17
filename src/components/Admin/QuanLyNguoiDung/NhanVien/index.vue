<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row align-items-center mb-3">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary w-100" data-bs-toggle="modal"
                                data-bs-target="#taoPhongModal">
                                <i class="bx bxs-plus-square me-1"></i> Thêm nhân viên
                            </button>
                        </div>
                    </div>
                    <!-- Modal Thêm Nhân Viên -->
                    <div class="modal fade" id="taoPhongModal" tabindex="-1" aria-labelledby="modalTaoNhanVien"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header bg-primary text-white">
                                    <h5 class="modal-title" id="modalTaoNhanVien">
                                        <i class="bx bxs-user-plus me-2"></i>Thêm mới nhân viên
                                    </h5>
                                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                                        aria-label="Đóng"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row g-3">
                                        <div class="col-md-6">
                                            <label class="form-label">Họ và tên nhân viên</label>
                                            <input v-model="nhan_vien_create.ten_nhan_vien" type="text"
                                                class="form-control" placeholder="Nhập họ và tên" />
                                            <div v-if="errors_nv.ten_nhan_vien" class="text-danger small mt-1">
                                                {{ errors_nv.ten_nhan_vien }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Ngày sinh</label>
                                            <input v-model="nhan_vien_create.ngay_sinh" type="date"
                                                class="form-control" :max="new Date().toISOString().split('T')[0]" />
                                            <div v-if="errors_nv.ngay_sinh" class="text-danger small mt-1">
                                                {{ errors_nv.ngay_sinh }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Số điện thoại</label>
                                            <input v-model="nhan_vien_create.sdt" type="text" class="form-control"
                                                placeholder="Nhập số điện thoại" />
                                            <div v-if="errors_nv.sdt" class="text-danger small mt-1">
                                                {{ errors_nv.sdt }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Email</label>
                                            <input v-model="nhan_vien_create.email" type="text" class="form-control"
                                                placeholder="Nhập email" />
                                            <div v-if="errors_nv.email" class="text-danger small mt-1">
                                                {{ errors_nv.email }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Mật khẩu</label>
                                            <input v-model="nhan_vien_create.password" type="password"
                                                class="form-control" placeholder="Nhập mật khẩu" />
                                            <div v-if="errors_nv.password" class="text-danger small mt-1">
                                                {{ errors_nv.password }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Ngày bắt đầu làm việc</label>
                                            <input v-model="nhan_vien_create.ngay_bat_dau" type="date"
                                                class="form-control"/>
                                            <div v-if="errors_nv.ngay_bat_dau" class="text-danger small mt-1">
                                                {{ errors_nv.ngay_bat_dau }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Chức vụ</label>
                                            <select v-model="nhan_vien_create.id_chuc_vu" class="form-select">
                                                <template v-for="(v, k) in list_chuc_vu" :key="k">
                                                    <option v-bind:value="v.id">{{ v.ten_chuc_vu }}</option>
                                                </template>
                                            </select>
                                            <div v-if="errors_nv.id_chuc_vu" class="text-danger small mt-1">
                                                {{ errors_nv.id_chuc_vu }}
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <label class="form-label">Ảnh đại diện (URL)</label>
                                            <input v-model="nhan_vien_create.avatar" type="text" class="form-control"
                                                placeholder="Nhập đường dẫn ảnh" />
                                            <div v-if="errors_nv.avatar" class="text-danger small mt-1">
                                                {{ errors_nv.avatar }}
                                            </div>
                                        </div>
                                        <div class="col-md-12">
                                            <label class="form-label">Tình trạng</label>
                                            <select v-model="nhan_vien_create.tinh_trang" class="form-select">
                                                <option value="1">Hoạt động</option>
                                                <option value="0">Tạm dừng</option>
                                            </select>
                                            <div v-if="errors_nv.tinh_trang" class="text-danger small mt-1">
                                                {{ errors_nv.tinh_trang }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Đóng
                                    </button>
                                    <button v-on:click="themNhanVien()" type="button" class="btn btn-primary">
                                        <i class="bx bxs-save me-1"></i> Thêm mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Kết thúc modal thêm -->
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-4">
        <div class="col-lg-12">
            <div class="card shadow-sm">
                <div class="card-header bg-light">
                    <h5 class="mt-2 mb-0"><i class="bx bxs-group me-2"></i>Danh sách nhân viên</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover align-middle">
                            <thead class="table-light">
                                <tr class="text-center">
                                    <th>STT</th>
                                    <th>Họ và tên</th>
                                    <th>Ngày sinh</th>
                                    <th>Số điện thoại</th>
                                    <th>Email</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Chức vụ</th>
                                    <th>Ảnh đại diện</th>
                                    <th>Tình trạng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_nhan_vien" :key="k">
                                    <tr>
                                        <td class="text-center">{{ k + 1 }}</td>
                                        <td>{{ v.ten_nhan_vien }}</td>
                                        <td class="text-center">{{ v.ngay_sinh }}</td>
                                        <td class="text-center">{{ v.sdt }}</td>
                                        <td>{{ v.email }}</td>
                                        <td class="text-center">{{ v.ngay_bat_dau }}</td>
                                        <td>{{ v.ten_chuc_vu }}</td>
                                        <td class="text-center">
                                            <img class="img-thumbnail rounded-circle mx-auto d-block"
                                                style="width: 50px; height: 50px; object-fit: cover;" :src="v.avatar"
                                                alt="Ảnh đại diện">
                                        </td>
                                        <td class="text-center">
                                            <span v-if="v.tinh_trang == 1" class="badge bg-success cursor-pointer"
                                                v-on:click="doiTrangThai(v)">Hoạt động</span>
                                            <span v-else class="badge bg-secondary cursor-pointer"
                                                v-on:click="doiTrangThai(v)">Tạm dừng</span>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(nhan_vien_update, v)"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info btn-sm me-1">
                                                <i class="bx bxs-edit-alt"></i>
                                            </button>
                                            <button v-on:click="id_can_xoa = v.id" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" class="btn btn-danger btn-sm">
                                                <i class="bx bxs-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Cập Nhật Nhân Viên -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="modalCapNhatNhanVien" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title" id="modalCapNhatNhanVien">
                        <i class="bx bxs-edit-alt me-2"></i>Cập nhật nhân viên
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Đóng"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="form-label">Họ và tên nhân viên</label>
                            <input v-model="nhan_vien_update.ten_nhan_vien" type="text" class="form-control"
                                placeholder="Nhập họ và tên" />
                            <div v-if="errors_update.ten_nhan_vien" class="text-danger small mt-1">
                                {{ errors_update.ten_nhan_vien }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Ngày sinh</label>
                            <input v-model="nhan_vien_update.ngay_sinh" type="date" class="form-control" :max="new Date().toISOString().split('T')[0]" />
                            <div v-if="errors_update.ngay_sinh" class="text-danger small mt-1">
                                {{ errors_update.ngay_sinh }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Số điện thoại</label>
                            <input v-model="nhan_vien_update.sdt" type="text" class="form-control"
                                placeholder="Nhập số điện thoại" />
                            <div v-if="errors_update.sdt" class="text-danger small mt-1">
                                {{ errors_update.sdt }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Email</label>
                            <input v-model="nhan_vien_update.email" type="email" class="form-control"
                                placeholder="Nhập email" />
                            <div v-if="errors_update.email" class="text-danger small mt-1">
                                {{ errors_update.email }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Mật khẩu mới (nếu đổi)</label>
                            <input v-model="nhan_vien_update.password" type="password" class="form-control"
                                placeholder="Nhập mật khẩu mới" />
                            <div v-if="errors_update.password" class="text-danger small mt-1">
                                {{ errors_update.password }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Ngày bắt đầu làm việc</label>
                            <input v-model="nhan_vien_update.ngay_bat_dau" type="date" class="form-control" :max="new Date().toISOString().split('T')[0]" />
                            <div v-if="errors_update.ngay_bat_dau" class="text-danger small mt-1">
                                {{ errors_update.ngay_bat_dau }}
                            </div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label">Chức vụ</label>
                            <select v-model="nhan_vien_update.id_chuc_vu" class="form-select">
                                <template v-for="(v, k) in list_chuc_vu" :key="k">
                                    <option v-bind:value="v.id">{{ v.ten_chuc_vu }}</option>
                                </template>
                            </select>
                            <div v-if="errors_update.id_chuc_vu" class="text-danger small mt-1">
                                {{ errors_update.id_chuc_vu }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capNhatNhanVien()" class="btn btn-info text-white">
                        <i class="bx bxs-save me-1"></i> Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Xoá Nhân Viên -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="modalXoaNhanVien" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="modalXoaNhanVien">
                        <i class="bx bxs-trash me-2"></i>Xoá nhân viên
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Đóng"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger mb-0" role="alert">
                        Bạn có chắc chắn muốn xoá nhân viên này không?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
                    <button v-on:click="xoaNhanVien()" type="button" data-bs-dismiss="modal" class="btn btn-danger">
                        <i class="bx bxs-trash me-1"></i> Xoá
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../../core/baseRequest';
export default {
    data() {
        return {
            errors_nv: {
                ten_nhan_vien: '',
                ngay_sinh: '',
                sdt: '',
                email: '',
                password: '',
                ngay_bat_dau: '',
                id_chuc_vu: '',
                avatar: '',
                tinh_trang: ''
            },
            errors_update: {
                ten_nhan_vien: '',
                ngay_sinh: '',
                sdt: '',
                email: '',
                password: '',
                ngay_bat_dau: '',
                id_chuc_vu: '',
                avatar: '',
                tinh_trang: ''
            },
            danh_sach_nhan_vien: [],
            list_chuc_vu: [],
            nhan_vien_create: {},
            nhan_vien_update: {},
            id_can_xoa: '',
        };
    },
    mounted() {
        this.layNhanVien();
        this.loadChucVuOP();
    },
    methods: {
        validateUpdateForm() {
            let isValid = true;
            this.errors_update = {
                ten_nhan_vien: '',
                ngay_sinh: '',
                sdt: '',
                email: '',
                password: '',
                ngay_bat_dau: '',
                id_chuc_vu: '',
                avatar: '',
                tinh_trang: ''
            };

            // Tên nhân viên
            if (!this.nhan_vien_update.ten_nhan_vien) {
                this.errors_update.ten_nhan_vien = 'Tên nhân viên không được để trống!';
                isValid = false;
            } else if (this.nhan_vien_update.ten_nhan_vien.length > 100) {
                this.errors_update.ten_nhan_vien = 'Tên nhân viên không quá 100 ký tự!';
                isValid = false;
            }

            // Ngày sinh
            if (!this.nhan_vien_update.ngay_sinh) {
                this.errors_update.ngay_sinh = 'Vui lòng nhập ngày sinh!';
                isValid = false;
            } else {
                const today = new Date();
                const birthDate = new Date(this.nhan_vien_update.ngay_sinh);
                if (birthDate >= today) {
                    this.errors_update.ngay_sinh = 'Ngày sinh phải trước ngày hôm nay!';
                    isValid = false;
                }
            }

            // Số điện thoại
            const phoneRegex = /^([0-9\s\-\+\(\)]*)$/;
            if (!this.nhan_vien_update.sdt) {
                this.errors_update.sdt = 'Vui lòng nhập số điện thoại!';
                isValid = false;
            } else if (!phoneRegex.test(this.nhan_vien_update.sdt)) {
                this.errors_update.sdt = 'Số điện thoại không đúng định dạng!';
                isValid = false;
            } else if (
                this.nhan_vien_update.sdt.length < 9 ||
                this.nhan_vien_update.sdt.length > 11
            ) {
                this.errors_update.sdt = 'Số điện thoại phải từ 9 đến 11 số!';
                isValid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.nhan_vien_update.email) {
                this.errors_update.email = 'Vui lòng nhập email!';
                isValid = false;
            } else if (!emailRegex.test(this.nhan_vien_update.email)) {
                this.errors_update.email = 'Email không đúng định dạng!';
                isValid = false;
            }

            // Password - có thể bỏ qua validation nếu không thay đổi mật khẩu
            if (this.nhan_vien_update.password && this.nhan_vien_update.password.length < 6) {
                this.errors_update.password = 'Mật khẩu phải từ 6 ký tự trở lên!';
                isValid = false;
            }

            // Ngày bắt đầu
            if (!this.nhan_vien_update.ngay_bat_dau) {
                this.errors_update.ngay_bat_dau = 'Vui lòng nhập ngày bắt đầu làm việc!';
                isValid = false;
            } else if (this.nhan_vien_update.ngay_sinh && this.nhan_vien_update.ngay_bat_dau < this.nhan_vien_update.ngay_sinh) {
                this.errors_update.ngay_bat_dau = 'Ngày bắt đầu phải sau hoặc bằng ngày sinh!';
                isValid = false;
            }

            // Chức vụ
            if (!this.nhan_vien_update.id_chuc_vu) {
                this.errors_update.id_chuc_vu = 'Vui lòng chọn chức vụ!';
                isValid = false;
            }

            return isValid;
        },
        validateNhanVienForm() {
            let isValid = true;
            this.errors_nv = {
                ten_nhan_vien: '',
                ngay_sinh: '',
                sdt: '',
                email: '',
                password: '',
                ngay_bat_dau: '',
                id_chuc_vu: '',
                avatar: '',
                tinh_trang: ''
            };

            // Tên nhân viên
            if (!this.nhan_vien_create.ten_nhan_vien) {
                this.errors_nv.ten_nhan_vien = 'Tên nhân viên không được để trống!';
                isValid = false;
            } else if (this.nhan_vien_create.ten_nhan_vien.length > 100) {
                this.errors_nv.ten_nhan_vien = 'Tên nhân viên không quá 100 ký tự!';
                isValid = false;
            }

            // Ngày sinh
            if (!this.nhan_vien_create.ngay_sinh) {
                this.errors_nv.ngay_sinh = 'Vui lòng nhập ngày sinh!';
                isValid = false;
            } else {
                const today = new Date();
                const birthDate = new Date(this.nhan_vien_create.ngay_sinh);
                if (birthDate >= today) {
                    this.errors_nv.ngay_sinh = 'Ngày sinh phải trước ngày hôm nay!';
                    isValid = false;
                }
            }

            // Số điện thoại
            const phoneRegex = /^([0-9\s\-\+\(\)]*)$/;
            if (!this.nhan_vien_create.sdt) {
                this.errors_nv.sdt = 'Vui lòng nhập số điện thoại!';
                isValid = false;
            } else if (!phoneRegex.test(this.nhan_vien_create.sdt)) {
                this.errors_nv.sdt = 'Số điện thoại không đúng định dạng!';
                isValid = false;
            } else if (
                this.nhan_vien_create.sdt.length < 9 ||
                this.nhan_vien_create.sdt.length > 11
            ) {
                this.errors_nv.sdt = 'Số điện thoại phải từ 9 đến 11 số!';
                isValid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.nhan_vien_create.email) {
                this.errors_nv.email = 'Vui lòng nhập email!';
                isValid = false;
            } else if (!emailRegex.test(this.nhan_vien_create.email)) {
                this.errors_nv.email = 'Email không đúng định dạng!';
                isValid = false;
            }

            // Password
            if (!this.nhan_vien_create.password) {
                this.errors_nv.password = 'Vui lòng nhập mật khẩu!';
                isValid = false;
            } else if (this.nhan_vien_create.password.length < 6) {
                this.errors_nv.password = 'Mật khẩu phải từ 6 ký tự trở lên!';
                isValid = false;
            }

            // Ngày bắt đầu
            if (!this.nhan_vien_create.ngay_bat_dau) {
                this.errors_nv.ngay_bat_dau = 'Vui lòng nhập ngày bắt đầu làm việc!';
                isValid = false;
            } else if (this.nhan_vien_create.ngay_sinh && this.nhan_vien_create.ngay_bat_dau < this.nhan_vien_create.ngay_sinh) {
                this.errors_nv.ngay_bat_dau = 'Ngày bắt đầu phải sau hoặc bằng ngày sinh!';
                isValid = false;
            }

            // Chức vụ
            if (!this.nhan_vien_create.id_chuc_vu) {
                this.errors_nv.id_chuc_vu = 'Vui lòng chọn chức vụ!';
                isValid = false;
            }

            // Tình trạng
            if (this.nhan_vien_create.tinh_trang === '' || this.nhan_vien_create.tinh_trang === null || this.nhan_vien_create.tinh_trang === undefined) {
                this.errors_nv.tinh_trang = 'Vui lòng chọn tình trạng!';
                isValid = false;
            }

            return isValid;
        },
        loadChucVuOP() {
            baseRequest
                .get("chuc-vu/data/open")
                .then((res) => {
                    this.list_chuc_vu = res.data.data;
                });
        },
        layNhanVien() {
            baseRequest
                .get("nhan-vien/data")
                .then((res) => {
                    this.danh_sach_nhan_vien = res.data.data;
                });
        },
        themNhanVien() {
            if (!this.validateNhanVienForm()) {
                // Nếu có lỗi thì không gửi lên BE, lỗi sẽ hiển thị ngay dưới input
                return;
            }
            baseRequest
                .post('nhan-vien/create', this.nhan_vien_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layNhanVien();
                        // Đóng modal khi tạo thành công
                        const modalEl = document.getElementById('taoPhongModal');
                        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                        modalInstance.hide();
                        // Reset form và lỗi nếu muốn
                        this.nhan_vien_create = {
                            ten_nhan_vien: '',
                            ngay_sinh: '',
                            sdt: '',
                            email: '',
                            password: '',
                            ngay_bat_dau: '',
                            id_chuc_vu: '',
                            avatar: '',
                            tinh_trang: 1
                        };
                        this.errors_nv = {
                            ten_nhan_vien: '',
                            ngay_sinh: '',
                            sdt: '',
                            email: '',
                            password: '',
                            ngay_bat_dau: '',
                            id_chuc_vu: '',
                            avatar: '',
                            tinh_trang: ''
                        };
                    }
                })
                .catch((error) => {
                    // Nếu BE trả về lỗi validation
                    if (error.response && error.response.data.errors) {
                        const backendErrors = error.response.data.errors;
                        Object.keys(backendErrors).forEach(key => {
                            if (this.errors_nv.hasOwnProperty(key)) {
                                this.errors_nv[key] = backendErrors[key][0];
                            }
                        });
                    }
                });
        },

        xoaNhanVien() {
            baseRequest
                .delete("nhan-vien/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layNhanVien();
                    }
                });
        },
        capNhatNhanVien() {
            if (!this.validateUpdateForm()) {
                return;
            }
            baseRequest
                .put("nhan-vien/update", this.nhan_vien_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message);
                        this.layNhanVien();
                        // Đóng modal
                        const modalEl = document.getElementById('updateModal');
                        const modalInstance = bootstrap.Modal.getInstance(modalEl);
                        modalInstance.hide();
                    }
                })
                .catch((error) => {
                    // Xử lý lỗi từ BE
                    if (error.response && error.response.data.errors) {
                        const backendErrors = error.response.data.errors;
                        Object.keys(backendErrors).forEach(key => {
                            if (this.errors_update.hasOwnProperty(key)) {
                                this.errors_update[key] = backendErrors[key][0];
                            }
                        });
                    }
                });
        },
        doiTrangThai(xxx) {
            baseRequest
                .put('nhan-vien/doi-trang-thai', xxx)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layNhanVien();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
    },
};
</script>

<style>
.table th,
.table td {
    vertical-align: middle !important;
}

.cursor-pointer {
    cursor: pointer;
}

.modal-header.bg-primary,
.modal-header.bg-info,
.modal-header.bg-danger {
    border-bottom: none;
}

.btn-close-white {
    filter: invert(1);
}

.img-thumbnail {
    background: #fff;
    border: 1px solid #dee2e6;
}
</style>