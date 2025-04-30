<template>
    <div class="row">
        <div class="col-12">
            <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                <div class="card_header mt-2">
                    <div class="row">
                        <div class="col-12">
                            <b style="font-size: 20px;">Lịch Sử Đặt Vé</b>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr class="text-center">
                                    <th class="text-nowrap">Mã Hóa Đơn</th>
                                    <th class="text-nowrap">Tên Phim</th>
                                    <th class="text-nowrap">Ngày Chiếu</th>
                                    <th class="text-nowrap">Giờ Bắt Đầu</th>
                                    <th class="text-nowrap">Định Dạng</th>
                                    <th class="text-nowrap">Ngôn Ngữ</th>
                                    <th class="text-nowrap">Tổng Tiền</th>
                                    <th class="text-nowrap">Trạng Thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="lichSuDatVe && lichSuDatVe.length > 0">
                                    <tr v-for="(item, index) in lichSuDatVe" :key="index" class="text-center">
                                        <td class="align-middle">{{ item.ma_hoa_don }}</td>
                                        <td class="align-middle">{{ item.ten_phim }}</td>
                                        <td class="align-middle">{{ formatDate(item.ngay_chieu) }}</td>
                                        <td class="align-middle">{{ item.gio_bat_dau }}</td>
                                        <td class="align-middle">{{ item.dinh_dang }}</td>
                                        <td class="align-middle">{{ item.ngon_ngu }}</td>
                                        <td class="align-middle">{{ formatCurrency(item.tong_tien) }}</td>
                                        <td class="align-middle">
                                            <span :class="getStatusClass(item.trang_thai)" class="badge">
                                                {{ getStatusText(item.trang_thai) }}
                                            </span>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr class="text-center">
                                        <td colspan="8">Không có dữ liệu</td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
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
                const response = await axios.get('/api/lich-su-dat-ve');
                if (response.data.status) {
                    this.lichSuDatVe = response.data.hoa_don;
                }
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
            }
        },

        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
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
                1: 'bg-success',
                0: 'bg-warning',
                2: 'bg-danger'
            };
            return statusClassMap[status] || 'bg-secondary';
        }
    },

    mounted() {
        this.getData();
    }
}
</script>

<style scoped>
.badge {
    padding: 8px 12px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
}

.text-nowrap {
    white-space: nowrap;
}
</style>
