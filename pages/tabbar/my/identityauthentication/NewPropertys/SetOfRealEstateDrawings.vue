<template>
	<view class="content">
		<!-- <view class="bg-white flex p-2">
			<textarea v-model="title" placeholder="请录入楼盘名称" class="w-100" style="font-size: 28rpx;"/>
		</view> -->

		<!-- 上传图片 -->
		<upload-imgs @upload="upload"></upload-imgs>

		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from "@/components/push-img/get-imgs.vue";
	// import uploadImgs from "@/components/push-img/getset-imgs.vue";
	import OssUpload from "@/utils/UploadOss/OssUpload.js";
	export default {
		components: {
			uploadImgs
		},
		data() {
			return {
				photos: [],
				photos1: ""
			}
		},
		onLoad(options) {
			// this.photos = options.title;
		},
		methods: {
			upload(arr) {
				this.photos = arr;
			},
			Submit() {
				if (this.photos == '') {
					this.$refs.uToast.show({
						title: '请上传楼盘图片',
						type: 'warning'
					})
					return;
				}
				// 上传阿里云开始
				// console.log(ImgSplit);
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
					var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' +
						extendName; //202003021583151162210.jpg
					var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					console.log(fuleFileName);
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					// 调用图片发送方法
					// this.ImagesSend(response);
					let pages = getCurrentPages(); //获取所有页面栈实例列表
					let prevPage = pages[pages.length - 2]; //上一页页面实例
					prevPage.$vm.DataList.SetOfRealEstateDrawings = response; //修改上一页data里面的managingGoods参数值
					// 返回上一个界面
					uni.navigateBack({
						delta: 1
					})
				});
				
				

			}
		}
	}
</script>

<style>
</style>
