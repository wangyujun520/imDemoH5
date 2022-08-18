<template>
	<view class="content">
		<!-- <u-parse :html="content"></u-parse>
		<u-modal v-model="ModalShow" @confirm="SignConfirm" content="是否完成合同签署" title="合同签署" :show-cancel-button="true"
		 confirm-text="签署完成" confirm-color="#ff9900"></u-modal>
		<web-view :src="PreviewPath" v-if="qianshuShow"></web-view> -->
		<view class="u-content">
			<u-parse :html="content"></u-parse>
		</view>
		<!-- <web-view :src="DesignSignList.url"></web-view> -->
		<view style="height: 140rpx;"></view>
		<view class="position-fixed bg-white flex justify-between px-3 align-center"
			style="bottom: 0;width: 750rpx;height: 140rpx;z-index: 9999999999999;">
			<view @tap="SignContract" class="flex align-center justify-center"
				style="background-color: #FF9900;width: 690rpx;height: 80rpx;border-radius: 15rpx;">
				<!-- 0=已签署；1=未签署；2=进行中 -->
				<text v-if="DesignSignList.status==0" class="text-white">去查看</text>
				<text v-if="DesignSignList.status==1" class="text-white">去签署</text>
				
				<text v-if="DesignSignList.status==2&&rankno==1" class="text-white">继续签署</text>
				<text v-if="DesignSignList.status==2&&rankno==0" class="text-white">去查看</text>
				
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				rankno:uni.getStorageSync('rankno'),
				DesignSignList:{},
				PreviewPath: '',
				ModalShow: false,
				qianshuShow: false,//默认显示
				name: "",
				module:''
			};
		},
		onLoad(options) {
			this.order_id = options.order_id;
			if(options.module!='undefined'){
				this.module = options.module
			}
		},
		onShow() {
			this.InitData();//初始化数据
		},
		methods: {
			InitData(){
				this.$post(this.$url.Article.GetArticle, {
					sign: "app_work_sign" 
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.content = res.data.content;
					uni.setNavigationBarTitle({
						title: res.data.title,
					});
				});
				
				this.$post(this.$url.Work.GetWorkSign, {
					order_id: this.order_id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DesignSignList = res.data;
				});
			},
			SignContract(){
				// if(this.module=='user'){
				// 	uni.navigateTo({
				// 		url: `/pages/webview/webview?url=${this.DesignSignList.user_url}&title=签署合同`
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 		url: `/pages/webview/webview?url=${this.DesignSignList.surveyor_url}&title=签署合同`
				// 	})
				// }
				
				// 监理
				if(this.module == 'surveyor'){
					if((this.DesignSignList.surveyor_url??'')!=''){
						uni.navigateTo({
							url: `/pages/webview/webview?url=${this.DesignSignList.surveyor_url}&title=签署合同`
						})
					}else{
						// 创建设计合同信息
						this.$post(this.$url.Work.CreateWorkSign, {
							order_id: this.order_id
						}, {
							isLoading: true,
							loadingTitle: '加载中...'
						}).then(res => {
							// 跳转到内部窗口并且传递链接
							uni.navigateTo({
								url: `/pages/webview/webview?url=${res.data.surveyor_url}&title=签署合同`
							})
						});
					}
				}
				
				// 客户
				if(this.module == 'user'){
					if((this.DesignSignList.user_url??'')!=''){
						uni.navigateTo({
							url: `/pages/webview/webview?url=${this.DesignSignList.user_url}&title=签署合同`
						})
					}else{
						// 创建设计合同信息
						this.$post(this.$url.Work.CreateWorkSign, {
							order_id: this.order_id
						}, {
							isLoading: true,
							loadingTitle: '加载中...'
						}).then(res => {
							// 跳转到内部窗口并且传递链接
							uni.navigateTo({
								url: `/pages/webview/webview?url=${res.data.user_url}&title=签署合同`
							})
						});
					}
				}
				
				// if((this.DesignSignList.url??'')!=''){
				// 	// 跳转到内部窗口并且传递链接
				// 	uni.navigateTo({
				// 		url: `/pages/webview/webview?url=${this.DesignSignList.url}&title=签署合同`
				// 	})
				// }else{
				// 	// 创建设计合同信息
				// 	this.$post(this.$url.Task.CreateDesignSign, {
				// 		order_id: this.order_id
				// 	}, {
				// 		isLoading: true,
				// 		loadingTitle: '加载中...'
				// 	}).then(res => {
				// 		// 跳转到内部窗口并且传递链接
				// 		uni.navigateTo({
				// 			url: `/pages/webview/webview?url=${res.data.url}&title=签署合同`
				// 		})
				// 	});
				// }
			},
			SignConfirm() {
				// console.log("完成签署点击事件")
				// ==1签署成功界面 ==2 签署失败界面
				var state = 1;
				if(state == 1){
					//跳转到合同签署成功界面
					uni.navigateTo({
						url: "/pages/tabBar/my/RegistrationAgreement/SignedSuccessfully?state=" + state,
					});
				}
				if(state == 2){
					//跳转到合同签署失败界面
					uni.navigateTo({
						url: "/pages/tabBar/my/RegistrationAgreement/FailedToSign?state=" + state,
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	.u-content {
		padding: 24rpx;
		font-size: 32rpx;
		color: $u-content-color;
		line-height: 1.6;
		// border: 1px solid red; 
	}
	
	/deep/ p{
		text-indent: 2em !important;
		line-height: 1.7;
		margin-bottom: 10rpx;
		// justify-content: center;
		text-align: justify;
		
	}
	
	img {
		width: 100%;
		height: 100%;
	}

	image {
		width: 100%;
		height: 100%;
	}
</style>
