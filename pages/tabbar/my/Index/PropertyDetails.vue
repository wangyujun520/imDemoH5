<template>
	
	<view class="content">
		<view class="flex flex-column mt-2 bg-white" style="padding: 30rpx 60rpx;">
			<image :src="DataList.photos" style="width: 590rpx;height: 400rpx;"></image>
		</view>
		
		<view class="bg-white px-3 mt-2">
			
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">楼盘名称</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.estate" style="font-size: 28rpx;color: #777;"/>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">面积</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.house_area" style="font-size: 28rpx;color: #777;"/>
				</view>
				<view class="form-icon flex justify-end" style="width: 50rpx;">
					<text class="iconfont" style="font-size: 30rpx;color: #777;">㎡</text>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">户型</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.house_catalog_text" style="font-size: 28rpx;color: #777;"/>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">城市</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<input type="text" v-model="DataList.area" style="font-size: 28rpx;color: #777;"/>
				</view>
			</view>
			<view class="flex align-center" style="height: 120rpx;border-bottom: 1px solid rgba(187,187,187,0.2);">
				<view class="form-title" style="width: 140rpx;">
					<text style="font-size: 30rpx;color: #101010;">地址</text>
				</view>
				<view class="form-input" style="width: 500rpx;">
					<!-- <input type="text" v-model="DataList.address" style="font-size: 28rpx;color: #777;"/> -->
					<text style="color: #888;font-size: 26rpx;">{{DataList.address}}</text>
				</view>
			</view>
			
			
		</view>
		
		
	</view>
	
</template>

<script>
export default {
	data() {
		return {
				DataList:''//Mock数据
		};
	},
	computed: {
		
	},
	onLoad(options) {
		
		
		
		// 获取我的房产明细
		this.$post(this.$url.User.GetHouse, {
			id:options.id
		}, {
			isLoading: true
		}).then(res => {
			// console.log(123)
			if (res.code == 200 && res.status == 0) {
				this.DataList = res.data
			}
		});
		
		
		// var RequrestUrl = this.AJB.BizUrl + 'api/House/GetMyHouseInfo';
		// var RequrestDatas = {
		// 	id: Option.id
		// };
		// this.id = Option.id;
		// this.AJB.UniAjax(RequrestUrl, RequrestDatas)
		// 	.then(res => {
		// 		console.log(JSON.stringify(res))
		// 		if (res.code == 200) {
		// 			this.DataList = res.dataList;
		// 		}
		// 	})
		// 	.catch(err => {
		// 		console.log(err);
		// 	});
	},
	// onShow() {
	// 	var DataLists =  {
	// 		"code":200,
	// 		"msg":"获取成功",
	// 		"dataList":{
	// 			"propertyName":"东方希望天祥广场",
	// 			"area":"100",
	// 			"houseType":"2室2厅",
	// 			"city":"四川-成都",
	// 			"address":"四川省成都市武侯区G213辅路天祥广场C座4313"
	// 		}
	// 	};
	// 	this.DataList = DataLists.dataList;
	// },
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
	// 隐藏scroll-view的滚动条
	/deep/.uni-scroll-view::-webkit-scrollbar {
		display: none
	}
</style>