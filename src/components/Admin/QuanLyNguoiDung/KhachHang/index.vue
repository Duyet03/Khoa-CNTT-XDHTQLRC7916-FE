<template>
    <div class="container-fluid">
        <!-- Header Section -->
        <div class="row mb-3">
            <div class="col-12">
                <div class="card">
                    <div class="card-body d-flex justify-content-between align-items-center">
                        <h5 class="mb-0">Quản Lý Khách Hàng</h5>
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#taoPhongModal">
                            <i class="bx bxs-plus-square me-1"></i>Thêm tài khoản
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Content -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr class="text-center">
                                        <th style="width: 5%">#</th>
                                        <th style="width: 20%">Họ và tên</th>
                                        <th style="width: 20%">Email</th>
                                        <th style="width: 15%">Số điện thoại</th>
                                        <th style="width: 10%">Ngày sinh</th>
                                        <th style="width: 10%">Trạng thái</th>
                                        <th style="width: 10%">Tình trạng</th>
                                        <th style="width: 10%">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in danh_sach_khach_hang" :key="k">
                                        <tr class="align-middle">
                                            <td class="text-center">{{ k + 1 }}</td>
                                            <td>{{ v.ten_khach_hang }}</td>
                                            <td>{{ v.email }}</td>
                                            <td class="text-center">{{ v.so_dien_thoai || 'N/A' }}</td>
                                            <td class="text-center">{{ v.ngay_sinh || 'N/A' }}</td>
                                            <td class="text-center">
                                                <button
                                                    :class="['btn btn-sm', v.is_active == 1 ? 'btn-success' : 'btn-warning']">
                                                    <i class="bx me-1"
                                                        :class="v.is_active == 1 ? 'bx-check' : 'bx-x'"></i>
                                                    {{ v.is_active == 1 ? 'Đã kích hoạt' : 'Chưa kích hoạt' }}
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <button v-on:click="doiTrangThai(v)" :class="['btn btn-sm', v.is_block == 1 ? 'btn-danger' : 'btn-success']">
                                                    <i class="bx me-1"
                                                        :class="v.is_block == 1 ? 'bx-lock-alt' : 'bx-lock-open-alt'"></i>
                                                    {{ v.is_block == 1 ? 'Khóa' : 'Hoạt động' }}
                                                </button>
                                            </td>
                                            <td class="text-center">
                                                <div class="btn-group">
                                                    <button @click="openUpdateModal(v)" class="btn btn-info btn-sm">
                                                        <i class="bx bx-edit me-1"></i>Sửa
                                                    </button>
                                                    <button @click="openDeleteModal(v)"
                                                        class="btn btn-danger btn-sm ms-1">
                                                        <i class="bx bx-trash me-1"></i>Xóa
                                                    </button>
                                                </div>
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

        <!-- Create Modal -->
        <div class="modal fade" id="taoPhongModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Thêm Mới Khách Hàng</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label required">Tên khách hàng</label>
                                <input v-model="khach_hang_create.ten_khach_hang" type="text" class="form-control" />
                                <div v-if="errors.ten_khach_hang" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.ten_khach_hang }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label required">Email</label>
                                <input v-model="khach_hang_create.email" type="email" class="form-control" />
                                <div v-if="errors.email" class="text-danger" style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.email }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Số điện thoại</label>
                                <input v-model="khach_hang_create.so_dien_thoai" type="text" class="form-control" />
                                <div v-if="errors.so_dien_thoai" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.so_dien_thoai }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ngày sinh</label>
                                <input v-model="khach_hang_create.ngay_sinh" type="date" class="form-control" />
                                <div v-if="errors.ngay_sinh" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.ngay_sinh }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label required">Mật khẩu</label>
                                <input v-model="khach_hang_create.password" type="password" class="form-control" />
                                <div v-if="errors.password" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.password }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label required">Nhập lại mật khẩu</label>
                                <input v-model="khach_hang_create.re_password" type="password" class="form-control" />
                                <div v-if="errors.re_password" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors.re_password }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Tình trạng</label>
                                <select v-model="khach_hang_create.is_block" class="form-select">
                                    <option :value="0">Hoạt động</option>
                                    <option :value="1">Khóa</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Trạng thái tài khoản</label>
                                <select v-model="khach_hang_create.is_active" class="form-select">
                                    <option value="1">Đã kích hoạt</option>
                                    <option value="0">Chưa kích hoạt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Đóng
                        </button>
                        <button @click="themKhachHang()" type="button" class="btn btn-primary">
                            <i class="bx bx-check me-1"></i>Thêm mới
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Update Modal -->
        <!-- Modal Update Khách Hàng -->
        <div class="modal fade" id="updateKhachHangModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">Cập Nhật Khách Hàng</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label required">Tên khách hàng</label>
                                <input v-model="khach_hang_update.ten_khach_hang" type="text" class="form-control" />
                                <div v-if="errors_update.ten_khach_hang" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors_update.ten_khach_hang }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label required">Email</label>
                                <input v-model="khach_hang_update.email" type="email" class="form-control" />
                                <div v-if="errors_update.email" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors_update.email }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Số điện thoại</label>
                                <input v-model="khach_hang_update.so_dien_thoai" type="text" class="form-control" />
                                <div v-if="errors_update.so_dien_thoai" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors_update.so_dien_thoai }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Ngày sinh</label>
                                <input v-model="khach_hang_update.ngay_sinh" type="date" class="form-control" />
                                <div v-if="errors_update.ngay_sinh" class="text-danger"
                                    style="font-size: 15px; margin-top: 2px;">
                                    {{ errors_update.ngay_sinh }}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Tình trạng</label>
                                <select v-model="khach_hang_update.is_block" class="form-select">
                                    <option :value="0">Hoạt động</option>
                                    <option :value="1">Khóa</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Đóng
                        </button>
                        <button @click="capNhatKhachHang()" type="button" class="btn btn-primary">
                            <i class="bx bx-check me-1"></i>Cập nhật
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">Xác Nhận Xóa</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger mb-0">
                            <i class="bx bx-error-circle me-1"></i>
                            Bạn có chắc chắn muốn xóa khách hàng này không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="bx bx-x me-1"></i>Hủy
                        </button>
                        <button @click="xoaKhachHang()" class="btn btn-danger" data-bs-dismiss="modal">
                            <i class="bx bx-trash me-1"></i>Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });
