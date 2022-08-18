<template>
	<view class="content">
		<view class="flex justify-center align-center py-2" style="background-color: #FDE0C8;">
			<text style="color: #EA8531;font-size: 26rpx;">用户喜欢你的图片，系统将把该方案推荐给客户</text>
		</view>
		<view class="flex flex-column align-center py-4" style="color: #888;">
			<view v-if="imgUrl==''" @click="UploadImg" class="bg-white flex align-center justify-center mb-2" style="width: 500rpx;height: 600rpx;">
				<text style="font-size: 200rpx;font-weight: bold;">+</text>
			</view>
			<image v-else :src="imgUrl" class="mb-2" style="width: 500rpx;height: 600rpx;"></image>
			<text>图片要求</text>
			<text>1. 图片大小1M以内</text>
			<text>2. 宽900像素 高1200像素</text>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="warning" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">确定</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default{
		onLoad(option) {
			this.imgUrl = option.styleTestPicture;
		},
		data(){
			return{
				imgUrl:''//图片路径
			}
		},
		methods:{
			UploadImg(){
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					// sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: res => {
						//成功则返回图片的本地文件路径列表 tempFilePaths
				
						// 上传阿里云开始
						var ImgSplits = JSON.stringify(res.tempFilePaths).split(',');
						var ImgSplit = JSON.parse(ImgSplits);
						// console.log(ImgSplit);
						var uploads = [];
						for (let k = 0; k < ImgSplit.length; k++) {
							let imgSrc = ImgSplit[k];
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
							var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
							console.log(fuleFileName);
							var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
							uploads.push(SuccessUrlImg);
						}
						Promise.all(uploads).then(response => {
							console.log(JSON.stringify(response));
							// 更换图片
							this.imgUrl = response[0];
						});
					}
				});
			},
			Submit(){
				console.log("提交")
				
				// 非空验证
				if(this.imgUrl == ""){
					this.$refs.uToast.show({
						title: '请上传图片',
						type: 'warning'
					})
					return;
				}
				
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.DataList.stylePicture = this.imgUrl;   //修改上一页data里面的searchVal参数值为1211
				
				// console.log(prevPage.$vm.DataList)
				uni.navigateBack({
					delta:1
				})
				
			}
		}
	}
</script>

<style>
</style>
