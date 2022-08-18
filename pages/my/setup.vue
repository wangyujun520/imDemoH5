<template>
	<view class="content ">
		<view class="flex bg-white py-2" @click="skipMyInfo">
			<view class="flex align-center pl-3" style="width: 550rpx;">
				<!-- <image class="rounded" style="width: 100rpx;height: 100rpx;" v-if="DataList.headPortrait == null || DataList.headPortrait == '' " src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1608299331&di=a7976fd7c35b9dc3a793d94ab378cca8&src=http://hbimg.b0.upaiyun.com/0cd238587a0984d24b8688ad35c187da3ace5314317c-KPcKiS_fw658"></image> -->
				<image :src="DataList.header" style="width: 100rpx;height: 100rpx;" class="rounded"></image>
				<text class="ml-3" style="font-size: 28rpx;color: #000000;">修改个人资料</text>
			</view>
			<view class="flex justify-end pr-3 align-center" style="width: 200rpx;">
				<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text> -->
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view>
		</view>
		
		<view class="flex flex-column px-3">
			<view @tap="skipPublicAnnouncement" class="bg-white flex justify-between pl-3 pr-2 py-3 border-bottom mt-2" style="width: 690rpx;">
				<text style="color: #444;font-size: 28rpx;">公示公告</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view>
			<!-- <view @tap="skipMessageSetting" class="bg-white flex justify-between pl-3 pr-2 py-3 border-bottom" style="width: 690rpx;">
				<text style="color: #444;">消息设置</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view> -->
			 
			<view @tap="skipFeedback" class="bg-white flex justify-between pl-3 pr-2 py-3 border-bottom" style="width: 690rpx;">
				<text style="color: #444;font-size: 28rpx;">建议反馈</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view>
			<!-- #ifdef APP-PLUS -->
			<view @tap="clern" class="bg-white flex justify-between pl-3 pr-2 py-3 border-bottom" style="width: 690rpx;">
				<text style="color: #444;font-size: 28rpx;">清理缓存</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
				<!-- <text style="position: absolute;right: 80rpx;color: #797979;">100.98M</text> -->
				<text style="position: absolute;right: 90rpx;color: #797979;">{{ fileSizeString }}</text>
			</view>
			<!-- #endif -->
			
			<!-- <view @tap="skippaydemo" class="bg-white flex justify-between p-3 border-bottom" style="width: 750rpx;">
				<text style="color: #444;">支付设置</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view> -->
			<!-- <view @tap="skipShieldingSettings" class="bg-white flex justify-between pl-3 pr-2 py-3 border-bottom mt-2" style="width: 690rpx;">
				<text style="color: #444;">屏蔽动态</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view> -->
			<view @tap="skipAbout" class="bg-white mt-3 flex justify-between pl-3 pr-2 py-3 border-bottom" style="width: 690rpx;">
				<text style="color: #444;font-size: 28rpx;">关于安居邦</text>
				<!-- <text style="color: #444;">关于</text> -->
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
				<text style="position: absolute;right: 90rpx;color: #797979;">版本{{version|text}}</text>
			</view>
			<!-- <view @tap="skipContactUs" class="bg-white flex justify-between p-3" style="width: 690rpx;">
				<text style="color: #444;">联系我们</text>
				<u-icon name="arrow-right" style="color: #9F9F9F;"></u-icon>
			</view> -->
			<view @tap="SignOut" class="mt-5 flex align-center justify-center rounded" style="height: 90rpx;background-color: red;">
				<text class="text-white" style="font-size: 28rpx;font-weight: bold;">退出登录</text>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			fileSizeString: '',
			version:'1.0.4',
			DataList:{
				header:''
			}
		};
	},
	onLoad() {
		// 获取个人信息
		this.$post(this.$url.User.GetBaseData, {},{
			isLoading:true,
			loadingTitle:'加载中...'
		}).then(res => {
			// console.log(123)
			if(res.code == 200 && res.status==0){
				console.log(JSON.stringify(res.data))
				this.DataList = res.data
			}
		});
		
		this.formatSize();
		// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid, info => {
				this.version = info.version;
			});
		// #endif
		
	},
	methods: {
		// 跳转到修改个人资料
		skipMyInfo(){
			uni.navigateTo({
				url:'/pages/my/personalinformation'
			})
		},
		// 跳转到公示公告
		skipPublicAnnouncement(){
			uni.navigateTo({
				url:'/pages/my/notice/index'
			})
		},
		// 跳转到意见反馈
		skipFeedback(){
			uni.navigateTo({
				url:'/pages/my/feedback/index'
			})
		},
		// 跳转到关于安居邦
		skipAbout() {
			uni.navigateTo({
				url: '/pages/my/about'
			});
		},
		// 跳转到消息设置
		skipMessageSetting(){
			
		},
		// 退出登录
		SignOut() {
			//注销登录
			let promise = this.$tim.logout();
			promise.then(res => {
				console.log(res); // 登出成功
				this.$store.commit('reset');
				
				// uni.setStorageSync('token',res.data.token);//设置token
				// uni.setStorageSync('avatar',res.data.header);//设置头像
				// uni.setStorageSync('nickname',res.data.nick);//设置昵称
				// uni.setStorageSync('sign',res.data.sign);//腾讯sign
				// uni.setStorageSync('phone',this.phone);//登录手机号
				// 从本地缓存中同步移除指定 key。
				// uni.removeStorageSync('token');
				// uni.removeStorageSync('avatar');
				// uni.removeStorageSync('nickname');
				// uni.removeStorageSync('sign');
				// uni.removeStorageSync('phone');
				
				// 同步清理本地数据缓存。
				uni.clearStorageSync();
				
				// 跳转到登录页面
				uni.reLaunch({
					url: '/pages/Login/Login'
				});
			})
			.catch(err => {
				console.log(err);
				uni.reLaunch({
					url: '/pages/Login/Login'
				});
			});
		},
		// 获取缓存
		formatSize() {
			let _self = this;
			plus.cache.calculate(function(size) {
				let sizeCache = parseInt(size);
				if (sizeCache == 0) {
					_self.fileSizeString = '0B';
				} else if (sizeCache < 1024) {
					_self.fileSizeString = sizeCache + 'B';
				} else if (sizeCache < 1048576) {
					_self.fileSizeString = (sizeCache / 1024).toFixed(2) + 'KB';
				} else if (sizeCache < 1073741824) {
					_self.fileSizeString = (sizeCache / 1048576).toFixed(2) + 'MB';
				} else {
					_self.fileSizeString = (sizeCache / 1073741824).toFixed(2) + 'GB';
				}
			});
		},
		// 清除缓存
		clern() {
			let _self = this;
			uni.showModal({
				title: '清除缓存',
				content: '您确定要清除缓存吗？',
				success: function(res) {
					if (res.confirm) {
						console.log('用户点击确定');
						_self.clearCache();
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		// 清理缓存
		clearCache() {
			let _self = this;
			let os = plus.os.name;
			if (os == 'Android') {
				let main = plus.android.runtimeMainActivity();
				let sdRoot = main.getCacheDir();
				let files = plus.android.invoke(sdRoot, 'listFiles');
				let len = files.length;
				for (let i = 0; i < len; i++) {
					let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径
					plus.io.resolveLocalFileSystemURL(
						filePath,
						function(entry) {
							if (entry.isDirectory) {
								entry.removeRecursively(
									function(entry) {
										//递归删除其下的所有文件及子目录
										uni.showToast({
											title: '缓存清理完成',
											duration: 2000
										});
										_self.formatSize(); // 重新计算缓存
									},
									function(e) {
										console.log(e.message);
									}
								);
							} else {
								entry.remove();
							}
						},
						function(e) {
							console.log('文件路径读取失败');
						}
					);
				}
			} else {
				// ios
				plus.cache.clear(function() {
					uni.showToast({
						title: '缓存清理完成',
						duration: 2000
					});
					_self.formatSize();
				});
			}
		}
	},
	onShow() {}
};
</script>

<style lang="scss">
.arrow-right-icon {
	position: absolute;
	right: 50rpx;
	font-size: 30rpx;
	color: #888;
}

page{
	background-color: #F7F7F7;
}
	
</style>