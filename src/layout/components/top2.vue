<template>
  <div class="menu-wrapper">
    <button class="menu-toggle" @click="toggleMenu">
      <i class="bx" :class="isCollapsed ? 'bx-menu' : 'bx-x'"></i>
    </button>
    <div class="nav-container primary-menu" :class="{ 'menu-expanded': !isCollapsed }" :key="menuKey">
      <nav class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="(item, index) in menuItems" :key="index">
            <router-link v-if="item.to" :to="item.to" class="nav-link" @click="handleMenuClick">
              <div class="parent-icon"><i :class="item.icon"></i></div>
              <div class="menu-title">{{ item.title }}</div>
            </router-link>
            <a v-else href="javascript:;" class="nav-link" @click="toggleSubmenu(item.submenu, $event)">
              <div class="parent-icon"><i :class="item.icon"></i></div>
              <div class="menu-title">{{ item.title }}</div>
              <i class="bx bx-chevron-right ms-auto"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Submenu Panels -->
    <div class="submenu-panel" v-show="activeSubmenu === 'system'" :style="panelStyle">
      <div class="submenu-content">
        <router-link to="/admin/he-thong/chuc-vu" class="submenu-item" @click="handleMenuClick">
          <i class="bx bx-right-arrow-alt"></i>Chức vụ
        </router-link>
        <router-link to="/admin/phan-quyen" class="submenu-item" @click="handleMenuClick">
          <i class="bx bx-right-arrow-alt"></i>Phân Quyền
        </router-link>
      </div>
    </div>

    <div class="submenu-panel" v-show="activeSubmenu === 'user'" :style="panelStyle">
      <div class="submenu-content">
        <router-link to="/admin/nguoi-dung/khach-hang" class="submenu-item" @click="handleMenuClick">
          <i class="bx bx-right-arrow-alt"></i>Khách hàng
        </router-link>
        <router-link to="/admin/nguoi-dung/nhan-vien" class="submenu-item" @click="handleMenuClick">
          <i class="bx bx-right-arrow-alt"></i>Nhân viên
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: true,
      activeSubmenu: null,
      panelStyle: {
        top: '0px',
        left: '0px'
      },
      menuKey: 0,
      menuItems: [
        { to: '/admin/dich-vu', icon: 'fa-brands fa-servicestack', title: 'Dịch Vụ' },
        { to: '/admin/thong-ke', icon: 'fa-solid fa-money-bill', title: 'Thống Kê' },
        { to: '/admin/ghe-xem-phim', icon: 'fa-solid fa-couch', title: 'Ghế' },
        { submenu: 'system', icon: 'fa-brands fa-ubuntu', title: 'Hệ thống' },
        { to: '/admin/khuyen-mai', icon: 'fa-solid fa-gift', title: 'Khuyến Mãi' },
        { submenu: 'user', icon: 'fa-solid fa-user', title: 'Người dùng' },
        { to: '/admin/noi-dung', icon: 'fa-solid fa-book', title: 'Nội Dung' },
        { to: '/admin/phan-hoi', icon: 'fa-solid fa-comments', title: 'Phản Hồi' },
        { to: '/admin/phim', icon: 'fa-solid fa-video', title: 'Phim' },
        { to: '/admin/phong', icon: 'fa-solid fa-shop', title: 'Phòng' },
        { to: '/admin/suat-chieu', icon: 'fa-solid fa-film', title: 'Suất Chiếu' },
        { to: '/admin/chi-tiet-ve', icon: 'fa-solid fa-ticket', title: 'Chi tiết vé' },
        { to: '/admin/hoa-don', icon: 'fa-solid fa-barcode', title: 'Bill' },
        { to: '/admin/the-loai', icon: 'fa-solid fa-video', title: 'Thể Loại' },
        { to: '/admin/goc-dien-anh', icon: 'fa-solid fa-image', title: 'Góc Điện Ảnh' }
      ]
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
      if (!this.isCollapsed) {
        this.menuKey++;
      }
    },
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
    handleMenuClick() {
      this.isCollapsed = true;
      this.activeSubmenu = null;
    }
  }
};
</script>

