<template>
    <!-- Phần thêm dịch vụ -->
    <div class="row mb-2">
        <div class="col-lg-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between">
                        <button class="btn btn-primary mb-2 mb-md-0" data-bs-toggle="modal"
                                data-bs-target="#taoPhongModal">
                            <i class="bx bxs-plus-square me-1"></i>Thêm dịch vụ
                            </button>
                        <div class="section-title d-none d-md-block">
                            <h5 class="mb-0 fw-medium">Quản lý dịch vụ</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Bảng dịch vụ -->
    <div class="row">
        <div class="col-lg-12">
            <div class="card border-0 shadow-sm">
                <div class="card-header bg-white py-3">
                    <h5 class="card-title mb-0">Danh sách dịch vụ</h5>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th width="5%" class="text-center">#</th>
                                    <th width="25%">Tên dịch vụ</th>
                                    <th width="15%" class="text-end">Giá tiền</th>
                                    <th width="20%" class="text-center">Hình ảnh</th>
                                    <th width="15%" class="text-center">Tình trạng</th>
                                    <th width="20%" class="text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(v, k) in danh_sach_dich_vu" :key="k">
                                    <tr>
                                        <td class="text-center">{{ k + 1 }}</td>
                                        <td>
                                            <span class="fw-medium">{{ v.ten_dich_vu }}</span>
                                        </td>
                                        <td class="text-end">
                                            <span class="fw-medium text-primary">{{ Number(v.gia_tien).toLocaleString()
                                                }} đ</span>
                                        </td>
                                        <td class="text-center">
                                            <img class="rounded shadow-sm"
                                                style="height: 80px; width: auto; max-width: 100px; object-fit: cover;"
                                                :src="v.hinh_anh" alt="">
                                        </td>
                                        <td class="text-center">
                                            <span v-if="v.tinh_trang" @click="doiTrangThai(v)"
                                                class="badge bg-success py-2 px-3 cursor-pointer">
                                                <i class="bx bx-check me-1"></i>Hoạt động
                                            </span>
                                            <span v-else @click="doiTrangThai(v)"
                                                class="badge bg-secondary py-2 px-3 cursor-pointer">
                                                <i class="bx bx-pause me-1"></i>Tạm dừng
                                            </span>
                                        </td>
                                        <td class="text-center">
                                            <button v-on:click="Object.assign(dich_vu_update, v)" data-bs-toggle="modal"
                                                data-bs-target="#updateModal"
                                                class="btn btn-sm btn-outline-primary me-1">
                                                <i class="bx bx-edit-alt me-1"></i>Sửa
                                            </button>
                                            <button v-on:click="id_can_xoa = v.id" data-bs-toggle="modal"
                                                data-bs-target="#deleteModal" class="btn btn-sm btn-outline-danger">
                                                <i class="bx bx-trash me-1"></i>Xoá
                                            </button>
                                        </td>
                                    </tr>
                                </template>
                                <tr v-if="danh_sach_dich_vu.length === 0">
                                    <td colspan="6" class="text-center py-4">
                                        <div class="text-muted">Không có dữ liệu dịch vụ</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal thêm dịch vụ -->
    <div class="modal fade" id="taoPhongModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i class="bx bx-plus-circle me-1"></i>Tạo Mới Dịch Vụ
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="form-label">Tên dịch vụ</label>
                                <input v-model="dich_vu_create.ten_dich_vu" type="text" class="form-control"
                                    placeholder="Nhập tên dịch vụ" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="form-label">Giá tiền</label>
                                <div class="input-group">
                                    <input v-model="dich_vu_create.gia_tien" type="number" class="form-control"
                                        placeholder="Nhập giá tiền" />
                                    <span class="input-group-text">VNĐ</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label class="form-label">Hình ảnh</label>
                                <input v-model="dich_vu_create.hinh_anh" type="text" class="form-control"
                                    placeholder="Nhập URL hình ảnh" />
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label class="form-label">Tình Trạng</label>
                                <select v-model="dich_vu_create.tinh_trang" class="form-select">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-top-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        <i class="bx bx-x me-1"></i>Đóng
                    </button>
                    <button v-on:click="themDichVu()" type="button" data-bs-dismiss="modal" class="btn btn-primary">
                        <i class="bx bx-save me-1"></i>Thêm Mới
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal cập nhật -->
    <div class="modal fade" id="updateModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-info text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i class="bx bx-edit me-1"></i>Cập nhật dịch vụ
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="form-label">Tên dịch vụ</label>
                                <input v-model="dich_vu_update.ten_dich_vu" type="text" class="form-control" />
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="form-group">
                                <label class="form-label">Giá tiền</label>
                                <div class="input-group">
                                    <input v-model="dich_vu_update.gia_tien" type="number" class="form-control" />
                                    <span class="input-group-text">VNĐ</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label class="form-label">Hình ảnh</label>
                                <input v-model="dich_vu_update.hinh_anh" type="text" class="form-control" />
                                <div class="mt-2" v-if="dich_vu_update.hinh_anh">
                                    <img class="rounded shadow-sm" style="height: 100px; width: auto;"
                                        :src="dich_vu_update.hinh_anh" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12">
                            <div class="form-group">
                                <label class="form-label">Tình Trạng</label>
                                <select v-model="dich_vu_update.tinh_trang" class="form-select">
                                    <option value="1">Hoạt Động</option>
                                    <option value="0">Tạm Dừng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-top-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        <i class="bx bx-x me-1"></i>Đóng
                    </button>
                    <button v-on:click="capNhatDichVu()" data-bs-dismiss="modal" class="btn btn-info text-white">
                        <i class="bx bx-save me-1"></i>Lưu thay đổi
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal xóa -->
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i class="bx bx-trash me-1"></i>Xoá dịch vụ
                    </h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body py-4">
                    <div class="text-center">
                        <div class="mb-3">
                            <i class="bx bx-error-circle text-danger" style="font-size: 5rem;"></i>
                        </div>
                        <h5 class="mb-2">Xác nhận xóa</h5>
                        <p class="text-muted">Bạn có chắc chắn muốn xóa dịch vụ này không? Hành động này không thể hoàn
                            tác.
                        </p>
                    </div>
                </div>
                <div class="modal-footer border-top-0">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        <i class="bx bx-x me-1"></i>Hủy
                    </button>
                    <button v-on:click="xoaDichVu()" type="button" data-bs-dismiss="modal" class="btn btn-danger">
                        <i class="bx bx-trash me-1"></i>Xác nhận xóa
                    </button>
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
            danh_sach_dich_vu: [],
            dich_vu_create: {},
            dich_vu_update: {},
            id_can_xoa: '',
        };
    },
    mounted() {
        this.layDichVu();
    },
    methods: {
        layDichVu() {
            baseRequest
                .get("dich-vu/data")
                .then((res) => {
                    this.danh_sach_dich_vu = res.data.data;
                    console.log(this.danh_sach_dich_vu);
                });
        },
        themDichVu() {
            baseRequest
                .post('dich-vu/create', this.dich_vu_create)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDichVu();
                    }
                });
        },
        xoaDichVu() {
            baseRequest
                .delete("dich-vu/delete/" + this.id_can_xoa)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDichVu();
                    }
                });
        },
        capNhatDichVu() {
            baseRequest
                .put("dich-vu/update", this.dich_vu_update)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDichVu();
                    }
                });
        },
        doiTrangThai(xxx) {
            baseRequest
                .put('dich-vu/doi-trang-thai', xxx)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success(res.data.message)
                        this.layDichVu();
                    } else {
                        toaster.error(res.data.message)
                    }
                })
        },
    },
}
</script>

<style></style>