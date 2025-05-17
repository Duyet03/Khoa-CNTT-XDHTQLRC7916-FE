<template>
    <div class="check-qr">
        <div class="card">
            <div class="header">
                <i class="fas fa-ticket-alt ticket-icon"></i>
                <h1>Trang Check-in Hóa Đơn</h1>
            </div>

            <div class="content">
                <div v-if="maHoaDon" class="invoice-info">
                    <span class="label">Mã hóa đơn:</span>
                    <span class="value">{{ maHoaDon }}</span>
                </div>
                <div v-else class="error-message">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Không tìm thấy mã hóa đơn trên URL.</p>
                </div>

                <div v-if="maHoaDon" class="button-group">
                    <button class="btn btn-primary" 
                            @click="checkInVe" 
                            :disabled="!canCheckInVe">
                        <i class="fas fa-check-circle"></i>
                        Check-in Vé
                    </button>
                    <button class="btn btn-secondary" 
                            @click="checkInDichVu"
                            :disabled="!canCheckInDichVu">
                        <i class="fas fa-concierge-bell"></i>
                        Check-in Dịch Vụ
                    </button>
                </div>

                <div v-if="message" :class="['message', message.includes('❌') ? 'error' : 'success']">
                    {{ message }}
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
    name: 'CheckQR',
    data() {
        return {
            maHoaDon: '',
            message: '',
            token: null,
            tenChucVu: '',
            isMaster: false
        };
    },
    computed: {
        canCheckInVe() {
            return this.isMaster || this.tenChucVu === 'Check-in vé';
        },
        canCheckInDichVu() {
            return this.isMaster || this.tenChucVu === 'Check-in dịch vụ';
        }
    },
    mounted() {
        const params = new URLSearchParams(window.location.search);
        this.maHoaDon = params.get('ma_hoa_don') || '';
        this.token = localStorage.getItem("token_admin");
        this.tenChucVu = localStorage.getItem("ten_chuc_vu") || '';
        this.isMaster = localStorage.getItem("is_master") === '1';
        
        if (!this.token) {
            this.message = "❌ Bạn cần đăng nhập để thực hiện chức năng này";
            toaster.error(this.message);
            return;
        }

        if (!this.isMaster && !this.tenChucVu) {
            this.message = "❌ Bạn không có quyền truy cập chức năng này";
            toaster.error(this.message);
            return;
        }
    },
    methods: {
        getHeaders() {
            return {
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            };
        },

        verifyToken() {
            if (!this.token) {
                this.message = "❌ Bạn cần đăng nhập để thực hiện chức năng này";
                toaster.error(this.message);
                return false;
            }
            return true;
        },

        async checkInVe() {
            if (!this.verifyToken()) return;
            if (!this.canCheckInVe) {
                this.message = "❌ Bạn không có quyền thực hiện chức năng check-in vé";
                toaster.error(this.message);
                return;
            }
            if (!this.maHoaDon) {
                this.message = "❌ Mã hóa đơn không hợp lệ";
                toaster.error(this.message);
                return;
            }

            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/hoa-don/check-in/${this.maHoaDon}`,
                    {},
                    this.getHeaders()
                );

                if (response.data.status) {
                    this.message = response.data.message;
                    toaster.success(this.message);
                } else {
                    this.message = response.data.message;
                    toaster.error(this.message);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    this.message = "❌ Token không hợp lệ hoặc đã hết hạn";
                    localStorage.removeItem("token_admin");
                    this.token = null;
                } else {
                    this.message = err.response?.data?.message || "❌ Có lỗi xảy ra";
                }
                toaster.error(this.message);
                console.error('Lỗi:', err);
            }
        },

        async checkInDichVu() {
            if (!this.verifyToken()) return;
            if (!this.canCheckInDichVu) {
                this.message = "❌ Bạn không có quyền thực hiện chức năng check-in dịch vụ";
                toaster.error(this.message);
                return;
            }
            if (!this.maHoaDon) {
                this.message = "❌ Mã hóa đơn không hợp lệ";
                toaster.error(this.message);
                return;
            }

            try {
                const response = await axios.post(
                    `http://127.0.0.1:8000/api/hoa-don/check-in-dich-vu/${this.maHoaDon}`,
                    {},
                    this.getHeaders()
                );

                if (response.data.status) {
                    this.message = response.data.message;
                    toaster.success(this.message);
                } else {
                    this.message = response.data.message;
                    toaster.error(this.message);
                }
            } catch (err) {
                if (err.response?.status === 401) {
                    this.message = "❌ Token không hợp lệ hoặc đã hết hạn";
                    localStorage.removeItem("token_admin");
                    this.token = null;
                } else {
                    this.message = err.response?.data?.message || "❌ Có lỗi xảy ra";
                }
                toaster.error(this.message);
                console.error('Lỗi:', err);
            }
        }
    }
}
</script>


<style scoped>
.check-qr {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
}

.card {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    width: 100%;
    max-width: 500px;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.header {
    text-align: center;
    margin-bottom: 2rem;
}

.header h1 {
    font-size: 1.8rem;
    color: #2c3e50;
    margin: 1rem 0;
    font-weight: 600;
}

.ticket-icon {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 1rem;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.invoice-info {
    background: #f8f9fa;
    padding: 1rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.label {
    color: #6c757d;
    font-weight: 500;
}

.value {
    color: #2c3e50;
    font-weight: 600;
    font-size: 1.1rem;
}

.button-group {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.btn {
    flex: 1;
    min-width: 160px;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
}

.btn i {
    font-size: 1.1rem;
}

.btn-primary {
    background: #3498db;
    color: white;
}

.btn-primary:hover {
    background: #2980b9;
    transform: translateY(-2px);
}

.btn-secondary {
    background: #2ecc71;
    color: white;
}

.btn-secondary:hover {
    background: #27ae60;
    transform: translateY(-2px);
}

.message {
    text-align: center;
    padding: 1rem;
    border-radius: 10px;
    font-weight: 500;
    animation: fadeIn 0.3s ease;
}

.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
}

.error-message,
.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    padding: 1rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 480px) {
    .card {
        padding: 1.5rem;
    }

    .button-group {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}

.btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
}

.btn:disabled:hover {
    background: #cccccc;
    transform: none;
}
</style>