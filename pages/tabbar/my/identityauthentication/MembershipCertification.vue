<template>
	<view class="p-3">
		<view class="flex bg-white flex-column align-center py-5">
			<view class="">
				<image src="https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E4%BC%9A%E5%91%98.png" style="width: 120rpx;height: 120rpx;"></image>
				<!-- <image :src="DataList.imgIcon" style="width: 120rpx;height: 120rpx;"></image> -->
			</view>
			<text style="font-size: 26rpx;color: #777;">类型</text>
			<text class="my-1" style="font: 26rpx;color: #0072FF;">设计师</text>
			<view class="" style="color: #777;">
				<text class="iconfont" style="font-size: 28rpx;">&#xe65e;</text>
				<text style="font-size: 26rpx;">地址信息</text>
			</view>
		</view>

		<view class="flex flex-column bg-white mt-2 rounded">
			<view class="flex justify-between pl-2 pt-3 pb-2" style="min-height: 100rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">喜好风格</text>
				<view class="flex pr-2">
					<view class="flex justify-end flex-wrap" style="width: 480rpx;">
						<!-- <text v-for="(item,index) in DataList.likeStyle" :key="index" v-if="item.isLike" class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">{{item.name}}</text> -->
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					</view>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		<u-action-sheet :list="list" @click="SetUpClick" v-model="show"></u-action-sheet>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onNavigationBarButtonTap(e) {
			if (e.float == 'right') {
				this.show = true;
			}
		},
		data() {
			return {
				list: [],
				show: false,
				DataList: "", //Mock数据
				Authenticate: false
			}
		},
		onLoad(options) {
			// console.log("数据"+options.likelist);
			this.Authenticate = JSON.parse(options.authenticate);
			if (this.Authenticate == true) {
				this.list = [{
					text: '设为默认'
				}, {
					text: '修改基本资料'
				}]
			} else {
				this.list = [{
					text: '修改基本资料'
				}]
			}
		},
		onShow() {

			// 会员认证首页
			// var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyHuiYuanDetail';
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyMemberDetail';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					this.DataList = res.dataList;
					console.log(JSON.stringify(res));
				})
				.catch(err => {
					console.log(err);
				});

			// var DataLists = {
			// 	"code": 200,
			// 	"msg": "ok",
			// 	"dataList": {
			// 		"imgIcon": "https://ebao-vip-ins.oss-cn-shenzhen.aliyuncs.com/WangYuJunFile/img/%E4%BC%9A%E5%91%98.png",
			// 		"workType": "会员",
			// 		"name": "张天宇",
			// 		"address": "四川省成都市武侯区G213辅路",
			// 		"likeStyle": [{
			// 				"name": "轻奢",
			// 				"isLike": false
			// 			},
			// 			{
			// 				"name": "北欧",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "现代",
			// 				"isLike": false
			// 			},
			// 			{
			// 				"name": "美式",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "中式",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "混搭",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "欧式",
			// 				"isLike": true
			// 			},
			// 			{
			// 				"name": "日式",
			// 				"isLike": false
			// 			}
			// 		]
			// 	}
			// }
			// this.DataList = DataLists.dataList;
		},
		methods: {
			SetUpClick(index) {
				if (index == 0 && this.Authenticate == true) {
					// 设为默认
					var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetDefaultProfession';
					var RequrestDatas = {
						"type": "会员"
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
							if (res.code == 200) {
								this.SetIdentity();
							} else {
								this.$refs.uToast.show({
									title: '设置失败',
									type: 'error'
								});
							}
						})
						.catch(err => {
							console.log(err);
						});
				}
				if (index == 0 && this.Authenticate == false) {
					// console.log(JSON.stringify(this.DataList.likeStyle));
					// 跳转到会员基本信息
					uni.navigateTo({
						url: '/pages/tabBar/my/identityauthentication/modify/MembershipCertification?likelist=' + JSON.stringify(this.DataList.likeStyle)
					})
				}
				if (index == 1) {
					// console.log(JSON.stringify(this.DataList.likeStyle));
					// 跳转到会员基本信息
					uni.navigateTo({
						url: '/pages/tabBar/my/identityauthentication/modify/MembershipCertification?likelist=' + JSON.stringify(this.DataList.likeStyle)
					})
				}
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
			},
			SetIdentity() {
				// 修改个人自定义资料
				// 自定义资料字段需要预先在控制台配置，详细请参考：https://cloud.tencent.com/document/product/269/1500#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.B5.84.E6.96.99.E5.AD.97.E6.AE.B5
				let promise = getApp().$tim.updateMyProfile({
					// 这里要求您已在即时通信 IM 控制台>【应用配置】>【功能配置】 申请了自定义资料字段 Tag_Profile_Custom_Test1
					// 注意：即使只有一个自定义资料字段，profileCustomField 也需要用数组类型
					profileCustomField: [{
						key: 'Tag_Profile_Custom_Rank',
						value: '会员'
					}]
				});
				promise.then(imResponse => {
					console.log("更新资料成功");
					this.$refs.uToast.show({
						title: '设置成功',
						type: 'success'
					});
					console.log(JSON.stringify(imResponse.data)); // 更新资料成功
				}).catch(imError => {
					console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
			}

		},
	}
</script>

<style lang="scss">
page{
	background-color: #f7f7f7;
}
</style>
