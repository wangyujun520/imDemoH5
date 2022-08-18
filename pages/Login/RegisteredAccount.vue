<template>
	<view class="content" @touchmove.stop.prevent="moveHandle">
		<view class="login-form" style="border: 0px solid red;padding: 0px 15px;padding-top: 15px;">
			<view class="username-box" style="border-bottom: 1px solid #c5ebfb;height:35px;">
				<view class="user-left" style="float: left;width: 40px;border: 0px solid red;height: 100%;text-align: center;line-height: 35px;">
					<i class="iconfont" style="font-size: 24px;color: #4098A6;">&#xe611;</i>
				</view>
				<view class="user-right" style="float: left;width: calc(100% - 40px);border: 0px solid red;height: 100%;position: relative;">
					<input
						type="text"
						v-model="Account"
						:focus="Focus"
						@input="inputOne"
						@focus="focusOne"
						@blur="blurOne"
						class="uni-input"
						maxlength="18"
						placeholder="请输入账号/手机号"
						style="line-height: 35px;border: 0px solid red;height: 100%;width: 100%;font-size: 16px;position: absolute;"
					/>
					<i v-show="CleanUp" class="iconfont" @click="clean" style="position: absolute;right: 0; top: 6px;color: #D1D1D1;font-size: 16px;">&#xe618;</i>
				</view>
			</view>

			<view class="username-box" style="border-bottom: 1px solid #c5ebfb;height:35px;margin-top: 15px;">
				<view class="user-left" style="float: left;width: 40px;border: 0px solid red;height: 100%;text-align: center;line-height: 35px;">
					<i class="iconfont" style="font-size: 24px;color: #4098A6;">&#xe658;</i>
				</view>
				<view class="user-right" style="float: left;width: calc(100% - 40px);border: 0px solid red;height: 100%;position: relative;">
					<input
						type="text"
						maxlength="6"
						v-model="VerificationCode"
						@focus="focusOne1"
						@blur="blurOne1"
						:focus="FocusVerificationCode"
						@input="inputFour"
						placeholder="请输入验证码"
						style="line-height: 35px;border: 0px solid red;height: 100%;font-size: 16px;position: absolute;"
					/>
					<i v-show="CleanUp3" class="iconfont" @click="cleanFour" style="position: absolute;left: 180px; top: 3px;color: #D1D1D1;font-size: 16px;">&#xe618;</i>
					<i @tap="GetCode(CodeState)" :class="[CodeState == true ? 'CodeYes' : 'CodeNo']">{{ CodedText }}</i>
				</view>
			</view>

			<view class="username-box" style="border-bottom: 1px solid #c5ebfb;height:35px;margin-top: 15px;">
				<view class="user-left" style="float: left;width: 40px;border: 0px solid red;height: 100%;text-align: center;line-height: 35px;">
					<i class="iconfont" style="font-size: 24px;color: #4098A6;">&#xe666;</i>
				</view>
				<view class="user-right" style="float: left;width: calc(100% - 40px);border: 0px solid red;height: 100%;position: relative;">
					<input
						class="uni-input"
						maxlength="16"
						password
						type="text"
						@focus="focusOne2"
						@blur="blurOne2"
						:focus="FocusPassword"
						@input="inputTwo"
						v-model="Password"
						placeholder="请输入6-16位密码"
						style="line-height: 35px;border: 0px solid red;height: 100%;width: 100%;font-size: 16px;position: absolute;"
					/>
					<i v-show="CleanUp1" class="iconfont" @click="CleanTwo" style="position: absolute;right: 0; top: 6px;color: #D1D1D1;font-size: 16px;">&#xe618;</i>
				</view>
			</view>

			<view class="username-box" style="border-bottom: 1px solid #c5ebfb;height:35px;margin-top: 15px;">
				<view class="user-left" style="float: left;width: 40px;border: 0px solid red;height: 100%;text-align: center;line-height: 35px;">
					<i class="iconfont" style="font-size: 22px;color: #4098A6;">&#xe665;</i>
				</view>
				<view class="user-right" style="float: left;width: calc(100% - 40px);border: 0px solid red;height: 100%;position: relative;">
					<input
						class="uni-input"
						maxlength="16"
						password
						type="text"
						@focus="focusOne3"
						@blur="blurOne3"
						:focus="FocusConfirmPassword"
						@input="inputThree"
						v-model="ConfirmPassword"
						placeholder="请再次确认密码"
						style="line-height: 35px;border: 0px solid red;height: 100%;width: 100%;font-size: 16px;position: absolute;"
					/>
					<i v-show="CleanUp2" class="iconfont" @click="CleanThree" style="position: absolute;right: 0; top: 6px;color: #D1D1D1;font-size: 16px;">&#xe618;</i>
				</view>
			</view>
		</view>
		<!-- 表单 -->

		<!-- 暂时屏蔽 -->
		<!-- 提示 -->
		<!-- <view class="Tips" style="border: 0px solid red;height: 50px;line-height: 50px;text-align: right;padding-right: 10px;font-size: 14px;color: #666666;">
			收不到短信？<a href="javascript:void(0)" style="color: #666666;display: inline-block;text-decoration: underline;">获取语音验证码</a>
		</view> -->
		<!-- 提示 -->
		<!-- 暂时屏蔽 -->

		<!-- 按钮 -->
		<view class="btn" style="margin-top: 15px;"><button type="primary" @tap="Register()" style="background-color: #4098A6;">注册</button></view>
		<!-- 按钮 -->

		<!-- 用户协议 -->
		<view class="UserAgreement" style="border: 0px solid red;height: 50px;line-height: 50px;font-size: 14px;text-align: center;color: #8f8f94;">
			点击注册,即表示同意
			<a href="javascript:void(0)" @tap="SkipAgreement" style="text-decoration: none;color: #007aff;display: inline-block;">《用户协议》</a>
		</view>
		<!-- 用户协议 -->
	</view>
