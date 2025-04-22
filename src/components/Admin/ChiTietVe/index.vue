<template>
    <div class="container">
        <div class="card">
            <div class="card-body d-flex justify-content-between">
                <h3>Quản Lý Vé</h3>
                <button data-bs-toggle="modal" data-bs-target="#themmoi" class="btn btn-primary">
                    <i class="fa-solid fa-plus me-2"></i>Tạo Vé
                </button>
            </div>
        </div>
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th class="text-center align-middle">#</th>
                                <th class="text-center align-middle">Thông Tin Phim</th>
                                <th class="text-center align-middle">Thời Gian Chiếu</th>
                                <th class="text-center align-middle">Vị Trí</th>
                                <th class="text-center align-middle">Giá Vé</th>
                                <th class="text-center align-middle">Khách Hàng</th>
                                <th class="text-center align-middle">Trạng Thái</th>
                                <th class="text-center align-middle">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-for="(v, k) in list_chi_tiet_ve" :key="k">
                                <tr>
                                    <th class="text-center align-middle">{{ k + 1 }}</th>
                                    <td class="align-middle">
                                        <div class="fw-bold">{{ v.ten_phim }}</div>
                                        <div class="small text-muted">
                                            {{ v.dinh_dang }} | {{ v.ngon_ngu }}
                                        </div>
                                    </td>
                                    <td class="align-middle">
                                        <div>{{ formatDate(v.ngay_chieu) }}</div>
                                        <div class="small text-muted">
                                            {{ formatTime(v.gio_bat_dau) }} - {{ formatTime(v.gio_ket_thuc) }}
                                        </div>
                                        <div class="badge bg-info">{{ v.ten_phong }}</div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span class="badge bg-secondary">
                                            Ghế {{ v.ten_ghe }} | Hàng {{ v.hang }}
                                        </span>
                                    </td>
                                    <td class="text-center align-middle">
                                        {{ formatCurrency(v.gia_tien) }}
                                    </td>
                                    <td class="align-middle">
                                        <template v-if="v.ten_khach_hang">
                                            <div>{{ v.ten_khach_hang }}</div>
                                            <div v-if="v.ma_hoa_don" class="small text-muted">
                                                HD: {{ v.ma_hoa_don }}
                                            </div>
                                        </template>
                                        <div v-else class="text-muted">Chưa có người đặt</div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <span :class="getStatusClass(v.tinh_trang)">
                                            {{ getStatusText(v.tinh_trang) }}
                                        </span>
                                        <div v-if="v.ghi_chu" class="small text-muted mt-1">
                                            <i class="fas fa-info-circle"></i>
                                            {{ v.ghi_chu }}
                                        </div>
                                    </td>
                                    <td class="text-center align-middle">
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-info" @click="printTicket(v)" title="In vé">
                                                <i class="fas fa-print"></i>
                                            </button>
                                            <button class="btn btn-sm btn-primary" @click="showUpdateModal(v)"
                                                title="Cập nhật">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-danger" @click="showDeleteModal(v)"
                                                title="Xóa">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal Cập nhật -->
        <div class="modal fade" id="updateModal" tabindex="-1">
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
                                <option value="1">Đã đặt</option>
                                <option value="2">Đang giữ</option>
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
        </div>

        <!-- Modal Xóa -->
        <div class="modal fade" id="deleteModal" tabindex="-1">
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
        </div>
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
            modalDelete: null
        }
    },
    mounted() {
        this.loadData();
        this.initModals();
    },
    methods: {
        initModals() {
            this.modalUpdate = new bootstrap.Modal(document.getElementById('updateModal'));
            this.modalDelete = new bootstrap.Modal(document.getElementById('deleteModal'));
        },

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
                1: 'Đã đặt',
                2: 'Đang giữ',
                3: 'Đã hủy'
            };
            return texts[status] || 'Không xác định';
        },

        loadData() {
            baseRequest.get("chi-tiet-ve/data")
                .then((res) => {
                    if (res.data.status) {
                        this.list_chi_tiet_ve = res.data.data;
                    } else {
                        toaster.error("Không thể tải dữ liệu!");
                    }
                })
                .catch((error) => {
                    toaster.error("Có lỗi xảy ra: " + error.message);
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

        printTicket(ve) {
            // Implement print functionality
            window.print();
        }
    }
}
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

.badge {
    padding: 0.5em 0.7em;
}

.btn-group .btn {
    padding: 0.25rem 0.5rem;
    margin: 0 0.1rem;
}

.btn-group .fas {
    font-size: 0.875rem;
}

@media print {
    .no-print {
        display: none;
    }
}
</style>