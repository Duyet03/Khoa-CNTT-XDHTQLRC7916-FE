<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoPhongModal">
                                <i class="bx bxs-plus-square"></i>Thêm tài khoản
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoPhongModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới Khách Hàng
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên khách hàng</label>
                                                <input v-model="khach_hang_create.ten_khach_hang" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Email</label>
                                                <input v-model="khach_hang_create.email" type="email"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Số điện thoại</label>
                                                <input v-model="khach_hang_create.so_dien_thoai" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày sinh</label>
                                                <input v-model="khach_hang_create.ngay_sinh" type="date"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Mật khẩu</label>
                                                <input v-model="khach_hang_create.password" type="password"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tình trạng</label>
                                                <select v-model="khach_hang_create.is_block" class="form-control mt-2">
                                                    <option :value="0">Hoạt động</option>
                                                    <option :value="1">Khóa</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Tài khoản</label>
                                                <select v-model="khach_hang_create.tinh_trang" class="form-control">
                                                    <option value="1">Đã kích hoạt</option>
                                                    <option value="0">Chưa kích hoạt</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Đóng</button>
                                    <button v-on:click="themKhachHang()" type="button" data-bs-dismiss="modal"
                                        class="btn btn-primary">
                                        Thêm Mới
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Quản lý tài khoản khách hàng</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Họ và tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Ngày sinh</th>
                                    <th>Tài khoản</th>
                                    <th>Tình trạng</th>
                                    <th>Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_khach_hang" :key="k">
                                    <tr class="align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.ten_khach_hang }}</td>
                                        <td>{{ v.email }}</td>
                                        <td>{{ v.so_dien_thoai || 'N/A' }}</td>
                                        <td>{{ v.ngay_sinh || 'N/A' }}</td>
                                        <td class="text-center">
                                            <button v-on:click="doiTrangThai(v)" v-if="v.is_active == 1"
                                                class="btn btn-success">Đã kích hoạt</button>
                                            <button v-on:click="doiTrangThai(v)" v-else class="btn btn-primary">Chưa
                                                kích hoạt</button>
                                        </td>
                                        <td class="text-center">
                                            <span v-if="v.is_block == 1" class="badge bg-danger">Khóa</span>
                                            <span v-else class="badge bg-success">Hoạt động</span>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(khach_hang_update, v)"
                                                data-bs-toggle="modal" data-bs-target="#updateModal"
                                                class="btn btn-info">Cập nhật</button>
                                            <button v-on:click="id_can_xoa = v.id" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" class="btn btn-danger ms-2">Xoá</button>
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
    <!-- update Modal -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật khách hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tên khách hàng</label>
                                <input v-model="khach_hang_update.ten_khach_hang" type="text"
                                    class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Email</label>
                                <input v-model="khach_hang_update.email" type="email" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Số điện thoại</label>
                                <input v-model="khach_hang_update.so_dien_thoai" type="text"
                                    class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày sinh</label>
                                <input v-model="khach_hang_update.ngay_sinh" type="date" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Mật khẩu</label>
                                <input v-model="khach_hang_update.password" type="password" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tình trạng</label>
                                <select v-model="khach_hang_update.is_block" class="form-control mt-2">
                                    <option :value="0">Hoạt động</option>
                                    <option :value="1">Khóa</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Tài khoản</label>
                                <select v-model="khach_hang_update.tinh_trang" class="form-control">
                                    <option value="1">Đã kích hoạt</option>
                                    <option value="0">Chưa kích hoạt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capNhatKhachHang()" data-bs-dismiss="modal" class="btn btn-primary">Lưu</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá khách hàng</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaKhachHang()" type="button" class="btn btn-primary">Xoá</button>
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
            danh_sach_khach_hang: [],
            khach_hang_create: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                is_block: 0,
                tinh_trang: 1,
            },
            khach_hang_update: {
                ten_khach_hang: '',
                email: '',
                so_dien_thoai: '',
                ngay_sinh: '',
                password: '',
                is_block: 0,
                tinh_trang: 1,
            },
            id_can_xoa: '',
        };
    },
    mounted() {
        this.layKhachHang();
    },
    methods: {
        layKhachHang() {
            baseRequest
                .get("khach-hang/data")
                .then((res) => {
                    this.danh_sach_khach_hang = res.data.data;
                    console.log(this.danh_sach_khach_hang);
                });
        },
        themKhachHang() {
            baseRequest
                .post('khach-hang/create', this.khach_hang_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                    }
                });
        },
        xoaKhachHang() {
            baseRequest
                .delete("khach-hang/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                    }
                });
        },
        capNhatKhachHang() {
            baseRequest
                .put("khach-hang/update", this.khach_hang_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                    }
                });
        },
        doiTrangThai(xxx) {
            baseRequest
                .put('khach-hang/doi-trang-thai', xxx)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layKhachHang();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
    },
};
</script>
<style></style>