<template>
    <div class="row">
        <div class="col-lg-4 col-md-12">
            <div class="card">
                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <h6>Danh Sách Chức Vụ</h6>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead class="text-center align-middle">
                                <tr>
                                    <th>#</th>
                                    <th>Tên Chức vụ</th>
                                    <th>Cấp Quyền</th>
                                </tr>
                            </thead>
                            <tbody class="text-center align-middle">
                                <tr v-for="(v, k) in list_chuc_vu" :key="k" class="align-middl">
                                    <th class="text-center">{{ k + 1 }}</th>
                                    <td>{{ v.ten_chuc_vu }}</td>
                                    <td class="text-center">
                                        <button 
                                            v-on:click="Object.assign(chuc_vu, v), loadChucNang(), loadChiTietPhanQuyen()"
                                            class="btn btn-info">Phân Quyền</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- DANH SÁCH CÁC CHỨC NĂNG -->
        <div class="col-lg-4 col-md-12">
            <div class="card">
                <div class="card-header">
                    <h6>Danh Sách Chức Năng</h6>
                </div>
                <div v-if="chuc_vu.id != null" class="card-body">
                    <div class="input-group mt-3 w-100">
                        <input v-model="tim_kiem_cn.noi_dung" type="text" class="form-control search-control"
                            placeholder="seach...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left:15px;"><i
                                class="bx bx-search"></i></span>
                        <button v-on:click="searchCN()" class="btn btn-outline-secondary " type="button"> Tìm kiếm
                        </button>
                    </div>
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
                        <tbody v-if="chuc_vu.id != null" class="text-center align-middle">
                            <template v-for="(v, i) in list_chuc_nang" :key="i">
                                <tr>
                                    <th>{{ i + 1 }}</th>
                                    <td>{{ v.ten_chuc_nang }}</td>
                                    <td>
                                        <button v-on:click="Object.assign(chuc_nang, v), capQuyen()"
                                            class="btn btn-primary text-nowrap">Cấp quyền</button>
                                    </td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- ĐANG PHÂN QUYỀN CHO -->
        <div class="col-lg-4 col-md-12">
            <div class="card">
                <div class="card-header">
                    <h6>Đang Phân Quyền Cho <span class="text-danger"><b>{{ chuc_vu.ten_chuc_vu }}</b></span></h6>
                </div>
                <div class="card-body">
                    <div v-if="chuc_vu.id != null" class="input-group mt-3 w-100">
                        <input v-model="tim_kiem_pq.noi_dung" type="text" class="form-control search-control "
                            placeholder="seach...">
                        <span class="position-absolute top-50 search-show translate-middle-y" style="left:15px;"><i
                                class="bx bx-search"></i></span>
                        <button v-on:click="searchCQ()" class="btn btn-outline-secondary " type="button"> Tìm kiếm
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên chức vụ</th>
                                <th>Tên chức năng</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, i) in list_phan_quyen" :key="i">
                                <tr class="text-center align-middle">
                                    <th>{{ i + 1 }}</th>
                                    <td>{{ v.ten_chuc_vu }}</td>
                                    <td>{{ v.ten_chuc_nang }}</td>
                                    <td>
                                        <button v-on:click="xoaQuyen(v)" class="btn btn-danger text-nowrap">Xóa
                                            Quyền</button>
                                    </td>
                                </tr>
                            </template>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../../core/baseRequest';
export default {
    data() {
        return {
            list_chuc_nang: [],
            list_chuc_vu: [],
            list_phan_quyen: [],
            create_quyen: {},
            delete_quyen: {},
            update_quyen: {},
            chuc_vu: {},
            chuc_nang: {},
            tim_kiem_cn: {
                noi_dung: ''
            },
            tim_kiem_pq: {
                noi_dung: ''
            },
            quyen: false,
        }
    },
    mounted() {
        this.loadChucVuOP()
    },
    methods: {
        checkQuyen() {
            baseRequest
                .get("phan-quyen/quyen")
                .then((res) => {
                    if(res.data.status){
                        this.quyen=true;
                    }else{
                        toaster.error("Bạn không có quyền này");
                    }
                });
        },
        loadChucVuOP() {
            baseRequest
                .get("chuc-vu/data/open")
                .then((res) => {
                    this.list_chuc_vu = res.data.data;
                });
        },
        loadChucNang() {
            baseRequest
                .post("chuc-nang/data", this.chuc_vu)
                .then((res) => {
                    this.list_chuc_nang = res.data.data;
                });
        },
        loadChiTietPhanQuyen() {
            var payLoad = {
                id_chuc_vu: this.chuc_vu.id,
            }
            baseRequest
                .post("chi-tiet-quyen/data", payLoad)
                .then((res) => {
                    this.list_phan_quyen = res.data.data;
                });
        },
        capQuyen() {
            var payLoad = {
                id_quyen: this.chuc_vu.id,
                id_chuc_nang: this.chuc_nang.id
            }

            baseRequest
                .post("chi-tiet-quyen/cap-quyen", payLoad)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message)
                        this.loadChiTietPhanQuyen()
                        this.loadChucNang()
                    } else {
                        toaster.error(res.data.message)
                    }
                });
        },
        xoaQuyen(x) {
            baseRequest
                .post("chi-tiet-quyen/xoa-quyen", x)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message)
                        this.loadChiTietPhanQuyen()
                        this.loadChucNang()
                    } else {
                        toaster.error(res.data.message)
                    }
                });
        },
        searchCN() {
            var payLoad = {
                id_chuc_vu: this.chuc_vu.id,
                noi_dung: this.tim_kiem_cn.noi_dung
            }
            baseRequest
                .post("chuc-nang/tim-kiem", payLoad)
                .then((res) => {
                    this.list_chuc_nang = res.data.data;
                });
        },
        searchCQ() {
            var payLoad = {
                id_chuc_vu: this.chuc_vu.id,
                noi_dung: this.tim_kiem_pq.noi_dung
            }
            baseRequest
                .post("chi-tiet-quyen/tim-kiem", payLoad)
                .then((res) => {
                    this.list_phan_quyen = res.data.data;
                });
        }
    },


};

</script>
<style></style>