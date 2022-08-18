<template>
	<view class="content">
		<u-sticky>
			<view class="bg-white pt-5 pb-2">
				<u-steps :list="numList" :current="current" active-color="#FF9900"></u-steps>
			</view>
		</u-sticky>
		
		<!-- 第一步 -->
		<view class="flex flex-column align-center" v-if="current==0">
			<text style="color: #101010;font-size: 50rpx;font-weight: bold;">认证需要材料</text>
			<view class="flex align-center my-3" style="font-size: 26rpx;color: #888;">
				<text>请确保已准备好</text>
				<text style="color: #FF9900;">{{name}}</text>
				<text>以下材料，您的信息将严格保密</text>
			</view>
			<!-- <img src="/static/img/scsfz.png" style="height: 330rpx;width: 270rpx;"> -->
			<img src="http://oss.anjubang.cn/scsfz.png" style="height: 330rpx;width: 270rpx;">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;" class="my-3">手持身份证</text>
			<img src="http://oss.anjubang.cn/mm.png" style="height: 170rpx;width: 270rpx;">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;" class="my-3">店铺照</text>
			<img src="http://oss.anjubang.cn/yyzz.png" style="height: 170rpx;width: 270rpx;">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;" class="my-3">营业执照</text>
			<view class="flex justify-center py-3">
				<view @tap="Next" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">准备好了</text>
				</view>
			</view>
		</view>
		<!-- 第二步 -->
		<view class="flex flex-column align-center" v-if="current==1">
			<view class="flex justify-center align-center flex-column bg-white m-3 rounded"
				style="width: 420rpx;height: 600rpx;" @tap="uploadPhoto">
				<image v-if="DataList.hand_id_card!=''" class="rounded" :src="DataList.hand_id_card_preview"
					style="width: 100%;height: 100%;"></image>
				<view v-if="DataList.hand_id_card==''" class="flex flex-column align-center">
					<!-- <img src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"> -->
					<img src="http://oss.anjubang.cn/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;">
					<text class="mt-2" style="color: #0072FF;font-weight: bold;font-size: 26rpx;">手持身份证</text>
				</view>
			</view>
			<view class="flex justify-center py-3">
				<view @tap="Next" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">下一步</text>
				</view>
			</view>
		</view>
		<!-- 第三步 -->
		<view class="flex flex-column align-center" v-if="current==2">
			<!-- 上传门面图片 -->
			<view class="flex justify-center align-center flex-column bg-white m-3 rounded"
				style="width: 690rpx;height: 350rpx;" @tap="uploadBankPhoto">
				<image v-if="DataList.door_head!=''" class="rounded" :src="DataList.door_head_preview"
					style="width: 100%;height: 100%;"></image>
				<text v-if="DataList.door_head==''" class="mt-2"
					style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传店铺门面照</text>
			</view>
			<view class="flex justify-center py-3">
				<view @tap="Next" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">下一步</text>
				</view>
			</view>
		</view>
		<!-- 第四步 -->
		<view class="flex flex-column align-center" v-if="current==3">
			<!-- 上传封面图片 -->
			<view class="flex justify-center align-center flex-column bg-white m-3 rounded"
				style="width: 690rpx;height: 350rpx;" @tap="uploadBizPhoto">
				<image v-if="DataList.biz_license!=''" class="rounded" :src="DataList.biz_license_preview"
					style="width: 100%;height: 100%;"></image>
				<text v-if="DataList.biz_license==''" class="mt-2"
					style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传营业执照</text>
			</view>
			<view class="flex justify-center py-3">
				<view @tap="Next" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">下一步</text>
				</view>
			</view>
		</view>
		<!-- 第五步 -->
		<view class="flex flex-column align-center" v-if="current==4">
			<!-- <view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
				<text class="form-title-style">店铺名称</text>
				<view class="flex align-center">
					<u-input type="text" v-model="DataList.age" input-align="right" placeholder="请输入店铺名称"
						placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
				</view>
			</view> -->

			<view class="flex flex-column bg-white px-3 mt-3">
				
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">商铺名称</text>
					<view class="flex align-center">
						<u-input type="text" v-model="DataList.title" input-align="right"
							placeholder="请输入店铺名称" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
							style="width: 500rpx;" />
					</view>
				</view>
				
				<view @tap="skipShopCategory" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>商铺类型</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.major_catalog==''?'请选择':'已选择'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>

				<view @click="openingTime" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>开业时间</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.open_date||'请选择开业时间'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>

				<view @click="ChoseMap" class="flex align-center bg-white justify-between border-bottom"
					style="height: 100rpx;">
					<text>商铺地址</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.address||'选择地址'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
				
				<view @tap="showPicker=true" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>服务区域</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.area_text||'请选择区域'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>

				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">联系电话</text>
					<view class="flex align-center">
						<u-input type="number" maxlength="11" v-model="DataList.mobile" input-align="right"
							placeholder="请输入联系电话" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
							style="width: 500rpx;" />
					</view>
				</view>

				<view class="flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">主营商品</text>
					<view class="flex align-center">
						<u-input type="text" v-model="DataList.major_goods" input-align="right"
							placeholder="请输入主营商品" placeholder-style="font-size: 26rpx;color: #BEBEBE;"
							style="width: 500rpx;" />
					</view>
				</view>
			</view>

			<view class="flex justify-center py-3">
				<view @tap="Submit" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">提交</text>
				</view>
			</view>
		</view>
		<u-picker mode="time" v-model="show" @confirm="confirm"></u-picker>
		<u-picker v-model="showPicker" mode="region" :params="params" @confirm="PickerConfirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onLoad(options) {
			// this.title = options.title;
			// this.DataList.catalog = options.catalog;
			// uni.setNavigationBarTitle({
			// 	title: options.title
			// });
		},
		data() {
			return {
				show:false,
				name: uni.getStorageSync('name'),
				showPicker: false,
				params: {
					province: true,
					city: true,
					area: true
				},
				title: '',
				current: 0,
				numList: [{
					name: '所需材料'
				}, {
					name: '手持身份证'
				}, {
					name: '店铺门面'
				}, {
					name: '营业执照'
				}, {
					name: '完善信息'
				}],
				photos: [],
				photos2: [],
				DataList: {
					title: "", //商铺名称
					area_text:'',//区域
					province: '', //省份
					city: '', //城市
					county: '', //区县
					address: "", //详细
					//经纬度
					lng:'',
					lat:'',
					name: "", //昵称
					mobile: "", //手机号码
					open_date: "", //开始时间
					major_catalog: "", //主营类别
					major_goods: "", //主营商品
					hand_id_card: "", //手持照片
					hand_id_card_preview: "", //手持照片预览
					door_head: "", //门头照
					door_head_preview: "", //门头照预览
					biz_license: "" ,//营业执照
					biz_license_preview: "" //营业执照预览
				},
				hand_id_card: [], //手持照片
				door_head: [], //门头照
				biz_license: [] //营业执照
			}
		},
		methods: {
			openingTime() {
				this.show = true
			},
			// 跳转到商品类别
			skipShopCategory(){
				uni.navigateTo({
					url:'/pages/tabbar/my/authentication/shop_category'
				})
			},
			ChoseMap() {
				uni.chooseLocation({
					success: (res) => {
						// 地址经纬度
						this.DataList.address = res.address;
						this.DataList.lng = res.longitude;
						this.DataList.lat = res.latitude;
					},
					fail: (e) => {
						uni.showToast({
							title: e
						});
					}
				});
			},
			// 时间确认
			confirm(e){
				console.log(JSON.stringify(e))
				this.DataList.open_date = e.year +'-'+ e.month +'-'+ e.day;
			},
			PickerConfirm(e) {
				this.DataList.province = e.province.value;
				this.DataList.city = e.city.value;
				this.DataList.county = e.area.value;
				this.DataList.area_text = `${e.province.label}-${e.city.label}-${e.area.label}`
			},
			// 准备好了
			Next() {
				console.log(this.current)
				if(this.current==1){
					// 校验是否上传手持身份证
					if((this.DataList.hand_id_card_preview??'')==''){
						this.$refs.uToast.show({
							title: "请上传手持身份证",
							type: "warning",
						});
						return;
					}
				}
				if(this.current==2){
					// 校验是否上传店铺门面照
					if((this.DataList.door_head_preview??'')==''){
						this.$refs.uToast.show({
							title: "请上传店铺门面照",
							type: "warning",
						});
						return;
					}
				}
				if(this.current==3){
					// 校验是否上传营业执照
					if((this.DataList.biz_license_preview??'')==''){
						this.$refs.uToast.show({
							title: "请上传营业执照",
							type: "warning",
						});
						return;
					}
				}
				this.current += 1;
			},
			// 提交
			Submit() {
				console.log("提交")
				
				// 非空校验
				if((this.DataList.title??'')==''){
					this.$refs.uToast.show({
						title: "请输入店铺名称",
						type: "warning",
					});
					return;
				}
				if((this.DataList.major_catalog??'')==''){
					this.$refs.uToast.show({
						title: "请选择店铺类型",
						type: "warning",
					});
					return;
				}
				if((this.DataList.open_date??'')==''){
					this.$refs.uToast.show({
						title: "请选择开业时间",
						type: "warning",
					});
					return;
				}
				if((this.DataList.area_text??'')==''){
					this.$refs.uToast.show({
						title: "请选择服务区域",
						type: "warning",
					});
					return;
				}
				if((this.DataList.mobile??'')==''){
					this.$refs.uToast.show({
						title: "请输入联系电话",
						type: "warning",
					});
					return;
				}
				if((this.DataList.major_goods??'')==''){
					this.$refs.uToast.show({
						title: "请输入主营商品",
						type: "warning",
					});
					return;
				}
				
				let requestData = {
					name: this.name, //昵称
					title: this.DataList.title, //商铺名称
					province: this.DataList.province, //省份
					city: this.DataList.city, //城市
					county: this.DataList.county, //区县
					address: this.DataList.address, //详细
					mobile: this.DataList.mobile, //手机号码
					open_date: this.DataList.open_date, //开始时间
					major_catalog: this.DataList.major_catalog, //主营类别
					major_goods: this.DataList.major_goods, //主营商品
					hand_id_card: this.DataList.hand_id_card, //手持照片
					door_head: this.DataList.door_head, //门头照
					biz_license: this.DataList.biz_license //营业执照
				}
				// 商铺认证
				this.$post(this.$url.User.UpdateMallCert, requestData, {
					isLoading: false
				}).then(res => {
					uni.navigateTo({
						url:'/pages/tabbar/my/authentication/UnderReview'
					})
					// uni.navigateTo({
					// 	url: '/pages/tabbar/my/Agreement/AgreeShareAgreement'
					// })
				});
				console.log(JSON.stringify(requestData))

			},
			// 跳转到银行卡
			showBankPage() {
				uni.navigateTo({
					url: '/pages/tabbar/my/PaymentMethod/bank_list'
				})
			},
			// 手持照片上传
			uploadPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.hand_id_card_preview = res.tempFilePaths[0];
						//调用图片上传
						this.hand_id_card.push(res.tempFilePaths[0]);
						this.PhotoUpload();
					}
				});
			},
			// 手持照片上传
			PhotoUpload() {
				var uploads = [];
				for (let k = 0; k < this.hand_id_card.length; k++) {
					let imgSrc = this.hand_id_card[k];
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
						this.DataList.hand_id_card = imgTemp;
					})
				});
			},
			// 门头照上传
			uploadBankPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.door_head_preview = res.tempFilePaths[0];
						//调用图片上传
						this.door_head.push(res.tempFilePaths[0]);
						this.BankPhotoUpload();
					}
				});
			},
			// 门头照上传
			BankPhotoUpload() {
				var uploads = [];
				for (let k = 0; k < this.door_head.length; k++) {
					let imgSrc = this.door_head[k];
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
						this.DataList.door_head = imgTemp;
					})
				});
			},
			// 营业执照上传
			uploadBizPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.biz_license_preview = res.tempFilePaths[0];
						//调用图片上传
						this.biz_license.push(res.tempFilePaths[0]);
						this.BizUpload();
					}
				});
			},
			// 营业执照上传
			BizUpload() {
				var uploads = [];
				for (let k = 0; k < this.biz_license.length; k++) {
					let imgSrc = this.biz_license[k];
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
						this.DataList.biz_license = imgTemp;
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
