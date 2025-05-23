<template>
    <div class="container mt-4">
      <div class="row">
        <!-- Left Panel -->
        <div class="col-lg-4 d-flex justify-content-center">
          <div class="card shadow-sm w-100">
            <div class="card-body text-center">
              <img
                src="https://i.pinimg.com/236x/03/19/e7/0319e75748160709ceefa7398a4a7070.jpg"
                class="rounded-circle mb-3"
                style="width: 100px;"
                alt="avatar"
              />
              <h5 class="fw-bold">{{ khach_hang.ten_khach_hang }}</h5>
              <hr />
              <h6 class="mb-1">
                Tổng chi tiêu 2025<br />
                <span class="text-danger fw-bold">{{ tong_tien_da_thanh_toan }}</span>
              </h6>
              <hr />
              <div class="text-start">
                <p><strong>HOTLINE:</strong> <a href="tel:0332162386">0332162386</a> (9:00 - 22:00)</p>
                <p><strong>Email:</strong> <a href="mailto:duyetvan03@gmail.com">duyetvan03@gmail.com</a></p>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Right Panel -->
        <div class="col-lg-8 d-flex justify-content-center">
          <div class="card w-100">
            <div class="card-body">
              <!-- Tabs -->
              <ul class="nav nav-tabs nav-primary mb-0" role="tablist">
                <li class="nav-item" role="presentation">
                  <a class="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab">
                    <i class="bx bx-comment-detail font-18 me-1"></i> Thông tin cá nhân
                  </a>
                </li>
                <li class="nav-item" role="presentation">
                  <a class="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab">
                    <i class="bx bx-bookmark-alt font-18 me-1"></i> Đổi mật khẩu
                  </a>
                </li>
              </ul>
  
              <!-- Tab Contents -->
              <div class="tab-content pt-3">
                <!-- Cập nhật thông tin -->
                <div class="tab-pane fade show active" id="primaryhome">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Họ và tên</label>
                      <input type="text" class="form-control" v-model="cap_nhat.ten_khach_hang" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Ngày sinh</label>
                      <input type="date" class="form-control" v-model="cap_nhat.ngay_sinh" />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" v-model="cap_nhat.email" />
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Số điện thoại</label>
                      <input type="text" class="form-control" v-model="cap_nhat.so_dien_thoai" />
                    </div>
                  </div>
                  <div class="text-center mt-5">
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#capnhat">
                      Cập nhật
                    </button>
                  </div>
                </div>
  
                <!-- Đổi mật khẩu -->
                <div class="tab-pane fade" id="primaryprofile">
                  <label>Mật khẩu hiện tại</label>
                  <input v-model="mat_khau.hien_tai" class="form-control mt-1" type="password" />
                  <label class="mt-3">Mật khẩu mới</label>
                  <input v-model="mat_khau.moi" class="form-control mt-1" type="password" />
                  <label class="mt-3">Nhập lại mật khẩu mới</label>
                  <input v-model="mat_khau.re_password" class="form-control mt-1" type="password" />
                  <div class="text-center mt-3">
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#doi">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal: Cập nhật thông tin -->
      <div class="modal fade" id="capnhat" tabindex="-1">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Cập nhật thông tin cá nhân</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <!-- Duplicated update form (optional: you can reuse component or use shared state) -->
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Họ và tên</label>
                  <input type="text" class="form-control" v-model="cap_nhat.ten_khach_hang" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Ngày sinh</label>
                  <input type="date" class="form-control" v-model="cap_nhat.ngay_sinh" />
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input type="email" class="form-control" v-model="cap_nhat.email" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại</label>
                  <input type="text" class="form-control" v-model="cap_nhat.so_dien_thoai" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button class="btn btn-primary" @click="capNhatThongTin">Cập nhật</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal: Đổi mật khẩu -->
      <div class="modal fade" id="doi" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Đổi mật khẩu</h5>
              <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              Bạn có chắc muốn đổi mật khẩu?
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button class="btn btn-primary" @click="doiMatKhau" data-bs-dismiss="modal">Lưu</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { createToaster } from "@meforma/vue-toaster";
  const toaster = createToaster({ position: "top-right" });
  
  export default {
    data() {
      return {
        khach_hang: {},
        cap_nhat: {
          ten_khach_hang: "",
          ngay_sinh: "",
          email: "",
          so_dien_thoai: "",
        },
        mat_khau: {
          hien_tai: "",
          moi: "",
          re_password: "",
        },
        list_hd: [],
        tong_tien_da_thanh_toan: "",
      };
    },
    mounted() {
      this.load();
      this.loadHD();
    },
    methods: {
      load() {
        axios
          .post("http://127.0.0.1:8000/api/khach-hang/thong-tin-ca-nhan", {}, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
            },
          })
          .then((res) => {
            this.khach_hang = res.data.data;
            this.cap_nhat = { ...this.khach_hang };
          });
      },
      loadHD() {
        axios
          .get("http://127.0.0.1:8000/api/khach-hang/hoa-don", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
            },
          })
          .then((res) => {
            this.list_hd = res.data.data;
            this.tong_tien_da_thanh_toan = new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(res.data.tong_tien_da_thanh_toan);
          });
      },
      capNhatThongTin() {
        axios
          .post("http://127.0.0.1:8000/api/khach-hang/cap-nhat-thong-tin", this.cap_nhat, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              toaster.success("Cập nhật thông tin thành công!");
              this.load();
              bootstrap.Modal.getInstance(document.getElementById("capnhat")).hide();
            } else {
              toaster.error(res.data.message || "Có lỗi xảy ra khi cập nhật.");
            }
          })
          .catch(this.handleValidationError);
      },
      doiMatKhau() {
        const payload = {
          email: this.khach_hang.email,
          password: this.mat_khau.hien_tai,
          moi: this.mat_khau.moi,
          re_password: this.mat_khau.re_password,
        };
        axios
          .post("http://127.0.0.1:8000/api/khach-hang/doi-mat-khau", payload, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token_khachhang"),
            },
          })
          .then((res) => {
            if (res.data.status) {
              toaster.success(res.data.message);
              this.$router.push("/login");
            } else {
              toaster.error(res.data.message);
            }
          })
          .catch(this.handleValidationError);
      },
      handleValidationError(error) {
        if (error.response?.status === 422) {
          const errors = error.response.data.errors;
          for (let field in errors) {
            errors[field].forEach((msg) => toaster.error(msg));
          }
        } else {
          toaster.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
      },
    },
  };
  </script>

<style scoped>
.nav-tabs .nav-link.active {
    border-bottom: 2px solid #dc3545;
    font-weight: bold;
    color: #dc3545;
}

.nav-tabs .nav-link {
    color: #495057;
    transition: all 0.3s ease;
}

.nav-tabs .nav-link:hover {
    color: #dc3545;
    border-bottom: 2px solid #dc3545;
}

.btn-primary {
    background-color: #dc3545;
    border-color: #dc3545;
}

.btn-primary:hover {
    background-color: #c82333;
    border-color: #bd2130;
}

.btn-warning {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
}

.btn-warning:hover {
    background-color: #c82333;
    border-color: #bd2130;
    color: white;
}

.text-danger {
    color: #dc3545 !important;
}

.card {
    border: none;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.form-control:focus {
    border-color: #dc3545;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.rounded-circle {
    border: 3px solid #dc3545;
    padding: 3px;
}

hr {
    border-color: #dc3545;
    opacity: 0.2;
}

a {
    color: #dc3545;
    text-decoration: none;
    transition: all 0.3s ease;
}

a:hover {
    color: #c82333;
    text-decoration: underline;
}
</style>