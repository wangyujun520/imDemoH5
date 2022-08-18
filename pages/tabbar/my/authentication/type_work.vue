<template>
	<view class="content">
		<u-sticky>
			<view class="bg-white pt-5 pb-2">
				<u-steps :list="numList" :current="current" active-color="#FF9900"></u-steps>
			</view>
		</u-sticky>
		
		<!-- 第一步 -->
		<view class="flex flex-column align-center pt-3" v-if="current==0">
			<text style="color: #101010;font-size: 50rpx;font-weight: bold;">认证需要材料</text>
			<view class="flex align-center my-3" style="font-size: 26rpx;color: #888;">
				<text>请确保已准备好</text>
				<text style="color: #FF9900;">{{name}}</text>
				<text>以下材料，您的信息将严格保密</text>
			</view>
			<img src="http://oss.anjubang.cn/BareheadedPhoto.png" style="height: 330rpx;width: 270rpx;">
			<!-- <img src="/static/img/auth/BareheadedPhoto.png" style="height: 330rpx;width: 270rpx;"> -->
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;" class="my-3">免冠照片</text>
			<!-- <img src="/static/img/auth/BankCard.png" style="height: 170rpx;width: 270rpx;"> -->
			<img src="http://oss.anjubang.cn/BankCardimg.png" style="height: 170rpx;width: 270rpx;">
			<text style="color: #101010;font-size: 26rpx;font-weight: bold;" class="my-3">银行卡</text>
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
				<image v-if="DataList.photo!=''" class="rounded" :src="DataList.photo_preview"
					style="width: 100%;height: 100%;"></image>
				<view v-if="DataList.photo==''" class="flex flex-column align-center">
					<!-- <img src="/static/img/ImageArchives/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;"> -->
					<img src="http://oss.anjubang.cn/iv_idcard_add.png" style="width: 100rpx;height: 100rpx;">
					<text class="mt-2" style="color: #0072FF;font-weight: bold;font-size: 26rpx;">请上传形象照</text>
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

			<view class="flex flex-column bg-white px-3 mt-3">

				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">姓名</text>
					<view class="flex align-center">
						<u-input type="text" :disabled="true" v-model="name" input-align="right" placeholder="请输入姓名"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">账号</text>
					<view class="flex align-center">
						<u-input type="text" maxlength="19" v-model="DataList.account" input-align="right" placeholder="持卡人本人银行卡号"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
				<view @tap="showBankPage" class="flex align-center bg-white justify-between border-bottom"
					style="height: 100rpx;">
					<text>银行</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.bank_catalog_text||'请选择'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">预留手机</text>
					<view class="flex align-center">
						<u-input type="number" maxlength="11" v-model="DataList.mobile" input-align="right" placeholder="请输入银行预留手机号"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">开户行</text>
					<view class="flex align-center">
						<u-input type="text" v-model="DataList.bank_store" input-align="right" placeholder="请输入银行开户行"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
			</view>
			<!-- 上传封面图片 -->
			<view class="flex justify-center align-center flex-column bg-white m-3 rounded"
				style="width: 690rpx;height: 350rpx;" @tap="uploadBankPhoto">
				<image v-if="DataList.bank_photo!=''" class="rounded" :src="DataList.bank_photo_preview"
					style="width: 100%;height: 100%;"></image>
				<text v-if="DataList.bank_photo==''" class="mt-2"
					style="color: #0072FF;font-weight: bold;font-size: 26rpx;">上传银行卡照片</text>
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

			<view class="flex flex-column bg-white px-3 mt-3">
				<view class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>签约期限</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<!-- <text class="mr-1">{{DataList.catalog_text||'请选择'}}</text> -->
						<text class="mr-1">一年</text>
						<!-- <u-icon name="arrow-right" color="#888" size="28"></u-icon> -->
					</view>
				</view>

				<view @click="ChoseMap" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>常驻地址</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.address||'选择地址'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">工龄</text>
					<view class="flex align-center">
						<u-input type="number" v-model="DataList.age" input-align="right" placeholder="请输入工龄"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
				<view class="border-bottom flex justify-between align-center" style="height: 100rpx;">
					<text class="form-title-style">归属公司</text>
					<view class="flex align-center">
						<!-- <text class="mr-1">平台</text> -->
						<u-input type="text" v-model="DataList.company" input-align="right" placeholder="平台"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>

				<view @tap="showPicker=true" class="flex align-center bg-white justify-between border-bottom" style="height: 100rpx;">
					<text>服务区域</text>
					<view class="flex align-center justify-end" style="border: 0px solid red;width: 500rpx;">
						<text class="mr-1">{{DataList.area_text||'请选择区域'}}</text>
						<u-icon name="arrow-right" color="#888" size="28"></u-icon>
					</view>
				</view>

				<view class="flex justify-between border-bottom align-center" style="height: 100rpx;">
					<text class="form-title-style">服务范围</text>
					<view class="flex align-center">
						<u-input type="text" v-model="DataList.service_content" input-align="right" placeholder="请输入服务范围"
							placeholder-style="font-size: 26rpx;color: #BEBEBE;" style="width: 500rpx;" />
					</view>
				</view>
				
			</view>
			
			<!-- <view class="flex justify-between mx-3 pl-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">设计师擅长</text>
				<view class="flex">
					<view class="flex justify-end flex-wrap" style="width: 470rpx;">
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
						<text class="rounded mb-1 ml-1" style="color: #FFFFFF;background-color: #FF9900;font-size: 26rpx;padding: 10rpx 30rpx;">A类型</text>
					</view>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view> -->
			
			<view v-if="DataList.catalog == 1" @click="skipBeGood" class="flex justify-between px-2 pt-3 pb-2 bg-white" style="min-height: 100rpx;width: 675rpx;">
				<text class="" style="color: #101010;font-size: 28rpx;">设计师擅长</text>
				<view class="flex" v-if="DataList.showGood.length>0">
					<view class="flex justify-end flex-wrap mr-1" style="width: 450rpx;border: 0px solid red;">
						<text v-for="good in DataList.showGood" :key="index" class="Selection rounded mb-1 ml-1" style="font-size: 24rpx;padding: 10rpx 30rpx;">{{good}}</text>
					</view>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
				<view v-else class="flex align-center justify-end" style="border: 0px solid red;width: 450rpx;">
					<text class="mr-1">请选择</text>
					<u-icon name="arrow-right" color="#888" size="28"></u-icon>
				</view>
				
			</view>
			
			<view class="flex justify-center py-3">
				<view @tap="Submit" class="flex align-center justify-center"
					style="background-color: #3E8EFF;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
					<text class="text-white" style="font-size: 28rpx;">提交</text>
				</view>
			</view>
		</view>
		
		<u-picker v-model="showPicker" mode="region" :params="params" @confirm="PickerConfirm"></u-picker>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	// 阿里云文件上传
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	// import chooseMap from '@/components/choose-map/choose-map.vue';
	export default {
		// components: {
		// 	chooseMap
		// },
		onLoad(options) {
			this.title = options.title;
			this.DataList.catalog = options.catalog;
			uni.setNavigationBarTitle({
				title: options.title
			});
		},
		data() {
			return {
				name:uni.getStorageSync('name'),
				showPicker:false,
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
					name: '免冠照片'
				}, {
					// name: '基本信息'
					name: '银行卡'
				}, {
					name: '完善信息'
				}],
				photos: [],
				photos2: [],
				DataList: {
					// cover: '',
					// cover_preview: '',
					catalog: '', //1=设计师认证；3=销售；4=监理
					company:'平台',
					photo: "", //形象照【上传接口】
					photo_preview: "", //形象照预览
					account: "", //账户
					bank_catalog: '', //银行类型
					bank_catalog_text: '', //银行类型文本
					
					mobile: "", //手机号码
					bank_store: "", //银行开户行
					
					bank_photo: "", //银行卡照片【上传接口】
					bank_photo_preview: "", //银行卡照片预览
					
					address: "", //详细地址
					lng:'',
					lat:'',
					
					age: '', //工龄
					provicne: '',//省份			
					city: '', //城市
					county: '', //区县
					area_text:'',//服务区域显示
					skills: "", //擅长，多个用竖线分割
					showGood:[],
					goodAtSales:[],
					service_content: "" //服务范围
				}
			}
		},
		methods: {
			// 跳转到擅长页面
			skipBeGood(){
				let goodAtSales = encodeURIComponent(JSON.stringify(this.DataList.goodAtSales))
				uni.navigateTo({
					url:'/pages/tabbar/my/authentication/be_good?goodAtSales='+goodAtSales
				})
			},
			ChoseMap() {
				// console.log(JSON.stringify(item));
				// console.log(item.address);
				// this.DataList.lng = item.longitude;
				// this.DataList.lat = item.latitude;
				// this.DataList.address = item.address;
				uni.chooseLocation({
					success: (res)=> {
						this.DataList.address = res.address;
						this.DataList.lng = res.longitude;
						this.DataList.lat = res.latitude;
						// var AddressInfo = {
						// 	address:res.address,
						// 	longitude:res.longitude,
						// 	latitude:res.latitude
						// }
						// _self.$emit('changes',AddressInfo);
					},
					fail: (e)=> {
						uni.showToast({
							title: e
						});
					}
				});
			},
			PickerConfirm(e){
				
				this.DataList.provicne = e.province.value;
				this.DataList.city= e.city.value;
				this.DataList.county= e.area.value;
				this.DataList.area_text = `${e.province.label}-${e.city.label}-${e.area.label}`
			},
			// 准备好了
			Next() {
				if(this.current==1){
					// 校验是否上传形象照
					if((this.DataList.photo_preview??'')==''){
						this.$refs.uToast.show({
							title: "请上传免冠照片",
							type: "warning",
						});
						return;
					}
				}
				if(this.current==2){
					if((this.DataList.account??'')==''){
						this.$refs.uToast.show({
							title: "请输入银行卡号",
							type: "warning",
						});
						return;
					}
					if((this.DataList.bank_catalog??'')==''){
						this.$refs.uToast.show({
							title: "请选择银行",
							type: "warning",
						});
						return;
					}
					if((this.DataList.mobile??'')==''){
						this.$refs.uToast.show({
							title: "请输入预留手机号",
							type: "warning",
						});
						return;
					}
					if((this.DataList.bank_store??'')==''){
						this.$refs.uToast.show({
							title: "请输入银行开户行",
							type: "warning",
						});
						return;
					}
					if((this.DataList.bank_photo??'')==''){
						this.$refs.uToast.show({
							title: "请上传银行卡照片",
							type: "warning",
						});
						return;
					}
				}
				
				this.current += 1;
			},
			// 提交
			Submit() {
				
				// 校验是否上传形象照
				if((this.DataList.age??'')==''){
					this.$refs.uToast.show({
						title: "请输入工龄",
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
				if((this.DataList.service_content??'')==''){
					this.$refs.uToast.show({
						title: "请输入服务范围",
						type: "warning",
					});
					return;
				}
				if(this.DataList.catalog == 1){
					if((this.DataList.skills??'')==''){
						this.$refs.uToast.show({
							title: "请选择擅长风格",
							type: "warning",
						});
						return;
					}
				}
				let requestData = {
					catalog: this.DataList.catalog, //1=设计师认证；3=销售；4=监理
					photo: this.DataList.photo, //形象照
					account: this.DataList.account, //账户
					bank_catalog: this.DataList.bank_catalog, //银行类型
					mobile: this.DataList.mobile, //手机号码
					bank_store: this.DataList.bank_store, //开户行
					bank_photo: this.DataList.bank_photo, //银行卡照片
					address: this.DataList.address, //详细地址
					age: this.DataList.age, //工龄
					provicne: this.DataList.provicne,
					company:this.DataList.company,
					city: this.DataList.city, //城市
					county: this.DataList.county, //区县
					skills: this.DataList.skills, //擅长，多个用竖线分割【设计师专用字段】
					service_content: this.DataList.service_content //服务内容
				}
				this.$post(this.$url.User.UpdateWorkerCert, requestData, {
					isLoading: false
				}).then(res => {
					uni.navigateTo({
						url:'/pages/tabbar/my/authentication/UnderReview'
					})
				});
				console.log(JSON.stringify(requestData))
			},
			// 跳转到银行卡
			showBankPage() {
				uni.navigateTo({
					url: '/pages/tabbar/my/PaymentMethod/bank_list'
				})
			},
			// 形象照上传
			uploadPhoto() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //指定是压缩图
					success: (res) => {
						this.DataList.photo_preview = res.tempFilePaths[0];
						//调用图片上传
						this.photos.push(res.tempFilePaths[0]);
						this.PhotoUpload();
					}
				});
			},
			PhotoUpload() {
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
					var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
					var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
					uploads.push(SuccessUrlImg);
				}
				Promise.all(uploads).then(response => {
					response.forEach(item => {
						let imgTemp = item.split('.cn')[1];
						this.DataList.photo = imgTemp;
					})
				});
			},
			// 银行卡上传
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

<style lang="scss" scoped>
	.Selection {
		background-color: #ff9900;
		color: #ffffff;
	}
	.NoSelection {
		background-color: #f0f0f0;
		color: #444;
	}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>