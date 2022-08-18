<template>
	<view class="content">
		<view class="px-5 position-relative">
			<input class="mt-3" v-model="Password" type="password" maxlength="16" placeholder="请输入6-16位密码" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<input class="mt-3" v-model="ConfirmPassword" type="password" maxlength="16" placeholder="请再次确认密码" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<button @tap="Register" class="text-white my-5" style="background-color: #FF9900;font-size: 34rpx;">设置初始密码</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Password: '', //密码
			ConfirmPassword: '' ,//确认密码
			tempData:''
		};
	},
	methods: {
		// 初始化密码
		Register(){
			console.log(this.Password.length)
			// 表单校验
			this.FormVerification();
			// 手机号验证码登录
			let RequrestData = {
				"mobile": this.tempData.mobile, //手机号
				"password": this.Password //新密码
			}
			console.log(JSON.stringify(RequrestData))
			this.$post(this.$url.User.SmsUpdatePassword, RequrestData,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200){
					uni.showToast({
						title: '密码设置成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(()=>{
						this.UserLogin();
					},2000)
				}
			});
		},
		// 表单校验
		FormVerification(){
			// 非空校验
			if(this.Password==null||this.Password==''){
				uni.showToast({
					title: '请输入密码',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			if(this.ConfirmPassword==null||this.ConfirmPassword==''){
				uni.showToast({
					title: '请输入确认密码',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			// 判断密码长度
			if(this.Password.length < 6 || this.Password.legth > 16){
				uni.showToast({
					title: '密码长度不正确',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			if(this.ConfirmPassword.length < 6 || this.ConfirmPassword.legth > 16){
				uni.showToast({
					title: '确认密码长度不正确',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			// 判断两次密码是否一致
			if(this.Password != this.ConfirmPassword){
				uni.showToast({
					title: '两次密码输入不一致',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
		},
		// 用户登录
		UserLogin(){
			// 腾讯云IM登录
			// 用户1
			let promise = this.$tim.login({
				userID: this.tempData.mobile,
				userSig:this.tempData.sign
			});
			promise.then(res => {
				uni.setStorageSync('rankno',res.data.catalog);//职级编号
				uni.setStorageSync('phone',res.data.mobile);//登录手机号
				
				//登录成功后 更新登录状态
				this.$store.commit('toggleIsLogin', true);
				if (res.data.actionStatus == 'OK') {
					// 跳转到消息页面
					uni.switchTab({
						url: '/pages/tabbar/message/message'
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.data.errorInfo,
						duration: 1500
					});
				}
			}).catch(err => {
				uni.showToast({
					icon: 'none',
					title: err,
					duration: 1500
				});
			});
		}
	},
	onLoad(options) {
		this.tempData = JSON.parse(decodeURIComponent(options.item));
		console.log(this.tempData)
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}

.btn {
	padding: 0px 20px;
}
.btn button {
	background-color: #4098a6;
}

</style>
