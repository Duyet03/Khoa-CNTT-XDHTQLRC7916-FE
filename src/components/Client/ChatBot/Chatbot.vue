<template>
    <div class="chatbot-container" :class="{ 'chatbot-open': isOpen }">
      <!-- Chat button -->
      <button class="chat-toggle-btn" @click="toggleChat">
        <i class="bx" :class="isOpen ? 'bx-x' : 'bx-message-dots'"></i>
      </button>
      
      <!-- Chat window -->
      <div class="chat-window" v-if="isOpen">
        <div class="chat-header">
          <h5>Cinema Assistant</h5>
        </div>
        
        <div class="chat-messages" ref="messagesContainer">
          <div v-for="(message, index) in messages" :key="index" 
               :class="['message', message.sender === 'user' ? 'user-message' : 'bot-message']">
            <div class="message-content" v-html="message.text"></div>
          </div>
          <div v-if="isLoading" class="message bot-message">
            <div class="message-content typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
        
        <div class="chat-input">
          <input 
            type="text" 
            v-model="userInput" 
            @keyup.enter="sendMessage" 
            placeholder="Hỏi về phim, lịch chiếu, đặt vé..."
          />
          <button @click="sendMessage">
            <i class="bx bx-send"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isOpen: false,
        messages: [
          { text: 'Xin chào! Tôi là trợ lý ảo của Cinema. Tôi có thể giúp gì cho bạn?', sender: 'bot' }
        ],
        userInput: '',
        isLoading: false,
        userId: null,
        isLoggedIn: false
      };
    },
    
    mounted() {
      const userId = localStorage.getItem('id_khach_hang');
      this.userId = userId || 'guest';
      this.isLoggedIn = !!userId;

      // Chỉ tự động đề xuất phim khi đã đăng nhập
      if (this.isLoggedIn) {
        setTimeout(() => {
          this.getMovieSuggestions();
        }, 1000);
      } else {
        this.messages = [
          { text: 'Vui lòng đăng nhập để sử dụng tính năng chat với trợ lý ảo.', sender: 'bot' }
        ];
      }
    },
    
    methods: {
      toggleChat() {
        if (!this.isLoggedIn) {
          this.$swal({
            title: 'Yêu cầu đăng nhập',
            text: 'Vui lòng đăng nhập để sử dụng tính năng chat',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập ngay',
            cancelButtonText: 'Đóng'
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push('/login');
            }
          });
          return;
        }

        this.isOpen = !this.isOpen;
        if (this.isOpen) {
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        }
      },
      
      async sendMessage() {
        if (!this.isLoggedIn) {
          return;
        }

        if (!this.userInput.trim()) return;
        
        // Thêm tin nhắn người dùng
        this.messages.push({
          text: this.userInput,
          sender: 'user'
        });
        
        this.isLoading = true;
        this.scrollToBottom();
        
        try {
          let response;
          
          // Kiểm tra nếu là yêu cầu xem lịch sử đặt vé
          if (this.userInput.toLowerCase().includes('lịch sử') && 
              (this.userInput.toLowerCase().includes('đặt vé') || this.userInput.toLowerCase().includes('hóa đơn'))) {
            response = await axios.post('http://127.0.0.1:8000/api/chatbot/view-bill-history', {
              userId: this.userId
            });
          } else {
            // Gửi câu hỏi đến API mặc định
            response = await axios.post('http://127.0.0.1:8000/api/chatbot/query', {
              message: this.userInput,
              userId: this.userId
            });
          }
          
          // Hiển thị phản hồi
          this.isLoading = false;
          this.messages.push({
            text: response.data.message,
            sender: 'bot'
          });
          
          this.scrollToBottom();
        } catch (error) {
          console.error('Chatbot error:', error);
          this.isLoading = false;
          this.messages.push({
            text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
            sender: 'bot'
          });
        }
        
        this.userInput = '';
      },
  
      async getMovieSuggestions() {
        this.isLoading = true;
        
        try {
          const response = await axios.get(`http://127.0.0.1:8000/api/chatbot/suggest-movies?userId=${this.userId}`);
          
          this.isLoading = false;
          this.messages.push({
            text: response.data.message,
            sender: 'bot'
          });
          
          this.scrollToBottom();
        } catch (error) {
          console.error('Movie suggestion error:', error);
          this.isLoading = false;
        }
      },
      
      scrollToBottom() {
        this.$nextTick(() => {
          if (this.$refs.messagesContainer) {
            this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight;
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
  }
  
  .chat-toggle-btn {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #1976d2;
    color: white;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  
  .chat-toggle-btn i {
    font-size: 24px;
  }
  
  .chat-window {
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 350px;
    height: 500px;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .chat-header {
    padding: 15px;
    background-color: #1976d2;
    color: white;
  }
  
  .chat-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
  }
  
  .message {
    margin-bottom: 15px;
    display: flex;
  }
  
  .user-message {
    justify-content: flex-end;
  }
  
  .bot-message {
    justify-content: flex-start;
  }
  
  .message-content {
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 80%;
  }
  
  .user-message .message-content {
    background-color: #1976d2;
    color: white;
    border-bottom-right-radius: 4px;
  }
  
  .bot-message .message-content {
    background-color: #f1f1f1;
    color: #333;
    border-bottom-left-radius: 4px;
  }
  
  .bot-message .message-content a {
    color: #1976d2;
    text-decoration: none;
  }
  
  .chat-input {
    display: flex;
    padding: 10px;
    border-top: 1px solid #eee;
  }
  
  .chat-input input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
  }
  
  .chat-input button {
    margin-left: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #1976d2;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Typing animation */
  .typing span {
    width: 8px;
    height: 8px;
    background: #666;
    display: inline-block;
    border-radius: 50%;
    margin: 0 2px;
    animation: bounce 1.3s infinite;
  }
  
  .typing span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }
  </style>