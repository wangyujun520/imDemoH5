<template>
	<view class="content">
		<!-- 输入文字内容 -->
		<view class="flex flex-column px-3 bg-white">
			<view class="my-3 flex align-center">
				<text style="color: red;font-size: 30rpx;">*</text>
				<text style="font-size: 30rpx;font-weight: bold;">选择举报理由</text>
			</view>
			<view class="flex flex-wrap">
				<view @tap="checkType(index)" v-for="(item,index) in ReportList" class="flex align-center justify-center mr-2 mb-2" :class="[item.checked ? 'yes' : 'no']">
					<text style="font-size: 28rpx;">{{item.value}}</text>
				</view>
			</view>
			<text style="font-size: 30rpx;font-weight: bold;" class="my-3">举报描述</text>
			<textarea maxlength="200" style="width: 100%; font-size: 28rpx" placeholder="请描述你遇到的问题"
				v-model="content" />
		</view>
		<upload-imgs @upload="upload" title="证明材料"></upload-imgs>
		<view class="flex justify-center py-3">
			<view @tap="Submit" class="flex align-center justify-center"
				style="background-color: #FF9900;border-radius: 10rpx;width: 690rpx;height: 80rpx;">
				<text class="text-white" style="font-size: 28rpx;">提交</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import uploadImgs from '@/components/push-img/get-imgs.vue';
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		components: {
			uploadImgs
		},
		data() {
			return {
				module:1,//1=发现、2=IM
				id: '',
				ReportList: [{
						key: '1',
						value: '内容质量差',
						checked:false
					},
					{
						key: '2',
						value: '广告',
						checked:false
					},
					{
						key: '3',
						value: '重复，旧闻',
						checked:false
					},
					{
						key: '4',
						value: '低俗',
						checked:false
					},
					{
						key: '5',
						value: '与事实不符',
						checked:false
					},
					{
						key: '6',
						value: '错别字',
						checked:false
					},
					{
						key: '7',
						value: '格式问题',
						checked:false
					},
					{
						key: '8',
						value: '其他问题',
						checked:false
					}
				],
				TempData:{},
				content:'',
				photos: [], //图片数组
				files:''//接口使用图片
			};
		},
		onLoad(options) {
			this.id = options.id;
			this.module = options.module;
		},
		methods: {
			// 选择举报理由
			checkType(index){
				// 单选
				this.ReportList.forEach(item=>{
					item.checked = false;
				})
				this.ReportList[index].checked = !this.ReportList[index].checked;
				
				// 保存当前选中的内容
				this.TempData = this.ReportList[index];
				
			},
			upload(arr) {
				// console.log(arr)
				this.photos = arr;
			},
			Submit() {
				// 非空验证
				if(Object.keys(this.TempData).length  == 0){
					// console.log("空对象")
					this.$refs.uToast.show({
						title: '请选择举报理由',
						type: 'warning'
					});
					return;
				}
				let RequestData = {}
				if(this.photos.length == 0){
					RequestData = {
						module:this.module,//1=发现、2=IM
						target_id: this.id,
						catalog: this.TempData.key,
						content: this.content,
						photos: ''
					}
					// 内容举报
					this.$post(this.$url.Discover.Report, RequestData, {
						isLoading: true
					}).then(res => {
						console.log(JSON.stringify(res))
						if (res.code == 200) {
							// 发布成功
							uni.showToast({
								title: '举报成功',
								icon: 'success',
								duration: 2000
							})
							setTimeout(() => {
								// 两秒之后返回上一个界面
								uni.navigateBack({
									delta: 1
								});
							}, 2000);
						}
					});
				}else{
					
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
						var fuleFileName = 'img' + '/' + date.getFullYear() + '/' + month + '/' + FileName;
						var SuccessUrlImg = OssUpload.fileUploadBack('image', imgSrc, fuleFileName);
						uploads.push(SuccessUrlImg);
					}
					
					Promise.all(uploads).then(response => {
						console.log(JSON.stringify(response)); //上传成功的路径
						response.forEach(item => {
							console.log(item)
							let imgTemp = item.split('.cn')[1];
							if (this.files == '') {
								this.files = imgTemp;
							} else {
								this.files = this.files + '|' + imgTemp;
							}
						})
						console.log(this.files)
						RequestData = {
							target_id: this.id,
							catalog: this.TempData.key,
							content: this.content,
							photos: this.files
						}
						// 内容举报
						this.$post(this.$url.Discover.Report, RequestData, {
							isLoading: true
						}).then(res => {
							console.log(JSON.stringify(res))
							if (res.code == 200) {
								// 发布成功
								uni.showToast({
									title: '举报成功',
									icon: 'success',
									duration: 2000
								})
								setTimeout(() => {
									// 两秒之后返回上一个界面
									uni.navigateBack({
										delta: 1
									});
								}, 2000);
							}
						});
					});
				}
			}
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.yes {
		width: 211rpx;
		height: 70rpx;
		border-radius: 10rpx;
		color: #FFFFFF;
		background-color: #FF9900;
	}

	.no {
		border: 1px solid #999;
		width: 211rpx;
		height: 70rpx;
		border-radius: 10rpx;
	}
</style>
