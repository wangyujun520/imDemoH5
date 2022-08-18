<template>
	<view class="content">
		<!-- <view class="flex flex-column">
			<view class="flex align-center pl-3 bg-white" style="height: 100rpx;">
				<text style="color: #101010;font-size: 28rpx;">证件照正面</text>
			</view>
			<view class="bg-white px-3 py-2">
				<view class="flex flex-column align-center">
					<view class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-column">
			<view class="flex align-center pl-3 bg-white" style="height: 100rpx;">
				<text style="color: #101010;font-size: 28rpx;">证件照背面</text>
			</view>
			<view class="bg-white px-3 py-2">
				<view class="flex flex-column align-center">
					<view class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
				</view>
			</view>
		</view> -->
		<view class="flex flex-column">
			<view class="flex align-center pl-3 bg-white" style="height: 100rpx;">
				<text style="color: #101010;font-size: 28rpx;">证件照正面</text>
			</view>
			<view class="bg-white px-3 py-2">
				<view class="flex flex-column align-center" @click="uploadPositive">
					<view v-if="DataList.PositiveImg == ''" class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
					<!-- <image v-else :src="DataList.PositiveImg" style="height: 340rpx;width: 100%;"></image> -->
					<image v-else :src="DataList.PositiveImg" mode="aspectFit"></image>
				</view>
			</view>
		</view>
		<view class="flex flex-column">
			<view class="flex align-center pl-3 bg-white" style="height: 100rpx;">
				<text style="color: #101010;font-size: 28rpx;">证件照背面</text>
			</view>
			<view class="bg-white px-3 py-2">
				<view class="flex flex-column align-center" @click="uploadBack">
					<view v-if="DataList.BackImg == ''" class="flex justify-center align-center" style="height: 340rpx;width: 100%;border: 1px dashed #999;">
						<text style="color: #999;font-size: 28rpx;">选择图片</text>
					</view>
					<!-- <image v-else :src="DataList.BackImg" style="height: 340rpx;width: 100%;"></image> -->
					<image v-else :src="DataList.BackImg" mode="aspectFit"></image>
				</view>
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
				Auth: "" ,//需要认证的清单
				DataList:{
					"id": "",
					"PositiveImg": "",
					"BackImg": ""
				}
			};
		},
		onLoad(options) {
			// console.log("数据"+options.likelist);
			this.Auth = JSON.parse(options.auth);
			console.log(this.Auth)
		},
		onShow() {
			// 动态设置标题
			uni.setNavigationBarTitle({
			　　title:this.Auth[0].name+'认证'
			})
			this.DataList.id = this.Auth[0].id;
		},
		methods: {
			uploadPositive(){
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
							// 更换正面图片
							this.DataList.PositiveImg = response[0];
						});
					}
				});
				
			},
			uploadBack(){
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
							// 更换正面图片
							this.DataList.BackImg = response[0];
						});
					}
				});
			},
			Submit() {
				console.log("提交")
				//小工种认证提交
				var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/CertifiedLittleProfession';
				var RequrestDatas = {
				  "id":this.DataList.id,
				  "PositiveImg":this.DataList.PositiveImg,
				  "BackImg":this.DataList.BackImg
				};
				
				if(RequrestDatas.PositiveImg == ''){
					this.$refs.uToast.show({
						title: '请上传证件照正面',
						type: 'warning'
					})
					return;
				}
				if(RequrestDatas.BackImg == ''){
					this.$refs.uToast.show({
						title: '请上传证件照背面',
						type: 'warning'
					})
					return;
				}
				console.log(JSON.stringify(RequrestDatas))
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					if(res.code == 200){
						// this.$refs.uToast.show({
						// 	title: '提交成功',
						// 	type: 'success'
						// });
						// setTimeout(()=>{
							
						// },2000);
						
						// 认证成功
						for (let i in this.Auth) {
							if (this.Auth[i].id === this.Auth[0].id) {
								this.Auth.splice(i, 1);
								break;
							}
						}
						if(this.Auth.length>0){
							//跳转到下一个认证页面
							uni.navigateTo({
								url: '/pages/tabBar/my/identityauthentication/modify/WorkerTypeCertification?auth='+JSON.stringify(this.Auth)
							})
						}else{
							//认证完成(跳转到提交成功页面)
							uni.navigateTo({
								url: '/pages/tabBar/my/authentication/UnderReview'
							})
							
						}
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

<style lang="scss">

</style>
