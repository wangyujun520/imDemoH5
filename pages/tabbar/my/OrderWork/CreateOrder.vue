<template>
	<view class="content">
		<view class="bg-white px-3 mt-2">
			<view class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">业主姓名</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="text" style="font-size: 28rpx; color: #777" placeholder="请输入业主姓名"
						v-model="DataList.name" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777"></text>
				</view>
			</view>
			<view class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">联系电话</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="text" style="font-size: 28rpx; color: #777" placeholder="请输入业主手机号码"
						v-model="DataList.mobile" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777"></text>
				</view>
			</view>

			<view @click="ShowHouseType" class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">房屋户型</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<text style="color: #333; font-size: 28rpx">{{
						  DataList.house_catalog_text == "" ? "请选择户型" : DataList.house_catalog_text
						}}</text>
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx">
					<u-icon name="arrow-right" style="font-size: 28rpx; color: #777"></u-icon>
				</view>
			</view>

			<view class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">建筑面积</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="number" style="font-size: 28rpx; color: #777" placeholder="请输入建筑面积" v-model="DataList.area" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777">㎡</text>
				</view>
			</view>
			<view class="flex align-center" style="
			  height: 120rpx;
			  border-bottom: 1px solid rgba(187, 187, 187, 0.2);
			">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">交易金额</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="text" style="font-size: 28rpx; color: #777" placeholder="请输入交易金额"
						v-model="DataList.money" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777"></text>
				</view>
			</view>
			<view class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">楼盘名称</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="text" style="font-size: 28rpx; color: #777" placeholder="请输入楼盘名称"
						v-model="DataList.estate_title" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777"></text>
				</view>
			</view>

			<!-- <view class="flex align-center" @click="AddressSelect" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">楼盘地址</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input v-if="AddressInfo.name" disabled="disabled" type="text" v-model="AddressInfo.name" style="font-size: 28rpx;color: #777;" />
					<input v-else disabled="disabled" type="text" style="font-size: 28rpx;color: #777;" placeholder="请选择楼盘地址" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<text class="iconfont" style="font-size: 40rpx;color: #777;">&#xe65e;</text>
				</view>
			</view> -->

			<view class="flex align-center" style="
          height: 120rpx;
          border-bottom: 1px solid rgba(187, 187, 187, 0.2);
        ">
				<view class="form-title" style="width: 140rpx">
					<text style="font-size: 30rpx; color: #101010">楼盘地址</text>
				</view>
				<view class="form-input" style="width: 500rpx">
					<input type="text" style="font-size: 28rpx; color: #777" placeholder="请输入楼盘地址" v-model="DataList.address" />
				</view>
				<view class="form-icon flex justify-end" style="width: 70rpx">
					<text class="iconfont" style="font-size: 30rpx; color: #777"></text>
				</view>
			</view>
		</view>

		<view class="flex align-center justify-center" style="height: 150rpx">
			<u-button @click="CreateOrder" type="warning" style="width: 640rpx; height: 80rpx; font-size: 26rpx">保存</u-button>
		</view>

		<!-- <u-select v-model="showSelect" :list="list" mode="single-column" @confirm="confirm"></u-select> -->
		<!-- 户型 -->
		<u-select v-model="showSelect" mode="single-column" :list="HouseList" @confirm="HouseTypeConfirm"></u-select>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				DataList:{
					id: "", //数据id
					status: 0,//写死
					name: "",
					mobile: "", //手机号码
					house_catalog: '',
					house_catalog_text: "",
					area: "",
					estate_title: "",
					money: '',
					address: ""
				},
				showSelect: false,
				HouseList: [], //楼盘类型
				HouseType: "", //房屋户型
				house_catalog: '', //接口使用
				list: [{
						value: "1",
						label: "一室",
					},
					{
						value: "2",
						label: "二室",
					},
					{
						value: "3",
						label: "三室",
					},
					{
						value: "4",
						label: "四室",
					},
					{
						value: "5",
						label: "五室",
					},
					{
						value: "6",
						label: "五室以上",
					},
				],
				AddressInfo: {},
				OwnerName: "",
				OwnerTel: "",
				Area: 0,
				CommunityName: "",
				Address: "",
			};
		},
		onShow() {
			this.GetDataDictionary();
		},
		onLoad(options) {
			
			if((options.id??'')!=''){
				uni.setNavigationBarTitle({
					title: '编辑订单'
				});
				// 编辑功能，回显数据
				this.$post(this.$url.Sale.GetOrder, {
					id: options.id
				}, {}).then(res => {
					this.DataList = res.data;
				})
			}else{
				uni.setNavigationBarTitle({
					title: '创建订单'
				});
			}
		},
		methods: {
			// 获取数据字典
			GetDataDictionary() {
				this.HouseList = [];
				// 获取户型
				this.$post(this.$url.Public.GetDicts, {
					key: 'house_catalog'
				}, {}).then(res => {
					if (res.code == 200 && res.status == 0) {
						res.data.forEach(item => {
							let house = {
								value: item.key,
								label: item.value
							}
							this.HouseList.push(house)
						})
					}
				})
			},
			HouseTypeConfirm(e) {
				this.DataList.house_catalog_text = e[0].label
				this.DataList.house_catalog = e[0].value
			},
			ShowHouseType() {
				this.showSelect = true;
			},
			openingTime() {
				this.showSelect = true;
			},
			confirm(e) {
				console.log(JSON.stringify(e));
				this.HouseType = e[0].label;
			},
			AddressSelect() {
				// 跳转到地址选择界面
				uni.navigateTo({
					url: "/pages/tabBar/my/OrderWork/MapSearch",
				});
			},
			CreateOrder() {
				// Sale
				// UpdateOrder
				
				console.log(JSON.stringify(this.DataList));

				// let requestData = {
				// 	id: this.id, //订单id
				// 	status: 0, //状态；-1=订单作废
				// 	name: "李先生", //姓名
				// 	mobile: "18888888888", //手机号码
				// 	house_catalog: 1,
				// 	area: 120,
				// 	estate_title: "福地广场",
				// 	address: "天府广场路132号" //项目地址
				// }
				// 提交接口
				let TipsText = '新增';
				if (this.id!='') {
					TipsText = '修改'
				}
				this.$post(this.$url.Sale.UpdateOrder, this.DataList, {
					isLoading: true,
					loadingTitle: `${TipsText}中...`
				}).then(res => {
					// console.log(123)
					if (res.code == 200 && res.status == 0) {
						this.$refs.uToast.show({
							title: `${TipsText}成功`,
							type: 'success'
						});
						setTimeout(() => {
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta: 1
							});
						}, 2000)
					}
				});

			},
		},
	};
</script>

<style lang="scss" scoped>
	// 隐藏scroll-view的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>
