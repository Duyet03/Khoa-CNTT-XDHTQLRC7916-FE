
<template>
    <!-- table  -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="mt-2">Quản lý đánh giá khách hàng</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered">
                            <thead>
                                <tr class="text-center">
                                    <th>#</th>
                                    <th>Phim</th>
                                    <th>Khách hàng</th>
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
                                        <td>{{ v.noi_dung }}</td>
                                        <td class="text-center">
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
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                    <button v-on:click="xoaDanhGia()" type="button" data-bs-dismiss="modal" class="btn btn-primary">Xóa</button>
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