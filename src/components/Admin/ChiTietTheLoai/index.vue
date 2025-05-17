
<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-5 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3>Thêm mới chi tiết thể loại</h3>
                    </div>
                    <div class="card-body">
                        <label for="">Thể loại</label>
                        <input v-model="chi_tiet_the_loai_create.id_the_loai" class="form-control mb-2" type="text">
                        <label for="">Tên phim</label>
                        <input v-model="chi_tiet_the_loai_create.phim_id" class="form-control mb-2" type="text">
                        <label for="">Mô tả</label>
                        <textarea v-model="chi_tiet_the_loai_create.mo_ta" class="form-control" name="" id="" cols="30"
                            rows="5"></textarea>
                    </div>
                    <div class="card-footer text-end">
                        <button v-on:click="themMoi()" class="btn btn-primary">Thêm mới</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-7 col-md-12">
                <div class="card">
                    <div class="card-header">
                        Danh sách chi tiết thể loại
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th class="text-center align-middle">#</th>
                                        <th class="text-center align-middle">Tên thể loại</th>
                                        <th class="text-center align-middle">Tên phim</th>
                                        <th class="text-center align-middle">Mô tả</th>
                                        <th class="text-center align-middle">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="(v, k) in list_chi_tiet_the_loai" :key="k">
                                        <tr>
                                            <th class="text-center align-middle text-nowrap">{{ k + 1 }}</th>
                                            <td class="text-center align-middle text-nowrap">{{ v.id_the_loai }}</td>
                                            <td class="text-center align-middle text-nowrap">{{ v.phim_id }}</td>
                                            <td class="text-center align-middle text-nowrap">{{ v.mo_ta }}</td>
                                            <td class="text-center align-middle text-nowrap">
                                                <button data-bs-toggle="modal" data-bs-target="#cap_nhat"
                                                    v-on:click="Object.assign(chi_tiet_the_loai_update, v)"
                                                    class="btn btn-primary">Cập nhật</button>
                                                <button data-bs-toggle="modal" data-bs-target="#xoa"
                                                    v-on:click="id_can_xoa = v.id"
                                                    class="btn btn-danger ms-1">Xoá</button>
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
        <!-- Modal cap nhat -->
        <div class="modal fade" id="cap_nhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật hoá đơn</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="">Thể loại</label>
                        <input v-model="chi_tiet_the_loai_update.id_the_loai" class="form-control mb-2" type="text">
                        <label for="">Tên phim</label>
                        <input v-model="chi_tiet_the_loai_update.phim_id" class="form-control mb-2" type="text">
                        <label for="">Mô tả</label>
                        <textarea v-model="chi_tiet_the_loai_update.mo_ta" class="form-control" name="" id="" cols="30"
                            rows="5"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                            nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal xoa -->
        <div class="modal fade" id="xoa" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xoá hoá đơn</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger" role="alert">
                            bạn có chắc muốn xoá!!!
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="xoa()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Xoá</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            list_chi_tiet_the_loai: [],
            chi_tiet_the_loai_update: {},
            chi_tiet_the_loai_create: {},
            id_can_xoa: '',
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VI', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadData() {
            baseRequest
                .get("chi-tiet-the-loai/data")
                .then((res) => {
                    this.list_chi_tiet_the_loai = res.data.data;
                })
        },
        xoa() {
            baseRequest
                .delete("chi-tiet-the-loai/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadData();
                        console.log(this.id_can_xoa);

                    } else {
                        toaster.error(res.data.message);
                        console.log(this.id_can_xoa);
                    }
                });
        },
        capNhat() {
            baseRequest
                .put("chi-tiet-the-loai/update", this.chi_tiet_the_loai_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadData();
                    } else {
                        toaster.error(res.data.message)
                    }
                });
        },
        themMoi() {
            baseRequest
                .post("chi-tiet-the-loai/create", this.chi_tiet_the_loai_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.loadData();
                    } else {
                        toaster.error(res.data.message)
                    }
                });
        },

    },
}
</script>

<style></style>