<template>
	<view class="content px-3">
		<!-- <view class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">你的昵称修改成功~</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">你的昵称已修改【mockingbot】</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">1天前</text>
			</view>
		</view> -->
		<!-- <view class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">感谢您注册安居邦，记得实名认证哦~</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">实名认证后才可以找联系设计师或成为设计师哦，点击本条消息，立即实名认证！</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">1天前</text>
				<view class="flex align-center">
					<text style="color: #939393;font-size: 26rpx;">查看详情</text>
					<u-icon name="arrow-right" style="font-size: 26rpx;color: #939393;"></u-icon>
				</view>
			</view>
		</view> -->
		
		<view @tap="skipUrl(item)" class="flex p-2 mt-3 flex-column" style="background-color: #F6F6F7;" v-for="(item,index) in DataList" :key="item.id">
			<text style="color: #101010;font-size: 28rpx;font-weight: bold;">{{item.title}}</text>
			<text class="my-1" style="color: #939393;font-size: 26rpx;">{{item.content}}</text>
			<view class="flex justify-between">
				<text style="color: #939393;font-size: 26rpx;">{{item.add_date}}</text>
				<view class="flex align-center" v-if="item.url">
					<text style="color: #939393;font-size: 26rpx;">查看详情</text>
					<u-icon name="arrow-right" style="font-size: 26rpx;color: #939393;"></u-icon>
				</view>
			</view>
		</view>
		
		
		<!-- <u-loadmore margin-top="30" bg-color="#ffffff" :status="loadStatus" @loadmore="addRandomData"></u-loadmore> -->
		
	</view>
</template>

<script>
	export default {
		onPullDownRefresh() {
			setTimeout(()=>{
				uni.stopPullDownRefresh();
			},2000)
		},
		onShow() {
			this.$post(this.$url.Msg.GetSysMsgs, {},{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				this.DataList = res.data.list;
			});
		},
		// 监听页面卸载
		onUnload() {
			let ReadID = 'C2C' + 'SystemMessage';
			// console.log(ReadID);//C2C5
			//退出页面 将系统的消息设置为已读
			let promise = getApp().$tim.setMessageRead({ conversationID: ReadID });
			promise.then(imResponse => {
				console.log('全部已读');
				//调用上一个界面的消息列表刷新方法
				// 发送页
				uni.$emit('MsgRead', {});
				// 已读上报成功
			})
			.catch(imError => {
				// 已读上报失败
				console.warn('setMessageRead error:', imError);
			});
		},
		data() {
			return {
				loadStatus: 'nomore',
				DataList:[]
			};
		},
		methods:{
			addRandomData(){
				this.loadStatus = 'loadmore';
			},
			skipUrl(item){
				if(item.url == ''){
					return;
				}
				// 跳转到url地址
				uni.navigateTo({
					url:item.url
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #FFFFFF;
	}
</style>
