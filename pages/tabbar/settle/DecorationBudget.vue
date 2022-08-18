<template>
	<view class="content p-2">
		<view class="flex flex-column">
			<view
				style="background-image: url(http://oss.anjubang.cn/20220622233032.png);background-size: 100% 100%;height: 300rpx;">
				<view class="flex flex-column align-center justify-center"
					style="width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.3);">
					<text style="color: #ffffff; font-size: 40rpx; font-weight: bold">10秒快速获取专属报价清单</text>
					<text style="color: #ffffff; font-size: 28rpx; font-weight: bold" class="mt-3">专业 / 公正 / 透明</text>
				</view>
			</view>

			<view class="flex flex-column bg-white rounded px-2 pb-2">
				<view @click="showCity" class="flex justify-between align-center" style="
            height: 100rpx;
            border-bottom: 1px solid rgba(187, 187, 187, 0.2);
          ">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">城市</text>
					<view class="flex align-center">
						<text style="color: #333; font-size: 28rpx">{{
              City == "" ? "请选择城市" : City
            }}</text>
						<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
					</view>
				</view>
				<view class="flex justify-between align-center" style="
            height: 100rpx;
            border-bottom: 1px solid rgba(187, 187, 187, 0.2);
          ">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">小区</text>
					<view class="flex align-center" @tap="ResidentialQuarters">
						<text style="color: #333;font-size: 28rpx;">{{xqList.name ||'请选择你房屋的小区'}}</text>
						<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #333;">&#xe656;</text>
					</view>
					<!-- <view class="flex align-center">
            <u-input
              :clearable="false"
              v-model="CommunityName"
              type="text"
              :border="border"
              input-align="right"
              placeholder="请输入您房屋的小区"
            />
          </view> -->
				</view>
				<view @click="ShowHouseType" class="flex justify-between align-center" style="
            height: 100rpx;
            border-bottom: 1px solid rgba(187, 187, 187, 0.2);
          ">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">户型</text>
					<view class="flex align-center">
						<text style="color: #333; font-size: 28rpx">{{
              HouseType == "" ? "请选择户型" : HouseType
            }}</text>
						<text class="iconfont" style="font-weight: bold; font-size: 40rpx; color: #333">&#xe656;</text>
					</view>
				</view>
				<view class="flex justify-between align-center" style="
            height: 100rpx;
            border-bottom: 1px solid rgba(187, 187, 187, 0.2);
          ">
					<text style="color: #101010; font-size: 28rpx; font-weight: bold">面积</text>
					<view class="flex align-center">
						<u-input :clearable="false" v-model="Area" type="number" :border="border" input-align="right"
							placeholder="请输入您的房屋面积" />
						<text class="ml-1" style="font-size: 30rpx; color: #333">㎡</text>
					</view>
				</view>

				<view class="flex justify-between px-2 align-center" style="height: 140rpx">
					<view :class="DecorationType == 1 ? 'Selection' : 'NoSelection'"
						class="rounded flex align-center justify-center" style="height: 80rpx; width: 280rpx">
						<text @click="SelectWork(1)" style="font-size: 26rpx">新房装修</text>
					</view>
					<view :class="DecorationType == 2 ? 'Selection' : 'NoSelection'"
						class="rounded flex align-center justify-center" style="height: 80rpx; width: 280rpx">
						<text @click="SelectWork(2)" style="font-size: 26rpx">房屋改造</text>
					</view>
				</view>

				<view class="flex align-center justify-center" style="height: 150rpx">
					<u-button @click="Submit" type="warning" style="width: 640rpx; height: 80rpx; font-size: 26rpx">立即计算
					</u-button>
				</view>
			</view>
		</view>

		<u-picker mode="region" :params="params" v-model="show" @confirm="confirm"></u-picker>
		<u-select v-model="showSelect" mode="single-column" :list="TypeConfirmList" @confirm="HouseTypeConfirm">
		</u-select>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onShow() {
			this.TypeConfirmList = []; //清空
			//获取户型
			this.$post(this.$url.Public.GetDicts, {
				key: "house_catalog"
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					res.data.forEach(item => {
						let newData = {
							label: item.value,
							value: item.key
						}
						this.TypeConfirmList.push(newData)
					})
				}
			})
		},
		data() {
			return {
				xqList: {
					id: "",
					name: "",
					address: ""
				},
				DecorationType: 1, //装修类型 1表示新房装修、2表示房屋改造 默认选中第一个
				showSelect: false,
				TypeConfirmList: [],
				City: "",
				CityCode: "",
				Area: "",
				CommunityName: "",
				HouseType: "",
				HouseTypeValue: '', //上传接口使用
				border: false,
				show: false,
				params: {
					province: true,
					city: true,
					area: false,
				},
			};
		},
		methods: {
			// 选择小区
			ResidentialQuarters() {
				// 判断区域编码,如果为空请选择城市
				if (this.CityCode == '') {
					uni.showToast({
						title: '请选择城市',
						icon: 'none',
						duration: 2000
					})
					return false;
				}
				// 跳转到小区列表
				uni.navigateTo({
					url: "/pages/tabbar/settle/CellList?citycode=" + this.CityCode + '&city=' + this.City,
				});
			},
			ShowHouseType() {
				this.showSelect = true;
				// console.log(this.CommunityName);
				// //跳转到户型选择界面
				// uni.navigateTo({
				// 	url: "/pages/tabbar/settle/HouseTypeSelection?CityCode=" +
				// 		this.CityCode +
				// 		"&name=" +
				// 		this.CommunityName,
				// });
			},
			HouseTypeConfirm(e) {
				console.log(e);
				this.HouseType = e[0].label
				this.HouseTypeValue = e[0].value
				// 	e[0].label + e[1].label + e[2].label + e[3].label + e[4].label;
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
			// 新房装修,房屋改造切换
			SelectWork(type) {
				// console.log(type);
				this.DecorationType = type;
				// console.log("新房装修,房屋改造切换");
			},
			// 跳转到计算结果界面
			Submit() {
				var _this = this;
				if (_this.City == "") {
					_this.$refs.uToast.show({
						title: "请选择城市",
						type: "warning",
					});
					return;
				}

				if (_this.xqList.name == "") {
					_this.$refs.uToast.show({
						title: "请选择小区",
						type: "warning",
					});
					return;
				}

				if (_this.HouseType == "") {
					_this.$refs.uToast.show({
						title: "请选择户型",
						type: "warning",
					});
					return;
				}

				if (_this.Area == "") {
					_this.$refs.uToast.show({
						title: "请输入房屋面积",
						type: "warning",
					});
					return;
				}
				
				
				let datas = {
					area_code: this.CityCode, //区域代码
					esate_id: this.xqList.id, //楼盘id
					area: this.Area, //面积
					house_catalog: this.HouseTypeValue, //户型
					catalog:this.DecorationType
				}
				uni.navigateTo({
					url:'/pages/tabbar/settle/CalculationResults?datas='+encodeURIComponent(JSON.stringify(datas))
				})
				
				// uni.navigateTo({
				// 	url: "/pages/tabbar/settle/CalculationResults?area=" +
				// 		this.Area +
				// 		"&cityCode=" +
				// 		this.CityCode +
				// 		"&cityName=" +
				// 		this.City +
				// 		"&decorationType=" +
				// 		this.DecorationType,
				// });
				
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
