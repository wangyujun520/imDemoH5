<template>
	<view class="content" v-if="DataList">
		<u-toast ref="uToast" />
		<view class="bg-white px-3">
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 150rpx;">
					<text style="font-size: 30rpx;color: #101010;">银行卡号</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<!-- <input type="text" maxlength="18" style="font-size: 28rpx;color: #777;" placeholder="请填写银行卡号" v-model="DataList.bankCardNumber" /> -->
					<text style="font-size: 28rpx;color: #101010;" v-if=" DataList.bankCardNumber == null">自动识别</text>
					<text style="font-size: 28rpx;color: #777;">{{DataList.bankCardNumber}}</text>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 150rpx;">
					<text style="font-size: 30rpx;color: #101010;">支行名称</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" maxlength="18" style="font-size: 28rpx;color: #777;" placeholder="请填写支行名称" v-model="DataList.bankBranch" />
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 150rpx;">
					<text style="font-size: 30rpx;color: #101010;">开户银行</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<!-- <input type="text" maxlength="18" style="font-size: 28rpx;color: #777;" placeholder="请填写开户银行" v-model="DataList.bankOfDeposit" /> -->
					<text style="font-size: 28rpx;color: #101010;" v-if=" DataList.bankOfDeposit == null">自动识别</text>
					<text style="font-size: 28rpx;color: #777;">{{DataList.bankOfDeposit}}</text>
				</view>
			</view>
		</view>
		<view class="flex flex-column mt-2">
			<!-- <view class="flex align-center" style="height: 100rpx;padding: 0 50rpx;">
				<text>上传银行卡正面</text>
			</view> -->
			<view class="flex justify-center">
				<view v-if="DataList.bankCardPositive == null" @click="PositiveUpload" class="rounded IdImg bg-white">
					<view v-if="DataList.bankCardPositive == null" class="flex flex-column justify-center align-center" style="width: 100%;height: 100%;">
						<image src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"></image>
						<text style="color: #101010;font-size: 26rpx;" class="mt-2">上传银行卡</text>
					</view>
				</view>
				<view v-else @click="PositiveUpload" class="rounded IdImg bg-white" :style="{backgroundImage:'url('+DataList.bankCardPositive+')'}">
				</view>
			</view>
		</view>
		
		
		<!-- <view class="flex flex-column">
			<view class="flex align-center" style="height: 100rpx;padding: 0 50rpx;">
				<text>上传银行卡反面</text>
			</view>
			<view class="flex justify-center">
				<view v-if="DataList.bankBack == null" @click="BackUpload" class="rounded IdImg bg-white">
					<view v-if="DataList.bankBack == null" class="flex flex-column justify-center align-center" style="width: 100%;height: 100%;">
						<image src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"></image>
						<text style="color: #101010;font-size: 26rpx;" class="mt-1">点击添加银行卡背面照片</text>
					</view>
				</view>
				<view v-else @click="BackUpload" class="rounded IdImg bg-white" :style="{backgroundImage:'url('+DataList.bankBack+')'}">
				</view>
			</view>
		</view> -->
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
		</view>
	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	import { pathToBase64, base64ToPath } from '@/common/imgBasetoPath/index.js'; //base64转换路径
	const PPOCR = uni.requireNativePlugin('PP-BaiduOCR'); //OCR识别
	export default {
		data() {
			return {
				DataList:''
			}
		},
		onShow() {
			//获取银行卡信息
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/GetBankInfo';
			var RequrestDatas = {};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
				console.log(JSON.stringify(res));
				this.DataList = res.dataList;
			})
			.catch(err => {
				console.log(err);
			});
		},
		onLoad() {

		},
		onReady() {

		},
		methods: {
			// 上传银行卡正面
			PositiveUpload() {
				// console.log("银行卡正面点击事件")
				// uni.chooseImage({
				// 	count: 1, //最多可以选择的图片张数，默认9
				// 	// sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
				// 	sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
				// 	sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
				// 	success: res => {
				// 		//成功则返回图片的本地文件路径列表 tempFilePaths
				// 		// 上传阿里云开始
				// 		var ImgSplits = JSON.stringify(res.tempFilePaths).split(',');
				// 		var ImgSplit = JSON.parse(ImgSplits);
				// 		// console.log(ImgSplit);
				// 		var uploads = [];
				// 		for (let k = 0; k < ImgSplit.length; k++) {
				// 			let imgSrc = ImgSplit[k];
				// 			let pos = imgSrc.lastIndexOf('.');
				// 			let filename = imgSrc.substring(0, pos); // 文件名
				// 			let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
				// 			var date = new Date();
				// 			var year = date.getFullYear();
				// 			var month = date.getMonth() + 1;
				// 			var day = date.getDate();
				// 			if (day < 10) {
				// 				day = '0' + day;
				// 			}
				// 			if (month < 10) {
				// 				month = '0' + month;
				// 			}
				// 			var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
				// 			var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
				// 			console.log(fuleFileName);
				// 			var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
				// 			uploads.push(SuccessUrlImg);
				// 		}
				// 		Promise.all(uploads).then(response => {
				// 			this.DataList.bankCardPositive = response[0];
				// 			console.log(JSON.stringify(response[0]));
				// 			// 调用图片发送方法
				// 			// this.ImagesSend(response);
				// 		});
				// 	}
				// });
				
				// var _self = this;
				
				//根据指令编号开启不同类型的识别扫描，如：112车牌扫描 银行卡识别  111
				PPOCR.CustomOrder({
						"order": 111
					}, result => {
					/*这里result返回sdk返回的结果集*/
					console.log(JSON.stringify(result))
					// 银行卡号
					this.DataList.bankCardNumber = result.data.result.bank_card_number.replace(/[^0-9]/ig, "");//去除空格
					
					// this.DataList.bankCardNumber = this.DataList.bankCardNumber.replace(/[^0-9]/ig, "");//去除空格
					// 开户银行
					this.DataList.bankOfDeposit = result.data.result.bank_name;
					// 银行卡图片
					// this.DataList.bankCardPositive = "data:image/png;base64," + result.imgbase64;
					var Positive = "data:image/png;base64," + result.imgbase64;
					
					uni.showLoading({
						title: '银行卡上传中'
					});
					
					base64ToPath(Positive).then(path => {
						console.log(path);
						// 上传阿里云开始
						var ImgSplit = [];
						ImgSplit.push(path);
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
							uni.hideLoading();
							this.DataList.bankCardPositive = response[0];
							console.log(JSON.stringify(response[0]));
						});
						
						
					}).catch(error => {
						console.log(error)
					})
					
				});
				
				// var numbers = "6226 1920 0975 9317";
				// console.log(numbers)
				// // console.log(number.trim());
				// const number = numbers.replace(/[^0-9]/ig, "");//去除空格
				// console.log(number)

			},
			// 上传银行卡背面
			// BackUpload() {
			// 	// console.log("银行卡背面点击事件")
			// 	uni.chooseImage({
			// 		count: 1, //最多可以选择的图片张数，默认9
			// 		// sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
			// 		sizeType: ['compressed'], //original 原图，compressed 压缩图，默认二者都有
			// 		sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			// 		success: res => {
			// 			//成功则返回图片的本地文件路径列表 tempFilePaths
			// 			// 上传阿里云开始
			// 			var ImgSplits = JSON.stringify(res.tempFilePaths).split(',');
			// 			var ImgSplit = JSON.parse(ImgSplits);
			// 			// console.log(ImgSplit);
			// 			var uploads = [];
			// 			for (let k = 0; k < ImgSplit.length; k++) {
			// 				let imgSrc = ImgSplit[k];
			// 				let pos = imgSrc.lastIndexOf('.');
			// 				let filename = imgSrc.substring(0, pos); // 文件名
			// 				let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
			// 				var date = new Date();
			// 				var year = date.getFullYear();
			// 				var month = date.getMonth() + 1;
			// 				var day = date.getDate();
			// 				if (day < 10) {
			// 					day = '0' + day;
			// 				}
			// 				if (month < 10) {
			// 					month = '0' + month;
			// 				}
			// 				var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
			// 				var fuleFileName = 'Anjubang' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
			// 				console.log(fuleFileName);
			// 				var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
			// 				uploads.push(SuccessUrlImg);
			// 			}
			// 			Promise.all(uploads).then(response => {
			// 				this.DataList.bankBack = response[0];
			// 				console.log(JSON.stringify(response[0]));
			// 				// 调用图片发送方法
			// 				// this.ImagesSend(response);
			// 			});
			// 		}
			// 	});
			// },
			//提交按钮点击事件
			Submit(){
				// 非空验证
				if(this.DataList.bankCardNumber == "" || this.DataList.bankCardNumber == null){
					this.$refs.uToast.show({
						// title: '请填写银行卡号',
						title: '请上传银行卡',
						type: 'warning'
					})
					return;
				}
				// if (!/^([1-9]{1})(\d{15}|\d{18})$/.test(this.DataList.bankCardNumber)) {
				// 	this.$refs.uToast.show({
				// 		title: '请填写正确的银行卡号',
				// 		type: 'warning'
				// 	})
				// 	return;
				// }
				if(this.DataList.bankBranch == "" || this.DataList.bankBranch == null){
					this.$refs.uToast.show({
						title: '请填写支行名称',
						type: 'warning'
					})
					return;
				}
				if(this.DataList.bankOfDeposit == "" || this.DataList.bankOfDeposit == null){
					this.$refs.uToast.show({
						// title: '请填写开户银行',
						title: '请上传银行卡',
						type: 'warning'
					})
					return;
				}
				if(this.DataList.bankCardPositive == "" || this.DataList.bankCardPositive == null){
					this.$refs.uToast.show({
						// title: '请上传银行卡正面',
						title: '请上传银行卡',
						type: 'warning'
					})
					return;
				}
				// if(this.DataList.bankBack == "" || this.DataList.bankBack == null){
				// 	this.$refs.uToast.show({
				// 		title: '请上传银行卡背面',
				// 		type: 'warning'
				// 	})
				// 	return;
				// }
				
				//修改银行卡信息
				var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/SetBankInfo';
				
				var RequrestDatas = {
				  "bankCardNumber": this.DataList.bankCardNumber,
				  "bankBranch": this.DataList.bankBranch,
				  "bankOfDeposit": this.DataList.bankOfDeposit,
				  "bankCardPositive": this.DataList.bankCardPositive,
				  "bankBack": ''
				};
				// console.log(JSON.stringify(RequrestDatas))
				this.AJB.UniAjax(RequrestUrl, RequrestDatas).then(res => {
					console.log(res);
					if(res.code == 200){
						this.$refs.uToast.show({
							title: '提交成功',
							type: 'success'
						})
						setTimeout(()=>{
							// 两秒之后返回上一个界面
							uni.navigateBack({
								delta:1
							})
						},2000);
					}else{
						this.$refs.uToast.show({
							title: '提交失败',
							type: 'error'
						})
					}
				})
				.catch(err => {
					console.log(err);
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.IdImg {
		width: 640rpx;
		height: 380rpx;
		background-size: 100% 100%;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>