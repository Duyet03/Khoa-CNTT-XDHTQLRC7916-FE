<template>
    <div class="container">
        <div class="card">
            <div class="card-body d-flex justify-content-between">
                <h3>Quản Lý Vé</h3>
                <!-- <button data-bs-toggle="modal" data-bs-target="#themmoi" class="btn btn-primary">
                    <i class="fa-solid fa-plus me-2"></i>Tạo Vé
                </button> -->
            </div>
        </div>
        
        <!-- Filter Section -->
        <div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-2">
                        <label class="form-label">Chọn Phim</label>
                        <select v-model="selectedPhim" class="form-select" @change="onPhimChange">
                            <option value="">Tất cả phim</option>
                            <option v-for="phim in listPhim" :key="phim.id" :value="phim.id">
                                {{ phim.ten_phim }} ({{ formatDate(phim.ngay_chieu) }})
                            </option>
                        </select>
                    </div>
                    <div class="col-md-4 mb-2">
                        <label class="form-label">Chọn Phòng</label>
                        <select v-model="selectedPhong" class="form-select" @change="onPhongChange" :disabled="!selectedPhim">
                            <option value="">Tất cả phòng</option>
                            <option v-for="phong in listPhong" :key="phong.id" :value="phong.id">
                                {{ phong.ten_phong }}
                            </option>
                        </select>
                    </div>
                    <div class="col-md-4 mb-2">
                        <label class="form-label">Chọn Suất Chiếu</label>
                        <select v-model="selectedSuat" class="form-select" @change="onSuatChange" :disabled="!selectedPhong">
                            <option value="">Tất cả suất</option>
                            <option v-for="suat in listSuat" :key="suat.id" :value="suat.id">
                                {{ formatDate(suat.ngay_chieu) }} | {{ formatTime(suat.gio_bat_dau) }} - {{ formatTime(suat.gio_ket_thuc) }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Mã Vé</th>
                                <th class="text-center align-middle">Vị Trí Ghế</th>
                                <th class="text-center align-middle">Giá Vé</th>
                                <th class="text-center align-middle">Khách Hàng</th>
                                <th class="text-center align-middle">Mã Hóa Đơn</th>
                                <th class="text-center align-middle">Trạng Thái</th>
                                <!-- //<th class="text-center align-middle">Thao Tác</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_chi_tiet_ve" :key="k">
                                <tr>
                                    <th class="text-center align-middle">{{ k + 1 }}</th>
                                    <td class="text-center align-middle">{{ 'VE' + String(v.id).padStart(5, '0') }}</td>
                                    <td class="text-center align-middle">
                                        <span class="badge bg-secondary">
                                            Ghế {{ v.id_ghe }}
                                        </span>
                                    </td>
                                    <td class="text-center align-middle">
                                        {{ formatCurrency(v.gia_tien) }}
                                    </td>
                                    <td class="text-center align-middle">
                                        <template v-if="v.id_khach_hang">
                                            <span class="badge bg-info">{{ v.ten_khach_hang }}</span>
                                        </template>
                                        <span v-else class="text-muted">Chưa có người đặt</span>
                                    </td>
                                    <td class="text-center align-middle">
                                        <template v-if="v.id_hoa_don">
                                            <span class="badge bg-success">{{ v.ma_hoa_don }}</span>
                                        </template>
                                        <span v-else class="text-muted">Chưa có hóa đơn</span>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span :class="getStatusClass(v.tinh_trang)">
                                            {{ getStatusText(v.tinh_trang) }}
                                        </span>
                                    </td>
                                    <!-- <td class="text-center align-middle">
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-primary" @click="showUpdateModal(v)"
                                                title="Cập nhật">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-danger" @click="showDeleteModal(v)"
                                                title="Xóa">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td> -->
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Cập nhật -->
        <!-- <div class="modal fade" id="updateModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Cập Nhật Thông Tin Vé</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Trạng Thái</label>
                            <select v-model="chi_tiet_ve_update.tinh_trang" class="form-select">
                                <option value="0">Ghế trống</option>
                                <option value="2">Đã đặt</option>
                                <option value="1">Đang giữ</option>
                                <option value="3">Đã hủy</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ghi Chú</label>
                            <textarea v-model="chi_tiet_ve_update.ghi_chu" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" class="btn btn-primary" @click="capNhat">Cập Nhật</button>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Modal Xóa -->
        <!-- <div class="modal fade" id="deleteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Xác Nhận Xóa</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-danger">
                            Bạn có chắc chắn muốn xóa vé này không?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        <button type="button" class="btn btn-danger" @click="xoa">Xóa</button>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../../core/baseRequest';

const toaster = createToaster({ position: "top-right" });

export default {
    data() {
        return {
            list_chi_tiet_ve: [],
            chi_tiet_ve_update: {},
            id_can_xoa: null,
            modalUpdate: null,
            modalDelete: null,
            selectedPhim: '',
            selectedPhong: '',
            selectedSuat: '',
            listPhim: [],
            listPhong: [],
            listSuat: []
        }
    },
    mounted() {
        this.loadData();
        this.loadPhim();
    },
    methods: {
        formatDate(date) {
            return new Date(date).toLocaleDateString('vi-VN');
        },

        formatTime(time) {
            return time.substring(0, 5);
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },

        getStatusClass(status) {
            const classes = {
                0: 'badge bg-secondary',
                1: 'badge bg-success',
                2: 'badge bg-warning',
                3: 'badge bg-danger'
            };
            return classes[status] || 'badge bg-secondary';
        },

        getStatusText(status) {
            const texts = {
                0: 'Ghế trống',
                2: 'Đã đặt',
                1: 'Đang giữ',
                3: 'Đã hủy'
            };
            return texts[status] || 'Không xác định';
        },

        loadData() {
            if (!this.selectedSuat) {
                this.list_chi_tiet_ve = [];
                return;
            }
            
            baseRequest.get(`chi-tiet-ve/lay-theo-suat/${this.selectedSuat}`)
                .then((res) => {
                    if (res.data.status) {
                        this.list_chi_tiet_ve = res.data.data;
                    } else {
                        toaster.error("Không thể tải dữ liệu vé!");
                        this.list_chi_tiet_ve = [];
                    }
                })
                .catch((error) => {
                    console.error("Lỗi khi tải dữ liệu vé:", error);
                    toaster.error("Có lỗi xảy ra: " + error.message);
                    this.list_chi_tiet_ve = [];
                });
        },

        showUpdateModal(ve) {
            this.chi_tiet_ve_update = { ...ve };
            this.modalUpdate.show();
        },

        showDeleteModal(ve) {
            this.id_can_xoa = ve.id;
            this.modalDelete.show();
        },

        capNhat() {
            baseRequest.put("chi-tiet-ve/update", this.chi_tiet_ve_update)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData();
                        this.modalUpdate.hide();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
                });
        },

        xoa() {
            baseRequest.delete(`chi-tiet-ve/delete/${this.id_can_xoa}`)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.loadData();
                        this.modalDelete.hide();
                    } else {
                        toaster.error(res.data.message);
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
                });
        },

        loadPhim() {
            baseRequest.get("admin/quan-ly-phim/lay-du-lieu")
                .then((res) => {
                    if (res.data.quan_ly_phim) {
                        this.listPhim = res.data.quan_ly_phim;
                    } else {
                        toaster.error("Không thể tải danh sách phim!");
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
                });
        },

        loadPhong() {
            if (!this.selectedPhim) {
                this.listPhong = [];
                return;
            }

            baseRequest.get(`suat-chieu/lay-phong/${this.selectedPhim}`)
                .then((res) => {
                    if (res.data.phong) {
                        this.listPhong = res.data.phong;
                    } else {
                        toaster.error("Không thể tải danh sách phòng!");
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
                });
        },

        loadSuat() {
            if (!this.selectedPhim || !this.selectedPhong) {
                this.listSuat = [];
                return;
            }

            baseRequest.get(`suat-chieu/lay-suat/${this.selectedPhim}/${this.selectedPhong}`)
                .then((res) => {
                    if (res.data.suat) {
                        this.listSuat = res.data.suat;
                    } else {
                        toaster.error("Không thể tải danh sách suất chiếu!");
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
                });
        },

        onPhimChange() {
            this.selectedPhong = '';
            this.selectedSuat = '';
            this.list_chi_tiet_ve = [];
            this.loadPhong();
        },

        onPhongChange() {
            this.selectedSuat = '';
            this.list_chi_tiet_ve = [];
            this.loadSuat();
        },

        onSuatChange() {
            if (this.selectedSuat) {
                this.loadData();
            } else {
                this.list_chi_tiet_ve = [];
            }
        },
    }
}
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

.badge {
    font-size: 0.875rem;
    padding: 0.4em 0.8em;
}

.btn-group .btn {
    padding: 0.25rem 0.5rem;
}

.text-muted {
    font-size: 0.875rem;
}

@media print {
    .no-print {
        display: none;
    }
}
</style>