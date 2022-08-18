<template>
	<view class="p-3">
		<view class="flex justify-center align-center flex-column bg-white py-5 rounded">
			<image class="rounded" src="/static/AppStart/icons/144.png" style="width: 180rpx;height: 180rpx;border: 1px solid rgba(187,187,187,0.2);"></image>
			<text class="mt-3" style="color: #FF9900;font-weight: bold;font-size: 30rpx;">版本{{version|text}}</text>
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @tap="updaEdition" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">检查更新</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		<!-- #endif -->
		
		<view class="flex flex-column bg-white mt-2 rounded">
			<view @click="skipUserAgreement" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">用户协议</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="skipPrivacyPolicy" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">隐私政策</text>
				<view class="flex align-center">
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column align-center justify-center position-absolute" style="bottom: 50rpx;width: 690rpx;color: #bbb;">
			<text>Copyright©2022-2022</text>
			<text>四川安居邦网络科技有限公司 版权所有</text>
		</view>
		
		<!-- 更新框 -->
		<u-modal v-model="showUpdate" :zoom="false" :show-cancel-button="true" confirm-text="升级" title="发现新版本" @cancel="CancelUpdate"
			@confirm="confirmUpdate">
			<view class="p-2">
				<!-- <rich-text :nodes="content"></rich-text> -->
				<rich-text :nodes="messageHtml(content)"></rich-text>
			</view>
		</u-modal>
		<u-mask class="flex justify-center align-center" :show="downloadshow" :zoom="false">
			<view class="bg-white rounded" style="width: 600rpx;height: 300rpx">
				<view class="flex justify-center align-center" style="height: 100rpx;">
					<text style="color: #101010;font-size: 35rpx;font-weight: bold;">升级APP</text>
				</view>
				<view class="flex justify-center">
					<text style="font-size: 28rpx;color: #888;">正在为您更新，升级过程中请耐心等待</text>
				</view>
				<view class="flex justify-center mt-2">
					<text style="color: #0062CC;">已下载{{DownloadProgressValue}}%</text>
				</view>
				<view class="flex justify-center p-3">
					<u-line-progress active-color="#2979ff" :percent="DownloadProgressValue" :show-percent="false">
					</u-line-progress>
				</view>
		
			</view>
		</u-mask>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import parseHtml from '@/common/emoticon/htmlparser.js';
	export default {
		data() {
			return {
				version: '1.0.4',
				// version:'',
				// 当前更新的内容
				// content: `
				// 	1. 修复badge组件的size参数无效问题<br>
				// 	2. 新增Modal模态框组件<br>
				// 	3. 新增压窗屏组件，可以在APP上以弹窗的形式遮盖导航栏和底部tabbar<br>
				// 	4. 修复键盘组件在微信小程序上遮罩无效的问题
				// `,
				content:'',//当前更新内容
				showUpdate:false,//升级框是否显示
				downloadshow:false,
				DownloadAddress: '', //下载地址
				DownloadProgressValue: 0 //下载的进度
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, info => {
				this.version = info.version;
			});
			// #endif
		},
		methods: {
			// 检查更新
			updaEdition(){
				plus.runtime.getProperty(plus.runtime.appid, info => {
					let GetVersionData = {
						platform: uni.getSystemInfoSync().platform,
						version: info.version
					}
					console.log(JSON.stringify(GetVersionData))
					this.$post(this.$url.App.GetVersion, GetVersionData,{
						isLoading:true
					}).then(res => {
						console.log(JSON.stringify(res))
						// 判断是否需要升级
						if(!res.data.is_new){
							console.log("当前需要升级")
							this.DownloadAddress = res.data.url_download;//下载的地址
							this.content = res.data.content;
							this.showUpdate = true;//显示升级框
						}else{
							uni.showToast({
								title:'当前已经是最新版本了',
								icon:'none'
							})
						}
					});
				});
				
			},
			// 取消
			CancelUpdate(){
				this.showUpdate = false;
			},
			// 升级按钮
			confirmUpdate() {
				var _self = this;
				if (uni.getSystemInfoSync().platform == 'android') {
					// 关闭升级框
					this.showUpdate = false;
					//显示下载进度
					this.downloadshow = true; //显示下载进度
					let downloadTask = uni.downloadFile({
						url: this.DownloadAddress, //下载地址
						success: res => {
							console.log(JSON.stringify(res));
							// {"tempFilePath":"_doc/uniapp_temp_1591351266528/download/test58_20200605.apk","statusCode":200,"errMsg":"downloadFile:ok"}
							if (res.statusCode === 200) {
								console.log('下载成功');
								//下载文件的路径 tempFilePath
								//安装apk
								//更新系统
								plus.runtime.install(res.tempFilePath, {},
									function(wgtinfo) {
										plus.runtime.restart();
									},
									function(error) {
										console.log('应用更新失败');
									}
								);
							}
						}
					});
					downloadTask.onProgressUpdate(function(callback) {
						//下载进度监听
						// console.log(callback)
						_self.DownloadProgressValue = callback.progress;
					});
				}
				if (uni.getSystemInfoSync().platform == 'ios') {
					// 关闭升级框
					this.showUpdate = false;
					//跳转到应用商店
					let appleId = '1595882656'; //易安得车位的appleId
					plus.runtime.launchApplication({
							action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
						},
						function(e) {
							console.log('Open system default browser failed: ' + e.message);
						}
					);
				}
			},
			messageHtml(html) {
				if (html != null) {
					html = html.replace(/\s/g, ""); //去除全部空格
					return parseHtml(html);
				} else {
					return parseHtml('');
				}
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
			}
		}
	}
</script>


<style>
	page{
		background-color: #F7F7F7;
	}
</style>
