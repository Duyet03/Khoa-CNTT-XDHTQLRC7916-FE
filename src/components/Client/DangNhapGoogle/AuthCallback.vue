<template>
    <div>Loading...</div>
</template>

<script>
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });

export default {
    mounted() {
        this.handleGoogleCallback();
    },
    methods: {
        handleGoogleCallback() {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get("token");
            const name = urlParams.get("name");
            const id = urlParams.get("id");
            const error = urlParams.get("error");

            if (error) {
                toaster.error("Đăng nhập Google thất bại");
                this.$router.push("/login");
                return;
            }

            if (token) {
                localStorage.setItem("token_khachhang", token);
                localStorage.setItem("ho_ten_khach_hang", name);
                localStorage.setItem("id_khach_hang", id);
                toaster.success("Đăng nhập thành công!");
                this.$router.push("/home-page");
            } else {
                this.$router.push("/login");
            }
        },
    },
};
</script>