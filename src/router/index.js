import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save


const routes = [
  {
    path: "/",
    redirect: "/home-page",
    // component: () => import('../layout/wrapper/index.vue')
  },
  {
    path: "/home-page",
    component: () => import("../components/Client/home.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/shop-qua-tang",
    component: () => import("../components/Homepage/ShopQuaTang/index.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/login",
    component: () => import("../components/Client/login.vue"),
    meta: { layout: "Login" },
  },
  {
    path: "/khach-hang/dang-ky",
    component: () => import("../components/Client/DangKy/index.vue"),
    meta: { layout: "index" },
  },

  {
    path: "/chi-tiet-phim/:id_phim",
    component: () => import("../components/Client/ChiTietPhim/index.vue"),
    meta: { layout: "client" },
    props: true,
  },
  {
    path: "/dat-suat/:id_phim",
    component: () => import("../components/Client/datSuat.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/dat-ve/:id_suat",
    component: () => import("../components/Client/datVe.vue"),
    meta: { layout: "client" },
  },
  {
    path: "/thanh-toan/:id_suat",
    component: () => import("../components/Client/thanhToan.vue"),
    meta: { layout: "client" },
  },
  {
    // : là 1 số k cố định khi nhap vào mã thì sẽ truyển xuôsng chỗ mình tham chiếu tức là thèn con thông qua prop
    path: "/dat-lai-mat-khau/:ma_kich_hoat",
    component: () => import("../components/Client/DatLaiMatKhau/index.vue"),
    meta: { layout: "index" },
  },
  {
    path: "/quen-mat-khau",
    component: () => import("../components/Client/QuenMatKhau/index.vue"),
    meta: { layout: "index" },
  },
  {
    path: "/kich-hoat/:ma_kich_hoat",
    component: () => import("../components/Client/KichHoat/index.vue"),
    meta: { layout: "index" },
  },

  {
    path: "/auth/callback",
    name: "AuthCallback",
    component: () => import("../components/Client/AuthCallback.vue"),
  },

  //ADMIN

  {
    path: "/admin/dich-vu",
    component: () => import("../components/admin/QuanLyDichVu/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/doanh-thu",
    component: () => import("../components/admin/QuanLyDoanhThu/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/ghe-xem-phim",
    component: () => import("../components/admin/QuanLyGhe/index.vue"),
    meta: { layout: "admin" },
  },
  // {
  //     path: '/admin/he-thong',
  //     component: () => import('../components/admin/QuanLyHeThong/index.vue'),

  // },
  {
    path: "/admin/he-thong/chuc-vu",
    component: () =>
      import("../components/admin/QuanLyHeThong/ChucVu/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/khuyen-mai",
    component: () => import("../components/Admin/QuanLyKhuyenMai/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/nguoi-dung/nhan-vien",
    component: () =>
      import("../components/Admin/QuanLyNguoiDung/NhanVien/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/nguoi-dung/khach-hang",
    component: () =>
      import("../components/admin/QuanLyNguoiDung/KhachHang/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/noi-dung",
    component: () => import("../components/Admin/QuanLyNoiDung/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/phan-hoi",
    component: () => import("../components/Admin/QuanLyPhanHoi/index.vue"),
    meta: { layout: "admin" },
  },

  {
    path: "/admin/phim",
    component: () => import("../components/Admin/QuanLyPhim/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/phong",
    component: () => import("../components/Admin/QuanLyPhong/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/suat-chieu",
    component: () => import("../components/Admin/QuanLySuatChieu/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/dang-nhap",
    component: () => import("../components/Admin/DangNhap/index.vue"),
    meta: { layout: "index" },
  },
  {
    path: "/admin/hoa-don",
    component: () => import("../components/Admin/QuanLyHoaDon/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/chi-tiet-ve",
    component: () => import("../components/Admin/ChiTietVe/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/chi-tiet-the-loai",
    component: () => import("../components/Admin/ChiTietTheLoai/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/the-loai",
    component: () => import("../components/Admin/TheLoai/index.vue"),
    meta: { layout: "admin" },
  },
  {
    path: "/admin/phan-quyen",
    component: () => import("../components/Admin/QuanLyHeThong/PhanQuyen/index.vue"),
    meta: { layout: "admin" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
