<template>
	<view class="content">
		<view class="flex justify-between align-center bg-white px-2"
			style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">保修期维修</text>
			<text style="color: #FF9900;font-size: 26rpx;">保修中</text>
		</view>

		<!-- <view class="flex bg-white px-2 align-center" style="height: 80rpx;">
			<text style="color: #939393;font-size: 26rpx;">订单：DDH2000132820200303</text>
		</view> -->

		<view class="bg-white pb-2 pt-1" style="border-bottom: 1px solid rgb(187,187,187,0.2);">
			<view class="flex px-2 pt-2">
				<view class="flex" style="width: 150rpx;height: 150rpx;">
					<image class="rounded" :src="DataList.cover" style="width: 100%;height: 100%;"></image>
				</view>
				<view class="flex flex-column pl-1" style="width: 550rpx;">
					<text class="LineBreak" style="color: #101010;font-size: 24rpx;">{{DataList.title}}</text>
					<text style="color: #939393;font-size: 26rpx;">订单号：{{DataList.order_no}}</text>
					<text class="my-1" style="color: #939393;font-size: 24rpx;">单价：<span style="color: #101010;"
							class="mr-2">¥{{DataList.price}}</span>购买数量：<span
							style="color: #101010;">{{DataList.count}}</span></text>
				</view>
			</view>
		</view>
		<!-- 上传图片 -->
		<upload-imgs @upload="upload"></upload-imgs>
		<view @click="openingTime" class="flex align-center bg-white px-2"
			style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="form-title" style="width: 140rpx;"><text style="font-size: 30rpx;color: #101010;">预约时间</text>
			</view>
			<view class="form-input" style="width: 500rpx;">
				<input type="text" disabled="disabled" v-model="Time" style="font-size: 28rpx;color: #777;"
					placeholder="请选择预约时间" />
			</view>
			<view class="form-icon flex justify-end" style="width: 50rpx;">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>

		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">预约</u-button>
		</view>
		<u-picker mode="time" v-model="show" @confirm="confirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from "@/components/push-img/get-imgs.vue";
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onLoad(options) {
			this.id = options.id;
			// 获取保修订单详情
			this.$post(this.$url.Service.GetOrder, {
				id: options.id
			}, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.DataList = res.data;
				}
			})
		},
		data() {
			return {
				id: '',
				show: false,
				Time: "",
				photos: "",
				DataList: {},
				files:''//上传使用
			}
		},
		components: {
			uploadImgs
		},
		methods: {
			upload(arr) {
				this.photos = arr;
				console.log(this.photos)
			},
			openingTime() {
				this.show = true
			},
			confirm(e) {
				console.log(JSON.stringify(e))
				this.Time = e.year + '-' + e.month + '-' + e.day;
			},
			Submit() {
				
				// 非空校验
				if(this.photos.length == 0){
					this.$refs.uToast.show({
						title: "请上传图片",
						type: "warning",
					});
					return;
				}
				if(this.Time == ''){
					this.$refs.uToast.show({
						title: "请选择预约时间",
						type: "warning",
					});
					return;
				}
				
				var uploads = [];
				for (let k = 0; k < this.photos.length; k++) {
					let imgSrc = this.photos[k];
					let pos = imgSrc.lastIndexOf('.');
					let filename = imgSrc.substring(0, pos); // 文件名
					let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (day < 10) {
						day = '0' + day;
					}
					if (month < 10) {
						month = '0' + month;
					}
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				
				Promise.all(uploads).then(response => {
					console.log(JSON.stringify(response));//上传成功的路径
					response.forEach(item=>{
						console.log(item)
						let imgTemp = item.split('.cn')[1];
						if(this.files == ''){
							this.files = imgTemp;
						}else{
							this.files = this.files+'|'+imgTemp;
						}
					})
					
					let requestData = {
						id: this.id, //订单商品id
						content: "", //问题内容
						photos: this.files, //问题图片
						date: this.Time //日期时间
					}
					// 保修预约
					this.$post(this.$url.Service.Order, requestData, {}).then(res => {
						if (res.code == 200 && res.status == 0) {
							// 跳转到预约成功界面
							uni.navigateTo({
								url: '/pages/tabbar/repair/AppointmentSuccessful'
							})
						}
					})
					
				});
				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #f7f7f7;
}
</style>
