<template>
	<view class="content">
		<!-- <view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请输入活动信息" class="w-100" style="font-size: 28rpx;"/>
		</view> -->
		<view class="bg-white px-3 mt-2">
			<view @click="openingTime" class="flex align-center"
				style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 200rpx;">
					<text style="font-size: 30rpx;color: #101010;">活动时间</text>
				</view>
				<view class="form-input" style="width: 440rpx;">
					<input disabled="disabled" v-model="time" type="text"
						style="font-size: 28rpx;color: #777;" placeholder="请选择活动时间" />
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
			</view>
			<view class="flex align-center"
				style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 200rpx;">
					<text style="font-size: 30rpx;color: #101010;">活动门店</text>
				</view>
				<view class="form-input" style="width: 440rpx;">
					<input v-model="store" type="text" style="font-size: 28rpx;color: #777;" placeholder="请填写门店" />
				</view>
				<!-- <view class="form-icon flex justify-end" style="width: 50rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view> -->
			</view>
			<view class="flex align-center"
				style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 200rpx;">
					<text style="font-size: 30rpx;color: #101010;">活动介绍</text>
				</view>
				<view class="form-input" style="width: 440rpx;">
					<input v-model="introduce" type="textarea" style="font-size: 28rpx;color: #777;" placeholder="请填写活动介绍" />
				</view>
				<!-- <view class="form-icon flex justify-end" style="width: 50rpx;">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view> -->
			</view>
		</view>
		<!-- 所在位置 -->
		<choose-map @changes="mapClick" title="活动地址"></choose-map>
		
		
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
		<!-- <u-picker mode="time" v-model="showDecorationTime" @confirm="confirm"></u-picker> -->
		<u-calendar v-model="showDecorationTime" :mode="time" max-date="2099-12-12" @change="confirm"></u-calendar>
	</view>
</template>

<script>
	import chooseMap from '@/components/choose-map/choose-map.vue';
	export default{
		data(){
			return{
				store:'',//门店
				introduce:'',//活动详情
				title:'',
				time:'',
				showDecorationTime:false,
				lng:'',
				lat:'',
				address:'',
				start_date:'',
				end_date:''
			}
		},
		onLoad(options) {
			this.title = options.title;
		},
		methods:{
			mapClick(item) {
				console.log(JSON.stringify(item));
				console.log(item.address);
				this.lng = item.longitude;
				this.lat = item.latitude;
				this.address = item.address;
			},
			openingTime() {
				this.showDecorationTime = true
			},
			confirm(e) {
				console.log(JSON.stringify(e))
				// this.time = e.year + '-' + e.month + '-' + e.day;
				this.time = e.startDate + '至' + e.endDate;
				this.start_date = e.startDate;
				this.end_date = e.endDate;
			},
			Submit(){
				if(this.time == ''){
					this.$refs.uToast.show({
						title: '请选择活动时间',
						type: 'warning'
					})
					return;
				}
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				console.log(prevPage.$vm.DataList);
				prevPage.$vm.DataList.start_date = this.start_date;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.end_date = this.end_date;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.address = this.address;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.lng = this.lng;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.lat = this.lat;//修改上一页data里面的managingGoods参数值
				
				prevPage.$vm.DataList.store = this.store;//修改上一页data里面的managingGoods参数值
				prevPage.$vm.DataList.introduce = this.introduce;//修改上一页data里面的managingGoods参数值
				
				
				
				
				// 返回上一个界面
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>
