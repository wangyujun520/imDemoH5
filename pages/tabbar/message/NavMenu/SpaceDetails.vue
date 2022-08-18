<template>
	<view class="content px-2 pt-2">
		<u-swipe-action :show="item.show" :index="index"
			v-for="(item, index) in DataList.spaceDetails" :key="item.id" 
			@click="click" @open="open" @content-click="ContentClick(item)"
			:options="options"
		>
			<view class="flex bg-white justify-between p-2" style="border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="pr-2">
					<text style="font-size: 26rpx;" class="LineBreak">{{item.content}}</text>
				</view>
				<view class="flex align-center justify-center">
					<image :src="item.img[0]" mode="aspectFill" style="width: 100rpx;height: 100rpx;"></image>
				</view>
			</view>
		</u-swipe-action>

		<view @click="AddImg" class="flex bg-white align-center justify-center mt-4 py-3" style="color: #2979ff;">
			<u-icon name="plus" color="#2979ff" size="28"></u-icon>
			<text style="font-size: 28rpx;" class="ml-1">添加图片</text>
		</view>

	</view>
</template>

<script>
	export default {
		onBackPress(options) {
			if (options.from === 'backbutton' && !this.isBack) {
				// 异步事件处理  
				let pages = getCurrentPages(); //获取所有页面栈实例列表
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				// prevPage.$vm.DataList.space[this.ThisIndex].number = this.DataList.spaceDetails.length;
				let number = 0;
				this.DataList.spaceDetails.forEach(item=>{
					number += item.img_length;
				})
				prevPage.$vm.DataList.space[this.ThisIndex].number = number;
				prevPage.$vm.DataList.space[this.ThisIndex].spaceDetails =this.DataList.spaceDetails;
			}
			return false;
		},
		data() {
			return {
				DataList: '', //Mock数据
				ThisIndex: 0,
				disabled: false,
				btnWidth: 180,
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#dd524d'
						}
					}
				]
			}
		},
		onShow() {
			console.log(JSON.stringify(this.DataList));
			// 单页面调用5+ Api
			// 是否支持屏幕左边滑动关闭当前页面。默认是可关闭。设为none则不响应左滑动画
			// #ifdef APP-PLUS
			var page = this.$mp.page.$getAppWebview();
			page.setStyle({ popGesture: 'none' });
			// #endif
		},
		methods: {
			// 空间内容点击事件
			ContentClick(item){
				console.log(JSON.stringify(item))
			},
			//删除按钮点击事件
			click(index) {
				this.DataList.spaceDetails.splice(index, 1);
			},
			// 滑动第二个的时候关闭第一个的菜单
			open(index) {
				this.DataList.spaceDetails[index].show = true;
				this.DataList.spaceDetails.map((val, idx) => {
					if(index != idx) this.DataList.spaceDetails[idx].show = false;
				})
			},
			AddImg() {
				uni.navigateTo({
					url: '/pages/tabbar/message/SubPage/AddImg?id='+this.DataList.spaceDetails.length
				})
			}
		},
		onLoad(options) {
			this.DataList = uni.getStorageSync('ShowSpaceDetaile');
			this.ThisIndex = options.index;
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f7f7f7;
	}
	.LineBreak {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		/*超出3行部分显示省略号，去掉该属性 显示全部*/
		-webkit-box-orient: vertical;
	}
</style>
