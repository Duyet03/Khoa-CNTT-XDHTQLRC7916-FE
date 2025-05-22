<template>
	<div class="floating-chatbot">
		<!-- Chat bubble button -->
		<button @click="toggleChat" class="chat-bubble" :class="{ 'expanded': isOpen }">
			<i v-if="!isOpen" class="bx bxs-message-rounded-dots"></i>
			<i v-else class="bx bx-x"></i>
			<span class="notification-badge" v-if="!isOpen && hasNewMessage">1</span>
		</button>

		<!-- Chat window -->
		<div class="chat-window" :class="{ 'open': isOpen }">
			<!-- Header -->
			<div class="chat-header1">
				<div class="header-left">
					<div class="avatar">
						<i class="bx bx-bot"></i>
					</div>
					<div class="header-info">
						<div class="header-title">Cinema Assistant</div>
						<div class="header-status">
							<div class="status-dot"></div>
							<span>Online</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Messages -->
			<div class="chat-messages" ref="messagesContainer">
				<div v-for="(message, index) in messages" :key="index"
					:class="['message', message.sender === 'user' ? 'user-message' : 'bot-message']">
					<div class="message-content" v-html="message.text"></div>
					<div class="message-time" v-if="message.time">{{ message.time }}</div>
				</div>
				<div v-if="isLoading" class="message bot-message">
					<div class="message-content typing">
						<span></span><span></span><span></span>
					</div>
				</div>

				<!-- Quick actions - Hiển thị khi chưa có tin nhắn người dùng -->
				<div v-if="!messages.some(m => m.sender === 'user') && isLoggedIn" class="quick-actions">
					<div class="quick-title">Câu hỏi phổ biến:</div>
					<div class="quick-buttons">
						<button @click="handleQuickAction('Phim đang chiếu')" class="quick-btn">
							<i class="bx bx-movie-play"></i>
							<span>Phim đang chiếu</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Input -->
			<div class="chat-input">
				<input type="text" v-model="userInput" @keyup.enter="sendMessage"
					placeholder="Hỏi về phim, lịch chiếu, đặt vé..." />
				<button @click="sendMessage" :disabled="!userInput.trim()" class="send-btn">
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
			hasNewMessage: false,
			messages: [],
			userInput: '',
			isLoading: false,
			userId: null,
			isLoggedIn: false
		};
	},

	mounted() {
		// Kiểm tra đăng nhập khi component được tạo
		const userId = localStorage.getItem('id_khach_hang');
		this.userId = userId || 'guest';
		this.isLoggedIn = !!userId;

		// Chỉ tự động đề xuất phim nếu đã đăng nhập
		if (this.isLoggedIn) {
			setTimeout(() => {
				this.getMovieSuggestions();
				this.hasNewMessage = true;
			}, 2000);
		}
	},

	methods: {
		toggleChat() {
			if (!this.isLoggedIn) {
				// Hiển thị thông báo yêu cầu đăng nhập
				this.$swal({
					title: 'Yêu cầu đăng nhập',
					text: 'Vui lòng đăng nhập để sử dụng tính năng chat',
					icon: 'info',
					showCancelButton: true,
					confirmButtonText: 'Đăng nhập ngay',
					cancelButtonText: 'Đóng'
				}).then((result) => {
					if (result.isConfirmed) {
						// Chuyển hướng đến trang đăng nhập
						this.$router.push('/login');
					}
				});
				return;
			}

			this.isOpen = !this.isOpen;
			if (this.isOpen) {
				this.hasNewMessage = false;
				// Thêm tin nhắn chào mừng khi mở chatbot
				if (this.messages.length === 0) {
					this.messages.push({
						text: `Xin chào! Tôi là Cinema Assistant, tôi có thể giúp bạn:<br>
						- Tìm kiếm thông tin phim<br>
						- Xem lịch chiếu phim<br>
						- Kiểm tra lịch sử đặt vé<br>
						- Và nhiều thông tin khác về rạp phim`,
						sender: 'bot',
						time: this.getCurrentTime()
					});
				}
				this.$nextTick(() => {
					this.scrollToBottom();
				});
			}
		},

		async sendMessage() {
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

			if (!this.userInput.trim()) return;

			// Thêm tin nhắn người dùng
			this.messages.push({
				text: this.userInput,
				sender: 'user',
				time: this.getCurrentTime()
			});

			this.isLoading = true;
			this.scrollToBottom();

			try {
				let response;
				// Lấy lịch sử tin nhắn (bỏ qua tin nhắn hệ thống như lời chào)
				const messageHistory = this.messages
					.filter(msg => !msg.text.includes('Cinema Assistant, tôi có thể giúp bạn'))
					.map(msg => ({
						role: msg.sender === 'user' ? 'user' : 'assistant',
						content: msg.text
					}));

				// Kiểm tra nếu là yêu cầu xem lịch sử đặt vé
				if (this.userInput.toLowerCase().includes('lịch sử') &&
					(this.userInput.toLowerCase().includes('đặt vé') || this.userInput.toLowerCase().includes('hóa đơn'))) {
					response = await axios.post('http://127.0.0.1:8000/api/chatbot/bill-history', {
						userId: this.userId,
						messages: messageHistory
					});
				} else {
					// Gửi câu hỏi đến API mặc định kèm theo lịch sử tin nhắn
					response = await axios.post('http://127.0.0.1:8000/api/chatbot/query', {
						message: this.userInput,
						userId: this.userId,
						messages: messageHistory
					});
				}

				// Hiển thị phản hồi
				this.isLoading = false;
				this.messages.push({
					text: response.data.message,
					sender: 'bot',
					time: this.getCurrentTime()
				});

				this.scrollToBottom();
			} catch (error) {
				console.error('Chatbot error:', error);
				this.isLoading = false;
				this.messages.push({
					text: 'Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.',
					sender: 'bot',
					time: this.getCurrentTime()
				});
			}

			this.userInput = '';
		},

		handleQuickAction(question) {
			if (!this.isLoggedIn) {
				return;
			}

			this.userInput = question;
			this.sendMessage();
		},

		async getMovieSuggestions() {
			if (!this.isLoggedIn) {
				return;
			}

			this.isLoading = true;

			try {
				const response = await axios.get(`http://127.0.0.1:8000/api/chatbot/suggest-movies?userId=${this.userId}`);

				// Thêm tin nhắn gợi ý phim
				this.isLoading = false;
				this.messages.push({
					text: response.data.message,
					sender: 'bot',
					time: this.getCurrentTime()
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
		},

		getCurrentTime() {
			const now = new Date();
			const hours = now.getHours().toString().padStart(2, '0');
			const minutes = now.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		}
	}
};
</script>

<style scoped>
.floating-chatbot {
	position: fixed;
	bottom: 25px;
	right: 30px;
	z-index: 9999;
}

/* Chat Bubble Button */
.chat-bubble {
	width: 60px;
	height: 60px;
	border-radius: 50%;
	background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
	color: white;
	border: 3px solid white;
	cursor: pointer;
	box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	transition: transform 0.3s, background 0.3s;
	margin-bottom: 15px;
	z-index: 9999;
}

.chat-bubble i {
	font-size: 28px;
}

.chat-bubble:hover {
	transform: scale(1.05);
	background: linear-gradient(135deg, #f50914 0%, #d20710 100%);
}

.chat-bubble.expanded {
	background: #333;
	transform: scale(1);
}

.notification-badge {
	position: absolute;
	top: -8px;
	right: -8px;
	background: #007bff;
	color: white;
	font-size: 12px;
	width: 22px;
	height: 22px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-weight: bold;
	border: 2px solid white;
}

/* Chat Window */
.chat-window {
	position: fixed;
	bottom: 100px;
	right: 30px;
	width: 350px;
	height: 450px;
	background-color: #f8f9fa;
	border-radius: 10px;
	box-shadow: 0 5px 30px rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	z-index: 9999;
	visibility: hidden;
	opacity: 0;
	transform: translateY(20px);
	transition: all 0.3s ease;
}

.chat-window.open {
	visibility: visible;
	opacity: 1;
	transform: translateY(0);
}

/* Header */
.chat-header1 {
	padding: 15px;
	background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
	color: white;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.header-left {
	display: flex;
	align-items: center;
}

.avatar {
	width: 38px;
	height: 38px;
	background: linear-gradient(135deg, #e50914 0%, #b20710 100%);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 12px;
}

.avatar i {
	font-size: 20px;
	color: white;
}

.header-info {
	display: flex;
	flex-direction: column;
}

.header-title {
	font-weight: 600;
	font-size: 16px;
}

.header-status {
	display: flex;
	align-items: center;
	font-size: 12px;
	margin-top: 3px;
	color: rgba(255, 255, 255, 0.8);
}

.status-dot {
	width: 8px;
	height: 8px;
	background-color: #4CAF50;
	border-radius: 50%;
	margin-right: 5px;
}

.close-chat-btn {
	background: transparent;
	border: none;
	color: white;
	font-size: 20px;
	cursor: pointer;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	transition: background-color 0.2s;
}

.close-chat-btn:hover {
	background-color: rgba(255, 255, 255, 0.1);
}

/* Messages */
.chat-messages {
	flex: 1;
	padding: 15px;
	overflow-y: auto;
	background-color: #f8f9fa;
}

.message {
	margin-bottom: 15px;
	display: flex;
	flex-direction: column;
	animation: message-appear 0.3s ease;
}

@keyframes message-appear {
	from {
		opacity: 0;
		transform: translateY(10px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.user-message {
	align-items: flex-end;
}

.bot-message {
	align-items: flex-start;
}

.message-content {
	padding: 12px 16px;
	border-radius: 18px;
	max-width: 85%;
	line-height: 1.4;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user-message .message-content {
	background-color: #e50914;
	color: white;
	border-bottom-right-radius: 4px;
}

.bot-message .message-content {
	background-color: white;
	color: #333;
	border-bottom-left-radius: 4px;
}

.bot-message .message-content a {
	color: #e50914;
	text-decoration: none;
	font-weight: 500;
}

.message-time {
	font-size: 11px;
	color: #888;
	margin-top: 4px;
	padding: 0 4px;
}

/* Typing indicator */
.typing span {
	width: 8px;
	height: 8px;
	background: #aaa;
	display: inline-block;
	border-radius: 50%;
	margin: 0 2px;
	animation: bounce 1.3s infinite;
}

.chat-input {
	display: flex;
	padding: 15px;
	background-color: white;
	border-top: 1px solid #eee;
}

.chat-input input {
	flex: 1;
	padding: 10px 15px;
	border: 1px solid #ddd;
	border-radius: 20px;
	outline: none;
	font-size: 14px;
	transition: border-color 0.2s;
}

.chat-input input:focus {
	border-color: #e50914;
}

.send-btn {
	margin-left: 10px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #e50914;
	color: white;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: background-color 0.2s;
}

.send-btn:hover {
	background-color: #c80812;
}

.send-btn:disabled {
	background-color: #ccc;
	cursor: not-allowed;
}

/* Mobile styles */
@media (max-width: 768px) {
	.chat-window {
		width: 100%;
		height: 100%;
		bottom: 0;
		right: 0;
		left: 0;
		border-radius: 0;
	}

	.chat-bubble {
		width: 55px;
		height: 55px;
	}

	.floating-chatbot {
		bottom: 15px;
		right: 15px;
	}
}

/* Quick actions */
.quick-actions {
	margin-top: 10px;
	padding: 10px 0;
}

.quick-title {
	font-size: 13px;
	color: #666;
	margin-bottom: 10px;
	font-weight: 500;
}

.quick-buttons {
	display: flex;
	flex-direction: column;
	gap: 8px;
}

.quick-btn {
	background-color: white;
	border: 1px solid #ddd;
	border-radius: 18px;
	padding: 10px 15px;
	font-size: 13px;
	cursor: pointer;
	display: flex;
	align-items: center;
	transition: all 0.2s;
	text-align: left;
}

.quick-btn i {
	font-size: 17px;
	margin-right: 8px;
	color: #0078ff;
}

.quick-btn:hover {
	background-color: #f0f0f0;
	border-color: #ccc;
}
</style>