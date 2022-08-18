<template>
	<view class="content">
		<!-- <text>未实名认证</text> -->
		<u-toast ref="uToast" />
		<view class="bg-white px-3">
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 80rpx;"><text style="font-size: 30rpx;color: #101010;">姓名</text></view>
				<view class="form-input" style="width: 500rpx;">
					<text style="font-size: 28rpx;color: #101010;" v-if="Name == ''">自动识别</text>
					<input v-else maxlength="8" type="text" style="font-size: 28rpx;color: #777;" placeholder="请填写姓名" v-model="Name" />
				</view>
			</view>
			<!-- <view @click="GenderSelect" class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);"> -->
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 80rpx;"><text style="font-size: 30rpx;color: #101010;">性别</text></view>
				<view class="form-input" style="width: 570rpx;">
					<text style="font-size: 28rpx;color: #101010;" v-if="GenderShow == '' ">自动识别</text>
					<input v-else disabled="disabled" type="text" style="font-size: 28rpx;color: #777;" v-model="GenderShow" />
				</view>
				<!-- <view class="form-icon flex justify-end" style="width: 50rpx;"><u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon></view> -->
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 150rpx;"><text style="font-size: 30rpx;color: #101010;">证件类型</text></view>
				<view class="form-input" style="width: 500rpx;"><input type="text" disabled="disabled" v-model="CertificatesType" style="font-size: 28rpx;color: #444;" /></view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 150rpx;"><text style="font-size: 30rpx;color: #101010;">身份证号</text></view>
				<view class="form-input" style="width: 500rpx;">
					<text style="font-size: 28rpx;color: #101010;" v-if="IDNumber == ''">自动识别</text>
					<input v-else type="number" maxlength="18" style="font-size: 28rpx;color: #777;" placeholder="请填写身份证号" v-model="IDNumber" />
				</view>
			</view>
		</view>
		<view class="flex flex-column">
			<view class="flex align-center" style="height: 100rpx;padding: 0 50rpx;"><text>上传身份证正面</text></view>
			<view class="flex justify-center">
				<view @click="PositiveUpload" class="rounded IdImg" :style="{ backgroundImage: 'url(' + IDCardPositive + ')' }">
					<view v-if="ShowPositive" class="flex flex-column justify-center align-center" style="width: 100%;height: 100%;">
						<image src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"></image>
						<text style="color: #101010;font-size: 26rpx;" class="mt-1">点击添加身份证正面面照片</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-column">
			<view class="flex align-center" style="height: 100rpx;padding: 0 50rpx;"><text>上传身份证背面</text></view>
			<view class="flex justify-center">
				<view @click="BackUpload" class="rounded IdImg" :style="{ backgroundImage: 'url(' + IDCardBack + ')' }">
					<view v-if="ShowBack" class="flex flex-column justify-center align-center" style="width: 100%;height: 100%;">
						<image src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"></image>
						<text style="color: #101010;font-size: 26rpx;" class="mt-1">点击添加身份证背面照片</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex align-center justify-center" style="height: 150rpx;">
			<u-button @click="Submit" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button>
			<!-- <u-button @click="IMUpdate" type="primary" style="width: 640rpx;height: 80rpx;font-size: 26rpx;">提交</u-button> -->
		</view>

		<!-- 性别 -->
		<u-select v-model="show" :list="list" @confirm="confirm"></u-select>
	</view>
</template>

