<template>
	<view class="content">
		<view class="flex flex-column bg-white px-3 mt-3">
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">姓名</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.name" input-align="right" placeholder="请输入姓名"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">支付宝号</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.account" input-align="right" placeholder="请输入支付宝号"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>
			
			<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">绑定手机</text>
				<view class="flex align-center">
					<u-input type="number" maxlength="11" v-model="DataList.mobile" input-align="right" placeholder="请输入支付宝绑定手机号"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view>
		</view>
		
		<view class="flex justify-center pt-3">
			<view class="flex justify-center align-center flex-column bg-white rounded"
				style="width: 500rpx;height: 500rpx;" @tap="uploadBankPhoto">
				<image v-if="DataList.bank_photo!=''" class="rounded" :src="DataList.bank_photo_preview"
					style="width: 100%;height: 100%;"></image>
				<text v-if="DataList.bank_photo==''" class="mt-2"
					style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传支付宝收款码</text>
			</view>
		</view>
		
		
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center"
				style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
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
				DataList: {
					cover: '',
					name: "", //姓名
					mobile: "", //手机号码
					account: "", //账户
					bank_catalog: '', //银行卡类型
					bank_catalog_text: '', //银行卡类型
					bank_store: "", //开户行
					bank_photo: "", //照片
					bank_photo_preview:'',
					address: "", //银行地址
					pay_qr_code: "" //收款码
				},
				photos2:[]
			}
		},
		methods: {
			Submit() {
				if((this.DataList.name??'')==''){
					this.$refs.uToast.show({
						title: "请输入姓名",
						type: "warning",
					});
					return;
				}
				if((this.DataList.account??'')==''){
					this.$refs.uToast.show({
						title: "请输入支付宝账号",
						type: "warning",
					});
					return;
				}
				if((this.DataList.mobile??'')==''){
					this.$refs.uToast.show({
						title: "请输入支付宝绑定手机号",
						type: "warning",
					});
					return;
				}
				if((this.DataList.bank_photo??'')==''){
					this.$refs.uToast.show({
						title: "请上传支付宝收款码",
						type: "warning",
					});
					return;
				}
				// 非空校验
				let requestData = {
					id: "", //银行卡id
					catalog:2,
					account: this.DataList.account, //账户
					name: this.DataList.name, //姓名
					mobile: this.DataList.mobile, //手机号码
					// bank_catalog: this.DataList.bank_catalog, //银行卡类型
					// bank_store: this.DataList.bank_store, //开户行
					pay_qr_code: this.DataList.bank_photo //支付宝收款码
					// address: this.DataList.name //银行地址
					// pay_qr_code: this.DataList.name //收款码
				}
				console.log(JSON.stringify(requestData))
				
				// 新增、编辑收款账户
				this.$post(this.$url.Account.SaveBank, requestData, {
					isLoading: false
				}).then(res => {
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
				});
			},
			// 支付宝收款码上传
			uploadBankPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.bank_photo_preview = res.tempFilePaths[0];
						//调用图片上传
						this.photos2.push(res.tempFilePaths[0]);
						this.BankPhotoUpload();
					}
				});
			},
			BankPhotoUpload() {
				var uploads = [];
				for (let k = 0; k < this.photos2.length; k++) {
					let imgSrc = this.photos2[k];
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
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					response.forEach(item => {
						let imgTemp = item.split('.cn')[1];
						this.DataList.bank_photo = imgTemp;
					})
				});
			}
			
		}
	}
</script>

<style>
	page {
		background-color: #f7f7f7;
	}
</style>
