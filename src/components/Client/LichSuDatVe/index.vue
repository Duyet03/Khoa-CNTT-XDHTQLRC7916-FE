<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-12">
                <div class="card custom-card">
                    <div class="card-header">
                        <div class="row align-items-center">
                            <div class="col-12">
                                <h2 class="page-title">
                                    <i class="fas fa-history me-2"></i>
                                    Lịch Sử Hóa Đơn
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table custom-table">
                                <thead>
                                    <tr>
                                        <th>Mã Hóa Đơn</th>
                                        <th>Tên Phim</th>
                                        <th>Ngày Chiếu</th>
                                        <th>Giờ Bắt Đầu</th>
                                        <th>Định Dạng</th>
                                        <th>Ngôn Ngữ</th>
                                        <th>Tổng Tiền</th>
                                        <th>Trạng Thái</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-if="lichSuDatVe && lichSuDatVe.length > 0">
                                        <tr v-for="(item, index) in lichSuDatVe" :key="index">
                                            <td class="order-id">{{ item.ma_hoa_don }}</td>
                                            <td class="movie-title">{{ item.ten_phim }}</td>
                                            <td>{{ formatDate(item.ngay_chieu) }}</td>
                                            <td>{{ item.gio_bat_dau }}</td>
                                            <td>{{ item.dinh_dang }}</td>
                                            <td>{{ item.ngon_ngu }}</td>
                                            <td class="price">{{ formatCurrency(item.tong_tien) }}</td>
                                            <td>
                                                <span :class="getStatusClass(item.trang_thai)" class="status-badge">
                                                    {{ getStatusText(item.trang_thai) }}
                                                </span>
                                            </td>
                                            <td>
                                                <router-link :to="`/chi-tiet-hoa-don/${item.ma_hoa_don}`">
                                                    <button class="btn-view">Xem Chi Tiết</button>
                                                </router-link>
                                            </td>
                                        </tr>
                                    </template>
                                    <template v-else>
                                        <tr>
                                            <td colspan="9" class="text-center py-4">
                                                <div class="empty-state">
                                                    <i class="fas fa-ticket-alt mb-3"></i>
                                                    <p>Không có dữ liệu hóa đơn</p>
                                                </div>
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
    </div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import axios from 'axios';

export default {
    name: 'LichSuDatVe',
    data() {
        return {
            lichSuDatVe: [],
        }
    },

    methods: {
        async getData() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/hoa-don/data-client');
                if (response.data.status) {
                    this.lichSuDatVe = response.data.hoa_don;
                    console.log(this.lichSuDatVe);
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                toaster.error('Có lỗi xảy ra khi tải dữ liệu');
            }
        },

        formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(date).toLocaleDateString('vi-VN', options);
        },

        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
            }).format(value);
        },

        getStatusText(status) {
            const statusMap = {
                1: 'Đã thanh toán',
                0: 'Chưa thanh toán',
                2: 'Đã hủy'
            };
            return statusMap[status] || 'Không xác định';
        },

        getStatusClass(status) {
            const statusClassMap = {
                1: 'status-success',
                0: 'status-pending',
                2: 'status-cancelled'
            };
            return statusClassMap[status] || 'status-unknown';
        }
    },

    mounted() {
        this.getData();
    }
}
</script>

<style scoped>
.custom-card {
    border: none;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(220, 38, 38, 0.08);
    background: #fff;
}

.card-header {
    background: #dc2626;
    border-bottom: none;
    padding: 1.5rem;
    border-radius: 12px 12px 0 0;
}

.page-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
}

.custom-table {
    margin: 0;
}

.custom-table thead th {
    background: #fef2f2;
    color: #991b1b;
    font-weight: 600;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 1rem;
    border-bottom: 2px solid #fee2e2;
}

.custom-table tbody td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #fee2e2;
    color: #475569;
    font-size: 0.9375rem;
}

.order-id {
    font-family: monospace;
    font-weight: 600;
    color: #dc2626;
}

.movie-title {
    font-weight: 500;
    color: #1e293b;
}

.price {
    font-weight: 600;
    color: #dc2626;
}

.status-badge {
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.875rem;
    font-weight: 500;
    display: inline-block;
}

.status-success {
    background: #fee2e2;
    color: #991b1b;
}

.status-pending {
    background: #fef9c3;
    color: #854d0e;
}

.status-cancelled {
    background: #f3f4f6;
    color: #374151;
}

.status-unknown {
    background: #f1f5f9;
    color: #475569;
}

.btn-view {
    background: #dc2626;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-weight: 500;
    font-size: 0.875rem;
    transition: all 0.3s ease;
}

.btn-view:hover {
    background: #991b1b;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
}

.empty-state {
    padding: 2rem;
    text-align: center;
    color: #dc2626;
}

.empty-state i {
    font-size: 2.5rem;
    display: block;
    margin-bottom: 1rem;
    color: #dc2626;
}

.empty-state p {
    font-size: 1rem;
    margin: 0;
    color: #991b1b;
}

/* Hover effects */
.custom-table tbody tr:hover {
    background-color: #fef2f2;
    transition: background-color 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .container {
        padding: 1rem;
    }
    
    .card-header {
        padding: 1rem;
    }
    
    .page-title {
        font-size: 1.25rem;
    }
    
    .custom-table {
        font-size: 0.875rem;
    }

    .btn-view {
        padding: 0.4rem 0.8rem;
        font-size: 0.8125rem;
    }
}
</style>
