<template>
	<view class="content px-5">
		<view class="flex flex-column">
			<!-- <image src="/static/img/logo.png" style="width: 200rpx;height: 200rpx;border: 0px solid red;"></image> -->
			<image src="/static/img/logo2.png" class="my-5" style="width: 227rpx;height: 84rpx;border: 0px solid red;"></image>
			<view class="my-3">
				<text style="font-size: 40rpx;font-weight: bold;">欢迎使用 易安得车位</text>
			</view>
			<text class="mt-5" style="font-size: 28rpx;font-weight: bold;">手机号</text>
			<u-input v-model="phone" class="border-bottom" maxlength="11" placeholder="请输入手机号" type="number"></u-input>
			<text class="mt-5" style="font-size: 28rpx;font-weight: bold;">验证码</text>
			<view class="position-relative">
				<u-input v-model="SmsCode" class="border-bottom " maxlength="6" placeholder="请输入验证码" type="number"></u-input>
				<u-button
					@tap="getCode"
					style="position: absolute;right: 0;top: 0;"
					type="success"
					size="mini"
					:disabled="!isSendCode || CodeState"
				>{{CodedText}}</u-button>
			</view>
			<text class="mt-5" style="color: #999;font-size: 24rpx;">未注册手机号验证后自动创建车位账户</text>
			<view @tap="Login" class="flex align-center justify-center mt-5" style="height: 90rpx;background-color: #06AD55;border-radius: 40rpx;">
				<text style="color: #FFFFFF;font-size: 30rpx;">登录</text>
			</view>
			<view class="flex align-center justify-center position-fixed" style="left:0;bottom: 50rpx;width: 750rpx;border: 0px solid red;">
				<view class="" style="width: 45rpx; height: 45rpx">
					<u-checkbox shape="circle" v-model="list.checked" size="35"></u-checkbox>
				</view>
				<text class="ml-1" style="font-size: 26rpx">
					我已阅读并同意
					<text @tap="skipUserAgreement" style="color: #5787ee">《用户服务协议》</text>
					及
					<text @tap="skipPrivacyPolicy" style="color: #5787ee">《隐私政策》</text>
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			this.ShareList.reg_id = options.reg_id;
			this.ShareList.sale_id = options.sale_id;
			this.ShareList.from = options.from;
			this.ShareList.data_id = options.data_id;
			this.ShareList.title = options.title;
			
			this.share_type = options.share_type;//【1、楼盘详情】【2、车位详情】
			
			if(options.share_type == '2'){
				this.summary = options.summary;
			}
			
		},
		watch: {
			phone(val) {
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
		data(){
			return{
				share_type:'',//【1、楼盘详情】【2、车位详情】
				summary:'',
				ShareList: {
					reg_id: "",
					sale_id: "",
					from: "",
					data_id: "",
					title:""
				},
				CodedText:'获取验证码',
				isSendCode:false,
				CodeState: false,//第一次验证码是否发送成功
				getSmsCode:false,//
				CodeTime:60,
				list:{
					checked:false
				},
				seconds:60,//倒计时总秒数
				changeText:'X秒重新获取',//正在倒计时中的提示
				endText:'重新获取',//倒计时结束时的提示
				phone:'',//手机号
				SmsCode:''//验证码
			}
		},
		methods:{
			// 获取验证码
			getCode(){
				// console.log("点击事件")
				if(this.isSendCode && !this.CodeState){
					console.log("发送验证码")
					// 获取手机验证码
					let RequrestData = {
						"phone": this.phone //手机号
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
							this.isSendCode = false;
							this.CodeState = true;
							this.getSmsCode = true;
							this.SendCodetime(this.CodeTime);
						}
					});
				}
			},
			// 发送验证码的方法
			SendCodetime(time) {
				//设置为已发送
				let myVar = setInterval(()=> {
					this.CodedText = '重新发送(' + time +'s'+ ')';
					time--;
					if(time<0){
						// this.CodeColor = true;
						this.CodedText = '重新发送';
						this.CodeTime = 60;
						myStopFunction();//清除定时器
						this.isSendCode = true;
						this.CodeState = false;
					}
				}, 1000);
				function myStopFunction() {
					clearInterval(myVar);
				}
			},
			// 跳转到用户协议
			skipUserAgreement(){
				// uni.navigateTo({
				// 	url:'/pages/My/About/UserAgreement'
				// })
				let name = '用户服务协议';
				let url = 'http://www.anjubang.cn/contents/21/64.html';
				// 跳转到内部窗口并且传递链接
				uni.navigateTo({
					url: `/pages/webview/webview?url=${url}&title=${name}`
				})
			},
			// 跳转到隐私政策
			skipPrivacyPolicy(){
				// uni.navigateTo({
				// 	url:'/pages/My/About/PrivacyPolicy'
				// })
				let name = '隐私政策';
				let url = 'http://www.anjubang.cn/contents/20/60.html';
				// 跳转到内部窗口并且传递链接
				uni.navigateTo({
					url: `/pages/webview/webview?url=${url}&title=${name}`
				})
			},
			Login(){
				// 非空校验
				if(this.phone==null||this.phone==''){
					uni.showToast({
						title: '请输入手机号',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if (!/^1[3456789]\d{9}$/.test(this.phone)) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(!this.getSmsCode){
					uni.showToast({
						title: '请获取验证码',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if(this.SmsCode==null||this.SmsCode==''){
					uni.showToast({
						title: '请输入验证码',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				if (!this.list.checked) {
					uni.showToast({
						title: '请先阅读协议',
						icon: 'none'
					});
					return;
				}
				// 手机号验证码登录
				let RequrestData = {
					phone: this.phone, //手机号
					code: this.SmsCode ,//短信验证码
					reg_id: this.ShareList.reg_id,//注册推荐人id
					sale_id: this.ShareList.sale_id,//销售人id
					from: this.ShareList.from,//来源；
					data_id: this.ShareList.data_id//内容id
				}
				this.$post(this.$url.User.SmsLogin, RequrestData,{
					isLoading:true
				}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200){
						// 跳转到楼盘分享页面
						uni.navigateTo({
							url:'/pages/SharePage/RealEstateSharing?title='+this.ShareList.title+'&summary='+this.summary+'&share_type='+this.share_type
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	
</style>