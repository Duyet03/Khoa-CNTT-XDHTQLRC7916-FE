<template>
    <div class="goc-dien-anh">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Quản Lý Góc Điện Ảnh</h3>
                            <button class="btn btn-primary" @click="showModal = true">
                                <i class="fas fa-plus"></i> Thêm Mới
                            </button>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tiêu Đề</th>
                                            <th>Nội Dung</th>
                                            <th>Hình Ảnh</th>
                                            <th>Ngày Đăng</th>
                                            <th>Trạng Thái</th>
                                            <th>Thao Tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in ds_goc_dien_anh" :key="index">
                                            <td>{{ item.id }}</td>
                                            <td>{{ item.tieu_de }}</td>
                                            <td class="text-center align-middle"> <i
                                                    v-on:click="Object.assign(su_kien, item)"
                                                    data-bs-toggle="modal" data-bs-target="#noidung"
                                                    class="fa-solid fa-2x fa-pen-nib"></i></td>
                                            <td>
                                                <img :src="item.hinh_anh" :alt="item.tieu_de" class="img-thumbnail"
                                                    style="max-width: 100px;">
                                            </td>
                                            <td>{{ formatDate(item.ngay_dang) }}</td>
                                            <td class="text-center align-middle">
                                                <span v-on:click="doiTrangThai(item.id)"
                                                    :class="['badge', item.trang_thai ? 'bg-success' : 'bg-danger']">
                                                    {{ item.trang_thai ? 'Hiển thị' : 'Ẩn' }}
                                                </span>
                                            </td>
                                            <td>
                                                <button class="btn btn-sm btn-primary" @click="editItem(item)">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <button class="btn btn-sm btn-danger" v-on:click="id_can_xoa = item.id"
                                                    data-bs-toggle="modal" data-bs-target="#deleteModal">
                                                    <i class="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal xoá -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Xóa Góc Điện Ảnh</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Bạn có chắc chắn muốn xóa góc điện ảnh này không?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" @click="deleteItem()">Xóa</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Thêm/Sửa -->
        <div class="modal fade" :class="{ 'show': showModal }" style="display: block;" v-if="showModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{{ isEdit ? 'Sửa' : 'Thêm Mới' }} Góc Điện Ảnh</h5>
                        <button type="button" class="btn-close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="saveItem">
                            <div class="mb-3">
                                <label class="form-label">Tiêu Đề</label>
                                <input type="text" class="form-control" v-model="formData.tieu_de">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Nội Dung</label>
                                <textarea class="form-control" v-model="formData.noi_dung" rows="5"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Hình Ảnh</label>
                                <input type="text" class="form-control" v-model="formData.hinh_anh"
                                    placeholder="Nhập link hình ảnh">
                                <div class="mt-2">
                                    <img v-if="formData.hinh_anh" :src="formData.hinh_anh" class="img-thumbnail"
                                        style="max-width: 200px;">
                                    <div v-else class="text-muted">Chưa có hình ảnh</div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Trạng Thái</label>
                                <select class="form-select" v-model="formData.trang_thai">
                                    <option :value="true">Hiển thị</option>
                                    <option :value="false">Ẩn</option>
                                </select>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="closeModal">Đóng</button>
                                <button type="submit" class="btn btn-primary">Lưu Thông Tin</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="noidung" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Nội dung</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{ su_kien.noi_dung }}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

export default {
    data() {
        return {
            ds_goc_dien_anh: [],
            showModal: false,
            isEdit: false,
            id_can_xoa: null,
            formData: {
                id: null,
                tieu_de: '',
                noi_dung: '',
                hinh_anh: '',
                ngay_dang: new Date().toISOString().split('T')[0],
                trang_thai: true
            },
            su_kien: {}
        };
    },
    mounted() {
        this.layDuLieuGocDienAnh();
    },
    methods: {
        layDuLieuGocDienAnh() {
            axios
                .get('http://127.0.0.1:8000/api/goc-dien-anh/data', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.ds_goc_dien_anh = res.data.data;
                })
                .catch((error) => {
                    toaster.error("Lỗi khi tải dữ liệu");
                });
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN');
        },
        editItem(item) {
            this.isEdit = true;
            this.formData = { ...item };
            this.showModal = true;
        },
        deleteItem() {
            if (!this.id_can_xoa) {
                return;
            }

            axios
                .delete(`http://127.0.0.1:8000/api/goc-dien-anh/delete/${this.id_can_xoa}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    toaster.success(res.data.message);
                    this.layDuLieuGocDienAnh();
                    document.getElementById('deleteModal').querySelector('[data-bs-dismiss="modal"]').click();
                    this.id_can_xoa = null;
                })
                .catch((error) => {
                    toaster.error("Lỗi khi xóa");
                });
        },
        doiTrangThai(id) {
            axios
                .post('http://127.0.0.1:8000/api/goc-dien-anh/doi-trang-thai', { id: id }, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    toaster.success(res.data.message);
                    this.layDuLieuGocDienAnh();
                })
                .catch((error) => {
                    toaster.error("Lỗi khi đổi trạng thái");
                });
        },
        saveItem() {
            const url = this.isEdit
                ? 'http://127.0.0.1:8000/api/goc-dien-anh/update'
                : 'http://127.0.0.1:8000/api/goc-dien-anh/create';

            const method = 'post';

            axios.post(url, this.formData, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token_admin")
                }
            })
                .then((res) => {
                    toaster.success(res.data.message);
                    this.closeModal();
                    this.layDuLieuGocDienAnh();
                })
                .catch((error) => {
                    if (error.response && error.response.data && error.response.data.errors) {
                        const errors = error.response.data.errors;
                        Object.values(errors).forEach(errorArray => {
                            errorArray.forEach(errorMessage => {
                                toaster.error(errorMessage);
                            });
                        });
                    } else {
                        toaster.error("Có lỗi xảy ra khi lưu dữ liệu");
                    }
                });
        },
        closeModal() {
            this.showModal = false;
            this.isEdit = false;
            this.formData = {
                id: null,
                tieu_de: '',
                noi_dung: '',
                hinh_anh: '',
                ngay_dang: new Date().toISOString().split('T')[0],
                trang_thai: true
            };
        }
    }
}
</script>

<style scoped>
.goc-dien-anh {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
}

.card-title {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
}

.table {
    margin-bottom: 0;
}

.img-thumbnail {
    max-width: 100px;
    height: auto;
}

.modal {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
    display: block;
}

.modal-dialog {
    max-width: 800px;
}

.form-label {
    font-weight: 500;
    color: #333;
}

.btn-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .modal-dialog {
        margin: 0;
        max-width: 100%;
    }

    .table-responsive {
        overflow-x: auto;
    }
}
</style>