<template>
	<view class="content">
		<view class="bg-white px-3">
			<view @click="openingAddress" class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 80rpx;"><text style="font-size: 30rpx;color: #101010;">位置</text></view>
				<view class="form-input" style="width: 580rpx;">
					<input type="text" disabled="disabled" v-model="Address" style="font-size: 28rpx;color: #777;" placeholder="请选择位置" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<!-- <u-picker mode="Address" v-model="show" @confirm="confirm"></u-picker> -->

		<u-picker mode="region" :params="params" v-model="show" @confirm="confirm"></u-picker>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		onLoad: function(option) {
			this.Address = option.address;
		},
		data() {
			return {
				Address: "",
				AddressKey: "",
				show: false,
				params: {
					province: true,
					city: true,
					area: false
				}
			};
		},
		// onLoad(options) {
		// 	// console.log("数据"+options.likelist);
		// 	var List = JSON.parse(options.list);
		// 	console.log(List)

		// 	this.Address = List.openingAddress;
		// 	this.MainProducts = List.mainProducts;
		// },
		computed: {},
		onReady() {},
		methods: {
			openingAddress() {
				this.show = true
			},
			// confirm(e){
			// 	console.log(JSON.stringify(e))
			// 	this.Address = e.year +'-'+ e.month +'-'+ e.day;
			// },
			confirm(e) {
				console.log(JSON.stringify(e))
				this.AddressKey = e.city.value;
				this.Address = e.province.label + '-' + e.city.label;
			},
			Submit() {
				// 非空验证
				if (this.Address == "") {
					this.$refs.uToast.show({
						title: '请选择位置',
						type: 'warning'
					})
					return;
				}

				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.DataList.address = this.Address; //修改上一页data里面的searchVal参数值为1211
				prevPage.$vm.DataList.addresskey = this.AddressKey; //修改上一页data里面的searchVal参数值为1211
				uni.navigateBack({
					delta: 1
				})
			}
		}
	};
</script>

<style></style>
