<template>
	<view class="px-2 my-2">
		<view class="flex bg-white align-center p-2 mb-2" style="border-radius: 20rpx;" v-for="(item, index) in UserList" :key="item.id">
			<view class="flex align-center justify-center"><image class="avatar" :src="item.header" mode="widthFix"></image></view>
			<view class="flex flex-column justify-between pl-2" style="width: 440rpx;height: 100rpx;border: 0px solid red;">
				<view class="flex align-center">
					<text class="name">{{ item.name }}</text>
					<view v-for="catalog in item.catalog" class="rounded flex align-center ml-1" :class="getColor(catalog.key)" style="padding: 5rpx 10rpx;">
						<text style="font-size: 24rpx;">{{ catalog.text }}</text>
						<!-- <u-icon name="level" color="#F7B03D" size="24"></u-icon> -->
					</view>
				</view>
				<text class="content-text LineBreak1">{{ item.mobile_text }}</text>
			</view>
			<view v-if="item.is_self != 0" class="flex justify-end align-center" style="width: 180rpx;height: 100rpx;border: 0px solid red;">
				<u-icon @tap="gotoIM(item.mobile, item.name)" class="mr-3" name="chat" color="#02B1BE" size="50"></u-icon>
				<u-icon @tap="CallPhone(item.mobile)" name="phone" color="#ff9900" size="50"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// UserList:[]
		};
	},
	props: {
		// 列表数据源
		UserList: {
			type: Array,
			default: () => []
		}
	},
	methods: {
		getColor(key) {
			// theme-bg-red
			console.log(key);

			switch (key) {
				// 实际有效的
				case 25: // 项目推荐商
					return 'theme-bg-red';
					break;
				case 24: // 生活服务商
					return 'theme-bg-yellow';
					break;
				case 23: // 房产开发商
					return 'theme-bg-purple';
					break;
				case 22: // 方案服务商
					return 'theme-bg-brown';
					break;
				case 21: // 销售服务商
					return 'theme-bg-blue';
					break;
				case 0: // 会员
					return 'theme-bg-orange';
					break;
				// 无效类型
				case 2: // 服务商
					return 'theme-bg-olive';
					break;
				case 11: // 客服
					return 'theme-bg-pink';
					break;
				case 1: // 运营商
					return 'theme-bg-green';
					break;
				default:
					// 默认背景
					return 'theme-bg-cyan';
					break;
			}
		},
		// 跳转到IM聊天
		gotoIM(tel, name) {
			console.log('跳转到IM聊天');
			this.$store.commit('createConversationActive', tel);
			uni.navigateTo({
				url: '/pages/chat/chat/chat?name=' + name
			});
		},
		// 拨打电话
		CallPhone(tel) {
			uni.makePhoneCall({
				phoneNumber: tel
			});
		}
	}
};
</script>

<style>
.avatar {
	width: 90rpx;
	height: 90rpx;
	border-radius: 50%;
}

.name {
	font-weight: bold;
	font-size: 32rpx;
}

.content-text {
	font-size: 28rpx;
	color: #999;
}

.time-text {
	font-size: 24rpx;
	color: #999;
}
</style>
