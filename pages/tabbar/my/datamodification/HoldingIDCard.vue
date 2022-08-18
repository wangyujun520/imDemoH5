<template>
	<view class="content">
		<view class="bg-white px-3 py-2">
			<view @click="uploadHoldingIDCard" class="flex flex-column align-center">
				<view v-if="DataList.holdingIDCard == ''" class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
					<text style="color: #999;font-size: 28rpx;">选择图片</text>
				</view>
				<image v-else :src="DataList.holdingIDCard" mode="aspectFit"></image>
			</view>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
// 阿里云文件上传
import OssUpload from '@/utils/UploadOss/OssUpload.js';
export default {
	data() {
		return {
			DataList:''
		};
	},
	onShow() {
		// 获取手持身份证信息
		var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetMyHoldingIDCardDetail';
		var RequrestDatas = {};
		this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
			this.DataList = res.dataList;
			console.log(JSON.stringify(res))
		})
		.catch(err => {
			console.log(err);
		});
	},
	computed: {},
	onReady() {},
	methods: {
		uploadHoldingIDCard(){
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
						this.DataList.holdingIDCard = response[0];
					});
				}
			});
		},
		Submit(){
			// 获取商家认证首页信息
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetMyHoldingIDCardDetail';
			var RequrestDatas = this.DataList;
			if(this.DataList.holdingIDCard == ''){
				this.$refs.uToast.show({
					title: '请上传手持身份证',
					type: 'warning'
				})
				return;
			}
			console.log(JSON.stringify(RequrestDatas))
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
				if(res.code == 200){
					this.$refs.uToast.show({
						title: '提交成功',
						type: 'success'
					});
					setTimeout(()=>{
						//返回上一个界面
						uni.navigateBack({
							delta:1
						})
					},2000);
				}else{
					this.$refs.uToast.show({
						title: '提交失败',
						type: 'error'
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
		}
	}
};
</script>

<style>
</style>
