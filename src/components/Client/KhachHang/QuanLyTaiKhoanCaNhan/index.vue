<template>
    <div class="container mt-4">
        <div class="row">
            <!-- Left panel -->
            <div class="col-lg-4 d-flex justify-content-center">
                <div class="card shadow-sm w-100">
                    <div class="card-body text-center">
                        <img src="https://i.pinimg.com/236x/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg"
                            class="rounded-circle mb-3" style="width: 100px;" alt="avatar" />
                        <h5 class="fw-bold">{{ khach_hang.ten_khach_hang }}</h5>
                        <hr />
                        <h6 class="mb-1">Tổng chi tiêu 2025 <br> <span class="text-danger fw-bold">{{ tong_tien_da_thanh_toan }}</span></h6>
                        <hr />
                        <div class="text-start">
                            <p><strong>HOTLINE:</strong> <a href="tel:19002224">0332162386</a> (9:00 - 22:00)</p>
                            <p><strong>Email:</strong> <a href="mailto:duyetvan03@gmail.com">duyetvan03@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right panel -->
            <div class="col-lg-8 d-flex justify-content-center">
                <div class="card w-100">
                    <div class="card-body">
                        <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab"
                                    aria-selected="true">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon"><i class="bx bx-comment-detail font-18 me-1"></i>
                                        </div>
                                        <div class="tab-title"> Thông tin cá nhân</div>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon"><i class="bx bx-bookmark-alt font-18 me-1"></i>
                                        </div>
                                        <div class="tab-title">Đổi mật khẩu</div>
                                    </div>
                                </a>
                            </li>
                            <!-- <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab"
                                    aria-selected="false" tabindex="-1">
                                    <div class="d-flex align-items-center">
                                        <div class="tab-icon"><i class="bx bx-star font-18 me-1"></i>
                                        </div>
                                        <div class="tab-title">Lịch sử thanh toán</div>
                                    </div>
                                </a>
                            </li> -->
                        </ul>
                        <div class="tab-content pt-3">
                            <div class="tab-pane fade active show" id="primaryhome" role="tabpanel">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Họ và tên</label>
                                        <input type="text" class="form-control" :value="khach_hang.ten_khach_hang"
                                            disabled />
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Ngày sinh</label>
                                        <input type="date" class="form-control" :value="khach_hang.ngay_sinh"
                                            disabled />
                                    </div>
                                </div>

                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Email</label>
                                        <div class="d-flex align-items-center">
                                            <input type="email" class="form-control" :value="khach_hang.email"
                                                disabled />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Số điện thoại</label>
                                        <input type="text" class="form-control" :value="khach_hang.so_dien_thoai"
                                            disabled />
                                    </div>
                                </div>
                                <div class="text-center mt-5">
                                    <button style="width: 200px;" class="btn btn-warning" data-bs-toggle="modal"
                                        data-bs-target="#capnhat">Cập
                                        nhật</button>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="primaryprofile" role="tabpanel">
                                <label for="">Mật khẩu hiện tại</label>
                                <input v-model="mat_khau.hien_tai" class="form-control mt-1" type="password" name=""
                                    id="">
                                <label for="" class="mt-3">Mật khẩu mới</label>
                                <input v-model="mat_khau.moi" class="form-control mt-1" type="password" name="" id="">
                                <label for="" class="mt-3">Nhập lại mật khẩu mới</label>
                                <input v-model="mat_khau.re_password" class="form-control mt-1" type="password" name=""
                                    id="">
                                <div class="text-center mt-3">
                                    <button style="width: 200px;" class="btn btn-warning" data-bs-toggle="modal"
                                        data-bs-target="#doi">Xác nhận</button>
                                </div>
                            </div>
                            <!-- <div class="tab-pane fade" id="primarycontact" role="tabpanel">
                                <b>lịch sử thanh toán</b>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Mã hoá đơn</th>
                                            <th>ID khách hàng</th>
                                            <th>Tổng tiền</th>
                                            <th>Trạng thái</th>
                                            <th>Ngày thanh toán</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-for="(value, index) in list_hd" :key="index">
                                            <tr>
                                                <td class="text-center align-middle">{{ value.ma_hoa_don }}</td>
                                                <td class="text-center align-middle">{{ value.id_khach_hang }}</td>
                                                <td class="text-center align-middle">{{ value.tong_tien }}</td>
                                                <td class="text-center align-middle">
                                                    <button v-if="value.trang_thai == 1" class="btn btn-success">Đã thanh
                                                        toán</button>
                                                    <button v-else class="btn btn-warning">Chưa thanh toán </button>
                                                </td>
                                                <td>{{ value.ngay_thanh_toan }}</td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="capnhat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật thông tin cá nhân</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="tab-pane fade active show" id="primaryhome" role="tabpanel">
                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Họ và tên</label>
                                    <input type="text" class="form-control" value="Trần Văn Duyệt" />
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Ngày sinh</label>
                                    <input type="date" class="form-control" value="2003-01-06" />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <div class="d-flex align-items-center">
                                        <input type="email" class="form-control" value="duyetvan03@gmail.com" />
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="text" class="form-control" value="0332162386" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Cập nhật</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="doi" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Đổi mật khẩu</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Bạn có chắc muốn đổi mật khẩu !!!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button v-on:click="doiMatKhau()" type="button" class="btn btn-primary"
                        data-bs-dismiss="modal">Save</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            khach_hang: {},
            mat_khau: {
                hien_tai: '',
                moi: '',
                re_password: ''
            },
            list_hd: [],
            tong_tien_da_thanh_toan: '',
        }
    },
    mounted() {

        this.load();
        this.loadHD()
    },
    methods: {
        load() {
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/thong-tin-ca-nhan', {}, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    this.khach_hang = res.data.data;

                });
        },
        doiMatKhau() {
            var payLoad = {
                email: this.khach_hang.email,
                password: this.mat_khau.hien_tai,
                moi: this.mat_khau.moi,
                re_password: this.mat_khau.re_password
            }
            axios
                .post('http://127.0.0.1:8000/api/khach-hang/doi-mat-khau', payLoad, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    if (res.data.status) {
                        this.$router.push('/login');
                        toaster.success(res.data.message)
                    } else {
                        toaster.error(res.data.message)
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 422) {
                        const errors = error.response.data.errors;
                        // Lặp qua các lỗi và hiển thị từng cái
                        for (let field in errors) {
                            if (errors.hasOwnProperty(field)) {
                                errors[field].forEach(msg => toaster.error(msg));
                            }
                        }
                    } else {
                        toaster.error("Đã xảy ra lỗi, vui lòng thử lại.");
                    }
                });
        },
        loadHD() {
            axios
                .get('http://127.0.0.1:8000/api/khach-hang/hoa-don', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_khachhang")
                    }
                })
                .then((res) => {
                    this.list_hd = res.data.data
                    this.tong_tien_da_thanh_toan = res.data.tong_tien_da_thanh_toan


                    this.tong_tien_da_thanh_toan = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(this.tong_tien_da_thanh_toan);

                })
        },
    },
}
</script>

<style scoped>
.nav-tabs .nav-link.active {
    border-bottom: 2px solid #007bff;
    font-weight: bold;
}
</style>