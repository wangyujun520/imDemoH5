<template>
	<view class="content">
		<view v-if="DataList.nodes == 0" class="flex justify-center align-center" style="height: 40vh">
			<u-empty text="暂无施工记录" mode="list"></u-empty>
		</view>


		<view class="px-2 py-2 bg-white mt-2" v-for="(item,index) in DataList.nodes" :key="index">
			<view class="flex">
				<text style="font-size: 28rpx;color: #939393;">{{item.title}}</text>
				<!-- <text class="iconfont" style="color: #666;font-size: 40rpx;">&#xe6f3;</text> -->
			</view>
			<view class="Content-Text mt-1">
				<text>{{item.content}}</text>
			</view>
			<view class="Pic-Box flex flex-wrap mt-1">
				<view class="pl-1 pt-1" v-for="(imgitem, imgindex) in item.photos" :key="imgindex"
					style="width: 235rpx; height: 235rpx">
					<image @click="previewImage(imgitem, item.photos)" mode="aspectFill" :src="imgitem"
						style="width: 100%;height: 100%;border-radius: 10rpx;"></image>
				</view>
			</view>
			<view class="LikeBox flex px-1 pt-2">
				<view class="flex-1">
					<text style="color: #939393; font-size: 28rpx" v-html="item.create_time"></text>
				</view>
				<view class="flex align-center">
					<view class="flex flex-1 justify-end align-center">
						<text :style="{ color: item.is_like==0 ? '#ff9900' : '#939393' }" class="iconfont"
							style="font-size: 36rpx; margin-right: 5rpx" @click="support(item,sindex)">
							&#xe641;
						</text>
						<text :style="{ color: item.is_like==0 ? '#ff9900' : '#939393' }"
							style="font-size: 26rpx">{{ item.like_count }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="px-2 py-2 bg-white mt-2" v-if="DataList.checks.length != 0 && DataList.nodes.length>0"> -->
		<view class="px-2 py-2 bg-white mt-2" v-if="showCheck">
			<view class="flex">
				<text style="font-size: 28rpx;color: #FF9900;">验收状态</text>
			</view>

			<view v-for="(item,index) in DataList.checks" v-if="item.status ==0"
				class="flex align-center justify-between mt-1 rounded px-3 py-2" style="background-color: #f7f7f7;">
				<view class="flex align-center">
					<view class="flex">
						<image class="rounded" :src="item.header" style="width: 80rpx;height: 80rpx;"></image>
					</view>
					<view class="flex flex-column">
						<view class="">
							<text class="ml-1" style="color: #101010;font-size: 30rpx;">{{item.name}}</text>
							<text :style="{ backgroundColor: item.color }"
								style="color: #FFFFFF;font-size: 22rpx;margin-left: 10rpx;padding: 3rpx 20rpx;border-radius: 10rpx;">{{item.catalog}}</text>
						</view>
						<view class="">
							<text style="font-size: 26rpx;color: #888;" class="mt-1 ml-1">{{item.content}}</text>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 120rpx;"></view>
		<!-- 用户 -->
		<view v-if="DataList.checks[1].status == 0 && module=='user' && DataList.checks[0].status == 1" class="position-fixed"
			style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 650rpx;">
					<text @click="ApplyCheckOrder('-3')"
						style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						验收不通过
					</text>
					<text @click="ApplyCheckOrder('0')" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						验收通过
					</text>
				</view>
			</view>
		</view>
		<!-- 监理 -->
		<view v-if="(DataList.status == -3 || DataList.checks[1].status != 0) && module=='surveyor'" class="position-fixed"
			style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<!-- <text @click="gotoIM" style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">
						...
					</text> -->
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 350rpx;">
					<text v-if="DataList.nodes != 0" @click="Confirm"
						style="background-color: #FFA012;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FFA012;">
						验收
					</text>
					<text @click="skipReleaseContent" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						发布
					</text>
				</view>
			</view>
		</view>
		<!-- 设计师 -->
		<view v-if="DataList.checks[1].status == 0 &&module=='designer' && DataList.checks[2].status != 0" class="position-fixed"
			style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
				</view>
				<view class="flex align-center justify-end pr-2" style="width: 650rpx;">
					<text @click="ApplyCheckOrder('-3')"
						style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">
						验收不通过
					</text>
					<text @click="ApplyCheckOrder('0')" class="ml-3"
						style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">
						验收通过
					</text>
				</view>
			</view>
		</view>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			this.id = options.id;
			this.title = options.title;
			uni.setNavigationBarTitle({
				title: options.title
			});

			if (options.module != 'undefined') {
				this.module = options.module;
			}
		},
		onShow() {
			this.InitData();
		},
		data() {
			return {
				showCheck:false,
				module: '',
				id: '',
				title: '',
				DataList: {
					id: "",
					status: "",
					status_text: "",
					nodes: [],
					checks: [
						{},{},{}
					]
				}
				// DataList: {
				// 	id: "",
				// 	status: "",
				// 	status_text: "",
				// 	nodes: [],
				// 	checks: []
				// }
			}
		},
		methods: {
			Confirm() {
				uni.showModal({
					title: '是否确定发起验收？',
					// content: `【${this.title}】是否通过验收？提示：通过后，该节点施工团队将不在进行服务`,
					content: `【${this.title}】施工验收，需要通过房主和设计师通过后该施工任务完成。`,
					success: (res) => {
						if (res.confirm) {
							let moduleCatalog = '';
							let moduleStatus = '';
							if (this.module == 'user') {
								moduleCatalog = 0;
							}
							if (this.module == 'designer') {
								moduleCatalog = 1;
							}
							// 监理
							if (this.module == 'surveyor') {
								moduleCatalog = 4;
								moduleStatus = 0;
							}
							// 施工方案验收
							this.$post(this.$url.Work.ApplyCheckOrder, {
								id: this.id, //订单id
								status: moduleStatus,
								catalog: moduleCatalog //0=用户；1=设计师；4=监理
							}, {
								isLoading: false
							}).then(res => {
								this.$refs.uToast.show({
									title: '验收成功',
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			ApplyCheckOrder(state) {
				uni.showModal({
					title: '提示',
					content: `是否要${state==0?'验收通过':'验收不通过'}吗？`,
					success: (res) => {
						if (res.confirm) {
							let moduleCatalog = '';
							if (this.module == 'user') {
								moduleCatalog = 0;
							}
							if (this.module == 'designer') {
								moduleCatalog = 1;
							}
							// 监理
							if (this.module == 'surveyor') {
								moduleCatalog = 4;
							}
							//0=通过；-3=不通过
							this.$post(this.$url.Work.ApplyCheckOrder, {
								id: this.id, //订单id
								catalog: moduleCatalog, //0=用户；1=设计师；4=监理
								status: state //-3=通过；0=通过
							}, {}).then(res => {
								// 成功
								this.$refs.uToast.show({
									title: `${state==0?'通过':'不通过'}成功`,
									type: 'success'
								});
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							});
						}
					}
				});
			},
			// 跳转到发布
			skipReleaseContent() {
				uni.navigateTo({
					url: '/pages/UserLive/ReleaseContent?id=' + this.id
				})
			},
			// 点赞
			support(item, index) {
				// 点赞发现
				let RequrestData = {
					id: item.id,
					catalog: 21
				};
				this.$post(this.$url.User.Like, RequrestData, {
					isLoading: false
				}).then(res => {
					console.log(JSON.stringify(res))
					if (res.code == 200) {
						this.InitData();
					}
				});
			},
			// 预览图片
			previewImage(url, list) {
				console.log(url)
				console.log(list)
				let Urls = [];
				list.forEach(item => {
					Urls.push(item);
				})
				uni.previewImage({
					current: url,
					urls: Urls,
					indicator: 'number'
				});
			},
			InitData() {
				// 获取施工节点详情
				this.$post(this.$url.Work.GetWorkNodeLog, {
					id: this.id
				}, {
					isLoading: true,
					loadingTitle: '加载中...'
				}).then(res => {
					this.DataList = res.data;
					
					res.data.checks.forEach(item=>{
						if(item.status == 0){
							this.showCheck = true
						}
					})
					// this.DataList.nodes[0].photos = ['https://i02piccdn.sogoucdn.com/8114db881bfe7913','https://i02piccdn.sogoucdn.com/a2d98ec6b7c8fcac'];
				});
			}

		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
