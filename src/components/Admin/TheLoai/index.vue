<template>
    <div class="row">
        <div class="col-4">
            <div class="card">
                <div class="card-header">
                    <h5 class="pt-3"><b>Cập Nhật Thể Loại</b></h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-12">
                            <label for="">Tên Thể Loại</label>
                            <input v-model="create_the_loai.ten_the_loai" type="text" class="form-control mt-2">
                        </div>
                        <div class="col-12">
                            <label for="">Mô tả</label>
                            <textarea class="form-control mt-2" v-model="create_the_loai.mo_ta" rows="10"></textarea>
                        </div>
                    </div>


                </div>
                <div class="card-footer text-end">
                    <button v-on:click="createTheLoai()" class="btn btn-primary">Thêm Mới</button>
                </div>
            </div>
        </div>

        <div class="col-8">
            <div class="card border-top border-0 border-4 border-primary">
                <div class="card-header">
                    <h5 class="pt-3"><b>Danh Sách Thể Loại</b></h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th class="text-center align-middle text-nowrap">
                                        #
                                    </th>
                                    <th class="text-center align-middle text-nowrap">
                                        Tên Thể Loại
                                    </th>
                                    <th class="text-center align-middle text-nowrap">
                                        Mô tả
                                    </th>

                                    <th class="text-center align-middle text-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(v, k) in list_the_loai" :key="k">
                                    <th class="text-center align-middle text-nowrap">
                                        {{ k + 1 }}
                                    </th>
                                    <td class="align-middle text-nowrap">
                                        {{ v.ten_the_loai }}
                                    </td>
                                    <td class="text-center align-middle text-nowrap">
                                        <i v-on:click="Object.assign(mo_ta, v)" data-bs-toggle="modal"
                                            data-bs-target="#mota" class="fa-2x fa-solid fa-circle-info text-info"></i>
                                    </td>

                                    <td class="text-center align-middle text-nowrap">
                                        <button v-on:click="Object.assign(edit_the_loai, v)" class="btn btn-info me-2"
                                            style="width: 100px;" data-bs-toggle="modal"
                                            data-bs-target="#capnhatModal">Cập Nhật</button>
                                        <button v-on:click="delete_the_loai = v.id" class="btn btn-danger"
                                            style="width: 100px;" data-bs-toggle="modal"
                                            data-bs-target="#xoaModal">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- mo ta -->
        <div class="modal fade" id="mota" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Mô tả</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ mo_ta.mo_ta }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- xoa -->
        <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Thể Loại</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i>
                                </div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-dark">Warning</h6>
                                    <div class="text-dark">
                                        <p>Bạn có muốn xóa Thể Loại này không?
                                        </p>
                                        <p>
                                            <b>Lưu ý:</b> Điều này không thể hoàn tác!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            v-on:click="deleteTheLoai()">Xóa</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhatModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Thể Loại</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="row">
                                <div class="col-12">
                                    <label class="form-label">Tên Thể Loại</label>
                                    <input v-model="edit_the_loai.ten_the_loai" type="text" class="form-control mb-3">
                                    <label class="form-label">Mô tả</label>
                                    <input v-model="edit_the_loai.mo_ta" type="text" class="form-control mb-3">
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button v-on:click="updateTheLoai()" data-bs-dismiss="modal" type="button"
                            class="btn btn-primary">Cập Nhật</button>
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
            list_the_loai: [],
            create_the_loai: {},
            delete_the_loai: {},
            edit_the_loai: {},
            mo_ta: {},
        }
    },
    mounted() {
        this.loadDataTheLoai();
    },
    methods: {
        loadDataTheLoai() {
            baseRequest
                .get('admin/the-loai-phim/lay-du-lieu')
                .then((res) => {
                    this.list_the_loai = res.data.the_loai;
                });
        },
        createTheLoai() {
            baseRequest
                .post('admin/the-loai-phim/create', this.create_the_loai)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataTheLoai();
                    } else {
                        toaster.error('Có Lỗi<br>' + res.data.message);
                    }
                })
                .catch((res) => {
                    var errors = Object.values(res.response.data.errors);
                    errors.forEach(function (v, k) {
                        toaster.error('Có Lỗi<br>' + v[0]);
                    });
                });
        },
        deleteTheLoai() {
            baseRequest
                .delete('admin/the-loai-phim/delete/' + this.delete_the_loai)
                .then((res) => {
                    console.log(res.data.status);
                    if (res.data.status == 1) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataTheLoai();
                    }
                    else {
                        toaster.danger('Thông báo<br>' + res.data.message);
                    }
                })
        },
        updateTheLoai() {

            baseRequest
                .put('admin/the-loai-phim/update', this.edit_the_loai)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataTheLoai();
                    } else {
                        toaster.danger('Thông báo<br>' + res.data.message);
                    }
                })
                .catch((res) => {
                    var errors = Object.values(res.response.data.errors);
                    errors.forEach(function (v, k) {
                        toaster.error('Có Lỗi<br>' + v[0]);
                    });
                });
        },
    },
}
</script>
<style></style>