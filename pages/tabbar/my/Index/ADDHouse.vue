<template>
	<view class="content p-2">
		<view v-if="DataList.cover == ''" @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">上传封面图</text>
		</view>

		<view v-else @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<!-- <view class="" style="background-color: #F7F7F7;" :style="'width: ' + w + 'px;height: ' + h + 'px;'"> -->
			<view class="" style="background-color: #F7F7F7;width: 600rpx;height: 400rpx;">
				<image @load="loadImage" :src="DataList.cover" style="width: 100%;height: 100%;"></image>
			</view>
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
		</view>
		<view class="flex flex-column">

			<view class="flex justify-between align-center"
				style="height: 100rpx;border-bottom: 1px solid rgba(187, 187, 187, 0.2);">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">楼盘名称</text>
				<!-- <view class="flex align-center">
						<text style="color: #333;font-size: 28rpx;">请选择你房屋的小区</text>
						<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #333;">&#xe656;</text>
					</view> -->
				<view class="flex align-center">
					<u-input :clearable="false" v-model="CommunityName" type="text" :border="border" input-align="right"
						placeholder="请输入您房屋的楼盘" />
				</view>
			</view>
			<view class="flex justify-between align-center" style="
			  height: 100rpx;
			  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
			">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">面 积</text>
				<view class="flex align-center">
					<u-input :clearable="false" v-model="Area" type="number" :border="border" input-align="right"
						placeholder="请输入您的房屋面积" />
					<text class="ml-1" style="font-size: 30rpx; color: #333">㎡</text>
				</view>
			</view>


			<view @click="ShowHouseType" class="flex justify-between align-center" style="
            height: 100rpx;
            border-bottom: 1px solid rgba(187, 187, 187, 0.2);
          ">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">户 型</text>
				<view class="flex align-center">
					<text style="color: #333; font-size: 28rpx">{{
              HouseType == "" ? "请选择户型" : HouseType
            }}</text>
					<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
				</view>
			</view>
			<view @click="showCity" class="flex justify-between align-center" style="
			  height: 100rpx;
			  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
			">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">城 市</text>
				<view class="flex align-center">
					<text style="color: #333; font-size: 28rpx">{{
			   City == "" ? "请选择城市" : City
			  }}</text>
					<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
				</view>
			</view>
			<view @click="skipProjectLocation" class="flex justify-between align-center" style="
			  height: 100rpx;
			  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
			">
				<text style="color: #101010; font-size: 28rpx; font-weight: bold">地 址</text>
				<view class="flex align-center">
					<text style="color: #333; font-size: 28rpx">{{DataList.ProjectLocation.address}}</text>
					<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
				</view>
			</view>


			<view class="flex align-center justify-center" style="height: 150rpx">
				<u-button @click="Submit" type="warning" style="width: 640rpx; height: 80rpx; font-size: 26rpx">保存房产
				</u-button>
			</view>
		</view>

		<u-picker mode="region" :params="params" v-model="show" @confirm="confirm"></u-picker>
		<u-select v-model="showSelect" mode="mutil-column" :list="TypeConfirmList" @confirm="HouseTypeConfirm">
		</u-select>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				DecorationType: 1, //装修类型 1表示新房装修、2表示房屋改造 默认选中第一个
				showSelect: false,
				cover: "",
				TypeConfirmList: [
					[{
							value: "1",
							label: "1室",
						},
						{
							value: "2",
							label: "2室",
						},
						{
							value: "3",
							label: "3室",
						},
						{
							value: "4",
							label: "4室",
						},
						{
							value: "5",
							label: "5室",
						},
					],
					[{
							value: "6",
							label: "0厅",
						},
						{
							value: "7",
							label: "1厅",
						},
						{
							value: "8",
							label: "2厅",
						},
						{
							value: "9",
							label: "3厅",
						},
						{
							value: "10",
							label: "4厅",
						},
						{
							value: "11",
							label: "5厅",
						},
					],
					[{
							value: "12",
							label: "0厨",
						},
						{
							value: "13",
							label: "1厨",
						},
						{
							value: "14",
							label: "2厨",
						},
						{
							value: "15",
							label: "3厨",
						},
						{
							value: "16",
							label: "4厨",
						},
						{
							value: "17",
							label: "5厨",
						},
					],
					[{
							value: "18",
							label: "0卫",
						},
						{
							value: "19",
							label: "1卫",
						},
						{
							value: "20",
							label: "2卫",
						},
						{
							value: "21",
							label: "3卫",
						},
						{
							value: "22",
							label: "4卫",
						},
					],
					[{
							value: "23",
							label: "0阳台",
						},
						{
							value: "24",
							label: "1阳台",
						},
						{
							value: "25",
							label: "2阳台",
						},
						{
							value: "26",
							label: "3阳台",
						},
						{
							value: "27",
							label: "4阳台",
						},
						{
							value: "28",
							label: "5阳台",
						},
					],
				],
				City: "",
				CityCode: "",
				Area: "",
				CommunityName: "",
				HouseType: "",
				border: false,
				show: false,
				params: {
					province: true,
					city: true,
					area: false,
				},
				w: 0,
				h: 0,
				disabled: false,
				btnWidth: 180,
				DataList: {
					cover: "",
					"ProjectLocation": "" //项目位置
				}

			};
		},
		methods: {
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(500);
				// 最大高度 px
				let maxH = uni.upx2px(350);
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW;
					this.h = h;
					return;
				}
				this.h = maxH;
				let w2 = maxH * (w / h);
				this.w = w2 <= maxW ? w2 : maxW;
			},
			ChangeTheCover() {
				// 跳转到图片裁剪界面
				uni.navigateTo({
					url: '/uview-ui/components/u-avatar-cropper/upload-cover-image?img=' + this.cover
				})

			},
			// 跳转到项目位置界面
			skipProjectLocation() {
				uni.navigateTo({
					url: '/pages/tabBar/my/identityauthentication/NewPropertys/ProjectLocation?title="fdsafdsafds"'
				});
			},
			// 选择小区
			ResidentialQuarters() {
				console.log("选择小区");
				// 跳转到小区列表
				uni.navigateTo({
					url: "/pages/tabBar/settle/CellList",
				});
			},
			ShowHouseType() {
				this.showSelect = true;
			},
			HouseTypeConfirm(e) {
				console.log(e);
				this.HouseType =
					e[0].label + e[1].label + e[2].label + e[3].label + e[4].label;
			},
			//显示城市选择下拉框【省、市】
			showCity() {
				this.show = true;
			},
			confirm(e) {
				console.log(JSON.stringify(e));
				this.City = e.province.label + "-" + e.city.label;
				this.CityCode = e.city.value;
			},
			// 跳转到计算结果界面
			Submit() {
				var _self = this;

				if (_self.City == "") {
					_self.$refs.uToast.show({
						title: "请选择城市!",
						type: "warning",
					});
					return;
				}

				if (_self.CommunityName == "") {
					_self.$refs.uToast.show({
						title: "请输入小区!",
						type: "warning",
					});
					return;
				}

				if (_self.HouseType == "") {
					_self.$refs.uToast.show({
						title: "请选择户型!",
						type: "warning",
					});
					return;
				}

				if (_self.Area == "") {
					_self.$refs.uToast.show({
						title: "请输入面积!",
						type: "warning",
					});
					return;
				}
				if (_self.DataList.cover == "") {
					_this.$refs.uToast.show({
						title: "请设置封面!",
						type: "warning",
					});
					return;
				}
				if (_self.DataList.ProjectLocation.address == "") {
					_this.$refs.uToast.show({
						title: "请选择地址!",
						type: "warning",
					});
					return;
				}
				var ProductList = _self.AJB.BizUrl + "api/House/CreateHouse";
				var ProductListDatas = {
					CityName: _self.City,
					CityCode: _self.CityCode,
					HouseType: _self.HouseType,
					Area: _self.Area,
					cover: _self.DataList.cover,
					address: _self.DataList.ProjectLocation.address,
					longitude: _self.DataList.ProjectLocation.longitude,
					latitude: _self.DataList.ProjectLocation.latitude,
					CommunityName: _self.CommunityName
				};
				_self.AJB.UniAjax(ProductList, ProductListDatas)
					.then((res) => {
						console.log(JSON.stringify(res));
						if (res.code == 200) {
							uni.navigateTo({
								url: '/pages/tabBar/my/Index/HouseProperty'
							});
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
	};
</script>

<style>
	.Selection {
		border: 1px solid #ff9900;
		background-color: #fff8f1;
		color: #ff9900;
	}

	.NoSelection {
		border: 1px solid rgba(187, 187, 187, 0.6);
		background-color: #ffffff;
		color: rgba(187, 187, 187, 0.6);
	}
</style>
