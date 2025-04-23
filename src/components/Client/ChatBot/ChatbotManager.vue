<template>
  <FloatingChatbot v-if="shouldShowChatbot" />
</template>

<script>
import FloatingChatbot from './FloatingChatbot.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, watch } from 'vue';

export default {
  components: {
    FloatingChatbot
  },
  
  setup() {
    const route = useRoute();
    const shouldShowChatbot = computed(() => {
      // Không hiển thị chatbot trên các trang đăng nhập và đăng ký
      const hideChatbotRoutes = [
        '/login',
        '/khach-hang/dang-ky',
        '/quen-mat-khau',
        '/dat-lai-mat-khau',
        '/admin/dang-nhap'
      ];
      
      // Kiểm tra đường dẫn hiện tại
      const currentPath = route.path;
      
      // Nếu đường dẫn là một trong các route cần ẩn chatbot, trả về false
      for (const hidePath of hideChatbotRoutes) {
        if (currentPath.startsWith(hidePath)) {
          return false;
        }
      }
      
      // Đối với các trang admin, không hiển thị chatbot
      if (currentPath.startsWith('/admin')) {
        return false;
      }
      
      // Các trang khác, hiển thị chatbot
      return true;
    });
    
    return {
      shouldShowChatbot
    };
  }
};
</script> 