<script>
// 阿里云文件上传
import OssUpload from '@/utils/UploadOss/OssUpload.js';
import { pathToBase64, base64ToPath } from '@/common/imgBasetoPath/index.js'; //base64转换路径
// import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'; //base64转换路径
const PPOCR = uni.requireNativePlugin('PP-BaiduOCR'); //OCR识别
export default {
	data() {
		return {
			Name: '', //姓名
			GenderShow: '', //性别（1男0女）
			Gender: 0, //传递给后台
			CertificatesType: '身份证', //暂时不支持选择
			IDNumber: '', //身份证号
			IDCardPositive: '/static/img/ImageArchives/iv_idcard_front.png', //身份证正面默认背景图片
			IDCardBack: '/static/img/ImageArchives/iv_idcard_back.png', //身份证背面默认背景图片
			ShowPositive: true,
			ShowBack: true,
			show: false,
			list: [
				{
					value: 0,
					label: '女'
				},
				{
					value: 1,
					label: '男'
				}
			]
		};
	},
	onLoad() {},
	onReady() {},
	methods: {
		// 性别选择
		GenderSelect() {
			this.show = true;
		},
		confirm(e) {
			this.GenderShow = e[0].label; //绑定显示
			this.Gender = e[0].value; //传递给后台
		},
		// 上传身份证正面
		PositiveUpload() {
			//身份证正面
			PPOCR.IDFront(
				{
					auto: true
				},
				result => {
					// console.log(JSON.stringify(result));
					if (result.code == 200) {

						// this.address = result.data.address; //地址
						// this.ethnic = result.data.ethnic; //民族
						// this.birthday = result.data.birthday; //出生日期

						// this.gender = result.data.gender; //性别

						this.GenderShow = result.data.gender; //绑定显示
						this.Gender = result.data.gender=='女'?0:1; //传递给后台
						console.log(this.Gender);
						this.Name = result.data.name; //姓名
						this.IDNumber = result.data.idNumber; //身份证号
						
						// this.IDCardPositive = 'data:image/png;base64,' + result.imgbase64;//base64图片
						var Positive = 'data:image/png;base64,' + result.imgbase64;//base64图片
						
						// this.ShowPositive = false;
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
								this.IDCardPositive = response[0];
								this.ShowPositive = false;
								console.log(JSON.stringify(response[0]));
							});
							
							
						}).catch(error => {
							console.log(error)
						})
					
						
						
					}

					/*这里result返回sdk返回的结果集*/
				}
			);
			
			
		},
		// 上传身份证背面
		BackUpload() {
			//身份证反面
			PPOCR.IDBack(
				{
					auto: true
				},
				result => {
					/*这里result返回sdk返回的结果集*/
					// console.log(JSON.stringify(result))
					if (result.code == 200) {
						// this.signDate = result.data.signDate; //有效期限开始日期
						// this.expiryDate = result.data.expiryDate; //有效期限结束日期
						// this.issueAuthority = result.data.issueAuthority; //签发机关
						// this.BackCardShow = true;
						// this.BackCardPhoto = 'data:image/png;base64,' + result.imgbase64;

						// this.IDCardBack = 'data:image/png;base64,' + result.imgbase64;
						var Positive = 'data:image/png;base64,' + result.imgbase64;
						// this.ShowBack = false;
						
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
								this.IDCardBack = response[0];
								this.ShowBack = false;
								console.log(JSON.stringify(response[0]));
							});
							
							
						}).catch(error => {
							console.log(error)
						})
						
						
					}
				}
			);
		
		},
		
		//提交按钮点击事件
		Submit() {
			// 非空验证
			if (this.Name == '') {
				this.$refs.uToast.show({
					// title: '请填写姓名',
					title: '请上传身份证',
					type: 'warning'
				});
				return;
			}
			if (this.GenderShow == '') {
				this.$refs.uToast.show({
					// title: '请选择性别',
					title: '请上传身份证',
					type: 'warning'
				});
				return;
			}
			// if (this.IDNumber == '') {
			// 	this.$refs.uToast.show({
			// 		// title: '请填写身份证号',
			// 		title: '请上传身份证',
			// 		type: 'warning'
			// 	});
			// 	return;
			// }
			if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IDNumber)) {
				this.$refs.uToast.show({
					title: '请填写正确的身份证号',
					type: 'warning'
				});
				return;
			}

			//进行实名认证
			var RequrestUrl = this.AJB.BizUrl + 'api/MobileUser/Authenticate';

			var RequrestDatas = {
				name: this.Name, //姓名
				gender: this.Gender, //性别（1男0女）
				// CertificatesType:this.CertificatesType,//证件类型
				idNumber: this.IDNumber, //身份证号
				idPhoto: this.IDCardPositive, //身份证正面
				idPhoto2: this.IDCardBack //身份证背面
			};
			this.AJB.UniAjax(RequrestUrl, RequrestDatas)
				.then(res => {
					console.log(res);
					if (res.code == 200) {
						this.IMUpdate();
						// uni.navigateBack({
						// 	delta: 1
						// })
					}
				})
				.catch(err => {
					console.log(err);
				});
		},
		IMUpdate() {
			var MyInfo = {
				nick: this.Name, //姓名
				// avatar:
				// 	'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1608299331&di=a7976fd7c35b9dc3a793d94ab378cca8&src=http://hbimg.b0.upaiyun.com/0cd238587a0984d24b8688ad35c187da3ace5314317c-KPcKiS_fw658', //更换IM默认头像
				// // TIM.TYPES.GENDER_UNKNOWN 表示未设置性别
				// TIM.TYPES.GENDER_FEMALE 表示女
				// TIM.TYPES.GENDER_MALE 表示男
				//gender: this.Gender == 0 ? getApp().$TIM.TYPES.GENDER_FEMALE : getApp().$TIM.TYPES.GENDER_MALE, //性别
				profileCustomField: [
					// {
					// 	key: 'Tag_Profile_Custom_IdNumber', //身份证号
					// 	value: this.IDNumber
					// },
					{
						key: 'Tag_Profile_Custom_Rank',
						value: '会员'
					}
				]
			};
			console.log(JSON.stringify(MyInfo));
			// 修改个人标配资料和自定义资料
			let promise = getApp().$tim.updateMyProfile(MyInfo);
			promise
				.then(imResponse => {
					console.log(imResponse.data); // 更新资料成功

					this.$refs.uToast.show({
						title: '认证成功',
						type: 'success'
					});
					setTimeout(() => {
						// 两秒之后返回上一个界面
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				})
				.catch(imError => {
					console.warn('updateMyProfile error:', imError); // 更新资料失败的相关信息
				});
		}
	}
};
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