export default {
    data() {
        return {
            danh_sach_khach_hang: [],
            khach_hang_create: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: '',
                is_block: 0,
                tinh_trang: 1,
            },
            errors: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: ''
            },
            khach_hang_update: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                is_block: 0,
                tinh_trang: 1,
            },
            errors_update: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: ''
            },
            id_can_xoa: '',
        }
    },

    mounted() {
        this.layKhachHang();
    },

    methods: {
        validateForm() {
            let isValid = true;
            this.errors = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: ''
            };

            // Tên khách hàng
            if (!this.khach_hang_create.ten_khach_hang) {
                this.errors.ten_khach_hang = 'Tên khách hàng không được để trống!';
                isValid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.khach_hang_create.email) {
                this.errors.email = 'Email không được để trống!';
                isValid = false;
            } else if (!emailRegex.test(this.khach_hang_create.email)) {
                this.errors.email = 'Email không đúng định dạng!';
                isValid = false;
            }

            // Số điện thoại (nếu nhập thì phải đúng định dạng)
            const phoneRegex = /^([0-9\s\-\+\(\)]*)$/;
            if (this.khach_hang_create.so_dien_thoai) {
                if (!phoneRegex.test(this.khach_hang_create.so_dien_thoai)) {
                    this.errors.so_dien_thoai = 'Số điện thoại không đúng định dạng!';
                    isValid = false;
                } else if (
                    this.khach_hang_create.so_dien_thoai.length < 10 ||
                    this.khach_hang_create.so_dien_thoai.length > 11
                ) {
                    this.errors.so_dien_thoai = 'Số điện thoại phải từ 10-11 số!';
                    isValid = false;
                }
            }

            // Ngày sinh (nếu nhập thì không được lớn hơn ngày hiện tại)
            if (this.khach_hang_create.ngay_sinh) {
                const today = new Date();
                const birthDate = new Date(this.khach_hang_create.ngay_sinh);
                if (birthDate > today) {
                    this.errors.ngay_sinh = 'Ngày sinh không được lớn hơn ngày hiện tại!';
                    isValid = false;
                }
            }

            // Mật khẩu
            if (!this.khach_hang_create.password) {
                this.errors.password = 'Mật khẩu không được để trống!';
                isValid = false;
            } else if (this.khach_hang_create.password.length < 6) {
                this.errors.password = 'Mật khẩu phải ít nhất 6 ký tự!';
                isValid = false;
            }

            // Nhập lại mật khẩu
            if (!this.khach_hang_create.re_password) {
                this.errors.re_password = 'Vui lòng nhập lại mật khẩu!';
                isValid = false;
            } else if (this.khach_hang_create.password !== this.khach_hang_create.re_password) {
                this.errors.re_password = 'Mật khẩu nhập lại không khớp!';
                isValid = false;
            }

            return isValid;
        },


        layKhachHang() {
            baseRequest.get("khach-hang/data")
                .then((res) => {
                    this.danh_sach_khach_hang = res.data.data;
                })
        },

        themKhachHang() {
            if (!this.validateForm()) {
                // Nếu có lỗi thì không gửi lên BE
                return;
            }
            console.log(this.khach_hang_create);
            
            // Nếu không có lỗi thì gửi lên BE
            baseRequest.post('khach-hang/create', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status) {
                        this.layKhachHang();
                        $("#taoPhongModal").modal('hide');
                        this.resetCreateForm();
                    } else {
                        // Nếu BE trả về message chung
                        if (res.data.message) {
                            this.errors.ten_khach_hang = res.data.message;
                        }
                    }
                })
                .catch((error) => {
                    // Nếu BE trả về lỗi validation
                    if (error.response && error.response.data.errors) {
                        const backendErrors = error.response.data.errors;
                        Object.keys(backendErrors).forEach(key => {
                            if (this.errors.hasOwnProperty(key)) {
                                this.errors[key] = backendErrors[key][0];
                            }
                        });
                    }
                });
        },

        resetCreateForm() {
            this.khach_hang_create = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: '',
                is_block: 0,
                tinh_trang: 1
            };
            this.errors = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: ''
            };
        },
        openUpdateModal(khachHang) {
            this.khach_hang_update = { ...khachHang };
            const updateModal = new bootstrap.Modal(document.getElementById('updateKhachHangModal'));
            updateModal.show();
        },

        validateUpdateForm() {
            let isValid = true;
            this.errors_update = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: ''
            };

            // Tên khách hàng
            if (!this.khach_hang_update.ten_khach_hang) {
                this.errors_update.ten_khach_hang = 'Tên khách hàng không được để trống!';
                isValid = false;
            }

            // Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!this.khach_hang_update.email) {
                this.errors_update.email = 'Email không được để trống!';
                isValid = false;
            } else if (!emailRegex.test(this.khach_hang_update.email)) {
                this.errors_update.email = 'Email không đúng định dạng!';
                isValid = false;
            }

            // Số điện thoại (nếu nhập thì phải đúng định dạng)
            const phoneRegex = /^([0-9\s\-\+\(\)]*)$/;
            if (this.khach_hang_update.so_dien_thoai) {
                if (!phoneRegex.test(this.khach_hang_update.so_dien_thoai)) {
                    this.errors_update.so_dien_thoai = 'Số điện thoại không đúng định dạng!';
                    isValid = false;
                } else if (
                    this.khach_hang_update.so_dien_thoai.length < 10 ||
                    this.khach_hang_update.so_dien_thoai.length > 11
                ) {
                    this.errors_update.so_dien_thoai = 'Số điện thoại phải từ 10-11 số!';
                    isValid = false;
                }
            }

            // Ngày sinh (nếu nhập thì không được lớn hơn ngày hiện tại)
            if (this.khach_hang_update.ngay_sinh) {
                const today = new Date();
                const birthDate = new Date(this.khach_hang_update.ngay_sinh);
                if (birthDate > today) {
                    this.errors_update.ngay_sinh = 'Ngày sinh không được lớn hơn ngày hiện tại!';
                    isValid = false;
                }
            }

            return isValid;
        },


        capNhatKhachHang() {
            if (!this.validateUpdateForm()) {
                // Nếu có lỗi thì không gửi lên BE
                return;
            }
            console.log(this.khach_hang_update);
            
            // Nếu không có lỗi thì gửi lên BE
            baseRequest.put('khach-hang/update', this.khach_hang_update)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layKhachHang();
                        // Đóng modal đúng chuẩn Bootstrap 5
                        const modalEl = document.getElementById('updateKhachHangModal');
                        const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                        modalInstance.hide();
                        this.resetUpdateForm();
                    } else {
                        // Nếu BE trả về message chung
                        if (res.data.message) {
                            this.errors_update.ten_khach_hang = res.data.message;
                        }
                    }
                })
        },

        resetUpdateForm() {
            this.khach_hang_update = {
                id: '',
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                is_block: 0,
                tinh_trang: 1
            };
            this.errors_update = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: ''
            };
        },
        openDeleteModal(khachHang) {
            this.id_can_xoa = khachHang.id;
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();
        },

        xoaKhachHang() {
            baseRequest.delete("khach-hang/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layKhachHang();
                        $("#deleteModal").modal('hide');
                    } else {
                        toaster.error(res.data.message);
                    }
                })
        },

        doiTrangThai(khachHang) {
            baseRequest.put('khach-hang/doi-trang-thai', khachHang)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.layKhachHang();
                    } else {
                        toaster.error(res.data.message);
                    }
                })

        },

        resetCreateForm() {
            this.khach_hang_create = {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                re_password: '',
                is_block: 0,
                tinh_trang: 1,
            };
        }
    }
}
</script>

<style scoped>
.required:after {
    content: " *";
    color: red;
}

.table th {
    background-color: #f8f9fa;
}

.btn {
    display: inline-flex;
    align-items: center;
}

.form-label {
    font-weight: 500;
}

.modal-header {
    margin: -1px -1px 0;
}
</style>