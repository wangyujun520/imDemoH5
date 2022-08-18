<template>
	<view class="content">
		
		<view class="flex flex-column p-2">
			<view class="rounded mb-2" v-for="(item,index) in DataList">
				<view class="flex align-center border-bottom pl-3 bg-white" style="height: 100rpx;">
					<text>申请范围</text>
				</view>
				<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.title}}</text>
						<text style="color: #FF0000;font-size: 26rpx;">￥{{item.money}}</text>
					</view>
					<view class="flex justify-between">
						<text style="font-size: 26rpx;color: #5B5B5B;">{{item.des}}</text>
						<text style="color: #02B1BE;font-size: 26rpx;">{{item.status_text}}</text>
					</view>
				</view>
				<view class="flex flex-column p-2 bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<text style="font-size: 26rpx;color: #5B5B5B;">订单号：{{item.money_no}}</text>
					<text style="font-size: 26rpx;color: #5B5B5B;">订单时间：{{item.create_time}}</text>
				</view>
				<view class="flex align-center justify-between bg-white position-relative">
					<view class="flex flex-column w-100 p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
						<text style="font-size: 26rpx;color: #5B5B5B;">支付方式：{{item.pay_catalog_text}}</text>
						<text style="font-size: 26rpx;color: #5B5B5B;">支付时间：{{item.pay_time}}</text>
					</view>
					<!-- <view v-if="item.status == 0 && module=='user'" @tap="tuikuan(item)" class="flex align-center justify-center rounded position-absolute" style="width: 140rpx;height: 60rpx;background-color: #ff9900;right: 30rpx;">
						<text class="text-white" style="font-size: 24rpx;">申请退款</text>
					</view> -->
				</view>
				
			</view>
		</view>
		
		<view class="px-2">
			<view class="flex align-center border-bottom pl-3 bg-white" style="height: 100rpx;">
				<text>退款原因</text>
			</view>
			<view class="">
				<u-input type="textarea" v-model="content" maxlength="-1" :auto-height="false" placeholder="请录入你要退款的原因" style="background-color: #ffffff;padding: 10rpx 30rpx;"></u-input>
			</view>
		</view>
		<view class="px-2">
			<upload-imgs @upload="upload"></upload-imgs>
		</view>
		
		<!-- 占位 -->
		<view class="" style="height: 180rpx;"></view>
		<view class="position-fixed bg-white flex align-center justify-center" style="width: 750rpx;height: 140rpx;bottom: 0;">
			<view @tap="Submit" class="flex align-center justify-center rounded" style="background-color: #FF814A;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default{
		components: {
			uploadImgs
		},
		onLoad(options) {
			this.module = options.module;
			this.code = options.code;
			this.order_money_id = options.order_money_id;
			this.catalog = options.catalog;
			this.order_id = options.order_id;
			
			this.InitData();
		},
		data(){
			return{
				content:'',
				module:'',
				order_money_id:'',
				catalog:'',
				order_id:'',
				code:'',
				DataList:[],
				photos:[],
				files:''//上传使用
			}
		},
		methods:{
			Submit(){
				
				// 非空验证
				if (this.content == '') {
					this.$refs.uToast.show({
						title: '请输入退款原因',
						type: 'warning'
					});
					return;
				}
				
				uni.showModal({
					title: '提示',
					content: `平台审核之后，支付金额将原路返回到支付账号，真的要申请退款吗？`,
					success: (res)=> {
						if (res.confirm) {
							if(this.photos.length == 0){
								this.$post(this.$url.Task.ApplyRefund, {
									order_money_id: this.order_money_id,
									content: this.content, //退款原因
									photos: this.files //图片
								}, {}).then(res => {
									// 成功
									this.$refs.uToast.show({
										title: `退款申请成功`,
										type: 'success'
									});
									setTimeout(() => {
										// 两秒之后返回上一个界面
										uni.navigateBack({
											delta: 1
										});
									}, 2000);
								});
							}else{
								//上传了图片的
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
									var FileName = year + '' + month + '' + day + '' + new Date().getTime() + k + '.' + extendName; //202003021583151162210.jpg
									var fuleFileName = 'find' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
									var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
									uploads.push(SuccessUrlImg);
								}
								
								Promise.all(uploads).then(response => {
									console.log(JSON.stringify(response));//上传成功的路径
									response.forEach(item=>{
										console.log(item)
										let imgTemp = item.split('.cn')[1];
										if(this.files == ''){
											this.files = imgTemp;
										}else{
											this.files = this.files+'|'+imgTemp;
										}
									})
									this.$post(this.$url.Task.ApplyRefund, {
										order_money_id: this.order_money_id,
										content: this.content, //退款原因
										photos: this.files //图片
									}, {}).then(res => {
										// 成功
										this.$refs.uToast.show({
											title: `退款申请成功`,
											type: 'success'
										});
										setTimeout(() => {
											// 两秒之后返回上一个界面
											uni.navigateBack({
												delta: 1
											});
										}, 2000);
									});
								});
							}
							
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			upload(arr) {
				// console.log(arr)
				this.photos = arr;
			},
			InitData(){
				// 获取订单支付明细
				this.$post(this.$url.Task.GetOrderMoneys, {
					order_money_id:this.order_money_id,
					catalog:this.catalog,
					order_id:this.order_id,
					code:this.code
				}, {
					isLoading: false,
					loadingTitle: ''
				}).then(res => {
					this.DataList = res.data;
				});	
			},
		}
		
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>