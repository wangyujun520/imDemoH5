<template>
	<view class="content p-2">
		<view v-if="DataList.cover == ''" @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">上传封面图</text>
		</view>
		
		<view v-else @click="ChangeTheCover" class="flex flex-column align-center bg-white py-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<!-- <view class="" style="background-color: #F7F7F7;" :style="'width: ' + w + 'px;height: ' + h + 'px;'"> -->
			<view class="" style="background-color: #F7F7F7;width: 600rpx;height: 400rpx;">
				<image @load="loadImage" :src="DataList.cover" style="width: 100%;height: 100%;"></image>
			</view>
			<text class="mt-1" style="color: #2979ff;font-size: 26rpx;">更换封面</text>
		</view>
		<view @click="skipTitle" class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">标题</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text style="color: #979797;font-size: 26rpx;">{{DataList.title}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>
		<view @click="skipSayAhead" class="flex p-2 justify-between bg-white">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">设计描述</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text style="color: #979797;font-size: 26rpx;">{{DataList.conternt}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>

		<view class="flex align-center bg-white px-2 py-3 mt-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text style="font-size: 30rpx;font-weight: bold;color: #000000;">空间</text>
			<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
			<text style="color: #979797;font-size: 26rpx;" class="ml-3">添加的图片总数不少于6张</text>
		</view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in DataList.space" :key="item.id" @click="click"
		 @open="open" @content-click="skipSpaceDetails(item,index)" :options="options">

			<view class="flex flex-column">
				<view class="flex p-2 justify-between bg-white" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
					<view class="flex flex-column">
						<view class="flex align-center">
							<text style="font-size: 30rpx;font-weight: bold;color: #000000;">{{item.name}}</text>
						</view>
						<view class="flex" style="width: 600rpx;">
							<text style="color: #979797;font-size: 26rpx;">{{item.number}}张</text>
						</view>
					</view>
					<view class="flex">
						<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
					</view>
				</view>
			</view>

		</u-swipe-action>
		<view @click="AddSpace" class="flex bg-white align-center justify-center mt-4 py-3" style="color: #2979ff;">
			<u-icon name="plus" color="#2979ff" size="28"></u-icon>
			<text style="font-size: 28rpx;" class="ml-1">添加空间</text>
		</view>

		<!-- 模态框 -->
		<u-modal @confirm="confirm" v-model="show" title="添加空间" :title-style="{color: '#101010'}" :show-cancel-button="true">
			<view class="flex py-2 px-4">
				<text style="color: #888;font-size: 28rpx;">请输入空间名称</text>
			</view>
			<view class="flex px-4 py-4">
				<input maxlength="5" style="border-bottom: 2px solid #FF9900;width: 100%;color: #888;font-size: 32rpx;" type="text"
				 v-model="spaceName" placeholder="限填5字" />
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		// 发布功能
		onNavigationBarButtonTap: function(e) {
			if (this.isShow) {

				uni.hideTabBar();
			} else{
						if (this.DataList.cover == '') {
							this.$refs.uToast.show({
								title: '请填写封面!',
								type: 'warning'
							})
							return;
						}
						if (this.DataList.title == '') {
							this.$refs.uToast.show({
								title: '请填写标题!',
								type: 'warning'
							})
							return;
						}
						let sapces = this.DataList.space;
						let total = 0;sapces.forEach(item => {
							total += item.number;
						});
						if (total < 6) {
							this.$refs.uToast.show({
								title: '空间图片数量不足!',
								type: 'warning'
							})
							return;
						}

						this.DataList.taskid = this.taskid
						var RequrestUrl =
							this.AJB.BizUrl + "api/Design/AddDesignEffect";
						var RequrestDatas = this.DataList;this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then((res) => {
							if (res.code == 200) {
								console.log("add ok");
								uni.navigateBack({
									delta: 1,
								});
							}
						})
						.catch((err) => {
							console.log(err)
						});
					}
				},
				data() {
					return {
						w:0,
						h:0,
						isShow: false,
						taskid: 0,
						show: false, //显示添加空间的模态框
						DataList: '', //Mock数据
						spaceName: '', //空间名称
						options: [{
							text: '删除',
							style: {
								backgroundColor: '#dd524d'
							}
						}],
					}
				},

				onLoad(option) {
					var DataLists = {
						"code": 200,
						"msg": "成功",
						"DataList": {
							"designId": 0,
							"cover": "",
							"title": "",
							"conternt": "",
							"space": [{
									id: 1,
									show: false,
									"name": "户型图",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 2,
									show: false,
									"name": "玄关",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 3,
									show: false,
									"name": "客厅",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 4,
									show: false,
									"name": "厨房",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 5,
									show: false,
									"name": "餐厅",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 6,
									show: false,
									"name": "卫生间",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 7,
									show: false,
									"name": "卧室",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 8,
									show: false,
									"name": "阳台",
									"number": 0,
									"spaceDetails": []
								},
								{
									id: 9,
									show: false,
									"name": "走廊",
									"number": 0,
									"spaceDetails": []
								}

							]
						}
					}
					this.taskid = option.id;
					var RequrestUrl = this.AJB.BizUrl + 'api/Design/GetDesignEffectInfo';
					var RequrestDatas = {
						id: option.id
					};
					this.AJB.UniAjax(RequrestUrl, RequrestDatas)
						.then(res => {
							if (res.code == 200) {

								this.DataList = res.dataList;
								console.log(JSON.stringify(this.DataList));
								if (this.DataList.isConfirm) {
									this.isShow = true;
								} else {
									this.isShow = false;
								}
								if (this.isShow) {
									var webView = this.$mp.page.$getAppWebview();
									webView.setTitleNViewButtonStyle(0, {
										text: ' '
									});
								}
							}
						})
						.catch(err => {
							this.DataList = DataLists.DataList;
						});


				},
				methods: {
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
							url:'/uview-ui/components/u-avatar-cropper/upload-cover-image?img='+this.DataList.cover
						})
						
					},
					confirm() {
						console.log(this.spaceName);

						if (this.spaceName == '') {
							this.$refs.uToast.show({
								title: '请输入空间名称',
								type: 'warning'
							})
							this.show = true;
							return;
						}

						var spaceData = {
							id: this.DataList.space.length + 1,
							show: false,
							"name": this.spaceName,
							"number": 0,
							"spaceDetails": []
						}
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
							url: '/pages/tabBar/message/NavMenu/SpaceDetails?index=' + index
						})
					},
					// 跳转到标题
					skipTitle() {
						uni.navigateTo({
							url: '/pages/tabBar/message/SubPage/Title'
						})
					},
					// 跳转到说在前面
					skipSayAhead() {
						uni.navigateTo({
							url: '/pages/tabBar/message/SubPage/SayAhead'
						})
					}

				}
		}
</script>

<style lang="scss">

</style>
