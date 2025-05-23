<template>
    <div class="container-fluid p-4">
        <div class="statistics-header mb-4">
            <h2 class="text-center">Thống Kê Doanh Thu</h2>
        </div>

        <div class="row">
            <!-- Statistics Cards -->
            <div class="col-12 mb-4">
                <div class="row">
                    <!-- Total Revenue Card -->
                    <div class="col-md-6 mb-3 mb-md-0">
                        <div class="total-revenue-card">
                            <div class="card-content">
                                <div class="revenue-icon">
                                    <i class="fas fa-money-bill-wave"></i>
                                </div>
                                <div class="revenue-info">
                                    <h6>Tổng doanh thu</h6>
                                    <h3>{{ formatCurrency(tongDoanhThu) }} VNĐ</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Total Orders Card -->
                    <div class="col-md-6">
                        <div class="total-orders-card">
                            <div class="card-content">
                                <div class="orders-icon">
                                    <i class="fas fa-shopping-cart"></i>
                                </div>
                                <div class="orders-info">
                                    <h6>Tổng số đơn hàng</h6>
                                    <h3>{{ totalOrders }} đơn</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Time Period Statistics -->
            <div class="col-12 mb-4">
                <div class="chart-card">
                    <div class="card-header">
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <h3 class="card-title mb-0">
                                <i class="fas fa-chart-line me-2"></i>
                                Thống kê theo thời gian
                                <span v-if="periodLabel" class="period-label ms-2">({{ periodLabel }})</span>
                            </h3>
                            <div class="d-flex gap-3 align-items-center flex-wrap">
                                <select v-model="selectedPeriod" class="form-select" @change="handlePeriodChange">
                                    <option value="day">Theo ngày</option>
                                    <option value="week">Theo tuần</option>
                                    <option value="month">Theo tháng</option>
                                    <option value="quarter">Theo quý</option>
                                    <option value="year">Theo năm</option>
                                </select>

                                <!-- Dynamic date inputs based on selected period -->
                                <div v-if="selectedPeriod === 'day'" class="date-input">
                                    <input type="date" v-model="dateFilters.day" class="form-control"
                                        @change="fetchTimeData">
                                </div>

                                <div v-if="selectedPeriod === 'week'" class="date-input">
                                    <input type="date" v-model="dateFilters.week" class="form-control"
                                        @change="fetchTimeData">
                                </div>

                                <div v-if="selectedPeriod === 'month'" class="date-input">
                                    <input type="month" v-model="dateFilters.month" class="form-control"
                                        @change="fetchTimeData">
                                </div>

                                <div v-if="selectedPeriod === 'quarter'" class="d-flex gap-2">
                                    <select v-model="dateFilters.quarter" class="form-select" @change="fetchTimeData">
                                        <option value="1">Quý 1</option>
                                        <option value="2">Quý 2</option>
                                        <option value="3">Quý 3</option>
                                        <option value="4">Quý 4</option>
                                    </select>
                                    <input type="number" v-model="dateFilters.quarterYear" class="form-control"
                                        placeholder="Năm" @change="fetchTimeData">
                                </div>

                                <div v-if="selectedPeriod === 'year'" class="date-input">
                                    <input type="number" v-model="dateFilters.year" class="form-control"
                                        placeholder="Năm" @change="fetchTimeData">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body chart-container">
                        <Bar v-if="timeChartLoaded && hasData" :data="timeChartData" :options="timeChartOptions" />
                        <div v-else-if="timeChartLoaded && !hasData" class="no-data">
                            <i class="fas fa-chart-bar mb-2"></i>
                            <p>Không có dữ liệu thống kê cho khoảng thời gian này</p>
                        </div>
                        <div v-else class="loading-spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Method Charts -->
            <div class="col-md-6 mb-4">
                <div class="chart-card h-100">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-pie me-2"></i>
                            Phân bố đơn hàng theo phương thức
                        </h3>
                    </div>
                    <div class="card-body">
                        <Pie v-if="loaded" :data="pieChartData" :options="pieChartOptions" />
                        <div v-else class="loading-spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 mb-4">
                <div class="chart-card h-100">
                    <div class="card-header">
                        <h3 class="card-title">
                            <i class="fas fa-chart-bar me-2"></i>
                            Doanh thu theo phương thức
                        </h3>
                    </div>
                    <div class="card-body">
                        <Bar v-if="loaded" :data="barChartData" :options="barChartOptions" />
                        <div v-else class="loading-spinner">
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar, Pie } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    BarController
} from 'chart.js'
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
import baseRequest from '../../../core/baseRequest';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    PointElement,
    LineElement,
    LineController,
    BarController
)

