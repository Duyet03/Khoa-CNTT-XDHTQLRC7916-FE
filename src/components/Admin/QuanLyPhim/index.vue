<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card_header mt-2">
                    <div class="row">
                        <div class="col-6">
                            <b style="font-size: 20px;">Quản Lí Phim</b>
                        </div>
                        <div class="col-6 text-end">
                            <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                                class="btn btn-outline-primary px-5 radius-30">
                                <b>Thêm Mới</b>
                            </button>
                        </div>
                    </div>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Thêm Mới Phim</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Tên Phim</label>
                                                <input v-model="create_quan_ly_phim.ten_phim" type="text"
                                                    class="form-control mb-2" placeholder="Nhập tên phim">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Slug phim</label>
                                                <input v-model="create_quan_ly_phim.slug_phim" type="text"
                                                    class="form-control mb-2" placeholder="Nhập slug phim">
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Ngày Chiếu</label>
                                                <input v-model="create_quan_ly_phim.ngay_chieu" type="date"
                                                    class="form-control mb-2" placeholder="Ngày Chiếu">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Thời Lượng</label>
                                                <input v-model="create_quan_ly_phim.thoi_luong" type="text"
                                                    class="form-control mb-2" placeholder="Nhập thời lượng (phút)">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Đạo Diễn</label>
                                                <input v-model="create_quan_ly_phim.dao_dien" type="text"
                                                    class="form-control mb-2" placeholder="Nhập tên đạo diễn">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Diễn Viên</label>
                                                <input v-model="create_quan_ly_phim.dien_vien" type="text"
                                                    class="form-control mb-2" placeholder="Nhập tên diễn viên">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Giới Hạn Độ Tuổi</label>
                                                <input v-model="create_quan_ly_phim.gioi_han_do_tuoi" type="text"
                                                    class="form-control mb-2" placeholder="Nhập độ tuổi (VD: 18+)">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Hình Ảnh</label>
                                                <input v-model="create_quan_ly_phim.hinh_anh" type="text"
                                                    class="form-control mb-2" placeholder="Nhập URL hình ảnh">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Đánh Giá</label>
                                                <input v-model="create_quan_ly_phim.danh_gia" type="text"
                                                    class="form-control mb-2" placeholder="Nhập đánh giá (VD: 8/10)">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                <label class="form-label">Trailer YouTube</label>
                                                <input v-model="create_quan_ly_phim.trailer_ytb" type="text"
                                                    class="form-control mb-2" placeholder="Nhập URL trailer">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Mô Tả</label>
                                                <input v-model="create_quan_ly_phim.mo_ta" type="text"
                                                    class="form-control mb-2" placeholder="Nhập mô tả phim">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Nhà Sản Xuất</label>
                                                <input v-model="create_quan_ly_phim.nha_san_xuat" type="text"
                                                    class="form-control mb-2" placeholder="Nhập nhà sản xuất">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Thể Loại Phim</label>
                                                <select v-model="create_quan_ly_phim.id_the_loai"
                                                    class="form-control">
                                                    <option value="" disabled selected>Chọn thể loại</option>
                                                    <template v-for="theLoai in list_the_loai" :key="theLoai.id">
                                                        <option :value="theLoai.id">{{ theLoai.ten_the_loai }}</option>
                                                    </template>
                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Tình Trạng</label>
                                                <select v-model="create_quan_ly_phim.tinh_trang"
                                                    class="form-control mb-3">
                                                    <option value="0">Tạm Dừng</option>
                                                    <option value="1">Hiển Thị</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                    <button v-on:click="createQuanLyPhim()" data-bs-dismiss="modal" type="button"
                                        class="btn btn-primary">Thêm
                                        Mới Phim</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="capnhatModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập Nhật Phim</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Tên Phim</label>
                                                <input v-model="edit_quan_ly_phim.ten_phim" type="text"
                                                    class="form-control mb-3" placeholder="Nhập tên phim">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Slug Phim</label>
                                                <input v-model="edit_quan_ly_phim.slug_phim" type="text"
                                                    class="form-control mb-3" placeholder="Nhập slug phim">
                                            </div>
                                            <div class="col-12">
                                                <label class="form-label">Ngày Chiếu</label>
                                                <input v-model="edit_quan_ly_phim.ngay_chieu" type="date"
                                                    class="form-control mb-3" placeholder="Ngày Chiếu">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Thời Lượng</label>
                                                <input v-model="edit_quan_ly_phim.thoi_luong" type="text"
                                                    class="form-control mb-3" placeholder="Nhập thời lượng (phút)">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Đạo Diễn</label>
                                                <input v-model="edit_quan_ly_phim.dao_dien" type="text"
                                                    class="form-control mb-3" placeholder="Nhập tên đạo diễn">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Diễn Viên</label>
                                                <input v-model="edit_quan_ly_phim.dien_vien" type="text"
                                                    class="form-control mb-3" placeholder="Nhập tên diễn viên">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Giới Hạn Độ Tuổi</label>
                                                <input v-model="edit_quan_ly_phim.gioi_han_do_tuoi" type="text"
                                                    class="form-control mb-3" placeholder="Nhập độ tuổi (VD: 18+)">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Hình Ảnh</label>
                                                <input v-model="edit_quan_ly_phim.hinh_anh" type="text"
                                                    class="form-control mb-3" placeholder="Nhập URL hình ảnh">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Đánh Giá</label>
                                                <input v-model="edit_quan_ly_phim.danh_gia" type="text"
                                                    class="form-control mb-3" placeholder="Nhập đánh giá (VD: 8/10)">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Trailer YouTube</label>
                                                <input v-model="edit_quan_ly_phim.trailer_ytb" type="text"
                                                    class="form-control mb-3" placeholder="Nhập URL trailer">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Mô Tả</label>
                                                <input v-model="edit_quan_ly_phim.mo_ta" type="text"
                                                    class="form-control mb-3" placeholder="Nhập mô tả phim">
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Nhà Sản Xuất</label>
                                                <input v-model="edit_quan_ly_phim.nha_san_xuat" type="text"
                                                    class="form-control mb-3" placeholder="Nhập nhà sản xuất">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-6">
                                                <label class="form-label">Thể Loại Phim</label>
                                                <select v-model="edit_quan_ly_phim.id_the_loai"
                                                    class="form-control mt-2">
                                                    <option value="" disabled>Chọn thể loại</option>
                                                    <template v-for="theLoai in list_the_loai" :key="theLoai.id">
                                                        <option :value="theLoai.id">{{ theLoai.ten_the_loai }}</option>
                                                    </template>
                                                </select>
                                            </div>
                                            <div class="col-6">
                                                <label class="form-label">Tình Trạng</label>
                                                <select v-model="edit_quan_ly_phim.tinh_trang"
                                                    class="form-control mb-3">
                                                    <option value="0">Tạm Dừng</option>
                                                    <option value="1">Hiển Thị</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Đóng</button>
                                    <button v-on:click="updateQuanLyPhim()" data-bs-dismiss="modal" type="button"
                                        class="btn btn-primary">Cập Nhật</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th colspan="100%">
                                        <div class="input-group mb-3">
                                            <input v-model="key_search.abc" type="text" class="form-control"
                                                placeholder="Nhập thông tin cần tìm">
                                            <button v-on:click="searchQuanLyPhim" class="btn btn-primary">
                                                <i class="fa-solid fa-magnifying-glass"></i>
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                                <tr class="text-center align-middle">
                                    <th>#</th>
                                    <th>Tên Phim</th>
                                    <th>Slug phim</th>
                                    <th>Ngày Chiếu</th>
                                    <th>Thời Lượng</th>
                                    <th>Đạo Diễn</th>
                                    <th>Diễn Viên</th>
                                    <th>Nhà Sản Xuất</th>
                                    <th>Thể Loại phim</th>
                                    <th>Giới Hạn Độ Tuổi</th>
                                    <th>Hình Ảnh</th>
                                    <th>Trailer YouTube</th>
                                    <th>Đánh Giá</th>
                                    <th>Mô tả</th>
                                    <th>Tình Trạng</th>
                                    <th>Active</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(v, k) in list_quan_ly_phim" :key="k">
                                    <td class="text-center align-middle text-nowrap">{{ k + 1 }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.ten_phim }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.slug_phim }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.ngay_chieu }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.thoi_luong }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.dao_dien }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.dien_vien }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.nha_san_xuat }}</td>
                                    <td class="text-center align-middle text-nowrap">
                                        {{ v.the_loais ? v.the_loais.map(tl => tl.ten_the_loai).join(', ') : "Đang cập nhật" }}
                                    </td>
                                    <td class="text-center align-middle text-nowrap">{{ v.gioi_han_do_tuoi }}</td>
                                    <td class="text-center align-middle text-nowrap">
                                        <img :src="v.hinh_anh" alt="" style="height: 50px;">
                                    </td>
                                    <td class="text-center align-middle text-nowrap">{{ v.trailer_ytb }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.danh_gia }}</td>
                                    <td class="text-center align-middle text-nowrap">{{ v.mo_ta }}</td>
                                    <td class="text-center align-middle text-nowrap">
                                        <button v-on:click="doiTrangThai(v)" v-if="v.tinh_trang == 1"
                                            class="btn btn-primary">Hoạt
                                            Động</button>
                                        <button v-on:click="doiTrangThai(v)" v-else class="btn btn-success">Tạm
                                            Dừng</button>
                                    </td>
                                    <td class="align-middle text-nowrap text-center">
                                        <button v-on:click="Object.assign(edit_quan_ly_phim, v)" data-bs-toggle="modal"
                                            data-bs-target="#capnhatModal" class="btn btn-primary"
                                            style="margin-right: 4px;">Cập
                                            Nhật</button>
                                        <button v-on:click="delete_quan_ly_phim = v.id" data-bs-toggle="modal"
                                            data-bs-target="#xoaModal" class="btn btn-danger">Xóa</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="xoaModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Phim</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                            <div class="d-flex align-items-center">
                                <div class="font-35 text-dark"><i class="bx bx-info-circle"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 text-dark">Warning</h6>
                                    <div class="text-dark">
                                        <p>Bạn có muốn xóa phim này không?</p>
                                        <p><b>Lưu ý:</b> Điều này không thể hoàn tác!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                            v-on:click="deleteQuanLyPhim()">Xóa Phim</button>
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
            list_quan_ly_phim: [],
            key_search: { abc: '' },
            create_quan_ly_phim: {
                ten_phim: '',
                slug_phim: '',
                ngay_chieu: '',
                thoi_luong: '',
                dao_dien: '',
                dien_vien: '',
                gioi_han_do_tuoi: '',
                hinh_anh: '',
                danh_gia: '',
                trailer_ytb: '',
                mo_ta: '',
                nha_san_xuat: '',
                id_the_loai: '',
                tinh_trang: '1'
            },
            delete_quan_ly_phim: {},
            edit_quan_ly_phim: {},
            list_the_loai: []
        };
    },
    mounted() {
        this.loadDataQuanLyPhim();
        this.loadDataTheLoai();
    },
    methods: {
        loadDataQuanLyPhim() {
            baseRequest
                .get('admin/quan-ly-phim/lay-du-lieu')
                .then((res) => {
                    this.list_quan_ly_phim = res.data.quan_ly_phim;
                })
                .catch((error) => {
                    console.error('Lỗi khi tải danh sách phim:', error);
                    toaster.error('Không thể tải danh sách phim');
                });
        },
        loadDataTheLoai() {
            baseRequest
                .get('admin/the-loai-phim/lay-du-lieu')
                .then((res) => {
                    this.list_the_loai = res.data.the_loai;
                })
                .catch((error) => {
                    console.error('Lỗi khi tải danh sách thể loại:', error);
                    toaster.error('Không thể tải danh sách thể loại phim');
                });
        },
        searchQuanLyPhim() {
            baseRequest
                .post('admin/quan-ly-phim/tim-quan-ly-phim', this.key_search)
                .then((res) => {
                    this.list_quan_ly_phim = res.data.quan_ly_phim;
                })
                .catch((error) => {
                    console.error('Lỗi khi tìm kiếm phim:', error);
                    toaster.error('Không thể tìm kiếm phim');
                });
        },
        createQuanLyPhim() {
            if (!this.create_quan_ly_phim.id_the_loai) {
                toaster.error('Vui lòng chọn thể loại phim');
                return;
            }
            baseRequest
                .post('admin/quan-ly-phim/them-moi-quan-ly-phim', this.create_quan_ly_phim)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataQuanLyPhim();
                        this.create_quan_ly_phim = {
                            ten_phim: '',
                            slug_phim: '',
                            ngay_chieu: '',
                            thoi_luong: '',
                            dao_dien: '',
                            dien_vien: '',
                            gioi_han_do_tuoi: '',
                            hinh_anh: '',
                            danh_gia: '',
                            trailer_ytb: '',
                            mo_ta: '',
                            nha_san_xuat: '',
                            id_the_loai: '',
                            tinh_trang: '1'
                        }; // Reset form
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
        deleteQuanLyPhim() {
            baseRequest
                .delete('admin/quan-ly-phim/xoa-quan-ly-phim/' + this.delete_quan_ly_phim)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataQuanLyPhim();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
                    }
                })
                .catch((res) => {
                    var errors = Object.values(res.response.data.errors);
                    errors.forEach(function (v, k) {
                        toaster.error('Có Lỗi<br>' + v[0]);
                    });
                });
        },
        doiTrangThai(xyz) {
            baseRequest
                .put('admin/quan-ly-phim/doi-trang-thai', xyz)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataQuanLyPhim();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((res) => {
                    var errors = Object.values(res.response.data.errors);
                    errors.forEach(function (v, k) {
                        toaster.error('Có Lỗi<br>' + v[0]);
                    });
                });
        },
        updateQuanLyPhim() {
            if (!this.edit_quan_ly_phim.id_the_loai) {
                toaster.error('Vui lòng chọn thể loại phim');
                return;
            }
            baseRequest
                .put('admin/quan-ly-phim/update', this.edit_quan_ly_phim)
                .then((res) => {
                    if (res.data.status == true) {
                        toaster.success('Thông báo<br>' + res.data.message);
                        this.loadDataQuanLyPhim();
                    } else {
                        toaster.error('Thông báo<br>' + res.data.message);
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
};
</script>

<style></style>