<template>
    <!-- them -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoThem">
                                <i class="bx bxs-plus-square"></i>Thêm Chức Vụ
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoThem" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới Chức Vụ
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">

                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tên chức vụ</label>
                                                <input v-model="chuc_vu_create.ten_chuc_vu" type="text"
                                                    class="form-control" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Master</label>
                                                <select v-model="chuc_vu_create.is_master" class="form-control">
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Tình Trạng</label>
                                                <select v-model="chuc_vu_create.tinh_trang" class="form-control">
                                                    <option value="1">Hoạt Động</option>
                                                    <option value="0">Tạm Dừng</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Đóng
                                    </button>
                                    <button v-on:click="themChucVu()" type="button" data-bs-dismiss="modal"
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
    <!-- table  -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Quản lý tài khoản chức vụ</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Tên chức vụ</th>
                                    <th>Master</th>
                                    <th>Tình trạng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_chuc_vu" :key="k">
                                    <tr class="align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.ten_chuc_vu }}</td>
                                        <td class="text-center">
                                            <div v-if="(ten_chuc_vu === 'Quản lý') || (ten_chuc_vu === 'Admin')"
                                                class="">
                                                <button v-on:click="doiMaster(v)" v-if="v.is_master"
                                                    class="btn btn-success">Yes</button>
                                                <button v-on:click="doiMaster(v)" v-else
                                                    class="btn btn-primary">No</button>
                                            </div>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="doiTrangThai(v)" v-if="v.tinh_trang"
                                                class="btn btn-success">Hoạt động</button>
                                            <button v-on:click="doiTrangThai(v)" v-else class="btn btn-primary">Tạm
                                                dừng</button>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(chuc_vu_update, v)" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" class="btn btn-info">Cập nhật</button>
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">

                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tên chức vụ</label>
                                <input v-model="chuc_vu_update.ten_chuc_vu" type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Tình Trạng</label>
                                <select v-model="chuc_vu_update.tinh_trang" class="form-control">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="capNhatChucVu()" data-bs-dismiss="modal" class="btn btn-primary">Cập
                        nhật</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá Chức Vụ</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaChucVu()" type="button" data-bs-dismiss="modal"
                        class="btn btn-primary">Xoá</button>
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
            danh_sach_chuc_vu: [],
            chuc_vu_create: {},
            chuc_vu_update: {},
            id_can_xoa: '',
            ten_chuc_vu: '',
        };
    },
    mounted() {
        this.layChucVu();
    },
    methods: {
        layChucVu() {
            baseRequest
                .get("chuc-vu/data")
                .then((res) => {
                    this.danh_sach_chuc_vu = res.data.data;
                    console.log(this.danh_sach_chuc_vu);
                    this.ten_chuc_vu = res.data.quyen;
                    console.log(this.ten_chuc_vu);

                });
        },
        themChucVu() {
            baseRequest
                .post('chuc-vu/create', this.chuc_vu_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layChucVu();
                    }
                });
        },
        xoaChucVu() {
            baseRequest
                .delete("chuc-vu/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layChucVu();
                    }
                });
        },
        capNhatChucVu() {
            baseRequest
                .put("chuc-vu/update", this.chuc_vu_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layChucVu();
                    }
                });
        },
        doiTrangThai(xxx) {
            baseRequest
                .put('chuc-vu/doi-trang-thai', xxx)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layChucVu();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
        doiMaster(xxx) {
            baseRequest
                .put('chuc-vu/doi-master', xxx)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layChucVu();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
    },
}
</script>

<style></style>