export default {
    name: 'ThongKe',
    components: { Bar, Pie },
    data() {
        const currentYear = new Date().getFullYear();
        const currentQuarter = Math.floor((new Date().getMonth() / 3) + 1);

        return {
            loaded: false,
            tongDoanhThu: 0,
            totalOrders: 0,
            pieChartData: null,
            barChartData: null,
            pieChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Phân bố số lượng hóa đơn',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                }
            },
            barChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Doanh thu theo phương thức',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString('vi-VN') + ' VNĐ'
                            }
                        }
                    }
                }
            },
            selectedPeriod: 'day',
            timeChartLoaded: false,
            timeChartData: null,
            dateFilters: {
                day: new Date().toISOString().split('T')[0],
                week: new Date().toISOString().split('T')[0],
                month: new Date().toISOString().slice(0, 7),
                quarter: currentQuarter.toString(),
                quarterYear: currentYear.toString(),
                year: currentYear.toString()
            },
            periodLabel: '',
            hasData: false,
            timeChartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            font: {
                                size: 13,
                                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                            },
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Thống kê doanh thu theo thời gian',
                        font: {
                            size: 18,
                            weight: 'bold',
                            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                        },
                        padding: {
                            top: 10,
                            bottom: 30
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2c3e50',
                        titleFont: {
                            size: 13,
                            weight: 'bold'
                        },
                        bodyColor: '#2c3e50',
                        bodyFont: {
                            size: 12
                        },
                        borderColor: 'rgba(0, 0, 0, 0.1)',
                        borderWidth: 1,
                        padding: 10,
                        displayColors: true,
                        callbacks: {
                            label: function (context) {
                                const value = context.raw || 0;
                                return context.dataset.label + ': ' + value.toLocaleString('vi-VN') + ' VNĐ';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function (value) {
                                return value.toLocaleString('vi-VN') + ' VNĐ'
                            },
                            font: {
                                size: 12,
                                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                            },
                            padding: 8
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
                            },
                            padding: 8
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        }
    },
    methods: {
        formatCurrency(value) {
            return new Intl.NumberFormat('vi-VN').format(value)
        },
        getPaymentMethodLabel(method) {
            const labels = {
                'VNPAY': 'VNPAY',
                'tien_mat': 'Tiền mặt',
                'momo': 'MoMo'
            }
            return labels[method] || method
        },
        getChartColors(index) {
            const colors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63']
            return colors[index % colors.length]
        },
        async fetchData() {
            const response = await baseRequest.get('admin/thong-ke/doanh-thu')
            if(response.data.status==false){
                toaster.error(response.data.message)
            }else{
                try {    
                const data = response.data
                const paymentMethods = data.thong_ke_theo_phuong_thuc
                const backgroundColors = paymentMethods.map((_, index) => this.getChartColors(index))
                // Calculate total orders
                this.totalOrders = paymentMethods.reduce((sum, method) => sum + method.so_luong_hoa_don, 0)
                
                
                // Prepare data for pie chart
                this.pieChartData = {
                    labels: paymentMethods.map(item => this.getPaymentMethodLabel(item.phuong_thuc_thanh_toan)),
                    datasets: [{
                        backgroundColor: backgroundColors,
                        data: paymentMethods.map(item => item.so_luong_hoa_don)
                    }]
                }
                
                // Prepare data for bar chart
                this.barChartData = {
                    labels: paymentMethods.map(item => this.getPaymentMethodLabel(item.phuong_thuc_thanh_toan)),
                    datasets: [{
                        label: 'Doanh thu (VNĐ)',
                        backgroundColor: backgroundColors,
                        data: paymentMethods.map(item => parseInt(item.tong_doanh_thu))
                    }]
                }

                this.tongDoanhThu = data.tong_doanh_thu
                this.loaded = true
                toaster.success(data.message)
            } catch (error) {               
                console.error('Error fetching statistics:', error)
                toaster.error('Có lỗi xảy ra khi tải dữ liệu thống kê')
            }
            }
        },
        handlePeriodChange() {
            this.timeChartLoaded = false
            this.fetchTimeData()
        },
        async fetchTimeData() {
            try {
                this.timeChartLoaded = false;
                let endpoint = '';
                let params = {};

                switch (this.selectedPeriod) {
                    case 'day':
                        endpoint = 'admin/thong-ke/theo-ngay';
                        params = { ngay: this.dateFilters.day };
                        break;
                    case 'week':
                        endpoint = 'admin/thong-ke/theo-tuan';
                        params = { tuan: this.dateFilters.week };
                        break;
                    case 'month':
                        endpoint = 'admin/thong-ke/theo-thang';
                        params = { thang: this.dateFilters.month };
                        break;
                    case 'quarter':
                        endpoint = 'admin/thong-ke/theo-quy';
                        params = {
                            nam: parseInt(this.dateFilters.quarterYear),
                            quy: parseInt(this.dateFilters.quarter)
                        };
                        break;
                    case 'year':
                        endpoint = 'admin/thong-ke/theo-nam';
                        params = { nam: parseInt(this.dateFilters.year) };
                        break;
                }

                const response = await baseRequest.get(endpoint, { params });
                const data = response.data;

                // Check if there's data
                this.hasData = data.thong_ke && data.thong_ke.length > 0;

                if (this.hasData) {
                    // Update period label
                    this.updatePeriodLabel(data);

                    // Process data for time chart
                    const datasets = this.processTimeChartData(data);

                    this.timeChartData = {
                        labels: datasets.labels,
                        datasets: datasets.series
                    };
                } else {
                    // Even if no data, still update the period label
                    this.updatePeriodLabel({
                        nam: this.dateFilters.quarterYear,
                        quy: this.dateFilters.quarter,
                        ngay: this.dateFilters.day,
                        thang: this.dateFilters.month,
                        tu_ngay: this.dateFilters.week,
                        den_ngay: this.getEndOfWeek(this.dateFilters.week)
                    });
                }

                this.timeChartLoaded = true;
            } catch (error) {
                console.error('Error fetching time statistics:', error);
                toaster.error('Có lỗi xảy ra khi tải dữ liệu thống kê theo thời gian');
                this.timeChartLoaded = true;
                this.hasData = false;
            }
        },
        getEndOfWeek(startDate) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + 6);
            return date.toISOString().split('T')[0];
        },
        updatePeriodLabel(data) {
            switch (this.selectedPeriod) {
                case 'day':
                    this.periodLabel = 'Ngày ' + this.formatDate(data.ngay);
                    break;
                case 'week':
                    const startDate = data.tu_ngay || this.dateFilters.week;
                    const endDate = data.den_ngay || this.getEndOfWeek(this.dateFilters.week);
                    this.periodLabel = 'Từ ' + this.formatDate(startDate) + ' đến ' + this.formatDate(endDate);
                    break;
                case 'month':
                    const monthDate = new Date(data.thang || this.dateFilters.month);
                    this.periodLabel = 'Tháng ' + (monthDate.getMonth() + 1) + '/' + monthDate.getFullYear();
                    break;
                case 'quarter':
                    const quarter = data.quy || this.dateFilters.quarter;
                    const year = data.nam || this.dateFilters.quarterYear;
                    this.periodLabel = 'Quý ' + quarter + '/' + year;
                    break;
                case 'year':
                    this.periodLabel = 'Năm ' + (data.nam || this.dateFilters.year);
                    break;
            }
        },
        processTimeChartData(data) {
            const paymentMethods = [...new Set(data.thong_ke.map(item => item.phuong_thuc_thanh_toan))];
            let labels = [];

            // Generate labels based on period type
            switch (this.selectedPeriod) {
                case 'day':
                    labels = ['Ngày ' + this.formatDate(data.ngay)];
                    break;
                case 'week':
                case 'month':
                    labels = [...new Set(data.thong_ke.map(item => item.ngay))]
                        .sort((a, b) => new Date(a) - new Date(b))
                        .map(date => {
                            const d = new Date(date);
                            return d.getDate() + '/' + (d.getMonth() + 1);
                        });
                    break;
                case 'quarter':
                case 'year':
                    labels = [...new Set(data.thong_ke.map(item => item.thang))]
                        .sort((a, b) => a - b)
                        .map(month => 'T' + month);
                    break;
            }

            // Calculate total revenue per day for the line chart
            const totalRevenue = labels.map(label => {
                const dayData = data.thong_ke.filter(item => {
                    if (this.selectedPeriod === 'day') return true;
                    if (this.selectedPeriod === 'week' || this.selectedPeriod === 'month') {
                        const itemDate = new Date(item.ngay);
                        const labelParts = label.split('/');
                        return itemDate.getDate() === parseInt(labelParts[0]) &&
                            (itemDate.getMonth() + 1) === parseInt(labelParts[1]);
                    }
                    return ('T' + item.thang) === label;
                });
                return dayData.reduce((sum, item) => sum + parseInt(item.tong_doanh_thu), 0);
            });

            // Colors for payment methods
            const colors = {
                'VNPAY': '#0052cc',
                'MOMO': '#d82d8b',
                'TIEN_MAT': '#00875a'
            };

            // Create bar datasets for each payment method
            const barDatasets = paymentMethods.map(method => {
                const color = colors[method.toUpperCase()] || '#36B37E';

                return {
                    type: 'bar',
                    label: this.getPaymentMethodLabel(method),
                    data: labels.map(label => {
                        const matchingData = data.thong_ke.find(item => {
                            if (this.selectedPeriod === 'day') return true;
                            if (this.selectedPeriod === 'week' || this.selectedPeriod === 'month') {
                                const itemDate = new Date(item.ngay);
                                const labelParts = label.split('/');
                                return itemDate.getDate() === parseInt(labelParts[0]) &&
                                    (itemDate.getMonth() + 1) === parseInt(labelParts[1]) &&
                                    item.phuong_thuc_thanh_toan === method;
                            }
                            return ('T' + item.thang) === label && item.phuong_thuc_thanh_toan === method;
                        });
                        return matchingData ? parseInt(matchingData.tong_doanh_thu) : 0;
                    }),
                    backgroundColor: color + '80',
                    borderColor: color,
                    borderWidth: 1,
                    borderRadius: 4
                };
            });

            // Add line dataset for total revenue
            const lineDataset = {
                type: 'line',
                label: 'Tổng doanh thu',
                data: totalRevenue,
                borderColor: '#2c3e50',
                backgroundColor: 'rgba(44, 62, 80, 0.1)',
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: '#2c3e50',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                yAxisID: 'y'
            };

            // Combine datasets
            const datasets = [...barDatasets, lineDataset];

            return { labels, series: datasets };
        },
        formatDate(dateString) {
            const date = new Date(dateString)
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(date)
        }
    },
    mounted() {
        this.fetchData()
        this.fetchTimeData()
    }
}
</script>