<style scoped>
.menu-wrapper {
  position: relative;
}

.menu-toggle {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1001;
  background: #ffffff;
  color: #1a1a1a;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: #f5f5f5;
  transform: scale(1.1);
}

.menu-toggle i {
  font-size: 1.5rem;
}

.nav-container {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100vh - 60px);
  background: #ffffff;
  color: #1a1a1a;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
  border-radius: 0;
  overflow-y: auto;
}

.menu-collapsed {
  transform: translateX(-100%);
  opacity: 0;
  visibility: hidden;
}

.menu-expanded {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
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
  height: 100%;
  overflow-y: auto;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 0;
  width: 100%;
  display: block;
  animation: slideInDown 0.8s ease forwards;
  opacity: 0;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add delay for each menu item with larger intervals */
.menu-expanded .nav-item:nth-child(1) {
  animation-delay: 0.1s;
}

.menu-expanded .nav-item:nth-child(2) {
  animation-delay: 0.2s;
}

.menu-expanded .nav-item:nth-child(3) {
  animation-delay: 0.3s;
}

.menu-expanded .nav-item:nth-child(4) {
  animation-delay: 0.4s;
}

.menu-expanded .nav-item:nth-child(5) {
  animation-delay: 0.5s;
}

.menu-expanded .nav-item:nth-child(6) {
  animation-delay: 0.6s;
}

.menu-expanded .nav-item:nth-child(7) {
  animation-delay: 0.7s;
}

.menu-expanded .nav-item:nth-child(8) {
  animation-delay: 0.8s;
}

.menu-expanded .nav-item:nth-child(9) {
  animation-delay: 0.9s;
}

.menu-expanded .nav-item:nth-child(10) {
  animation-delay: 1.0s;
}

.menu-expanded .nav-item:nth-child(11) {
  animation-delay: 1.1s;
}

.menu-expanded .nav-item:nth-child(12) {
  animation-delay: 1.2s;
}

.menu-expanded .nav-item:nth-child(13) {
  animation-delay: 1.3s;
}

.menu-expanded .nav-item:nth-child(14) {
  animation-delay: 1.4s;
}

.menu-expanded .nav-item:nth-child(15) {
  animation-delay: 1.5s;
}

/* Reset animation when menu is collapsed */
.menu-collapsed .nav-item {
  animation: none;
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
  white-space: nowrap;
  height: 40px;
  width: 100%;
  position: relative;
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
  flex: 1;
}

.nav-item.dropdown {
  position: relative;
}

.nav-item.dropdown:hover .dropdown-menu {
  display: block;
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  min-width: 200px;
  z-index: 1001;
  border-radius: 8px;
  padding: 5px 0;
  display: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
}

.dropdown-item {
  color: #1e293b;
  padding: 8px 20px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item i {
  color: #64748b;
  transition: all 0.3s ease;
}

.dropdown-item:hover {
  background: #4f46e5;
  color: #ffffff;
}

.dropdown-item:hover i {
  color: #ffffff;
}

@media (max-width: 768px) {
  .nav-container {
    width: 100%;
    max-width: 300px;
  }

  .menu-toggle {
    top: 10px;
    left: 10px;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .nav-link {
    height: 45px;
  }
}

.submenu-panel {
  position: fixed;
  width: 250px;
  background: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1002;
  border-radius: 8px;
  overflow: hidden;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.submenu-item:last-child {
  margin-bottom: 0;
}

.submenu-item i {
  margin-right: 10px;
  color: #64748b;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.submenu-item:hover {
  background: #4f46e5;
  color: #ffffff;
  transform: translateX(3px);
}

.submenu-item:hover i {
  color: #ffffff;
}

@media (max-width: 768px) {
  .submenu-panel {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
  }
}
</style>