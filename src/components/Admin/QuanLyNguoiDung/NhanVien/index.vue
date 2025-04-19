
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
                                        Tạo Mới Nhân Viên
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên Nhân Viên</label>
                                                <input v-model="nhan_vien_create.ten_nhan_vien" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày Sinh</label>
                                                <input v-model="nhan_vien_create.ngay_sinh" type="date"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Số Điện Thoại</label>
                                                <input v-model="nhan_vien_create.sdt" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Email</label>
                                                <input v-model="nhan_vien_create.email" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>PassWord</label>
                                                <input v-model="nhan_vien_create.password" type="password"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ngày Bắt Đầu</label>
                                                <input v-model="nhan_vien_create.ngay_bat_dau" type="date"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label for="">Chức Vụ</label>
                                                <select name="" v-model="nhan_vien_create.id_chuc_vu"
                                                    class="form-control mt-2">
                                                    <template v-for="(v, k) in list_chuc_vu" :key="k">
                                                        <option v-bind:value="v.id">{{ v.ten_chuc_vu }}</option>
                                                    </template>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Ảnh Đại Diện</label>
                                                <input v-model="nhan_vien_create.avatar" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Tình Trạng</label>
                                                <select v-model="nhan_vien_create.tinh_trang" class="form-control mt-2">
                                                    <option value="1">Hoạt Động</option>
                                                    <option value="0">Tạm Dừng</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themNhanVien()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý tài khoản nhân viên</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Họ Và Tên</th>
                                    <th>Ngày Sinh</th>
                                    <th>Số Điện Thoại</th>
                                    <th>Email</th>
                                    <th>Ngày Bắt Đầu</th>
                                    <th>Chức Vụ</th>
                                    <th>Ảnh Đại Diện</th>
                                    <th>Tình trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_nhan_vien" :key="k">
                                    <tr class="align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.ten_nhan_vien }}</td>
                                        <td>{{ v.ngay_sinh }}</td>
                                        <td>{{ v.sdt }}</td>
                                        <td>{{ v.email }}</td>
                                        <td class="text-center">{{ v.ngay_bat_dau }}</td>
                                        <td>{{ v.ten_chuc_vu }}</td>
                                        <td class="text-center">
                                            <img class="img-fluid rounded-circle" style="width: 50px;" :src="v.avatar" alt="">
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="doiTrangThai(v)" v-if="v.tinh_trang == 1"
                                                class="btn btn-success">Hoạt động</button>
                                            <button v-on:click="doiTrangThai(v)" v-else class="btn btn-primary">Tạm
                                                dừng</button>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(nhan_vien_update, v)"
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
                                <label>Tên Nhân Viên</label>
                                <input v-model="nhan_vien_update.ten_nhan_vien" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày Sinh</label>
                                <input v-model="nhan_vien_update.ngay_sinh" type="date" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Số Điện Thoại</label>
                                <input v-model="nhan_vien_update.sdt" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Email</label>
                                <input v-model="nhan_vien_update.email" type="email" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Password</label>
                                <input v-model="nhan_vien_update.password" type="password" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ngày Bắt Đầu</label>
                                <input v-model="nhan_vien_update.ngay_bat_dau" type="date" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label for="">Chức Vụ</label>
                                <select name="" v-model="nhan_vien_update.id_chuc_vu" class="form-control mt-2" id="">
                                    <template v-for="(v, k) in list_chuc_vu" :key="k">
                                        <option v-bind:value="v.id">{{ v.ten_chuc_vu }}</option>
                                    </template>
                                </select>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Ảnh Đại Diện</label>
                                <input v-model="nhan_vien_update.avatar" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Tình Trạng</label>
                                <select v-model="nhan_vien_update.tinh_trang" class="form-control">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatNhanVien()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá Nhân Viên</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaNhanVien()" type="button" class="btn btn-primary">Save</button>
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
            baseRequest
                .post('nhan-vien/create', this.nhan_vien_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layNhanVien();
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
            baseRequest
                .put("nhan-vien/update", this.nhan_vien_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layNhanVien();
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

<style></style>