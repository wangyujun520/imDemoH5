<template>
	<view class="content">
		<!-- <view class="flex align-center justify-center bg-white" style="height: 400rpx;">
			
		</view> -->
		
		<!-- 自定义导航栏 -->
		<!-- <u-navbar :is-back="true" :titleBold="true" title="">
			<view slot="right" class="flex align-center">
				<view class="flex align-center justify-center mr-3" style="border-radius: 30rpx;background-color: #FF9900;padding: 8rpx 30rpx;">
					<text @tap="Submit" class="text-white" style="font-size: 28rpx;">确定</text>
				</view>
			</view>
		</u-navbar> -->
		
		
		<view class="p-5 bg-white">
			<!-- 未上传样式 -->
			<view v-if="!ShowBusinessLicense" @tap="BusinessLicenseUpload" class="rounded position-relative p-1" style="width: 100%;height: 400rpx;border: 1px dashed #D6DDF2;">
				<image src="/static/img/ImageArchives/BusinessLicense.png" style="width: 100%;height: 100%;"></image>
				<view class="flex flex-column justify-center align-center position-absolute" style="width: 100%;height: 100%;top: 0;">
					<image src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #101010;font-size: 26rpx;" class="mt-1">点击添加营业执照</text>
				</view>
			</view>
			
			<!-- 已上传样式 -->
			<view v-else class="rounded p-1" style="width: 100%;height: 400rpx;border: 1px dashed #D6DDF2;">
				<image :src="BusinessLicenseImg" style="width: 100%;height: 100%;"></image>
			</view>
		</view>
		
		<view class="flex flex-column p-3">
			<text class="mb-2" style="font-size: 34rpx;font-weight: bold;">识别结果</text>
			
			<view v-if="ShowBusinessLicense" class="flex flex-column" style="font-size: 30rpx;">
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>社会信用代码</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.社会信用代码.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>单位名称</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.单位名称.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>类型</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.类型.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>法定代表人</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.法人.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>经营范围</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.经营范围.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>注册资本</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.注册资本.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>成立日期</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.成立日期.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>营业期限</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.有效期.words}}</text>
					</view>
				</view>
				<view class="flex list-row-item">
					<view style="width: 200rpx;">
						<text>住所</text>
					</view>
					<view style="width: 490rpx;">
						<text>{{DataList.地址.words}}</text>
					</view>
				</view>
			</view>
			
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
				BusinessLicenseImg:'',//营业执照图片
				ShowBusinessLicense:false,//是否上传
				DataList:''
			}
		},
		methods: {
			// 上传营业执照
			BusinessLicenseUpload(){
				 PPOCR.CustomOrder({"order": 123 }, result => {
					 /*这里result返回sdk返回的结果集*/
					 console.log(result)
					 console.log(JSON.stringify(result))
					 var Positive = 'data:image/png;base64,' + result.imgbase64;//base64图片
					 uni.showLoading({
					 	title: '证件上传中'
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
					 		this.BusinessLicenseImg = response[0];
					 		this.ShowBusinessLicense = true;
					 		console.log(JSON.stringify(response[0]));
					 	});
					 }).catch(error => {
					 	console.log(error)
					 })
					 this.DataList = result.data.words_result;
				 });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list-row-item{
		margin-top: 15rpx;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>