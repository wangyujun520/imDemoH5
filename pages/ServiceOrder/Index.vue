<template>
	<view class="content p-2">
		
		<view class="py-2 bg-white">
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<text>东方希望天祥广场</text>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="" style="width: 440rpx;">
					<text class="text-title">装修风格：</text>
					<text class="text-content">现代简约</text>
				</view>
				<view class="" style="width: 280rpx;">
					<text class="text-title">设计面积：</text>
					<text class="text-content">100㎡</text>
				</view>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="" style="width: 440rpx;">
					<text class="text-title">房屋户型：</text>
					<text class="text-content">三室两厅</text>
				</view>
				<view class="" style="width: 280rpx;">
					<text class="text-title">装修预算：</text>
					<text class="text-content">15万</text>
				</view>
			</view>
			<view class="px-2 flex align-center" style="height: 60rpx;">
				<view class="flex align-center" style="width: 720rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">&#xe65e;</text>
					<text class="text-content">四川省成都市武侯区G213辅路</text>
				</view>
			</view>
		</view>
		
		<u-steps class="my-2" :list="numList" active-color="#FF9900" un-active-color="#999" :current="1"></u-steps>
		<view class="flex flex-column bg-white rounded">
			<view @click="AllConsumables()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">所有耗材</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="ConceptualDesign()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">方案设计</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="ContractInformation()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">合同信息</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="PaymentInformation()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">支付信息</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			
		</view>
		
		
		<view class="flex flex-column bg-white rounded mt-1">
			<view @click="ADesignChart()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">设计施工图</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="BillMaterials()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">材料清单</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
			<view @click="PersonnelList()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<!-- <text class="" style="color: #101010;font-size: 28rpx;">人员清单</text> -->
				<text class="" style="color: #101010;font-size: 28rpx;">人员及施工清单</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
		<view class="flex flex-column bg-white rounded mt-1">
			<view @click="ConstructionNode()" class="flex justify-between align-center pl-2" style="height: 100rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<text class="" style="color: #101010;font-size: 28rpx;">施工节点</text>
				<view class="flex align-center">
					<text style="color: #777;font-size: 28rpx;"></text>
					<text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #555;">&#xe656;</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			numList: [{
				name: '方案'
			}, {
				name: '合同'
			}, {
				name: '支付'
			}, {
				name: '设计'
			}, {
				name: '施工'
			}, {
				name: '完工'
			}]
		};
	},
	onShow() {
		
	},
	methods: {
		// 所有耗材
		AllConsumables(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/AllConsumables'
			})
		},
		// 方案设计
		ConceptualDesign(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/ConceptualDesign'
			})
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
		// 设计施工图
		ADesignChart(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/DesignConstructionDrawings'
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
				// url:'/pages/ServiceOrder/PersonneDetailedList',
				url:'/pages/ServiceOrder/PersonnelConfirm',
			})
		},
		// 施工节点
		ConstructionNode(){
			uni.navigateTo({
				url:'/pages/ServiceOrder/ConstructionNode'
			})
		},
	}
};
</script>

<style>
	.text-title{
		font-size:26rpx;
		color:#999;
	}
	.text-content{
		font-size:26rpx;
		color:#999;
	}
</style>
