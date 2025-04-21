<template>
    <div class="container">
        <div class="card">
            <div class="card-body d-flex justify-content-between">
                <h3>Tạo chi tiết vé</h3>
                <button data-bs-toggle="modal" data-bs-target="#themmoi" style="width: 100px;"
                    class="btn btn-primary">Tạo <i class="fa-solid fa-plus"></i></button>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">ID khach hang</th>
                                <th class="text-center align-middle">Dịch vụ</th>
                                <th class="text-center align-middle">Suất</th>
                                <th class="text-center align-middle">Ghế</th>
                                <th class="text-center align-middle">Mã hoá đơn</th>
                                <th class="text-center align-middle">Ghi chú</th>
                                <th class="text-center align-middle">Action</th>
                                <th class="text-center align-middle"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_chi_tiet_ve" :key="k">
                                <tr>
                                    <th class="text-center align-middle">{{ k + 1 }}</th>
                                    <td class="text-center align-middle">{{ v.id_khach_hang }}</td>
                                    <td class="text-center align-middle">{{ v.id_dich_vu }}</td>
                                    <td class="text-center align-middle">{{ v.id_suat }}</td>
                                    <td class="text-center align-middle">{{ v.id_ghe }}</td>
                                    <td class="text-center align-middle">{{ v.id_hoa_don }}</td>
                                    <td class="text-center align-middle"><i data-bs-toggle="modal"
                                            data-bs-target="#ghichu" class="fa-2x fa-solid fa-pen-to-square"></i>
                                    </td>
                                    <td class="text-center align-middle">
                                        <button v-on:click="Object.assign(chi_tiet_ve_update, v)" data-bs-toggle="modal"
                                            data-bs-target="#cap_nhat" class="btn btn-primary">Cập nhật</button>
                                        <button data-bs-toggle="modal" data-bs-target="#xoa"
                                            v-on:click="id_can_xoa = v.id" class="btn btn-danger ms-1">Xoá</button>
                                    </td>
                                    <td class="text-center align-middle">
                                        <button class="btn btn-info">In vé</button>
                                    </td>
                                </tr>
                                <!-- ghi chu -->
                                <div class="modal fade" id="ghichu" tabindex="-1" aria-labelledby="exampleModalLabel"
                                    aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">Ghi chú</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                {{ v.ghi_chu }}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- cap nhat -->
        <div class="modal fade" id="cap_nhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật hoá đơn</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">                       
                        <label for="">Mã khách hàng</label>
                        <input v-model="chi_tiet_ve_update.id_khach_hang" class="form-control mb-2" type="text">
                        <label for="">Dịch vụ</label>
                        <input v-model="chi_tiet_ve_update.id_dich_vu" class="form-control mb-2" type="text">
                        <label for="">Suất</label>
                        <input v-model="chi_tiet_ve_update.id_suat" class="form-control mb-2" type="text">
                        <label for="">Ghế</label>
                        <input v-model="chi_tiet_ve_update.id_ghe" class="form-control mb-2" type="text">
                        <label for="">Hoá đơn</label>
                        <input v-model="chi_tiet_ve_update.id_hoa_don" class="form-control mb-2" type="text">
                        <label for="">Ghi chú</label>
                        <textarea v-model="chi_tiet_ve_update.ghi_chu" class="form-control " name="" id="" cols="30"
                            rows="10"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="capNhat()" type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập
                            nhật</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- xoa -->
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
        <!-- themmoi -->
        <div class="modal fade" id="themmoi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm mới hoá đơn</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <label for="">Mã khách hàng</label>
                        <input v-model="chi_tiet_ve_create.id_khach_hang" class="form-control mb-2" type="text">
                        <label for="">Dịch vụ</label>
                        <input v-model="chi_tiet_ve_create.id_dich_vu" class="form-control mb-2" type="text">
                        <label for="">Suất</label>
                        <input v-model="chi_tiet_ve_create.id_suat" class="form-control mb-2" type="text">
                        <label for="">Ghế</label>
                        <input v-model="chi_tiet_ve_create.id_ghe" class="form-control mb-2" type="text">
                        <label for="">Hoá đơn</label>
                        <input v-model="chi_tiet_ve_create.id_hoa_don" class="form-control mb-2" type="text">
                        <label for="">Ghi chú</label>
                        <textarea v-model="chi_tiet_ve_create.ghi_chu" class="form-control " name="" id="" cols="30"
                            rows="10"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button v-on:click="themMoi()" type="button" class="btn btn-primary"
                            data-bs-dismiss="modal">Thêm
                            mới</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { createToaster } from "@meforma/vue-toaster";
import axios from "axios";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';
export default {
    data() {
        return {
            list_chi_tiet_ve: [],
            chi_tiet_ve_update: {},
            chi_tiet_ve_create: {},
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
                .get("chi-tiet-ve/data")
                .then((res) => {
                    this.list_chi_tiet_ve = res.data.data;
                })
        },
        xoa() {
            baseRequest
                .delete("chi-tiet-ve/delete/" + this.id_can_xoa)
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
                .put("chi-tiet-ve/update", this.chi_tiet_ve_update)
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
                .post("chi-tiet-ve/create", this.chi_tiet_ve_create)
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