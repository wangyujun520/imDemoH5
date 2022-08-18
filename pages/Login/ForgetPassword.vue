<template>
	<view class="content">
		<view class="px-5 pt-5 position-relative">
			<input v-model="phone" type="number" maxlength="11" placeholder="请输入手机号" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<input v-model="SmsCode" class="mt-3" type="number" maxlength="20"  placeholder="请输入验证码" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<input v-model="Password" class="mt-3" type="password" maxlength="16" placeholder="请输入6-16位密码" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<input v-model="ConfirmPassword" class="mt-3" type="password" maxlength="16" placeholder="请再次确认密码" style="border-bottom: 2px solid rgba(187,187,187,0.3);height: 90rpx;font-size: 30rpx;"/>
			<!-- <text class="position-absolute text-white px-3" style="background-color: #4098A6;right: 50rpx;top: 180rpx;padding-top: 15rpx;padding-bottom: 15rpx;">获取验证码</text> -->
			
			<text v-if="!CodeState" @tap="SendSmsCode" :class="isSendCode?'sms-code-yes':'sms-code-no'" class="position-absolute text-white px-3 rounded" style="right: 50rpx;top: 180rpx;padding-top: 15rpx;padding-bottom: 15rpx;">获取验证码</text>
			<text v-else @tap="Resend" :class="CodeColor?'sms-code-yes':'sms-code-no'" class="position-absolute text-white px-3 rounded sms-code-no" style="right: 50rpx;top: 180rpx;padding-top: 15rpx;padding-bottom: 15rpx;">{{CodedText}}</text>
			
			<button @tap="Register" class="text-white my-5" style="background-color: #FF9900;font-size: 34rpx;">重置密码</button>
		</view>
		
		<u-modal v-model="showModal" :content="content" confirm-text="确定" cancel-text="稍后设置" @confirm="Confirm"></u-modal>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			showModal:false,
			content:'密码重置成功',
			phone:null,//手机号
			SmsCode:null,//验证码
			
			isSendCode:false,//校验手机号码正则表达式
			CodedText: '获取验证码',
			CodeTime:60,//验证码倒计时（默认60s）
			CodeState: false,//第一次验证码是否发送成功
			CodeColor:false,//验证码颜色
			
			Password: null, //密码
			ConfirmPassword: null//确认密码
		};
	},
	watch: {
		phone(val) {
			// console.log(val);
			//手机正则表达式
			if (/^1[3456789]\d{9}$/.test(val)) { 
				// console.log("手机号正确")
				this.isSendCode = true;
			}else{
				// console.log("手机号错误")
				this.isSendCode = false;
			}
		}
	},
	methods: {
		Confirm(){
			// 密码重置成功，返回首页
			uni.reLaunch({
			    url: '/pages/Login/Login'
			});
		},
		// 发送验证码
		SendSmsCode(){
			if(this.isSendCode){
				console.log("发送验证码")
				// 获取手机验证码
				let RequrestData = {
					"mobile": this.phone //手机号
				};
				console.log(JSON.stringify(RequrestData))
				this.$post(this.$url.User.SendSms, RequrestData,{
					isLoading:true
				}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200){
						//验证码获取成功
						uni.showToast({
							title: '验证码已发送请注意查收', //显示内容
							duration: 3000, //显示时间
							icon: 'none', //不显示图标
							position: 'center' //居中显示
						});
						this.SendCodetime(this.CodeTime);
					}
				});
			}
		},
		// 发送验证码的方法
		SendCodetime(time) {
			//设置为已发送
			this.CodeState = true;
			this.CodeColor = false;
			let myVar = setInterval(()=> {
				this.CodedText = '重新发送(' + time +'s'+ ')';
				time--;
				if(time<0){
					this.CodeColor = true;
					this.CodedText = '重新发送';
					myStopFunction();//清除定时器
				}
			}, 1000);
			function myStopFunction() {
				clearInterval(myVar);
			}
		},
		// 重新发送
		Resend(){
			if(this.CodeColor){
				// 获取手机验证码
				let RequrestData = {
					"mobile": this.phone //手机号
				};
				console.log(JSON.stringify(RequrestData))
				this.$post(this.$url.User.SendSms, RequrestData,{
					isLoading:true
				}).then(res => {
					// console.log(123)
					console.log(JSON.stringify(res))
					if(res.code == 200){
						//验证码获取成功
						uni.showToast({
							title: '验证码已发送请注意查收', //显示内容
							duration: 3000, //显示时间
							icon: 'none', //不显示图标
							position: 'center' //居中显示
						});
						this.SendCodetime(this.CodeTime);
					}
				});
			}
		},
		// 重置密码
		Register(){
			// 表单校验
			this.FormVerification();
			let RequrestData = {
				"mobile": this.phone ,//手机号
				"password": this.Password, //密码
				"sms_code": this.SmsCode //短信验证码
			};
			console.log(JSON.stringify(RequrestData))
			this.$post(this.$url.User.ForgetPassword, RequrestData,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200){
					// 提示修改成功
					this.showModal = true;
				}
			});
		},
		// 表单校验
		FormVerification(){
			// 非空校验
			if(!this.phone){
				uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			if(!this.SmsCode){
				uni.showToast({
					title: '请输入验证码',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
			// 手机号正则校验
			if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的手机号',
					icon: 'none',
					duration: 2000
				})
				return false;
			}
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
		}
	}
};
</script>

<style lang="scss">
.sms-code-no{
	background-color: rgb(192,192,192);
}

.sms-code-yes{
	background-color: #4098A6;
}
</style>
