<template>
  <div class="nav-container primary-menu">
    <div class="mobile-topbar-header">
      <div>
        <h4 class="logo-text">CINEMA</h4>
      </div>
      <div class="toggle-icon ms-auto"><i class="bx bx-arrow-to-left"></i>
      </div>
    </div>
    <nav class="navbar navbar-expand-xl w-100">
      <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
        <!-- <li class="nav-item dropdown">
                    <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret"
                        data-bs-toggle="dropdown">
                        <div class="parent-icon"><i class="bx bx-home-circle"></i>
                        </div>
                        <div class="menu-title">Dashboard</div>
                    </a>
                    <ul class="dropdown-menu">
                        <li> <a class="dropdown-item" href="index.html"><i class="bx bx-right-arrow-alt"></i>Default</a>
                        </li>
                        <li> <a class="dropdown-item" href="index2.html"><i
                                    class="bx bx-right-arrow-alt"></i>Alternate</a>
                        </li>
                    </ul>
                </li> -->
        <li class="nav-item">
          <router-link to="/admin/dich-vu">
            <a class="nav-link" href="/admin/dich-vu">
              <div class="parent-icon"><i class="fa-brands fa-servicestack"></i>
              </div>
              <div class="menu-title">Dịch Vụ</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/doanh-thu">
            <a class="nav-link" href="/admin/doanh-thu">
              <div class="parent-icon"><i class="fa-solid fa-money-bill"></i>
              </div>
              <div class="menu-title">Doanh thu</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/ghe-xem-phim">
            <a class="nav-link" href="/admin/ghe-xem-phim">
              <div class="parent-icon"><i class="fa-solid fa-couch"></i>
              </div>
              <div class="menu-title">Ghế</div>
            </a>
          </router-link>

        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-brands fa-ubuntu"></i>
            </div>
            <div class="menu-title">Hệ thống</div>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/admin/he-thong/chuc-vu">
                <a class="dropdown-item">
                  <i class="bx bx-right-arrow-alt"></i>Chức vụ</a>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/phan-quyen">
                <a class="dropdown-item">
                  <i class="bx bx-right-arrow-alt"></i>Phân Quyền</a>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- <li class="nav-item">
                    <router-link to="/admin/he-thong">
                        <a class="nav-link" href="/admin/he-thong">
                        <div class="parent-icon"><i class="fa-brands fa-ubuntu"></i>
                        </div>
                        <div class="menu-title">Hệ Thống</div>
                    </a>
                    </router-link>  
                </li> -->
        <li class="nav-item">
          <router-link to="/admin/khuyen-mai">
            <a class="nav-link" href="/admin/khuyen-mai">
              <div class="parent-icon"><i class="fa-solid fa-gift"></i>
              </div>
              <div class="menu-title">Khuyến Mãi</div>
            </a>
          </router-link>

        </li>
        <li class="nav-item dropdown">
          <a href="javascript:;" class="nav-link dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">
            <div class="parent-icon"><i class="fa-solid fa-user"></i>
            </div>
            <div class="menu-title">Người dùng</div>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link to="/admin/nguoi-dung/khach-hang">
                <a class="dropdown-item" href="/admin/nguoi-dung/khach-hang">
                  <i class="bx bx-right-arrow-alt"></i>Khách hàng</a>
              </router-link>
            </li>
            <li>
              <router-link to="/admin/nguoi-dung/nhan-vien">
                <a class="dropdown-item" href="/admin/nguoi-dung/nhan-vien">
                  <i class="bx bx-right-arrow-alt"></i>Nhân viên</a>
              </router-link>
            </li>
          </ul>
        </li>
        <!-- <li class="nav-item">
                    <router-link to="/admin/nguoi-dung">
                        <a class="nav-link" href="/admin/nguoi-dung">
                        <div class="parent-icon"><i class="fa-solid fa-user"></i>
                        </div>
                        <div class="menu-title"> Người dùng </div>
                    </a>
                    </router-link>                   

                </li> -->
        <li class="nav-item">
          <router-link to="/admin/noi-dung">
            <a class="nav-link" href="/admin/noi-dung">
              <div class="parent-icon"><i class="fa-solid fa-book"></i>
              </div>
              <div class="menu-title">Nội Dung</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/phan-hoi">
            <a class="nav-link" href="/admin/phan-hoi">
              <div class="parent-icon"><i class="fa-solid fa-comments"></i>
              </div>
              <div class="menu-title">Phản Hồi</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/phim">
            <a class="nav-link" href="/admin/phim">
              <div class="parent-icon"><i class="fa-solid fa-video"></i>
              </div>
              <div class="menu-title">Phim</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/phong">
            <a class="nav-link" href="/admin/phong">
              <div class="parent-icon"><i class="fa-solid fa-shop"></i>
              </div>
              <div class="menu-title">Phòng</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/suat-chieu">
            <a class="nav-link" href="/admin/suat-chieu">
              <div class="parent-icon"><i class="fa-solid fa-film"></i>
              </div>
              <div class="menu-title">Suất Chiếu</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/chi-tiet-ve">
            <a class="nav-link" href="/admin/chi-tiet-ve">
              <div class="parent-icon"><i class="fa-solid fa-ticket"></i></div>
              <div class="menu-title">Chi tiết vé</div>
            </a>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/admin/hoa-don">
            <a class="nav-link" href="/admin/hoa-don">
              <div class="parent-icon"><i class="fa-solid fa-barcode"></i></div>
              <div class="menu-title">Bill</div>
            </a>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/the-loai">
            <a class="nav-link" href="/admin/the-loai">
              <div class="parent-icon"><i class="fa-solid fa-video"></i>
              </div>
              <div class="menu-title">Thể Loại</div>
            </a>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {};
</script>
<style></style>