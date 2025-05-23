<template>

</template>
<script>
import axios from 'axios';
import { createToaster } from "@meforma/vue-toaster";
const toaster = createToaster({ position: "top-right" });
export default {
    props: ['ma_kich_hoat'],
    mounted() {
        this.maKichHoat();
    },
    methods: {
        maKichHoat() {
            const payload = {
                'hash_active': this.$route.params.ma_kich_hoat
            };
            axios
                .post("http://127.0.0.1:8000/api/khach-hang/kich-hoat", payload)
                .then((res) => {
                    if (res.data.status) {
                        toaster.success(res.data.message);
                        this.$router.push('/login');
                    } else {
                        toaster.error(res.data.message);
                        this.$router.push('/');
                    }
                });
        },
    },
}
</script>
<style lang="">

</style>