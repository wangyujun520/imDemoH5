<template>
	<view class="content px-3">
		<!-- 第一行 -->
		<view v-if="DataList.banners.length>0" class="flex mt-2" style="height: 300rpx;">
			<image :src="DataList.banners[0]" style="width: 100%;height: 100%;"></image>
		</view>
		<!-- 第二行 -->
		<view class="flex align-center justify-between mt-4 rounded px-3" style="background-color: #f7f7f7;height: 160rpx;">
			<view class="flex align-center">
				<view class="flex">
					<image class="rounded" :src="DataList.logo" style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view class="flex flex-column">
					<view class="">
						<text class="ml-1" style="color: #6B8EB5;font-size: 28rpx;">{{ DataList.name }}</text>
						<text style="color: #FFFFFF;background-color: #8A2BE2;font-size: 22rpx;margin-left: 10rpx;padding: 3rpx 20rpx;border-radius: 10rpx;">{{ DataList.catalog }}</text>
					</view>
					<view class="">
						<text style="font-size: 26rpx;color: #888;" class="mt-1 ml-1">{{DataList.create_time}}</text>
					</view>
				</view>
			</view>
			<view class="flex align-center">
				<view @click="skipShopHomepage" class="flex align-center justify-center" style="width: 80rpx;height: 80rpx;background-color: #FFE5D0;border-radius: 50%;">
					<!-- <text class="iconfont" style="color: #FF9900;font-size: 40rpx;">&#xe667;</text> -->
					<text class="iconfont" style="color: #FF9900;font-size: 40rpx;">&#xe70a;</text>
					
				</view>
			</view>
		</view>
		
		<view class="flex py-2 mt-2 flex-column">
			<text style="font-size: 30rpx;font-weight: bold;color: #000000;">{{DataList.title}}</text>
			<text class="mt-1" style="color: #888;font-size: 26rpx;">{{DataList.introduce}}</text>
		</view>
		
		<!-- <view class="flex flex-column mt-2" v-for="(content,cindex) in DataList.contents">
			<text>{{content.content}}</text>
			<image v-for="img in content.photos" :src="img" style="width: 100%;"></image>
		</view> -->
		
		<!-- 说在前面 -->
		<view v-if="DataList.contents.length>0" class="flex flex-column" v-for="(item,index) in DataList.contents">
			<view class="flex mt-3"><text style="color: #000000;font-weight: bold;font-size: 30rpx;">{{item.title}}</text></view>
			<view class="flex flex-column" v-for="(item2,index2) in item.items">
				<!-- <image v-for="showimg in item2.images" @load="loadImage" :src="showimg" lazy-load="true"
					:style="'width: ' + w + 'px;height: ' + h + 'px;'" class="rounded"></image> -->
					
				<image v-for="showimg in item2.images" mode="widthFix" style="width: 100%;" :src="showimg"  lazy-load="true" class="rounded mt-2"></image>
				<text class="mt-1">{{ item2.content }}</text>
			</view>
		</view>
		
		<view class="flex flex-column rounded p-2 mt-2" style="border: 1px solid rgba(187,187,187,0.3);">
			<view class="flex align-center">
				<text style="color: #888;font-size: 26rpx;">活动时间</text>
				<text style="color: #101010;font-size: 28rpx;" class="ml-1">{{DataList.date}}</text>
			</view>
			<view class="flex align-center">
				<text style="color: #888;font-size: 26rpx;">活动地点</text>
				<text style="color: #101010;font-size: 28rpx;" class="ml-1">{{DataList.store}}</text>
			</view>
			<view @click="skipAddress" v-if="DataList.address" class="flex align-center justify-between px-2 mt-2" style="background-color: #f7f7f7;height: 80rpx;">
				<view class="flex align-center">
					<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
					<text style="color: #888;font-size: 24rpx;">{{DataList.address}}</text>
				</view>
				<view class="flex">
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #888;"></u-icon>
				</view>
			</view>
		</view>
		
		<view class="flex align-center" style="height: 100rpx;" v-if="DataList.goods_list.length>0">
			<text style="color: #101010;font-size: 30rpx;font-weight: bold;">商品链接</text>
		</view>
		<view @click="skipProductDetails(item)" v-for="(item,index) in DataList.goods_list" :key="index" class="flex bg-white py-1 mb-1 rounded" style="background-color: #f7f7f7;">
			<view class="flex justify-center align-center" style="width: 200rpx;height: 160rpx;">
				<image class="rounded" :src="item.cover" style="width: 140rpx;height: 140rpx;"></image>
			</view>
			
			<view class="flex flex-column justify-between pr-2" style="height: 160rpx;width: 550rpx;">
				<view class="mt-2"><text class="LineBreak" style="font-size: 30rpx;">{{item.title}}</text></view>
				<view class="mb-1">
					<text v-if="item.price != null" style="color: #FF0000;font-weight: bold;">
						<span style="font-size: 26rpx;">￥</span>
						<span style="font-size: 35rpx;">{{item.price}}</span>
					</text>
				</view>
			</view>
			
		</view>
		<!-- 占位 -->
		<view class="" style="height: 30rpx;"></view>
		
		<!-- 右上角点击 -->
		<u-action-sheet :list="ActionSheetList" @click="SetUpClick" @close="ShowTabBar" v-model="showActionSheet"></u-action-sheet>
	</view>
