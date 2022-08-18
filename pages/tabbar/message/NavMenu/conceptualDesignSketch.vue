<template>
	<view class="content p-2">

		<!-- <view v-if="DataList.cover == ''" @click="ChangeTheCover" class="my-1 bg-white p-2" style="height: 350rpx">
		  <view class="flex flex-column justify-center align-center" style="width: 100%; height: 100%; background-color: #f7f7f7">
		    <text>上传封面图</text>
		  </view>
		</view>
		
		<view v-else @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<image :src="DataList.cover" style="width: 500rpx;height: 300rpx;"></image>
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
		</view> -->

		<view v-if="DataList.cover == ''" @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">上传封面图</text>
		</view>

		<view v-else @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<!-- <view class="" style="background-color: #F7F7F7;" :style="'width: ' + w + 'px;height: ' + h + 'px;'"> -->
			<view class="" style="background-color: #F7F7F7;width: 600rpx;height: 400rpx;">
				<image @load="loadImage" :src="DataList.cover" style="width: 100%;height: 100%;"></image>
			</view>
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
		</view>

		<view @click="skipTitle" class="flex p-2 justify-between bg-white"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">标题</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text v-if="DataList.title == ''" style="color: #979797;font-size: 26rpx;">请录入标题</text>
					<text v-else style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.title}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>
		<view @click="skipLink" class="flex p-2 justify-between bg-white"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">3D效果链接</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text v-if="DataList.three_dim_url == ''" style="color: #979797;font-size: 26rpx;">请录入效果链接</text>
					<!-- <text style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.introduce==''?''}}</text> -->
					<text v-else style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.three_dim_url}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onLoad(options) {
			this.order_id = options.order_id;
		},
		// 发布功能
		onNavigationBarButtonTap(e) {
			// #ifdef APP-PLUS
				if (this.DataList.cover == '') {
					this.$refs.uToast.show({
						title: '请上传封面!',
						type: 'warning'
					})
					return;
				}
			// #endif
			
			if (this.DataList.title == '') {
				this.$refs.uToast.show({
					title: '请填写标题!',
					type: 'warning'
				})
				return;
			}
			if (this.DataList.three_dim_url == '') {
				this.$refs.uToast.show({
					title: '请填写3D效果链接!',
					type: 'warning'
				})
				return;
			}
			let requestData = {};
			// #ifdef APP-PLUS
			requestData = {
				order_id: this.order_id,
				cover: this.DataList.upload_cover, //封面图
				three_dim_title: this.DataList.title, //3d的标题
				three_dim_url: this.DataList.three_dim_url //3d的url
			}
			// #endif
			// #ifdef H5
			requestData = {
				order_id: this.order_id,
				cover: 'https://img0.baidu.com/it/u=512340543,3139277133&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281', //封面图
				three_dim_title: this.DataList.title, //3d的标题
				three_dim_url: this.DataList.three_dim_url //3d的url
			}
			// #endif
			console.log(JSON.stringify(requestData))
			// 获取设计需求明细
			this.$post(this.$url.Task.UpdateDesign, requestData, {
				isLoading: true,
				loadingTitle: '发布中...'
			}).then(res => {
				// 任务发布成功
				this.$refs.uToast.show({
					title: '方案发布成功',
					type: 'success'
				});
				setTimeout(() => {
					// 两秒之后返回上一个界面
					uni.navigateBack({
						delta: 1
					});
				}, 2000);
			})
		},
		data() {
			return {
				order_id:'',
				w: 0,
				h: 0,
				show: false, //显示添加空间的模态框
				DataList: {
					three_dim_title:'',
					three_dim_url:'',
					store:'',
					introduce:'',
					money_des:'',
					start_date:'',
					end_date:'',
					address:'',
					lng:'',
					lat:'',
					goods_list:'',
					cover: "", //封面图
					upload_cover: '',
					info: "",
					title: "",
					conternt: "",
					space: [{
							id: 1,
							show: false,
							name: "户型图",
							number: 0,
							spaceDetails: []
						},
						{
							id: 2,
							show: false,
							name: "玄关",
							number: 0,
							spaceDetails: []
						},
						{
							id: 3,
							show: false,
							name: "客厅",
							number: 0,
							spaceDetails: []
						},
						{
							id: 4,
							show: false,
							name: "厨房",
							number: 0,
							spaceDetails: []
						},
						{
							id: 5,
							show: false,
							name: "餐厅",
							number: 0,
							spaceDetails: []
						},
						{
							id: 6,
							show: false,
							name: "卫生间",
							number: 0,
							spaceDetails: []
						},
						{
							id: 7,
							show: false,
							name: "卧室",
							number: 0,
							spaceDetails: []
						},
						{
							id: 8,
							show: false,
							name: "阳台",
							number: 0,
							spaceDetails: []
						},
						{
							id: 9,
							show: false,
							name: "走廊",
							number: 0,
							spaceDetails: []
						}
					]
				}, //Mock数据
				contents:[],
				spaceName: '', //空间名称
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		methods: {
			skipLink(){
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/EffectLink?three_dim_url='+this.DataList.three_dim_url
				})
			},
			// 加载图片
			loadImage(e) {
				// 拿到图片的宽高
				let w = e.detail.width;
				let h = e.detail.height;
				// 最大宽度 px
				let maxW = uni.upx2px(500);
				// 最大高度 px
				let maxH = uni.upx2px(350);
				if (h <= maxH) {
					// 用原来的宽高
					this.w = w <= maxW ? w : maxW;
					this.h = h;
					return;
				}
				this.h = maxH;
				let w2 = maxH * (w / h);
				this.w = w2 <= maxW ? w2 : maxW;
			},
			AddSpace() {
				// console.log("添加空间点击事件");
				this.spaceName = ''; //清空输入内容
				this.show = true;
			},
			//删除按钮点击事件
			click(index) {
				this.DataList.space.splice(index, 1);
			},
			// 滑动第二个的时候关闭第一个的菜单
			open(index) {
				this.DataList.space[index].show = true;
				this.DataList.space.map((val, idx) => {
					if (index != idx) this.DataList.space[idx].show = false;
				})
			},
			ChangeTheCover() {
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
				// 			console.log(JSON.stringify(response));
				// 			// 更换图片
				// 			this.DataList.cover = response[0];
				// 		});
				// 	}
				// });
				// 跳转到图片裁剪界面
				uni.navigateTo({
					url: '/uview-ui/components/u-avatar-cropper/upload-cover-image?img=' + this.DataList.cover
				})
			},
			confirm() {
				// console.log(this.spaceName);
				if (this.spaceName == '') {
					this.$refs.uToast.show({
						title: '请输入空间名称',
						type: 'warning'
					})
					this.show = true;
					return;
				}
				var spaceData = {
					// "name": this.spaceName,
					// "number": 0
					id: this.DataList.space.length + 1,
					show: false,
					name: this.spaceName,
					number: 0,
					spaceDetails: []
				}
				console.log(JSON.stringify(spaceData))
				this.DataList.space.push(spaceData);
			},
			// 跳转到空间详情
			skipSpaceDetails(item, index) {
				uni.removeStorageSync('ShowSpaceDetaile');
				// 同步缓存
				uni.setStorage({
					key: 'ShowSpaceDetaile',
					data: item,
					success: function() {
						console.log('success');
					}
				});
				uni.navigateTo({
					url: '/pages/tabbar/message/NavMenu/SpaceDetails?index=' + index
				})
			},
			// 跳转到活动标题
			skipTitle() {
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/ActivityTitle?title=' + this.DataList.title
				})
			},
			// 跳转到活动信息
			skipInfo() {
				// uni.navigateTo({
				// 	url: '/pages/tabbar/message/SubPage/ActivityInformation?title=' + this.DataList.info
				// })
				uni.navigateTo({
					url: '/pages/design/say_front?introduce=' + this.DataList.introduce+'&money_des='+this.DataList.money_des
				})
			},
			// 跳转到活动商品
			skipSayAhead() {
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/ActiveCommodities?title=' + this.DataList.conternt
				})
			}

			// {
			// 	"path": "pages/tabbar/message/SubPage/ActivityTitle",
			// 	"style": {
			// 		"navigationBarTitleText": "活动标题"
			// 	}
			// },
			// {
			// 	"path": "pages/tabbar/message/SubPage/ActivityInformation",
			// 	"style": {
			// 		"navigationBarTitleText": "活动信息"
			// 	}
			// },
			// {
			// 	"path": "pages/tabbar/message/SubPage/ActiveCommodities",
			// 	"style": {
			// 		"navigationBarTitleText": "活动商品"
			// 	}
			// },

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f7f7f7;
	}

	.LineBreak1 {
		white-space: initial;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
		line-height: 35rpx;
	}
</style>
