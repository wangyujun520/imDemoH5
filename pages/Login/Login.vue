<template>
	<view class="content px-5">
		<!-- 占位 -->
		<view class="status_bar"></view>
		<view class="flex flex-column">
			<view class="my-3 flex flex-column align-center justify-center">
				<image src="/static/img/logo.png" class="my-5" style="width: 200rpx;height: 200rpx;border: 0px solid red;"></image>
				<text style="font-size: 40rpx;font-weight: bold;margin-top: -20rpx;">欢迎使用 安居邦</text>
			</view>
			<text class="mt-5" style="font-size: 28rpx;font-weight: bold;">手机号</text>
			<u-input v-model="phone" class="border-bottom" maxlength="11" placeholder="请输入手机号" type="number"></u-input>
			<text v-if="LoginState == 0" class="mt-5" style="font-size: 28rpx;font-weight: bold;">密码</text>
			<view v-if="LoginState == 0" class="position-relative">
				<u-input v-model="pwd" class="border-bottom" placeholder="请输入密码" type="password"></u-input>
			</view>
			<text v-if="LoginState == 1" class="mt-5" style="font-size: 28rpx;font-weight: bold;">验证码</text>
			<view v-if="LoginState == 1" class="position-relative">
				<u-input v-model="SmsCode" class="border-bottom " maxlength="6" placeholder="请输入验证码" type="number"></u-input>
				<u-button
					@tap="getCode"
					style="position: absolute;right: 0;top: 0;"
					type="success"
					size="mini"
					:disabled="!isSendCode || CodeState"
				>{{CodedText}}</u-button>
			</view>
			
			<view @tap="Login" class="flex align-center justify-center mt-5" style="height: 90rpx;background-color: #FF9900;border-radius: 40rpx;">
			<!-- <view @tap="testLogin" class="flex align-center justify-center mt-5" style="height: 90rpx;background-color: #FF9900;border-radius: 40rpx;"> -->
				<text style="color: #FFFFFF;font-size: 30rpx;">登录</text>
			</view>
			<view class="flex justify-between align-center mt-5">
				<text @tap="skipCodeLogin" v-if="LoginState == 0" style="color: #4098A6;font-size: 28rpx;font-weight: bold;">手机号登录</text>
				<text @tap="skipPwd" v-if="LoginState == 1" style="color: #4098A6;font-size: 28rpx;font-weight: bold;">密码登录</text>
				<view class="flex align-center" v-if="LoginState == 0">
					<text @tap="skipForgetPassword" style="color: #FF9900;font-size: 28rpx;font-weight: bold;">忘记密码？</text>
				</view>
				<view v-if="LoginState == 1">
					<text style="font-size: 24rpx;color: #888;">未注册手机验证后自动注册</text>
				</view>
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
		<u-modal v-model="showModal" :content="content" :show-cancel-button="true" confirm-text="设置" cancel-text="稍后设置" @confirm="SetNewPwd" @cancel="GoHome"></u-modal>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			LoginState:0 ,//0表示密码登录 1表示验证码登录
			phone:'',
			pwd: '',//密码
			// phone: '16666666601',//未认证账号
			// phone: '15882182484',//王玉军（会员）
			// phone: '13385252419',//王玉军（新注册账号）
			// phone: '17360056365',//马叶根（设计师、销售）
			// phone: '16666666601',//张伟（设计师2）
			// phone: '16666666604',//王丽(监理)
			// phone: '16666666608',//陈佳宜（工人1）
			// phone: '16666666609',//郭山彤（工人2）
			// phone: '18302886913',//钱飞龙（设计师、销售）
			// phone: '18696703860',//晓东（商铺）
			// phone: '18888888888',//上架专用
			// pwd: '123456',//密码
			SmsCode:null,//验证码
			isSendCode:false,//校验手机号码正则表达式
			CodedText: '获取验证码',
			CodeTime:60,//验证码倒计时（默认60s）
			CodeState: false,//第一次验证码是否发送成功
			getSmsCode:false,//
			CodeColor:false,//验证码颜色
			showModal:false,//初始化密码提示
			content:'当前未设置密码，是否设置新密码？',
			tempData:null,
			list:{
				checked:false
			}
		};
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
		},
		isSDKReady(val) {
			console.log(val);
			if (val) {
				this.GoHomePage();
			}
		}
	},
	computed: {
		...mapState({
			isLogin: state => state.im.isLogin,
			isSDKReady: state => state.im.isSDKReady
		})
	},
	onShow() {
		if (/^1[3456789]\d{9}$/.test(this.phone)) {
			// console.log("手机号正确")
			this.isSendCode = true;
		}else{
			// console.log("手机号错误")
			this.isSendCode = false;
		}
		// IOS兼容
		// 单页面调用5+ Api
		// 是否支持屏幕左边滑动关闭当前页面。默认是可关闭。设为none则不响应左滑动画
		// #ifdef APP-PLUS
		var page = this.$mp.page.$getAppWebview();
		page.setStyle({
			popGesture: 'none'
		});
		// #endif
	},
	methods: {
		GetGeTuiToken() {
			// console.log(plus.push.getClientInfo().clientid)
			// {
			// 	"id": "unipush",
			// 	"token": "2f5198311c70a2b3e9971438f6ff5bf5",
			// 	"clientid": "2f5198311c70a2b3e9971438f6ff5bf5",
			// 	"appid": "zDUz4ZRTTA99XCM41DwZR6",
			// 	"appkey": "v6yyrNCqnAAvLuWi3BbRd8"
			// }
			// return;
			
			let appkey = plus.push.getClientInfo().appkey;
			let timestamp = new Date().getTime(); //获取当前时间戳毫秒 1611916583700
			let MasterSecret = "Qyp3sky9Fi8QQA17P2rTrA";
			// sign 签名，加密算法: SHA256，格式: sha256(appkey+timestamp+mastersecret)
			var sha256 = appkey + timestamp + MasterSecret;
			var sign = this.CryptoJS.SHA256(sha256).toString();
			var postDatas = {
				"sign": sign,
				"timestamp": timestamp,
				"appkey": appkey
			}
			// console.log(JSON.stringify(postDatas))
			// 调用ajax获取token
			uni.request({
				// 个推开放平台接口前缀(BaseUrl): https://restapi.getui.com/v2/$appId，其中appId为用户创建应用时生成的应用唯一标识
				url: 'https://restapi.getui.com/v2/zDUz4ZRTTA99XCM41DwZR6/auth', //获取鉴权token
				data: postDatas,
				method: 'POST',
				header: {
					'content-type': 'application/json;charset=utf-8' //自定义请求头信息
				},
				success: (res) => {
					console.log('GeTuiToken:',res)
					
					uni.setStorageSync('GeTuiToken', res.data.data.token);
				}
			});
		},
		// 跳转到用户协议
		skipUserAgreement(){
			let name = '用户服务协议';
			let url = 'http://www.anjubang.cn/contents/21/64.html';
			// #ifdef H5
				window.location.href = url;
			// #endif
			// #ifdef APP-PLUS
				// 跳转到内部窗口并且传递链接
				uni.navigateTo({
					url: `/pages/webview/webview?url=${url}&title=${name}`
				})
			// #endif
		},
		// 跳转到隐私政策
		skipPrivacyPolicy(){
			let name = '隐私政策';
			let url = 'http://www.anjubang.cn/contents/20/60.html';
			// #ifdef H5
				window.location.href = url;
			// #endif
			// #ifdef APP-PLUS
				// 跳转到内部窗口并且传递链接
				uni.navigateTo({
					url: `/pages/webview/webview?url=${url}&title=${name}`
				})
			// #endif
		},
		// 跳转到设置新密码
		SetNewPwd(){
			uni.setStorageSync('token',this.tempData.data.token);//设置token
			// this.tempData = {"code":200,"msg":"登录成功","data":{"sign":"eJw1zFELgjAUhuH-suuw486mTuhSqQgKjALvhC05iDWm6CL675nZ5fd88L7Y*VAEg3EsZTwAtpo3aXPv6UYzhygw4agiUMvd6aayljRLQwEg4hgBfo-xlpyZXErJ4a89tV*LuMIkQRUvFaqn*rbhxW7fu6Frs2NeX7z2JyzlWNHz*lDVaLlb55GVpc827P0BntYyWw__","token":"6c04d252-6902-4b4c-8cd2-845134290409","name":"用户3689989994","user_name":null,"id":"10e01791-f108-4af8-8d03-094bb663e740","phone":"13438239609","ispwd":false,"header":"//seller/nopic.png"}};
			uni.navigateTo({
				url:'/pages/Login/SetNewPwd?item='+encodeURIComponent(JSON.stringify(this.tempData.data))
			})
		},
		// 跳转到首页
		GoHome(){
			// 腾讯云IM登录
			// 用户1
			let promise = this.$tim.login({
				userID: this.tempData.data.mobile,
				userSig:this.tempData.data.sign
			});
			promise.then(res => {
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
				// 登录失败的相关信息
				uni.showToast({
					icon: 'none',
					title: err,
					duration: 1500
				});
			});
		},
		// 获取验证码
		getCode(){
			// console.log("点击事件")
			if(this.isSendCode && !this.CodeState){
				console.log("发送验证码")
				// 获取手机验证码
				let RequrestData = {
					"mobile": this.phone //手机号
				};
				console.log(JSON.stringify(RequrestData))
				this.$login(this.$url.User.SendSms, RequrestData,{
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
		// 重新发送
		Resend(){
			if(this.CodeColor){
				// 获取手机验证码
				let RequrestData = {
					"mobile": this.phone //手机号
				};
				console.log(JSON.stringify(RequrestData))
				this.$login(this.$url.User.SendSms, RequrestData,{
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
		// 忘记密码
		skipForgetPassword(){
			uni.navigateTo({
				url:'/pages/Login/ForgetPassword'
			})
		},
		// 验证码登录
		skipCodeLogin(){
			this.LoginState = 1;
		},
		// 密码登录
		skipPwd(){
			this.LoginState = 0;
		},
		testLogin(){
			// 腾讯云IM登录
			let promise = this.$tim.login({
				userID: 'OrderMessage',
				userSig:'eJwtzE0LgkAUheH-MttC7gxeTaGF0CLIaKHQWpwPrtWkMxZl9N8zdXmeF86HlXkRPJVjKRMBsPW0SSrbk6aJT04qd1TeV0Yt3ctL1bYkWcpDgHCTcC7mol4tOTU6IgoAmLWn298ijJIwFrioJzPek61rtJx3d6932ZDVxVvnVztA6Y2Lk2i-6sT50DxQmy37-gD6OjSk'
			});
			promise.then(res => {
				console.log(JSON.stringify(res))
				if (res.data.actionStatus == 'OK') {
					//登录成功后 更新登录状态
					this.$store.commit('toggleIsLogin', true);
					// 跳转到消息页面
					uni.switchTab({
						url: '/pages/tabbar/message/message'
					});
				} else {
					setTimeout(()=>{
						uni.showToast({
							icon: 'none',
							title: res.data.errorInfo,
							duration: 2000
						});
					},10)
				}
			}).catch(err => {
				// 跳转到消息页面
				// uni.switchTab({
				// 	url: '/pages/tabbar/message/message'
				// });
				uni.showToast({
					icon: 'none',
					title: err,
					duration: 1500
				});
			});
		},
		// 登录
		Login() {
			// LoginState:0 //0表示密码登录 1表示验证码登录
			// test写死
			let userInfo = {
				user: '帅气的军哥',
				userId: '15882182484',
				img: 'http://oss.anjubang.cn/Anjubang/2022/07/2022070516569506786640.jpg?x-oss-process=style/small',
				userSig: 'eJwtzMEKgkAUheF3mW1hd8a5cRVcSURQGJWbdsWMeotkMjMjevdMXZ7vwP8Rh-Xea2wlQqE8ENN*s7FlzRn3LJFISVKa9Hg-zPXkHBsRSg2gKZBSDY9tHVe2c0RUADBozbe-zTFA8n2FY4Xzrk5Y2Ps5iOEdX17sZhvnp7vULp9tTc0xLyeF3i6SLMndKhLfH4-UMf0_'
			}
			uni.setStorageSync('userInfo', userInfo)
			//密码登录
			if(this.LoginState == 0){
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
				if(this.pwd==null||this.pwd==''){
					uni.showToast({
						title: '请输入密码',
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
				// console.log("密码登录")
				
				// 账号密码登录
				let RequrestData = {
					"account": this.phone, //手机号
					"password": this.pwd //密码
				};
				this.$login(this.$url.User.UserLogin, RequrestData,{
					isLoading:true,
					loadingTitle:'登录中...'
				}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200){
						uni.setStorageSync('token',res.data.token);//设置token
						uni.setStorageSync('avatar',res.data.header);//设置头像
						uni.setStorageSync('nickname',res.data.nick);//设置昵称
						uni.setStorageSync('name',res.data.name);//设置姓名
						uni.setStorageSync('rankno',res.data.catalog);//职级编号
						uni.setStorageSync('rank',res.data.catalog_text);//设置职级
						uni.setStorageSync('sign',res.data.sign);//腾讯sign
						uni.setStorageSync('phone',this.phone);//登录手机号
						this.$store.commit('UpdateMyUserID', this.phone);
						// 更新IM的头像和昵称
						
						// // #ifdef APP-PLUS
						// this.GetGeTuiToken();//更新个推信息
						// // #endif
						
						// 腾讯云IM登录
						let promise = this.$tim.login({
							userID: res.data.mobile,
							userSig:res.data.sign
						});
						promise.then(res => {
							console.log(JSON.stringify(res))
							if (res.data.ActionStatus == 'OK') {
								//登录成功后 更新登录状态
								this.$store.commit('toggleIsLogin', true);
								// 跳转到消息页面
								// uni.switchTab({
								// 	url: '/pages/tabbar/message/message'
								// });
							} else {
								setTimeout(()=>{
									uni.showToast({
										icon: 'none',
										title: res.data.errorInfo,
										duration: 2000
									});
								},10)
							}
						}).catch(err => {
							// 跳转到消息页面
							// uni.switchTab({
							// 	url: '/pages/tabbar/message/message'
							// });
							uni.showToast({
								icon: 'none',
								title: err,
								duration: 1500
							});
							// console.warn('login error:', err); // 登录失败的相关信息
						});
					}
				});
				
			}
			//验证码登录
			if(this.LoginState == 1){
				// 非空校验
				if(!this.getSmsCode){
					uni.showToast({
						title: '请获取验证码',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
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
					"mobile": this.phone, //手机号
					"code": this.SmsCode ,//短信验证码
					"area_code":''
				}
				console.log(JSON.stringify(RequrestData))
				this.$login(this.$url.User.SmsLogin, RequrestData,{
					isLoading:true
				}).then(res => {
					console.log(JSON.stringify(res))
					if(res.code == 200){
						//判断是否初始化密码
						if(res.data.ispwd){
							uni.setStorageSync('token',res.data.token);//设置token
							uni.setStorageSync('avatar',res.data.header);//设置头像
							uni.setStorageSync('nickname',res.data.nick);//设置昵称
							uni.setStorageSync('name',res.data.name);//设置姓名
							uni.setStorageSync('rankno',res.data.catalog);//职级编号
							uni.setStorageSync('rank',res.data.catalog_text);//设置职级
							uni.setStorageSync('sign',res.data.sign);//腾讯sign
							uni.setStorageSync('phone',this.phone);//登录手机号
							this.$store.commit('UpdateMyUserID', this.phone);
							// 腾讯云IM登录
							
							// // #ifdef APP-PLUS
							// this.GetGeTuiToken();//更新个推信息
							// // #endif
							
							// 用户1
							let promise = this.$tim.login({
								userID: res.data.mobile,
								userSig:res.data.sign
							});
							console.log(JSON.stringify(promise))
							promise.then(res => {
								if (res.data.actionStatus == 'OK') {
									//登录成功后 更新登录状态
									this.$store.commit('toggleIsLogin', true);
									// 跳转到消息页面
									// uni.switchTab({
									// 	url: '/pages/tabbar/message/message'
									// });
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
						}else{
							// 提示初始密码弹框
							this.showModal = true;
							this.tempData = res;
						}
						
					}
				});
				
			}
		},
		// 跳转到首页（车位界面）
		GoHomePage(){
			let updateInfo = {}
			// #ifdef H5
			updateInfo = {
				nick: uni.getStorageSync('nickname'),//更新昵称
				avatar: uni.getStorageSync('avatar'),//更换IM头像
				profileCustomField: [
					{
						key: 'Tag_Profile_Custom_Rank',
						value: uni.getStorageSync('rank')
					}
				]
			}
			// #endif
			
			// #ifdef APP-PLUS
			updateInfo = {
				nick: uni.getStorageSync('nickname'),//更新昵称
				avatar: uni.getStorageSync('avatar'),//更换IM头像
				profileCustomField: [
					{
						key: 'Tag_Profile_Custom_ClientID',
						value: plus.push.getClientInfo().clientid
					},
					{
						key: 'Tag_Profile_Custom_Rank',
						value: uni.getStorageSync('rank')
					}
				]
			}
			// #endif
			// 更新IM资料
			console.log(JSON.stringify(updateInfo));
			// 修改个人标配资料
			let promise = getApp().$tim.updateMyProfile(updateInfo);
			promise.then(imResponse => {
				console.log(imResponse.data); // 更新资料成功
				// 跳转到消息页面
				uni.switchTab({
					url: '/pages/tabbar/message/message'
				});
			}).catch(imError => {
				console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
			});
			
		}
	}
};
</script>

<style scoped lang="scss">
	.sms-code-no{
		background-color: rgb(192,192,192);
	}
	
	.sms-code-yes{
		background-color: #4098A6;
	}
</style>