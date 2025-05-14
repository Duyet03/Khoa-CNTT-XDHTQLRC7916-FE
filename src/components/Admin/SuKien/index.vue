<template>
    <div class="row">
        <div class="col-lg-4 col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Thêm Mới Sự Kiện</h5>
                </div>
                <div class="card-body">
                    <div class="mb-2">
                        <label>Tên Sự Kiện</label>
                        <input v-model="su_kien_create.ten_su_kien" type="text" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Ngày Bắt Đầu</label>
                        <input v-model="su_kien_create.ngay_bat_dau" type="date" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Ngày Kết Thúc</label>
                        <input v-model="su_kien_create.ngay_ket_thuc" type="date" class="form-control mt-2">
                    </div>
                    <div class="mb-2">
                        <label>Mô Tả</label>
                        <textarea v-model="su_kien_create.mo_ta" class="form-control mt-2" rows="3"></textarea>
                    </div>
                    <div class="mb-2">
                        <label>Hình Ảnh</label>
                        <input v-model="su_kien_create.hinh_anh" type="text" class="form-control mt-2" placeholder="Nhập link hình ảnh">
                    </div>
                    <div class="mb-2">
                        <label>Tình Trạng</label>
                        <select v-model="su_kien_create.tinh_trang" class="form-control mt-2">
                            <option value="1">Hoạt Động</option>
                            <option value="0">Tạm Dừng</option>
                        </select>
                    </div>
                </div>
                <div class="card-footer text-end">
                    <button v-on:click="themMoiSuKien()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>
        <div class="col-lg-8 col-md-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Danh Sách Sự Kiện</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th class="text-center">#</th>
                                    <th class="text-center">Hình Ảnh</th>
                                    <th class="text-center">Tên Sự Kiện</th>
                                    <th class="text-center">Thời Gian</th>
                                    <th class="text-center">Mô Tả</th>
                                    <th class="text-center">Tình Trạng</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(value, index) in ds_su_kien" :key="index">
                                    <th class="text-center align-middle">{{ index + 1 }}</th>
                                    <td class="align-middle text-center">
                                        <img v-if="value.hinh_anh" :src="value.hinh_anh" class="img-fluid" style="height: 100px;">
                                        <span v-else>Chưa có hình ảnh</span>
                                    </td>
                                    <td class="align-middle">{{ value.ten_su_kien }}</td>
                                    <td class="align-middle">
                                        <div>Bắt đầu: {{ formatDateTime(value.ngay_bat_dau) }}</div>
                                        <div>Kết thúc: {{ formatDateTime(value.ngay_ket_thuc) }}</div>
                                    </td>
                                    <td class="align-middle">{{ value.mo_ta }}</td>
                                    <th class="text-center align-middle">
                                        <button v-on:click="doiTrangThai(value)" v-if="value.tinh_trang == 0"
                                            class="btn btn-warning">Tạm Dừng</button>
                                        <button v-on:click="doiTrangThai(value)" v-else class="btn btn-primary">Hoạt
                                            Động</button>
                                    </th>
                                    <td class="text-center text-nowrap align-middle">
                                        <button v-on:click="Object.assign(su_kien_update, value)" data-bs-toggle="modal"
                                            data-bs-target="#updateModal" class="btn btn-info me-1">Cập Nhật</button>
                                        <button data-bs-toggle="modal" data-bs-target="#deleteModal"
                                            v-on:click="id_can_xoa = value.id" class="btn btn-danger">Xoá Bỏ</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá Sự Kiện</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="alert alert-danger" role="alert">
                                            Bạn thật sự có muốn xoá sự kiện này không?
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button v-on:click="xoaSuKien()" type="button" class="btn btn-danger"
                                            data-bs-dismiss="modal">Xác Nhận Xoá</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Sự Kiện</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-2">
                                            <label>Tên Sự Kiện</label>
                                            <input v-model="su_kien_update.ten_su_kien" type="text"
                                                class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Ngày Bắt Đầu</label>
                                            <input v-model="su_kien_update.ngay_bat_dau" type="date" class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Ngày Kết Thúc</label>
                                            <input v-model="su_kien_update.ngay_ket_thuc" type="date" class="form-control mt-2">
                                        </div>
                                        <div class="mb-2">
                                            <label>Mô Tả</label>
                                            <textarea v-model="su_kien_update.mo_ta" class="form-control mt-2" rows="3"></textarea>
                                        </div>
                                        <div class="mb-2">
                                            <label>Hình Ảnh</label>
                                            <input v-model="su_kien_update.hinh_anh" type="text" class="form-control mt-2" placeholder="Nhập link hình ảnh">
                                        </div>
                                        <div class="mb-2">
                                            <label>Tình Trạng</label>
                                            <select v-model="su_kien_update.tinh_trang" class="form-control mt-2">
                                                <option value="1">Hoạt Động</option>
                                                <option value="0">Tạm Dừng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button v-on:click="capNhatSuKien()" type="button" class="btn btn-info"
                                            data-bs-dismiss="modal">Xác Nhận Cập Nhật</button>
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
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            ds_su_kien: [],
            su_kien_create: {
                tinh_trang: 1
            },
            su_kien_update: {},
            id_can_xoa: '',
        }
    },
    mounted() {
        this.layDuLieu();
    },
    methods: {
        layDuLieu() {
            baseRequest
                .get('admin/su-kien/data')
                .then((res) => {
                    this.ds_su_kien = res.data.data;
                })
        },
        themMoiSuKien() {
            baseRequest
                .post("admin/su-kien/create", this.su_kien_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDuLieu();
                        this.su_kien_create = {};
                    }
                });
        },
        xoaSuKien() {
            baseRequest
                .delete("admin/su-kien/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDuLieu();
                    }
                });
        },
        capNhatSuKien() {
            baseRequest
                .put("admin/su-kien/update", this.su_kien_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDuLieu();
                    }
                });
        },
        doiTrangThai(su_kien) {
            baseRequest
                .put('admin/su-kien/doi-trang-thai', su_kien)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDuLieu();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
        formatDateTime(datetime) {
            if (!datetime) return 'Chưa cập nhật';
            return new Date(datetime).toLocaleString('vi-VN');
        },
    },
}
</script>
<style></style>