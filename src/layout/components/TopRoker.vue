<template>
	<header>
		<div class="topbar d-flex align-items-center">
			<nav class="navbar navbar-expand">
				<div class="topbar-logo-header">
					<div class="">
						<h4 class="logo-text" style="color: crimson;">CINEMA</h4>
					</div>
				</div>
				<div class="mobile-toggle-menu"><i class="bx bx-menu"></i></div>
				<div class="search-bar flex-grow-1">
					<div class="position-relative search-bar-box">
						
					</div>
				</div>

				<div class="user-box dropdown">
					<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#"
						role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<img v-bind:src="avatar" class="user-img" alt="user avatar">
						<div class="user-info ps-3">
							<p class="user-name mb-0">{{ ten_hien_thi }}</p>
							<p class="designattion mb-0">Admin</p>
						</div>
					</a>
					<ul class="dropdown-menu dropdown-menu-end">
						<li><a v-on:click="dangXuat()" class="dropdown-item"><i
									class='bx bx-log-out-circle'></i><span>Đăng Xuất</span></a>
						</li>
						<li><a v-on:click="dangXuatAll()" class="dropdown-item"><i
									class='bx bx-log-out-circle'></i><span>Đăng Xuất Tất Cả</span></a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	</header>
</template>

<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
import baseRequest from '../../core/baseRequest';
const toaster = createToaster({ position: "top-right" });

export default {
	data() {
		return {
			ten_hien_thi: 'Chưa đăng nhập',
			avatar: 'Chưa đăng nhập',
		}
	},
	mounted() {
		this.checkLogin();
	},
	methods: {
		checkLogin() {
			baseRequest
				.post('kiem-tra-token-admin', {})
				.then((res) => {
					if (res.data.status) {
						this.ten_hien_thi = localStorage.getItem('ho_ten_admin');
						this.avatar = localStorage.getItem('avatar_admin');
					}
				});
		},
		dangXuat() {
			baseRequest
				.get('admin/dang-xuat')
				.then((res) => {
					toaster.success(res.data.message);
					this.$router.push('/admin/dang-nhap');
				})
		},
		dangXuatAll() {
			baseRequest
				.get('admin/dang-xuat-all')
				.then((res) => {
					toaster.success(res.data.message);
					this.$router.push('/admin/dang-nhap');
				})
		}
	},
}
</script>

<style>
/* Đặt màu nền cho body (nếu cần) */
body {
	background-color: #fff;
	/* Đặt màu nền mặc định cho body */
}

/* Đảm bảo loại bỏ tất cả border trong topbar và đặt màu nền */
.topbar {
	background: #0d1a59 !important;
	/* Màu xanh đậm */
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
	border: none !important;
	padding: 0.5rem 1rem;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 1030;
	height: 60px;
}

/* Loại bỏ màu nền mặc định của navbar từ Bootstrap */
.navbar {
	border: none !important;
	background: transparent !important;
	/* Đảm bảo navbar không ghi đè màu nền */
}

/* Loại bỏ border và padding không cần thiết cho logo */
.topbar-logo-header {
	display: flex;
	align-items: center;
	margin-right: 10px;
	border: none !important;
	padding: 0;
}

/* Style cho logo text */
.logo-text {
	margin: 0;
	font-size: 1.5rem;
	font-weight: 700;
	background: linear-gradient(135deg, #6e45e2, #88d3ce);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	letter-spacing: 1px;
	color: transparent;
}

/* Style cho thanh tìm kiếm */
.search-bar {
	flex-grow: 1;
}

.search-bar-box {
	border: none !important;
	background: transparent !important;
	max-width: 300px;
	/* Thu nhỏ chiều rộng tối đa của thanh tìm kiếm */
}

/* Style cho input trong thanh tìm kiếm */
.search-bar-box .form-control {
	background-color: rgba(255, 255, 255, 0.1);
	/* Nền hơi trong suốt để nổi bật */
	border: 1px solid rgba(255, 255, 255, 0.2);
	/* Viền nhẹ */
	color: #fff;
	/* Chữ nhập vào màu trắng */
	height: 36px;
	/* Giảm chiều cao input */
}

/* Đổi màu placeholder thành trắng */
.search-bar-box .form-control::placeholder {
	color: #fff !important;
	/* Màu trắng cho placeholder */
	opacity: 0.7;
	/* Độ trong suốt nhẹ cho placeholder */
}

/* Loại bỏ border và divider của user-box */
.user-box {
	margin-left: 10px;
	border: none !important;
	background: transparent !important;
}

/* Loại bỏ border của nav-link trong user-box */
.user-box .nav-link {
	border: none !important;
	padding: 0;
	/* Loại bỏ padding để tránh khoảng cách dư thừa */
}

/* Đảm bảo dropdown-toggle không có border */
.user-box .dropdown-toggle {
	border: none !important;
}

/* Style cho user image */
.user-img {
	width: 40px;
	height: 40px;
	border-radius: 8px;
	border: 2px solid #6e45e2;
	/* Viền màu gốc */
	object-fit: cover;
}


.designattion {
	font-size: 0.75rem;
	color: #88d3ce;
	/* Đổi màu chữ thành màu gradient nhạt để nổi bật */
	font-weight: 500;
}

/* Loại bỏ border của các nav-link trong navbar */
.navbar-expand .navbar-nav .nav-link {
	border: none !important;
}

/* Responsive */
@media (max-width: 991.98px) {
	.search-bar {
		display: none;
	}

	.full-search-bar {
		display: flex;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #0d1a59 !important;
		/* Đảm bảo màu nền khớp với topbar */
		z-index: 1;
		padding: 0 15px;
		align-items: center;
	}

	.full-search-bar .form-control {
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #fff;
		height: 36px;
	}

	.full-search-bar .form-control::placeholder {
		color: #fff !important;
		opacity: 0.7;
	}

	.search-close {
		display: block;
	}

	.mobile-search-icon {
		display: block;
	}
}

@media (min-width: 992px) {
	.mobile-search-icon {
		display: none;
	}
}

/* Các style không liên quan đến topbar */
.user-online {
	position: relative;
	margin-right: 15px;
}

.user-online:after {
	content: '';
	position: absolute;
	bottom: 0;
	right: 0;
	width: 10px;
	height: 10px;
	background-color: #16e15e;
	border-radius: 50%;
	border: 2px solid #fff;
}

.msg-footer {
	padding: 12px;
	text-align: center;
	font-size: 0.9rem;
	color: #6e45e2;
	font-weight: 500;
	background-color: #f8f9fa;
	cursor: pointer;
	transition: all 0.3s;
}

.msg-footer:hover {
	background-color: #6e45e2;
	color: #fff;
}
</style>