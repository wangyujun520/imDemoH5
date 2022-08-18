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
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">活动标题</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text v-if="DataList.title == ''" style="color: #979797;font-size: 26rpx;">请录入你的活动标题</text>
					<text v-else style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.title}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>
		<view @click="skipInfo" class="flex p-2 justify-between bg-white"
			style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">活动信息</text>
					<text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text v-if="DataList.info == ''" style="color: #979797;font-size: 26rpx;">请录入你的活动信息</text>
					<text style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.info}}</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>
		<view @click="skipSayAhead" class="flex p-2 justify-between bg-white">
			<view class="flex flex-column">
				<view class="flex align-center">
					<text style="font-size: 30rpx;font-weight: bold;color: #000000;">活动商品</text>
				</view>
				<view class="flex" style="width: 600rpx;">
					<text v-if="DataList.goods_list == ''" style="color: #979797;font-size: 26rpx;">请选择活动商品</text>
					<!-- <text style="color: #979797;font-size: 26rpx;" class="LineBreak1">{{DataList.conternt}}</text> -->
					<text style="color: #979797;font-size: 26rpx;" class="LineBreak1">已选择</text>
				</view>
			</view>
			<view class="flex">
				<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
			</view>
		</view>

		<view class="flex align-center bg-white px-2 py-3 mt-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
			<text style="font-size: 30rpx;font-weight: bold;color: #000000;">空间</text>
			<!-- <text style="color: red;font-weight: bold;font-size: 28rpx;" class="ml-1">*</text> -->
			<!-- <text style="color: #979797;font-size: 26rpx;" class="ml-3">添加的图片总数不少于6张</text> -->
		</view>
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in DataList.space" :key="item.id"
			@click="click" @open="open" @content-click="skipSpaceDetails(item,index)" :options="options">
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
		<u-modal @confirm="confirm" v-model="show" title="添加空间" :title-style="{color: '#101010'}"
			:show-cancel-button="true">
			<view class="flex py-2 px-4">
				<text style="color: #888;font-size: 28rpx;">请输入空间名称</text>
			</view>
			<view class="flex px-4 py-4">
				<input maxlength="5" style="border-bottom: 2px solid #FF9900;width: 100%;color: #888;font-size: 32rpx;"
					type="text" v-model="spaceName" placeholder="限填5字" />
			</view>
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import OssUpload from '@/utils/UploadOss/OssUpload.js';
	export default {
		onLoad() {
			// 新增的时候调用,编辑的时候不调用
			
			// 校验活动创建状态
			this.$post(this.$url.User.CheckCreateActivity, {}, {}).then(res => {
				this.CheckCreateActivity = res.data;
			})
		},
		// 发布功能
		onNavigationBarButtonTap: function(e) {
			// console.log(JSON.stringify(this.DataList))
			// 只在APP处理H5不校验
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
					title: '请填写活动标题!',
					type: 'warning'
				})
				return;
			}
			let sapces = this.DataList.space;
			console.log(JSON.stringify(sapces))
			let total = 0;
			sapces.forEach(item => {
				total += item.number;
			});
			// if (total < 6) {
			// 	this.$refs.uToast.show({
			// 		title: '空间图片数量不足!',
			// 		type: 'warning'
			// 	})
			// 	return;
			// }
			// console.log(JSON.stringify(this.DataList));
			this.DataList.space.forEach(item=>{
				var cc = {
					title: item.name, //空间标题
					items: []
				}
				item.spaceDetails.forEach(item2=>{
					var dd = {
						content: item2.content,
						images: item2.upload_imgs
					}
					cc.items.push(dd)
				})
				this.contents.push(cc)
			})

			let requestData = {
				id: this.CheckCreateActivity.activity_id, //数据id 新增
				title: this.DataList.title, //活动标题
				status: 2, //状态；0=已结束;1=待审核;2=进行中;-1=已取消；-2=未通过;
				banners: this.DataList.upload_cover, //横幅
				start_date: this.DataList.start_date,
				end_date: this.DataList.end_date,
				store: this.DataList.store,
				// province: 51,
				// city: 5101,
				// county: 510101,
				lat: this.DataList.lat,
				lng: this.DataList.lng,
				address: this.DataList.address,
				introduce: this.DataList.introduce, //活动详情
				goods_list: this.DataList.goods_list, //商品对象，多个用|隔开
				contents: this.contents //内容数组
			}
			console.log(JSON.stringify(requestData))
			// 新增活动
			this.$post(this.$url.User.UpdateActivity, requestData, {}).then(res => {
				if (res.code == 200 && res.status == 0) {
					this.$refs.uToast.show({
						title: '发布成功',
						type: 'success'
					});
					setTimeout(() => {
						// 两秒之后返回上一个界面
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				}
			})
		},
		data() {
			return {
				CheckCreateActivity:{},
				w: 0,
				h: 0,
				show: false, //显示添加空间的模态框
				DataList: {
					store:'',
					introduce:'',
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
							name: "活动详情",
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
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/ActivityInformation?title=' + this.DataList.info
				})
			},
			// 跳转到活动商品
			skipSayAhead() {
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/ActiveCommodities?activity_id=' + this.CheckCreateActivity.activity_id+'&mall_id='+this.CheckCreateActivity.mall_id
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
