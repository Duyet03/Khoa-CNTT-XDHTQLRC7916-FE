<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center">
                            <h6>Danh Sách Quyền</h6>
                            <button data-bs-toggle="modal" data-bs-target="#ThemMoiModal" class="btn btn-primary">Thêm
                                Quyền</button>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="input-group mt-3 w-100">
                            <input type="text" class="form-control search-control border border-4 border-secondary"
                                placeholder="seach...">
                            <span class="position-absolute top-50 search-show translate-middle-y" style="left:15px;"><i
                                    class="bx bx-search"></i></span>
                            <button class="btn btn-outline-secondary " type="button"> Tìm kiếm </button>
                        </div>
                    </div>
                    <!-- Modal Thêm Mới QUyền -->
                    <div class="modal fade" id="ThemMoiModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Quyền</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <label class="mb-2">Tên Quyền</label>
                                    <input v-model="create_quyen.ten_quyen" type="text" class="form-control ">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                    <button v-on:click="themMoiPhanQuyen()" type="button" class="btn btn-primary">Tạo
                                        Mới</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="text-center align-middle">
                                    <tr>
                                        <th>#</th>
                                        <th>Tên Quyền</th>
                                        <th>Cấp Quyền</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody class="text-center align-middle">
                                    <tr v-for="(v, k) in listPhanQuyen" :key="k" class="align-middl">
                                        <th class="text-center">{{ k + 1 }}</th>
                                        <td>{{ v.ten_quyen }}</td>
                                        <td class="text-center">
                                            <button class="btn btn-info">Phân Quyền</button>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(update_quyen, v)" data-bs-toggle="modal"
                                                data-bs-target="#updateModal" class="btn btn-outline-info"> <i
                                                    class="fa-solid fa-pen-to-square"></i> </button>
                                            <button v-on:click="Object.assign(delete_quyen, v)" data-bs-toggle="modal"
                                                data-bs-target="#DeleteModal" class="btn btn-outline-danger"><i
                                                    class="fa-solid fa-trash-can"></i> </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Model cập nhập quyền -->
                        <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhập Quyền</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <label class="mb-2">Tên Quyền</label>
                                        <input v-model="update_quyen.ten_quyen" type="text" class="form-control ">
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button v-on:click="capNhatPhanQuyen()" type="button"
                                            class="btn btn-primary">Xác
                                            Nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Model xóa quyền -->
                        <div class="modal fade" id="DeleteModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Quyền</h1>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div
                                            class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                                            <div class="d-flex align-items-center">
                                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                                </div>
                                                <div class="ms-3">
                                                    <h6 class="mb-0 text-dark">Warning</h6>
                                                    <div class="text-dark">
                                                        <p>Bạn có muốn xóa quyền <b>{{ delete_quyen.ten_quyen }}</b> này
                                                            không? </p>
                                                        <p> <b>Lưu ý:</b> Điều này không thể hoàn tác!</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">Close</button>
                                        <button v-on:click="xoaPhanQuyen()" type="button"
                                            class="btn btn-danger">Xóa</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- DANH SÁCH CHỨC NĂNG -->
            <div class="col-lg-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h6>Danh Sách Chức Năng</h6>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead class="text-center align-middle">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Chức Năng</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody class="text-center align-middle">
                                <tr>
                                    <th>1</th>
                                    <td>abc</td>
                                    <td>
                                        <button class="btn btn-primary">Cấp quyền</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ĐANG PHÂN QUYỀN CHO -->
            <div class="col-lg-4 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h6>Đang Phân Quyền Cho</h6>
                    </div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Tên chức năng</th>
                                    <th>Tên quyền</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>ABC</th>
                                    <td>ABC</td>
                                    <td>
                                        <button style="" class="btn btn-warning ">Xóa Quyền</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
            // listChucNang : [],
            listPhanQuyen: [],
            create_quyen: {},
            delete_quyen: {},
            update_quyen: {},
        }
    },
    mounted() {
        this.layDuLieuPhanQuyen();
    },
    methods: {
        // layDuLieuChucNang() {
        //     baseRequest
        //         .get()
        //         .then((res) => {
        //             this.listChucNang = res.data.data;
        //         });
        // },
        layDuLieuPhanQuyen() {
            baseRequest
                .get('phan-quyen/data')
                .then((res) => {
                    this.listPhanQuyen = res.data.data;
                });
        },
        themMoiPhanQuyen() {
            baseRequest
                .post('phan-quyen/create', this.create_quyen)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.layDuLieuPhanQuyen();
                        this.create_quyen = {};
                    }
                });
        },
        xoaPhanQuyen() {
            baseRequest
                .delete('phan-quyen/delete/' + this.delete_quyen.id)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.layDuLieuPhanQuyen();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
        },
        capNhatPhanQuyen() {
            baseRequest
                .put('phan-quyen/update', this.update_quyen)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.layDuLieuPhanQuyen();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                });
        },
    },

};

</script>
<style></style>