<style scoped>
.statistics-header h2 {
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 1.5rem;
}

.total-revenue-card,
.total-orders-card {
    background: linear-gradient(135deg, #43a047 0%, #1565c0 100%);
    border-radius: 15px;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    height: 100%;
}

.total-orders-card {
    background: linear-gradient(135deg, #43a047 0%, #1565c0 100%);
}

.total-revenue-card .card-content,
.total-orders-card .card-content {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.revenue-icon,
.orders-icon {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.revenue-icon i,
.orders-icon i {
    color: white;
    font-size: 2rem;
}

.revenue-info,
.orders-info {
    color: white;
}

.revenue-info h6,
.orders-info h6 {
    margin: 0;
    font-size: 1rem;
    opacity: 0.9;
}

.revenue-info h3,
.orders-info h3 {
    margin: 0.5rem 0 0;
    font-size: 1.8rem;
    font-weight: 600;
}

.chart-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
}

.chart-card:hover {
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    background: linear-gradient(to right, #f8f9fa, #ffffff);
}

.card-header .card-title {
    color: #2c3e50;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.card-header .card-title i {
    margin-right: 0.5rem;
    color: #1e88e5;
}

.chart-card .card-body {
    padding: 1.5rem;
    height: 450px;
    position: relative;
}

.loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

@media (max-width: 768px) {
    .chart-card .card-body {
        height: 300px;
    }

    .total-revenue-card,
    .total-orders-card {
        padding: 1.5rem;
    }

    .revenue-icon,
    .orders-icon {
        width: 48px;
        height: 48px;
    }

    .revenue-info h3,
    .orders-info h3 {
        font-size: 1.5rem;
    }
}

.form-select,
.form-control {
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0.5rem;
    min-width: 120px;
}

.form-select:focus,
.form-control:focus {
    border-color: #1e88e5;
    box-shadow: 0 0 0 0.2rem rgba(30, 136, 229, 0.25);
}

.period-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: normal;
}

.chart-container {
    height: 450px;
    position: relative;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
}

.no-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
}

.no-data i {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    color: #ccc;
}

.no-data p {
    margin: 0;
    font-size: 1.1rem;
}

.date-input {
    min-width: 200px;
}

@media (max-width: 768px) {
    .chart-container {
        height: 300px;
    }

    .date-input {
        min-width: 100%;
    }

    .card-header .d-flex {
        gap: 1rem !important;
    }

    .form-select,
    .form-control {
        font-size: 0.9rem;
    }
}
</style>
