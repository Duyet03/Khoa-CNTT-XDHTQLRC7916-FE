
<template>
    <!-- them -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body">
                    <div class="row align-items-center">
                        <div class="col-lg-3 col-xl-2">
                            <button class="btn btn-primary mb-3 mb-lg-0" data-bs-toggle="modal"
                                data-bs-target="#taoPhongModal">
                                <i class="bx bxs-plus-square"></i>Thêm đánh giá
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="taoPhongModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                                        Tạo Mới Đánh Giá
                                    </h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Id phim</label>
                                                <input v-model="danh_gia_create.phim_id" type="text"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Id khách hàng</label>
                                                <input v-model="danh_gia_create.id_khach_hang" type="integer"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="mb-2 mt-2">
                                                <label>Sao đánh giá</label>
                                                <input v-model="danh_gia_create.sao_danh_gia" type="integer"
                                                    class="form-control mt-2" />
                                            </div>
                                        </div>
                                        <div class="col-lg-12">
                                            <div class="mb-2 mt-2">
                                                <label>Nội dung</label>
                                                <textarea v-model="danh_gia_create.noi_dung" type="text"
                                                    class="form-control mt-2" rows="3">
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                        Close</button>
                                    <button v-on:click="themDanhGia()" type="button" data-bs-dismiss="modal"
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
                    <h5 class="mt-2">Quản lý tài khoản khách hàng</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Phim</th>
                                    <th>Khách hàng</th>
                                    <th>Sao đánh giá</th>
                                    <th>Nội dung</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_danh_gia" :key="k">
                                    <tr class="align-middle">
                                        <td>{{ k + 1 }}</td>
                                        <td>{{ v.ten_phim }}</td>
                                        <td>{{ v.ten_khach_hang }}</td>
                                        <td>{{ v.sao_danh_gia }}</td>
                                        <td>{{ v.noi_dung }}</td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(danh_gia_update, v)"
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
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật đanh giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Id phim</label>
                                <input v-model="danh_gia_update.phim_id" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Id khách hàng</label>
                                <input v-model="danh_gia_update.id_khach_hang" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="mb-2 mt-2">
                                <label>Sao đánh giá</label>
                                <input v-model="danh_gia_update.sao_danh_gia" type="text" class="form-control mt-2" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="mb-2 mt-2">
                                <label>Nội dung</label>
                                <textarea v-model="danh_gia_update.noi_dung" type="text" class="form-control mt-2"
                                    rows="5">
                            </textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="capNhatDanhGia()" data-bs-dismiss="modal" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá đánh giá</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="alert alert-danger" role="alert">
                        Bạn có thực sự muốn xoá!
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="xoaDanhGia()" type="button" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            danh_sach_danh_gia: [],
            danh_gia_create: {},
            danh_gia_update: {},
            id_can_xoa: '',
        };
    },
    mounted() {
        this.layDanhGia();
    },
    methods: {
        layDanhGia() {
            baseRequest
                .get("danh-gia/data")
                .then((res) => {
                    this.danh_sach_danh_gia = res.data.data;
                    console.log(this.danh_sach_danh_gia);
                });
        },
        themDanhGia() {
            baseRequest
                .post('danh-gia/create', this.danh_gia_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDanhGia();
                    }
                });
        },
        xoaDanhGia() {
            baseRequest
                .delete("danh-gia/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDanhGia();
                    }
                });
        },
        capNhatDanhGia() {
            baseRequest
                .put("danh-gia/update", this.danh_gia_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        // this.layDanhGia();
                        this.danh_gia_update = res.data.data;
                        console.log(this.danh_gia_update);
                    }
                });
        },
        doiTrangThai(xxx) {
            baseRequest
                .put('danh-gia/doi-trang-thai', xxx)
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
}
</script>

<style></style>