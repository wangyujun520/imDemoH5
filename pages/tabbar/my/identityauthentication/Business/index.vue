<template>
	<view>
		<uni-steps :options="list1" active-color="#FF9900" :active="active" />
		<view v-if="active==0">
			<view class="bg-white px-3">
				<view @click="openingTime" class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">开业时间</text></view>
					<view class="form-input" style="width: 500rpx;">
						<input type="text" disabled="disabled" v-model="Time" style="font-size: 28rpx;color: #777;" placeholder="请选择开业时间" />
					</view>
					<view class="form-icon flex justify-end" style="width: 50rpx;">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
				</view>
			
				<view class="flex py-3" style="height: 200rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">主营商品</text></view>
					<view class="form-input py-1 pl-1" style="width: 550rpx;background-color: #F7F7F7;">
						<textarea placeholder="请输入主营商品" v-model="MainProducts" style="font-size: 28rpx;color: #777;height: 130rpx;width: 100%;" />
						</view>
				</view>
			</view>
		</view>
		<view v-if="active==1">
			<view class="bg-white px-3 py-2">
				<view  class="flex flex-column align-center">
					<view class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
					<image  mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view v-if="active==2">
			<view class="bg-white px-3 py-2">
				<view class="flex flex-column align-center">
					<view  class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
					<image  mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view v-if="active==3">
			<view class="flex flex-column">
				<view class="bg-white px-3 py-2">
					<view class="flex flex-column align-center" >
						<view  class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
							<text style="color: #999;font-size: 28rpx;">选择图片</text>
						</view>
						<image  style="width: 100%;"></image>
					</view>
				</view>
			</view>
		</view>
		<button type="primary" @click="change">{{changeText}}</button>
		<u-picker mode="time" v-model="show" @confirm="confirm"></u-picker>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				changeText: "下一步",
				active: 0,
				list1: [{
						title: '基本信息'
					},
					{
						title: '手持身份证'
					},
					{
						title: '商铺门面照'
					},
					{
						title: '营业执照'
					}

				],
				Time:"",
				MainProducts:"",
				show:false,
			};
		},
		methods: {
			openingTime() {
				this.show = true
			},
			confirm(e){
				console.log(JSON.stringify(e))
				this.Time = e.year +'-'+ e.month +'-'+ e.day;
			},
			change() {
				if (this.active < this.list1.length - 1) {
					this.active += 1;
				}
				if (this.active > this.list1.length - 2) {
					this.changeText = "提交"
				}
				
			}
		}
	};
</script>
