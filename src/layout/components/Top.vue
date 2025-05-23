<template>
  <div class="menu-wrapper">
    <div class="nav-container primary-menu">
      <nav class="navbar navbar-expand-xl w-100">
        <ul class="navbar-nav justify-content-start flex-grow-1 gap-1">
          <li class="nav-item">
              <a class="nav-link" href="/admin/dich-vu">
                <div class="parent-icon"><i class="fa-brands fa-servicestack"></i></div>
                <div class="menu-title">Dịch Vụ</div>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/admin/thong-ke">
                <div class="parent-icon"><i class="fa-solid fa-money-bill"></i></div>
                <div class="menu-title">Thống Kê</div>
              </a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="toggleSubmenu('schedule', $event)">
              <div class="parent-icon"><i class="fa-solid fa-calendar"></i></div>
              <div class="menu-title">Lịch chiếu</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="toggleSubmenu('movies', $event)">
              <div class="parent-icon"><i class="fa-solid fa-film"></i></div>
              <div class="menu-title">Quản lý phim</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="toggleSubmenu('system', $event)">
              <div class="parent-icon"><i class="fa-brands fa-ubuntu"></i></div>
              <div class="menu-title">Hệ thống</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/admin/khuyen-mai">
              <a class="nav-link" href="/admin/khuyen-mai">
                <div class="parent-icon"><i class="fa-solid fa-gift"></i></div>
                <div class="menu-title">Sự kiện</div>
              </a>
            </router-link>
          </li> -->
          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="toggleSubmenu('user', $event)">
              <div class="parent-icon"><i class="fa-solid fa-user"></i></div>
              <div class="menu-title">Người dùng</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
          <li class="nav-item">
            <a href="javascript:;" class="nav-link" @click="toggleSubmenu('content', $event)">
              <div class="parent-icon"><i class="fa-solid fa-book"></i></div>
              <div class="menu-title">Quản lý nội dung</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
          <!-- <li class="nav-item">
            <router-link to="/admin/phan-hoi">
              <a class="nav-link" href="/admin/phan-hoi">
                <div class="parent-icon"><i class="fa-solid fa-comments"></i></div>
                <div class="menu-title">Phản Hồi</div>
              </a>
            </router-link>
          </li> -->
          <li class="nav-item">
              <a class="nav-link" href="/admin/chi-tiet-ve">
                <div class="parent-icon"><i class="fa-solid fa-ticket"></i></div>
                <div class="menu-title">Chi tiết vé</div>
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="/admin/hoa-don">
                <div class="parent-icon"><i class="fa-solid fa-barcode"></i></div>
                <div class="menu-title">Hóa đơn</div>
              </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Submenu Panels -->
    <div class="submenu-panel" v-show="activeSubmenu === 'schedule'" :style="panelStyle" @click="closeSubmenu">
      <div class="submenu-content">
        <router-link to="/admin/ghe-xem-phim" @click="handleSubmenuClick">
          <a href="/admin/ghe-xem-phim" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Ghế</a>
        </router-link>
        <router-link to="/admin/phong" @click="handleSubmenuClick">
          <a href="/admin/phong" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Phòng</a>
        </router-link>
        <router-link to="/admin/suat-chieu" @click="handleSubmenuClick">
          <a href="/admin/suat-chieu" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Suất Chiếu</a>
        </router-link>
      </div>
    </div>

    <div class="submenu-panel" v-show="activeSubmenu === 'movies'" :style="panelStyle" @click="closeSubmenu">
      <div class="submenu-content">
        <router-link to="/admin/phim" @click="handleSubmenuClick">
          <a href="/admin/phim" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Phim</a>
        </router-link>
        <router-link to="/admin/the-loai" @click="handleSubmenuClick">
          <a href="/admin/the-loai" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Thể Loại</a>
        </router-link>
      </div>
    </div>

    <div class="submenu-panel" v-show="activeSubmenu === 'system'" :style="panelStyle" @click="closeSubmenu">
      <div class="submenu-content">
        <router-link to="/admin/he-thong/chuc-vu" @click="handleSubmenuClick">
          <a href="/admin/he-thong/chuc-vu" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Chức vụ</a>
        </router-link>
        <router-link to="/admin/phan-quyen" @click="handleSubmenuClick">
          <a href="/admin/phan-quyen" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Phân Quyền</a>
        </router-link>
      </div>
    </div>

    <div class="submenu-panel" v-show="activeSubmenu === 'user'" :style="panelStyle" @click="closeSubmenu">
      <div class="submenu-content">
        <router-link to="/admin/nguoi-dung/khach-hang" @click="handleSubmenuClick">
          <a href="/admin/nguoi-dung/khach-hang" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Khách hàng</a>
        </router-link>
        <router-link to="/admin/nguoi-dung/nhan-vien" @click="handleSubmenuClick">
          <a href="/admin/nguoi-dung/nhan-vien" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Nhân viên</a>
        </router-link>
      </div>
    </div>

    <div class="submenu-panel" v-show="activeSubmenu === 'content'" :style="panelStyle" @click="closeSubmenu">
      <div class="submenu-content">
        <router-link to="/admin/noi-dung" @click="handleSubmenuClick">
          <a href="/admin/noi-dung" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Nội Dung</a>
        </router-link>
        <router-link to="/admin/goc-dien-anh" @click="handleSubmenuClick">
          <a href="/admin/goc-dien-anh" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Góc Điện Ảnh</a>
        </router-link>
        <router-link to="/admin/khuyen-mai">
          <a href="/admin/khuyen-mai" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Sự kiện</a>
        </router-link>
        <router-link to="/admin/phan-hoi" @click="handleSubmenuClick">
          <a href="/admin/phan-hoi" class="submenu-item">
            <i class="bx bx-right-arrow-alt"></i>Phản hồi</a>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSubmenu: null,
      panelStyle: {
        top: '0px',
        left: '0px'
      },
      menuKey: 0
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleSubmenu(submenu, event) {
      event.stopPropagation();
      if (this.activeSubmenu === submenu) {
        this.activeSubmenu = null;
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      this.panelStyle = {
        top: `${rect.bottom + 5}px`,
        left: `${rect.left}px`
      };
      this.activeSubmenu = submenu;
    },
    closeSubmenu() {
      this.activeSubmenu = null;
    },
    handleClickOutside(event) {
      const isClickInsidePanel = event.target.closest('.submenu-panel');
      const isClickOnMenuButton = event.target.closest('.nav-link');

      if (!isClickInsidePanel && !isClickOnMenuButton) {
        this.activeSubmenu = null;
      }
    },
    handleSubmenuClick() {
      this.closeSubmenu();
    }
  }
};
</script>

