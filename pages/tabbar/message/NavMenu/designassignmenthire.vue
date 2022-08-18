<template>
	<view class="content">
		<view class="flex flex-column" style="margin: 20rpx 20rpx 0 20rpx;padding-bottom: 120rpx;">
			
			<view class="bg-white" style="width: 100%;border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex align-center" style="height: 140rpx;">
					<view class=" flex align-center justify-center" style="width: 140rpx;height: 100%;">
						<image class="rounded" src="/static/img/head/demo5.jpg" style="width: 100rpx;height: 100rpx;"></image>
					</view>
					<view class="flex flex-column justify-center" style="width: 380rpx;height: 100%;">
						<view class=""><text style="font-size: 30rpx;color: #101010;font-weight: bold;">宋先生</text></view>
						<view class="flex align-center">
							<text style="color: #888;font-size: 26rpx;">预算金额：</text>
							<text style="color: #FF0000;font-weight: bold;">
								<span style="font-size: 26rpx;">￥</span>
								<span style="font-size: 30rpx;">5000</span>
							</text>
						</view>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">风格偏好：</text>
						<text class="text-content">两室两厅一卫</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">任务周期：</text>
						<text class="text-content">5天</text>
					</view>
				</view>
				<view class="px-2 flex align-center" style="height: 60rpx;">
					<view class="" style="width: 440rpx;">
						<text class="text-title">预计装修日期：</text>
						<text class="text-content">2020-12-01</text>
					</view>
					<view class="" style="width: 280rpx;">
						<text class="text-title">常驻人口：</text>
						<text class="text-content">4人</text>
					</view>
				</view>
				<view class="px-2 flex align-end" style="height: 60rpx;"><text class="text-title">特殊要求</text></view>
				<view class="px-2 my-2">
					<view class="p-1" style="background-color: #f6f6f6;">
						<text style="color: #666;font-size: 26rpx;">客厅阳台需要设计榻榻米，儿童房做榻榻米，家里有老人不方便，需要设计马桶。</text>
					</view>
				</view>
				<view class="px-2 flex align-start" style="height: 60rpx;">
					<text class="iconfont" style="font-size: 28rpx;color: #999;">&#xe65e;</text>
					<text style="font-size: 24rpx;color: #999;">四川省成都市武侯区G213辅路</text>
				</view>
			</view>
			<view @click="skipincludetasks" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">包含项目</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe621;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe60f;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe614;</text>
					<text class="iconfont" style="font-size: 50rpx;color: #02B1BE;">&#xe61d;</text>
				</view>
			</view>
			<view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<view class="flex">
						<text style="font-size: 26rpx;color: #999;">到期时间</text>
						<text style="font-size: 26rpx;color: #4CAF50;" class="ml-1">2020-11-20</text>
					</view>
					<view class=""><text style="font-size: 26rpx;color: #FF9900;">剩余(20天)</text></view>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;">
					<u-line-progress active-color="#2979ff" :percent="70" :striped="true" :striped-active="true"></u-line-progress>
				</view>
			</view>
			
			<view class="flex flex-column px-2 bg-white mt-2 py-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">雇佣设计师</text>
				</view>
				<view class="mt-1 flex px-1 rounded" style="height: 140rpx;background-color: #f7f7f7;width: 670rpx;">
					<view class="flex align-center">
						<image src="/static/img/head/demo6.jpg" style="width: 100rpx;height: 100rpx;" class="rounded"></image>
					</view>
					<view class="flex flex-column pl-2 " style="width: 560rpx;">
						<view class="UserInfo pt-1">
							<text class="mr-1" style="color: #101010;font-size: 30rpx;font-weight: bold;">海绵宝宝</text>
							<text class="font-sm text-white bg-danger px-1 pl-1" style="border-radius: 0rpx 8rpx 8rpx 0rpx;">设计师</text>
						</view>
						<view class="Describe">
							<text style="font-size: 26rpx;color: #939393;">房屋设计、新房、公寓、旧房改造</text>
						</view>
						<view class="Scoring">
							<u-rate :disabled="true" :current="4" :size="28" inactive-color="#B2B2B2" active-color="#FF9900" active-icon="star-fill"
							 inactive-icon="star"></u-rate>
							<text style="color: #ff1b1b;">4.0分</text>
						</view>		
					</view>
					
				</view>
			</view>
			
			<view @click="ContractInformation" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">合同信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待签订合同</text></view>
			</view>
			<view @click="PaymentInformation" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">支付信息</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待支付</text></view>
			</view>
			<view @click="skipuploaddesignscheme" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">设计施工图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待上传设计图</text></view>
			</view>
			<!-- <view class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">施工图</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待上传施工图</text></view>
			</view> -->
			<view @click="BillMaterials" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">材料清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待确定材料</text></view>
			</view>
			<view @click="PersonnelList" class="flex flex-column px-2 bg-white mt-2 pt-2" style="border-radius: 10rpx 10rpx 10rpx 10rpx;">
				<view class="flex justify-between">
					<text style="font-size: 26rpx;color: #999;">人员清单</text>
					<u-icon name="arrow-right" style="font-size: 28rpx;color: #777;"></u-icon>
				</view>
				<view  class="flex align-center" style="width: 670rpx;height: 80rpx;"><text style="font-size: 26rpx;color: #FA3534;">等待确定施工人员</text></view>
			</view>
		
		</view>
		<view class="position-fixed" style="height: 100rpx;width: 100%;bottom: 0;">
			<view class="flex bg-white" style="width: 100%;height: 100%;border-top: 1px solid rgba(187,187,187,0.2);">
				<view class="flex align-center pl-2" style="width: 400rpx;">
					<text style="background-color: #FFFFFF;color: #2979FF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #2979FF;">联系客户</text>
				</view>
				<view class="flex align-center justify-center" style="width: 350rpx;">
					<text style="background-color: #FF0000;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #FF0000;">拒绝</text>
					<text class="ml-3" style="background-color: #02B1BE;color: #FFFFFF;font-size: 26rpx;padding: 10rpx 40rpx;border-radius: 40rpx;border: 1px solid #02B1BE;">接受</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
		     isVip:false,
			 isDesing:false
		};
	},
	methods: {
		// 显示弹出框菜单
		skipincludetasks() {
			// 跳转到包含任务界面
			uni.navigateTo({
				url: '/pages/tabBar/message/NavMenu/includetasks'
			});
		},
		skipuploaddesignscheme() {
			// 跳转到上传设计施工图
			uni.navigateTo({
				// url: '/pages/tabBar/message/NavMenu/uploaddesignscheme'
				url: '/pages/tabBar/message/SubPage/DesignConstructionPlans'
			});
		},
		// 合同信息
		ContractInformation(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/ContractInformation'
			})
		},
		// 支付信息
		PaymentInformation(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/PaymentInformation'
			})
		},
		// 材料清单
		BillMaterials(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/BillMaterials'
			})
		},
		// 人员清单
		PersonnelList(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/PersonneDetailedList'
			})
		}
	},
	onShow() {
		//判断显示按钮
		let res = uni.getStorageSync('professionInfo');
		res.forEach((item) => {
			if (item == "设计师") {this.isDesing  = true;}
			if (item == "会员") {this.isVip = true;}
		})
		
	}
};
</script>

<style lang="scss" scoped>
.text-title {
	font-size: 26rpx;
	color: #888;
}
.text-content {
	font-size: 28rpx;
	color: #101010;
}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>