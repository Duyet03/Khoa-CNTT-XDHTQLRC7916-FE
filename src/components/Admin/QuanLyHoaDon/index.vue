<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white d-flex justify-content-between">
                        <h5 class="mb-0"><i class="fas fa-receipt me-2"></i>Quản lý hóa đơn</h5>
                        <router-link to="/admin/dat-ve">
                            <button class="btn btn-info">Thêm mới hoá đơn</button>
                        </router-link>
                    </div>
                    <div class="card-body">
    
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Mã hóa đơn</th>
                                        <th>Tên khách hàng</th>
                                        <th>Tên nhân viên</th>
                                        <th>Phim</th>
                                        <th>Ngày chiếu</th>
                                        <th>Giờ bắt đầu</th>
                                        <th class="text-end">Tổng tiền</th>
                                        <th class="text-center">Trạng thái</th>
                                        <th class="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(v, k) in filteredHoaDon" :key="k">
                                        <th class="text-center align-middle">{{ k + 1 }}</th>
                                        <td class="text-center align-middle">{{ v.ma_hoa_don }}</td>
                                        <td class="align-middle">{{ v.ten_khach_hang }}</td>
                                        <td class="align-middle">{{ v.ten_nhan_vien || 'Không có' }}</td>
                                        <td class="align-middle">{{ v.ten_phim || 'Không có' }}</td>
                                        <td class="align-middle">{{ formatDate(v.ngay_chieu) }}</td>
                                        <td class="align-middle">{{ v.gio_bat_dau }}</td>
                                        <td class="text-end align-middle fw-bold">{{ formatVND(v.tong_tien) }}</td>
                                        <td class="text-center align-middle">
                                            <span v-if="v.trang_thai == 1" class="badge bg-success">
                                                <i class="fas fa-check-circle me-1"></i> Đã thanh toán
                                            </span>
                                            <span v-else-if="v.trang_thai == 0" class="badge bg-warning text-dark">
                                                <i class="fas fa-clock me-1"></i> Chờ thanh toán
                                            </span>
                                            <span v-else-if="v.trang_thai == 2" class="badge bg-danger">
                                                <i class="fas fa-times-circle me-1"></i> Đã hủy
                                            </span>
                                        </td>
                                        <td class="text-center align-middle">
                                            <button @click="chiTietThue(v)" data-bs-toggle="modal"
                                                data-bs-target="#chiTietModal" class="btn btn-primary btn-sm me-2">
                                                <i class="fas fa-info-circle me-1"></i> Chi tiết
                                            </button>
                                            <button @click="printTicket" class="btn btn-info btn-sm">
                                                <i class="fas fa-print me-1"></i> In vé
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="list_hoa_don.length === 0" class="text-center py-4">
                            <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
                            <p>Không có dữ liệu hóa đơn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal Chi tiết hóa đơn -->
        <div class="modal fade" id="chiTietModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title text-center">
                            <i class="fas fa-ticket-alt me-2"></i>
                            Thông tin hóa đơn
                        </h5>        
                    </div>
                    <div class="modal-body">
                        <div v-if="isLoadingDetail" class="text-center py-4">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Đang tải...</span>
                            </div>
                            <p class="mt-2">Đang tải dữ liệu chi tiết...</p>
                        </div>
                        <div v-else-if="chi_tiet_thue.length > 0" class="table-responsive">
                            <div class="mb-3 p-3 bg-light rounded">
                                <div class="row">
                                    <div class="col-md-6">
                                        <p class="mb-1 text-center align-middle"><strong>Mã hoá đơn:</strong> {{ chi_tiet_thue[0].ma_hoa_don }}</p>
                                        <p class="mb-1 text-center align-middle"><strong>Phim:</strong> {{ chi_tiet_thue[0].ten_phim }}</p>
                                        <p class="mb-1 text-center align-middle"><strong>Tổng tiền:</strong> {{ formatVND(chi_tiet_thue[0].tong_tien) }}</p>
                                    </div>
                                    <div class="col-md-6">
                                        <p class="mb-1 text-center align-middle"><strong>Ngày chiếu:</strong> {{
                                            formatDate(chi_tiet_thue[0].ngay_chieu) }}</p>
                                        <p class="mb-1 text-center align-middle"><strong>Giờ bắt đầu:</strong> {{ chi_tiet_thue[0].gio_bat_dau }}
                                        </p>
                                        <p class="mb-1 text-center align-middle"><strong>Phòng chiếu:</strong> {{ chi_tiet_thue[0].ten_phong }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <h6 class="mb-3"><i class="fas fa-couch me-2"></i>Danh sách ghế đã đặt</h6>
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center" width="10%">#</th>
                                        <th class="text-center" width="30%">Mã ghế</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value, index) in chi_tiet_thue" :key="index">
                                        <th class="text-center">{{ index + 1 }}</th>
                                        <td class="text-center">
                                            <span class="badge bg-primary py-2 px-3">{{ value.ten_ghe }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h6 class="mb-3"><i class="fas fa-couch me-2"></i>Danh sách dịch vụ đã đặt</h6>
                            <table class="table table-bordered table-hover">
                                <thead class="table-light">
                                    <tr>
                                        <th class="text-center" width="10%">#</th>
                                        <th class="text-center" width="30%">Tên dịch vụ</th>                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value, index) in chi_tiet_thue" :key="index">
                                        <th class="text-center">{{ index + 1 }}</th>
                                        <td class="text-center">
                                            <span class="badge bg-primary py-2 px-3">{{ value.ten_dich_vu }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Hiển thị mã QR -->
                            <div class="row mb-4" v-if="chi_tiet_thue.length > 0">
                                <div class="col-md-6 mx-auto">
                                    <div class="card border-0 shadow-sm text-center">
                                        <div class="card-header bg-light">
                                            <h5 class="mb-0"><i class="fas fa-qrcode me-2"></i>Mã QR vé</h5>
                                        </div>
                                        <div class="card-body pb-4">
                                            <p class="mb-3">Mã QR dùng để check-in tại rạp</p>
                                            <div class="d-flex justify-content-center">
                                                <template v-if="chi_tiet_thue[0].ma_qr_checkin">
                                                    <div class="qr-code-container position-relative">
                                                        <img :src="chi_tiet_thue[0].ma_qr_checkin" 
                                                             class="img-fluid" 
                                                             style="max-width: 300px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
                                                             alt="QR Code" />
                                                    </div>
                                                </template>
                                                <div v-else class="alert alert-warning">
                                                    <i class="fas fa-exclamation-triangle me-2"></i>
                                                    QR code chưa được tạo
                                                </div>
                                            </div>                               
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center py-4">
                            <i class="fas fa-exclamation-circle fa-3x text-warning mb-3"></i>
                            <p>Không tìm thấy thông tin chi tiết vé</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                            <i class="fas fa-times me-1"></i> Đóng
                        </button>
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
            list_hoa_don: [],
            chi_tiet_thue: [],
            selectedHoaDon: null,
            isLoadingDetail: false,
            searchTerm: ''
        }
    },
    computed: {
        filteredHoaDon() {
            if (!this.searchTerm) return this.list_hoa_don;

            const term = this.searchTerm.toLowerCase();
            return this.list_hoa_don.filter(item =>
                item.ma_hoa_don.toLowerCase().includes(term) ||
                item.ten_khach_hang.toLowerCase().includes(term) ||
                item.ten_phim.toLowerCase().includes(term)
            );
        }
    },
    mounted() {
        this.loadData();
    },
    methods: {
        formatVND(number) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
        },
        loadData() {
            baseRequest
                .get("hoa-don/data")
                .then((res) => {
                    if (res.data.status) {
                        this.list_hoa_don = res.data.hoa_don;
                    } else {
                        toaster.error("Không thể tải dữ liệu hóa đơn");
                    }
                })
                .catch(error => {
                    console.error("Lỗi khi tải dữ liệu:", error);
                    toaster.error("Đã xảy ra lỗi khi tải dữ liệu");
                });
        },
        formatDate(ngay) {
            if (!ngay) return "";
            const date = new Date(ngay);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },
        formatDateTime(ngay) {
            if (!ngay) return "";
            const date = new Date(ngay);
            return date.toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        chiTietThue(hoaDon) {
            this.selectedHoaDon = hoaDon;
            this.isLoadingDetail = true;
            this.chi_tiet_thue = [];

            axios
                .post("http://127.0.0.1:8000/api/hoa-don/chi-tiet-dat-ve", { id: hoaDon.id }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem("token_admin")
                    }
                })
                .then((res) => {
                    this.isLoadingDetail = false;
                    if (res.data.status) {
                        this.chi_tiet_thue = res.data.data;
                    } else {
                        toaster.error(res.data.message || "Không thể tải chi tiết hóa đơn");
                    }
                })
                .catch(error => {
                    this.isLoadingDetail = false;
                    console.error("Lỗi khi tải chi tiết:", error);
                    toaster.error("Đã xảy ra lỗi khi tải chi tiết hóa đơn");
                });
        },
        printTicket() {
            if (!this.chi_tiet_thue.length) return;
            
            const ticket = this.chi_tiet_thue[0];
            const printWindow = window.open('', '_blank');
            const seats = this.chi_tiet_thue.map(item => item.ten_ghe).join(', ');
            const services = this.chi_tiet_thue.map(item => item.ten_dich_vu).filter(Boolean).join(', ');
            
            const printContent = `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="vi">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Vé Xem Phim - ${ticket.ma_hoa_don}</title>
    <style type="text/css">
        body {
            font-family: arial, 'helvetica neue', helvetica, sans-serif;
            color: #333333;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 0;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            text-align: center;
            padding: 30px 0;
            background-color: #e31837;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .content {
            padding: 30px;
        }
        .ticket-info {
            background-color: #fff5f5;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            border: 1px solid #ffebeb;
        }
        .ticket-info h3 {
            color: #e31837;
            margin-top: 0;
            border-bottom: 2px solid #e31837;
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        .ticket-info p {
            margin: 8px 0;
            line-height: 1.6;
        }
        .qr-section {
            margin: 30px auto;
            max-width: 500px;
            padding: 0;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .qr-header {
            background-color: #f8f9fa;
            padding: 15px 20px;
            border-bottom: 1px solid #eee;
        }
        .qr-header h5 {
            margin: 0;
            color: #333;
            font-size: 18px;
        }
        .qr-content {
            padding: 30px;
            text-align: center;
        }
        .qr-code-container {
            position: relative;
            display: inline-block;
            margin: 15px 0;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .qr-code-container img {
            max-width: 250px;
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        .qr-message {
            color: #333333;
            margin: 15px 0;
            font-size: 16px;
        }
        .qr-warning {
            background-color: #fff3cd;
            color: #856404;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            text-align: center;
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #333333;
            color: #ffffff;
        }
        .footer p {
            margin: 5px 0;
            font-size: 12px;
            opacity: 0.8;
        }
        .important-note {
            background-color: #e31837;
            color: #ffffff;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        }
        @media print {
            body {
                background-color: #ffffff;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
                color-adjust: exact !important;
            }
            .container {
                margin: 0 auto;
                padding: 0;
                width: 100%;
                max-width: 100%;
                box-shadow: none;
                border-radius: 0;
            }
            .header {
                background-color: #e31837 !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .ticket-info {
                background-color: #fff5f5 !important;
                border: 1px solid #ffebeb !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .ticket-info h3 {
                color: #e31837 !important;
                border-bottom: 2px solid #e31837 !important;
            }
            .qr-section {
                box-shadow: none;
                border: 1px solid #eee;
            }
            .qr-header {
                background-color: #f8f9fa !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .qr-warning {
                background-color: #fff3cd !important;
                color: #856404 !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .important-note {
                background-color: #e31837 !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            .footer {
                background-color: #333333 !important;
                color: #ffffff !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            * {
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>VÉ XEM PHIM</h1>
        </div>

        <div class="content">
            <div class="ticket-info">
                <h3>Thông tin vé</h3>
                <p><strong>Mã hóa đơn:</strong> ${ticket.ma_hoa_don}</p>
                <p><strong>Phim:</strong> ${ticket.ten_phim}</p>
                <p><strong>Suất chiếu:</strong> ${this.formatDate(ticket.ngay_chieu)} ${ticket.gio_bat_dau}</p>
                <p><strong>Phòng:</strong> ${ticket.ten_phong}</p>
                <p><strong>Số ghế:</strong> ${seats}</p>
                ${services ? `<p><strong>Dịch vụ:</strong> ${services}</p>` : ''}
                <p><strong>Tổng tiền:</strong> ${this.formatVND(ticket.tong_tien)}</p>
            </div>

            <div class="qr-section">
                <div class="qr-header">
                    <h5><i class="fas fa-qrcode"></i> Mã QR vé và dịch vụ</h5>
                </div>
                <div class="qr-content">
                    <p class="qr-message">Vui lòng trình mã QR tại rạp khi xem phim</p>
                    ${ticket.ma_qr_checkin ? `
                        <div class="qr-code-container">
                            <img src="${ticket.ma_qr_checkin}" alt="QR Code">
                        </div>
                    ` : `
                        <div class="qr-warning">
                            <i class="fas fa-exclamation-triangle"></i>
                            QR code chưa được tạo hoặc hóa đơn chưa thanh toán
                        </div>
                    `}
                </div>
            </div>

            <div class="important-note">
                Vui lòng đến rạp trước giờ chiếu 30 phút để check-in
            </div>
        </div>

        <div class="footer">
            <p>© ${new Date().getFullYear()} Rạp Phim. All rights reserved.</p>
        </div>
    </div>
</body>

</html>`;
            
            printWindow.document.write(printContent);
            printWindow.document.close();
            
            // Wait for images to load before printing
            printWindow.onload = function() {
                printWindow.print();
                // printWindow.close();
            };
        }
    },
}
</script>

<style scoped>
.table th,
.table td {
    vertical-align: middle;
}

.badge {
    font-weight: 500;
}
</style>