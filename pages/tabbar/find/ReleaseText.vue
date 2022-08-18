<template>
	<view class="content">
		<!-- 输入文字内容 -->
		<view class="flex px-2 pt-2 bg-white">
			<textarea maxlength="-1" style="width: 100%; font-size: 28rpx" value="" placeholder="发布你的想法..." v-model="DataList.content" />
		</view>
		<!-- 所在位置 -->
		<choose-map @changes="mapClick"></choose-map>
		<!-- 选择按钮 -->
		<view class="flex justify-between px-3 py-2 bg-white mt-2" v-if="Catalog.length>0">
			<text>发布栏目</text>
			<view class="flex">
				<u-radio-group v-model="CatalogValue" @change="radioGroupChange">
					<u-radio 
						v-for="(item, index) in Catalog" :key="item.id" 
						:name="item.id"
					>
						{{item.title}}
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<!-- 管理商品 -->
		<view class="flex px-3" style="margin-top: 30rpx">
			<u-button type="warning" style="width: 100%; height: 100rpx" @click="submit">发布</u-button>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import chooseMap from '@/components/choose-map/choose-map.vue';
export default {
	components: {
		chooseMap
	},
	data() {
		return {
			DataList: {
				type: '1',//发布类型；发布类型；1=纯文字、2=图+文、3=视频+文、4=链接+文字、5=商品+文字
				content: '',
				catalog_id: '',
				files: '',
				lng: '',
				lat: '',
				address: ''
			},
			// 单选
			Catalog:[],
			CatalogValue:''
		};
	},
	onLoad() {
		// 获取我的发布菜单权限
		this.$post(this.$url.Discover.GetMyCatalogs, {},{
			isLoading:true
		}).then(res => {
			console.log(JSON.stringify(res))
			this.Catalog = res.data;
			if(this.Catalog.length>0){
				this.CatalogValue = res.data[0].id;
				this.DataList.catalog_id = res.data[0].id;
			}
		});
	},
	methods: {
		// 选中任一radio时，由radio-group触发
		radioGroupChange(e) {
			this.DataList.catalog_id = e;
		},
		mapClick(item) {
			console.log(JSON.stringify(item));
			console.log(item.address);
			this.DataList.lng = item.longitude;
			this.DataList.lat = item.latitude;
			this.DataList.address = item.address;
		},
		skipProductsConcern() {
			// 跳转到我关注的商品页面
			uni.navigateTo({
				url: '/pages/tabBar/find/ProductsConcern'
			});
		},
		submit() {
			console.log(JSON.stringify(this.DataList));
			// return;
			
			if (this.DataList.catalog_id == '') {
				this.$refs.uToast.show({
					title: '当前没有发布权限',
					type: 'warning'
				});
				return;
			}
			// 非空验证
			if (this.DataList.content == '') {
				this.$refs.uToast.show({
					title: '请输入你的想法',
					type: 'warning'
				});
				return;
			}
			// 发布内容
			this.$post(this.$url.Discover.Post, this.DataList,{
				isLoading:true
			}).then(res => {
				console.log(JSON.stringify(res))
				if(res.code == 200){
					// 发布成功
					uni.showToast({
						title: '发布成功',
						icon: 'success',
						duration: 2000
					})
					setTimeout(() => {
						// 两秒之后返回上一个界面
						uni.navigateBack({
							delta: 1
						});
					}, 2000);
				}
			});
			
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}
.LineBreak {
	white-space: initial;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /*超出3行部分显示省略号，去掉该属性 显示全部*/
	-webkit-box-orient: vertical;
	line-height: 30rpx;
}

.tab-scroll-view {
	width: 750rpx;
	flex-direction: row;
	white-space: nowrap;
	.tab-item {
		display: inline-block;
		width: 500rpx;
		height: 130rpx;
	}
}
/deep/.uni-scroll-view ::-webkit-scrollbar {
	/* 隐藏滚动条，但依旧具备可以滚动的功能 */
	display: none;
	width: 0;
	height: 0;
	color: transparent;
	background: transparent;
}
/deep/::-webkit-scrollbar {
	display: none;
	width: 0;
	height: 0;
	color: transparent;
	background: transparent;
}
</style>