</template>

<script>
export default {
	// 右上角点击事件
	onNavigationBarButtonTap: function(e) {
		if (e.float == 'right') {
			if(this.rankno==2){
				this.showActionSheet = true;
			}
		}
	},
	onShow() {
		if(this.rankno!=2){
			//#ifdef H5
			setTimeout(()=>{
				document.querySelectorAll('.uni-page-head .uni-page-head-ft .uni-page-head-btn')[0].querySelector('.uni-btn-icon').innerText = ' ';
			},10)
			//#endif
			// #ifdef APP-PLUS
			var currentWebview = this.$mp.page.$getAppWebview();
			currentWebview.setTitleNViewButtonStyle(0, { //h5端会报错
				text: ' '
			});
			// #endif
		}
	},
	onLoad(options) {
		this.id = options.id;
		// 动态修改标题
		uni.setNavigationBarTitle({
			title: options.title
		});
		this.$post(this.$url.Mall.GetActivity, {
			id:options.id
		}, {
			isLoading:true,
			loadingTitle:'加载中...'
		}).then(res => {
			if (res.code == 200 && res.status == 0) {
				this.DataList = res.data;
			}
		})
	},
	data() {
		return {
			rankno:uni.getStorageSync('rankno'),
			w: 100, //图片宽度
			h: 100, //图片高度
			id:'',
			tests:[
				{
					img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729362933,927009493&fm=26&gp=0.jpg',
					title: '158九牧（JOMOO）11173-2-1/31Z 马桶防臭节水家用大冲力超漩虹吸式撒的发生的士大夫撒发胜多负少的感受到广东省防守打法',
					price: '5000'
				},
				{
					img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729362933,927009493&fm=26&gp=0.jpg',
					title: '123九牧（JOMOO）11173-2-1/31Z 马桶防臭节水家用大冲力超漩虹吸式撒的发生的士大夫撒发',
					price: '5000'
				},
				{
					img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2729362933,927009493&fm=26&gp=0.jpg',
					title: '456九牧（JOMOO）11173-2-1/31Z 马桶防臭节水家用大冲力超漩虹吸式撒的发生的士大夫撒发',
					price: '5000'
				}
			],
			item:{
				"isOver": false,
				"headPortrait": "https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3155998395,3600507640&fm=26&gp=0.jpg",
				"name": "掌上明珠",
				"TypeWork": "商家",
				"releaseTime": "2020-12-26 03:27",
				"coverMap": "/static/img/test111.png",
				"title": "品牌周年庆“全场9折”",
				"content": "冰箱、洗衣机、空调家电全场优惠，最高单件优惠可减1999元，抢完及止！！！"
			},
			showActionSheet: false,
			ActionSheetList: [
				// {
				// 	text: '分享'
				// },
				{
					text: '停用'
				},
				// {
				// 	text: '编辑'
				// },
				{
					text: '删除'
				}
			],
			DataList: '' //Mock数据
		};
	},
	methods: {
		// 加载图片
		loadImage(e) {
			// 拿到图片的宽高
			let w = e.detail.width;
			let h = e.detail.height;
			// 最大宽度 px
			let maxW = uni.upx2px(680);
			// 最大高度 px
			let maxH = uni.upx2px(500);
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
		skipShopHomepage(){
			uni.navigateTo({
				url:'/pages/tabbar/settle/ShopHomepage?id='+this.DataList.id
			})
		},
		skipProductDetails(item){
			uni.navigateTo({
				url:'/pages/tabbar/settle/ProductDetails?id='+item.id
			})
		},
		// 跳转到地图页面
		skipAddress(){
			let location = this.DataList.lng+','+this.DataList.lat
			uni.navigateTo({
				url:'/pages/chat/map/map?data='+this.DataList.address+'&location='+location
			})
		},
		SetUpClick(index) {
			uni.showTabBar(); //显示TabBar
			// console.log(`点击了第${index + 1}项，内容为：${this.ActionSheetList[index].text}`)

			// // 分享
			// if (index == 0) {
			// }

			// 停用
			if (index == 0) {
				let requestData = {
					id: this.id, //数据id
					status: '-1' //状态；0=已结束;1=待审核;2=进行中;-1=已取消；-2=未通过;
				}
				// 修改活动状态
				this.$post(this.$url.User.UpdateActivity, requestData, {
					isLoading:true,
					loadingTitle:'停用中...'
				}).then(res => {
					uni.showToast({
						title: '停用成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(()=>{
						//返回上一个界面
						uni.navigateBack({
							delta:1
						})
					},2000);
				})
			}

			// // 编辑
			// if (index == 1) {
			// 	console.log('编辑')
			// }

			// 删除
			if (index == 1) {
				this.$post(this.$url.User.DelActivity, {
					id: this.id
				}, {
					isLoading:true,
					loadingTitle:'删除中...'
				}).then(res => {
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(()=>{
						//返回上一个界面
						uni.navigateBack({
							delta:1
						})
					},2000);
				})
			}
		},
		ShowTabBar() {
			uni.showTabBar(); //显示TabBar
		}
	}
	
};
</script>

<style lang="scss">
// page {
// 	background-color: #f7f7f7;
// }
.LineBreak {
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /*超出3行部分显示省略号，去掉该属性 显示全部*/
	-webkit-box-orient: vertical;
}
</style>