<style scoped>
.menu-wrapper {
  position: relative;
}

.nav-container {
  position: fixed;
  left: 0;
  width: 100%;
  top: 60px;
  background: #ffffff;
  color: #1a1a1a;
  transition: all 0.3s ease;
  z-index: 800;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 0;
  overflow-x: auto;
  overflow-y: hidden;
  opacity: 1;
  visibility: visible;
  transform: none;
}

.mobile-topbar-header {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.logo-text {
  margin: 0;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.navbar {
  padding: 15px;
  width: 100%;
}

.navbar-nav {
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  justify-content: flex-start;
  width: max-content;
  padding: 0 15px;
}

.nav-item {
  white-space: nowrap;
  animation: slideInRight 0.8s ease forwards;
  opacity: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 8px 15px;
  color: #1a1a1a;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 5px;
  height: 40px;
}

.nav-link:hover {
  background: rgba(0, 0, 0, 0.05);
  color: #1a1a1a;
}

.parent-icon {
  width: 24px;
  text-align: center;
  margin-right: 10px;
  font-size: 1.1rem;
  color: #1a1a1a;
}

.menu-title {
  font-size: 0.95rem;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .navbar {
    padding: 10px;
  }

  .nav-link {
    padding: 6px 12px;
    height: 35px;
  }

  .menu-title {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .navbar-nav {
    padding: 0 10px;
  }

  .nav-link {
    padding: 5px 10px;
    height: 32px;
  }

  .parent-icon {
    width: 20px;
    margin-right: 8px;
    font-size: 1rem;
  }

  .menu-title {
    font-size: 0.85rem;
  }
}

/* Animation for nav items */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Add delay for each menu item */
.nav-item:nth-child(1) {
  animation-delay: 0.1s;
}

.nav-item:nth-child(2) {
  animation-delay: 0.15s;
}

.nav-item:nth-child(3) {
  animation-delay: 0.2s;
}

.nav-item:nth-child(4) {
  animation-delay: 0.25s;
}

.nav-item:nth-child(5) {
  animation-delay: 0.3s;
}

.nav-item:nth-child(6) {
  animation-delay: 0.35s;
}

.nav-item:nth-child(7) {
  animation-delay: 0.4s;
}

.nav-item:nth-child(8) {
  animation-delay: 0.45s;
}

.nav-item:nth-child(9) {
  animation-delay: 0.5s;
}

.nav-item:nth-child(10) {
  animation-delay: 0.55s;
}

.nav-item:nth-child(11) {
  animation-delay: 0.6s;
}

.nav-item:nth-child(12) {
  animation-delay: 0.65s;
}

.nav-item:nth-child(13) {
  animation-delay: 0.7s;
}

.nav-item:nth-child(14) {
  animation-delay: 0.75s;
}

.nav-item:nth-child(15) {
  animation-delay: 0.8s;
}

/* Submenu styling */
.submenu-panel {
  position: fixed;
  width: 250px;
  background: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 801;
  border-radius: 8px;
  overflow: hidden;
}

.submenu-content {
  padding: 8px;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #1e293b;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 0.9rem;
}

.submenu-item:hover {
  background: #4f46e5;
  color: #ffffff;
  transform: translateX(3px);
}

.submenu-item i {
  margin-right: 10px;
  color: #64748b;
  transition: all 0.3s ease;
}

.submenu-item:hover i {
  color: #ffffff;
}

/* Custom scrollbar for nav-container */
.nav-container::-webkit-scrollbar {
  height: 6px;
}

.nav-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.nav-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.nav-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>