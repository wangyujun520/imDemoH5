<template>
	<view class="uni-list list-pd">
		<view class="uni-list-cell cell-pd">
			<view class="uni-uploader">
				<view class="uni-uploader-head">
					<view class="uni-uploader-title">上传图片</view>
					<view class="uni-uploader-info">{{imageList.length}}/1</view>
				</view>
				<view class="uni-uploader-body">
					<view class="uni-uploader__files">
						<block v-for="(image,index) in imageList" :key="index">
							<view class="uni-uploader__file">
								<!-- <view class="iconfont shanchu" @tap="deleteimg(index)">&#xe600;</view> -->
								<view class="iconfont shanchu" @tap="deleteimg(index)">&#xe6a6;</view>
								<!-- <u-icon name="close" class="shanchu" color="#ffffff" size="28" @tap="deleteimg(index)"></u-icon> -->
								<view class="uni-uploader__img">
									<image :src="image" style="width: 100%;height: 100%;" mode="aspectFill" :data-src="image" @tap="previewImage"></image>
								</view>
								
							</view>
						</block>
						<!-- 选择图标 -->
						<!-- <view class="uni-uploader__input-box" v-if="imageList.length<1">
							<view class="uni-uploader__input" @tap="chooseImage"></view>
						</view> -->
						
						
						<view @tap="chooseImage" class="flex justify-center align-center flex-column" style="margin:10rpx;width: 208rpx;height: 208rpx;border: 2rpx solid #F7F7F7;background-color: #F7F7F7;" v-if="imageList.length<1">
							<!-- <text style="font-size: 100rpx;">+</text> -->
							<u-icon name="plus" color="#888" size="50"></u-icon>
							<text style="font-size: 28rpx;color: #888;" class="mt-1">选择图片</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	]
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	]
	export default {
		// props:{
		// 	imageList:{
		// 		type:Array
		// 	}
		// },
		data(){
			return{
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 1]
			};
		},
		methods:{
			chooseImage: async function() {
				// #ifdef APP-PLUS
				// TODO 选择相机或相册时 需要弹出actionsheet，目前无法获得是相机还是相册，在失败回调中处理
				if (this.sourceTypeIndex !== 2) {
					let status = await this.checkPermission();
					if (status !== 1) {
						return;
					}
				}
				// #endif
			
				if (this.imageList.length === 1) {
					// let isContinue = await this.isFullImg();
					// console.log("是否继续?", isContinue);
					// if (!isContinue) {
					// 	return;
					// }
					
					return;
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 1 ? 1 - this.imageList.length : this.count[this.countIndex],
					success: (res) => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
						this.$emit('upload',this.imageList);//发送给子组件
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								switch (this.sourceTypeIndex) {
									case 0:
										authStatus = res.authSetting['scope.camera'];
										break;
									case 1:
										authStatus = res.authSetting['scope.album'];
										break;
									case 2:
										authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
										break;
									default:
										break;
								}
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '易保贵宾需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			},
			deleteimg(index){
				uni.showModal({
				    title: '提示',
				    content: '是否要删除该图片',
				    success: (res) => {
				        if (res.confirm) {
				            // console.log('用户点击确定');
							this.imageList.splice(index,1);
							this.$emit('upload',this.imageList);//发送给子组件
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss">
	.cell-pd {
		padding: 22rpx 30rpx;
	}
	
	.uni-uploader__file{
		position: relative;
	}
	
	.shanchu{
		position: absolute;
		right: 0;
		top: 0;
		background-color: #333333;
		color: #FFFFFF;
		z-index: 111;
		border-radius: 10rpx;
		font-size: 30rpx;
		padding: 10rpx;
	}
	
	/* 列表 */
	.uni-list {
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.uni-list:after {
		position: absolute;
		z-index: 10;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list::before {
		position: absolute;
		z-index: 10;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.uni-list-cell-hover {
		background-color: #eee;
	}
	.uni-list-cell-pd {
		padding: 22rpx 30rpx;
	}
	.uni-list-cell-left {
	    white-space: nowrap;
		font-size:28rpx;
		padding: 0 30rpx;
	}
	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}
	.uni-list-cell::after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 30rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list .uni-list-cell:last-child::after {
		height: 0rpx;
	}
	.uni-list-cell-last.uni-list-cell::after {
		height: 0rpx;
	}
	.uni-list-cell-divider {
		position: relative;
		display: flex;
		color: #111;
		background-color: #f7f7f7;
		padding:15rpx 20rpx;
	}
	.uni-list-cell-divider::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list-cell-divider::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0rpx;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	.uni-list-cell-navigate {
		font-size:30rpx;
		padding: 22rpx 30rpx;
		line-height: 48rpx;
		position: relative;
		display: flex;
		box-sizing: border-box;
		width: 100%;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	.uni-list-cell-navigate {
		padding-right: 36rpx;
	}
	.uni-navigate-badge {
		padding-right: 50rpx;
	}
	.uni-list-cell-navigate.uni-navigate-right:after {
		font-family: uniicons;
		content: '\e583';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.uni-list-cell-navigate.uni-navigate-bottom:after {
		font-family: uniicons;
		content: '\e581';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.uni-list-cell-navigate.uni-navigate-bottom.uni-active::after {
		font-family: uniicons;
		content: '\e580';
		position: absolute;
		right: 24rpx;
		top: 50%;
		color: #bbb;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.uni-collapse.uni-list-cell {
		flex-direction: column;
	}
	.uni-list-cell-navigate.uni-active {
		background: #eee;
	}
	.uni-list.uni-collapse {
		box-sizing: border-box;
		height: 0;
		overflow: hidden;
	}
	.uni-collapse .uni-list-cell {
		padding-left: 20rpx;
	}
	.uni-collapse .uni-list-cell::after {
		left: 52rpx;
	}
	.uni-list.uni-active {
		height: auto;
	}
	/* 上传 */
	.uni-uploader {
		flex: 1;
		flex-direction: column;
	}
	.uni-uploader-head {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-uploader-info {
		color: #B2B2B2;
	}
	.uni-uploader-body {
		margin-top: 16rpx;
	}
	.uni-uploader__files {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.uni-uploader__file {
		margin: 10rpx;
		width: 210rpx;
		height: 210rpx;
	}
	.uni-uploader__img {
		display: block;
		width: 210rpx;
		height: 210rpx;
	}
	.uni-uploader__input-box {
		position: relative;
		margin:10rpx;
		width: 208rpx;
		height: 208rpx;
		border: 2rpx solid #D1D1D1;
	}
	.uni-uploader__input-box:before,
	.uni-uploader__input-box:after {
		content: " ";
		position: absolute;
		top: 50%;
		left: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		background-color: #D1D1D1;
	}
	.uni-uploader__input-box:before {
		width: 4rpx;
		height: 71rpx;
	}
	.uni-uploader__input-box:after {
		width: 71rpx;
		height: 4rpx;
	}
	.uni-uploader__input-box:active {
		border-color: #111111;
	}
	.uni-uploader__input-box:active:before,
	.uni-uploader__input-box:active:after {
		background-color: #111111;
	}
	.uni-uploader__input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