</template>

<script>
const account_cacheKey = 'account';
export default {
	data() {
		return {
			CodedText: '获取验证码',
			CodeState: false,
			Account: '', //注册账号
			VerificationCode: '', //验证码
			Password: '', //密码
			ConfirmPassword: '', //确认密码
			CleanUp: false,
			CleanUp1: false,
			CleanUp2: false,
			CleanUp3: false,
			Focus: false,
			FocusPassword: false,
			FocusConfirmPassword: false,
			FocusVerificationCode: false
		};
	},
	methods: {
		focusOne(e) {
			if (e.detail.value != '') {
				this.CleanUp = true;
			}
			if (e.detail.value == '') {
				this.CleanUp = false;
			}
		},
		blurOne(e) {
			// console.log(e)
			if (e._processed == true) {
				this.CleanUp = false;
			}
		},
		focusOne1(e) {
			if (e.detail.value != '') {
				this.CleanUp3 = true;
			}
			if (e.detail.value == '') {
				this.CleanUp3 = false;
			}
		},
		blurOne1(e) {
			// console.log(e)
			if (e._processed == true) {
				this.CleanUp3 = false;
			}
		},
		focusOne2(e) {
			if (e.detail.value != '') {
				this.CleanUp1 = true;
			}
			if (e.detail.value == '') {
				this.CleanUp1 = false;
			}
		},
		blurOne2(e) {
			// console.log(e)
			if (e._processed == true) {
				this.CleanUp1 = false;
			}
		},
		focusOne3(e) {
			if (e.detail.value != '') {
				this.CleanUp2 = true;
			}
			if (e.detail.value == '') {
				this.CleanUp2 = false;
			}
		},
		blurOne3(e) {
			// console.log(e)
			if (e._processed == true) {
				this.CleanUp2 = false;
			}
		},
		inputOne() {
			if (this.Account == '') {
				this.CleanUp = false;
			} else {
				this.CleanUp = true;
			}
		},
		clean() {
			this.Focus = true;
			this.Account = '';
			if (this.Account == '') {
				this.CleanUp = false;
			}
		},
		CleanTwo() {
			this.FocusPassword = true;
			this.Password = '';
			if (this.Password == '') {
				this.CleanUp1 = false;
			}
		},
		CleanThree() {
			this.FocusConfirmPassword = true;
			this.ConfirmPassword = '';
			if (this.ConfirmPassword == '') {
				this.CleanUp2 = false;
			}
		},
		cleanFour() {
			this.FocusVerificationCode = true;
			this.VerificationCode = '';
			if (this.VerificationCode == '') {
				this.CleanUp3 = false;
			}
		},
		inputTwo() {
			if (this.Password == '') {
				this.CleanUp1 = false;
			} else {
				this.CleanUp1 = true;
			}
		},
		inputThree() {
			if (this.ConfirmPassword == '') {
				this.CleanUp2 = false;
			} else {
				this.CleanUp2 = true;
			}
		},

		inputFour() {
			if (this.VerificationCode == '') {
				this.CleanUp3 = false;
			} else {
				this.CleanUp3 = true;
			}
		},
		moveHandle() {
			return;
		},
		SkipAgreement() {
			//跳转注册协议
			uni.navigateTo({
				url: '/pages/My/About/UserAgreement'
			});
		},
		GetCode(CodeState) {
			//获取验证码按钮的点击事件
			if (CodeState == true) {
				// console.log("获取验证码点击事件");

				// console.log(this.Account);//获取手机号码

				//判断账号是否注册过
				//请求方法
				var RequestUrl = 'existemobile';
				//请求参数
				var RequestData = {
					mobile: this.Account
				};
				//异步请求接口
				this.Ebao.UniAjax(this.Ebao.url, RequestUrl, RequestData).then(
					res => {
						console.log(JSON.stringify(res.data));
						if (res.data.Exist) {
							//已经注册
							uni.showToast({
								title: this.Account + '已注册', //显示内容
								duration: 2000, //显示时间
								icon: 'none', //不显示图标
								position: 'center' //居中显示
							});
						} else {
							//未注册
							//异步请求接口
							this.Ebao.UniAjax(this.Ebao.url, 'SMS/Send', {
								mobile: this.Account,
								mode: 1
							}).then(
								res => {
									// var _self = this;
									// res.data.Time  验证码时间

									console.log(JSON.stringify(res.data));

									if (res.data.Time) {
										//验证码获取成功
										uni.showToast({
											title: '验证码已发送请注意查收', //显示内容
											duration: 3000, //显示时间
											icon: 'none', //不显示图标
											position: 'center' //居中显示
										});

										this.SendCodetime(res.data.Time);
									} else {
										uni.showToast({
											title: res.data, //显示内容
											duration: 3000, //显示时间
											icon: 'none', //不显示图标
											position: 'center' //居中显示
										});
									}
								},
								error => {
									console.log(error);
								}
							);
						}
					},
					error => {
						console.log(error);
					}
				);
			} else {
				//注册账号不正确 不进行任何操作
			}
		},
		SendCodetime(time) {
			//发送验证码的方法
			let _self = this;
			let myVar = setInterval(function() {
				//变成灰色
				_self.CodeState = false;
				_self.CodedText = '重新发送(' + time + ')';
				// console.log(time);
				time--;
				if (time < 0) {
					// console.log("time小于0");
					_self.CodeState = true;
					_self.CodedText = '重新发送';
					myStopFunction();
				}
			}, 1000);

			function myStopFunction() {
				clearInterval(myVar);
			}
			// console.log(time);
		},
		Register() {
			//注册按钮提交事件
			//非空验证
			if (this.Account == '') {
				uni.showToast({
					title: '请填写账号', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});

				// uni.showModal({
				//     title: '提示',
				//     content: '这是一个模态弹窗',
				//     success: function (res) {
				//         if (res.confirm) {
				//             console.log('用户点击确定');
				//         } else if (res.cancel) {
				//             console.log('用户点击取消');
				//         }
				//     }
				// });

				return false;
			}
			//账号正则验证
			if (!/^1[0123456789]\d{9}$/.test(this.Account)) {
				uni.showToast({
					title: '请填写正确的账号', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//验证码非空验证
			if (this.VerificationCode == '') {
				uni.showToast({
					title: '请填写验证码', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//密码非空验证
			if (this.Password == '') {
				uni.showToast({
					title: '请填写密码', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//确认密码非空验证
			if (this.ConfirmPassword == '') {
				uni.showToast({
					title: '请填写确认密码', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//密码长度验证
			if (this.Password.length < 6) {
				uni.showToast({
					title: '密码长度不够', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//确认密码长度验证
			if (this.ConfirmPassword.length < 6) {
				uni.showToast({
					title: '确认密码长度不够', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}
			//两次密码是否输入一致
			if (this.Password != this.ConfirmPassword) {
				uni.showToast({
					title: '两次输入的密码不一致', //显示内容
					duration: 2000, //显示时间
					icon: 'none', //不显示图标
					position: 'center' //居中显示
				});
				return false;
			}

			//请求方法
			var RequestUrl = 'existemobile';
			//请求参数
			var RequestData = {
				mobile: this.Account
			};
			//异步请求接口
			this.Ebao.UniAjax(this.Ebao.url, RequestUrl, RequestData).then(
				res => {
					console.log(JSON.stringify(res.data));

					if (res.data.Exist) {
						//已经注册
						uni.showToast({
							title: this.Account + '已注册', //显示内容
							duration: 2000, //显示时间
							icon: 'none', //不显示图标
							position: 'center' //居中显示
						});
					} else {
						//未注册

						//请求方法
						// var RequestUrl = "register";
						//请求参数
						var RegisterData = {
							mobile: this.Account,
							password: this.Password,
							code: this.VerificationCode,
							referral: ''
						};
						//异步请求接口
						this.Ebao.UniAjax(this.Ebao.url, 'register', RegisterData).then(
							res => {
								// var _self = this;
								// console.log(JSON.stringify(RegisterData));
								// console.log(JSON.stringify(res.data));

								if (res.data == '验证码不正确') {
									uni.showToast({
										title: res.data, //显示内容
										duration: 2000, //显示时间
										icon: 'none', //不显示图标
										position: 'center' //居中显示
									});
								} else {
									//注册账号成功
									// console.log("账号注册成功");
									uni.showToast({
										title: '注册成功',
										duration: 2000
									});
									setTimeout(function() {
										//返回登录界面
										uni.reLaunch({
											url: '/pages/Login/Login' //退出登录
										});
									}, 2000);
								}
							},
							error => {
								console.log(error);
							}
						);
					}
				},
				error => {
					console.log(error);
				}
			);
		}
	},
	created() {
		// console.log(JSON.stringify(this.Ebao.url))
	},
	watch: {
		// 使用这个可以监听data中指定数据的变化,然后触发watch中对应的function的处理
		Account: function(newVal, oldVal) {
			if (/^1[0123456789]\d{9}$/.test(newVal)) {
				// console.log("正确的手机号码");
				this.CodeState = true;
			} else {
				this.CodeState = false;
			}
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}

input {
	padding: 0px !important;
}

/* 验证码样式 */
/* style="position: absolute;right: 0px; top: 0px; border: 0px solid red;font-size: 14px;color: #FFFFFF;background-color: #D1D1D1;width: 100px;height: 30px;line-height: 30px;text-align: center;border-radius: 5px;" */
.CodeNo {
	position: absolute;
	right: 0px;
	top: 0px;
	border: 0px solid red;
	font-size: 14px;
	color: #ffffff;
	background-color: #d1d1d1;
	width: 100px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 5px;
}

.CodeYes {
	position: absolute;
	right: 0px;
	top: 0px;
	border: 0px solid red;
	font-size: 14px;
	color: #ffffff;
	background-color: #4098a6;
	width: 100px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	border-radius: 5px;
}

.logo-box {
	/* position: relative; */
	height: 220px;
	width: 100%;
	background-color: #4098a6;
}

.logo {
	height: 50%;
	width: 50%;
	margin: auto;
	position: relative;
	top: 65px;
}

.logo image {
	width: 100%;
	height: 100%;
}

.btn {
	padding: 0px 10px;
	/* margin-top: 15px; */
}

.btn button {
	background-color: #4098a6;
}

.action-row {
	margin-top: 15px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	font-size: 18px;
}

.action-row navigator {
	color: #007aff;
	padding: 0 10px;
}
</style>
