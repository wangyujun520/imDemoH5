<template>
	<view @click="changSite" class="flex justify-between bg-white my-1 align-center py-2 px-3">
		<view class="flex align-center">
			<text class="iconfont" style="color: #FF9900;font-size: 40rpx;">&#xe65e;</text>
			<text class="ml-1" style="font-size: 28rpx;">{{title}}</text>
		</view>
		<view class="flex align-center justify-end" style="width: 500rpx;">
			<text style="font-size: 28rpx;">{{changsitename}}</text>
			<!-- <text class="iconfont" style="font-weight: bold;font-size: 40rpx;color: #999;">&#xe656;</text> -->
			<u-icon name="arrow-right" color="#999" size="28"></u-icon>
		</view>
	</view>
	
</template>

<script>
	export default{
		// 初始化把数据给父组件
		// 然后点击后又把数据给父组件
		data(){
			return{
				totalData:{
					Address: "",
					longitude: '',
					latitude: ''
				},
				changsitename:'',
			}
		},
		props:{
			title: {
				type: String,
				default: "所在位置"
			}
		},
		created(){
			var _this = this
			uni.getLocation({
				type: 'gcj02',
				success: function(res) {
					// console.log('当前位置的经度：' + res.longitude);
					// console.log('当前位置的纬度：' + res.latitude);
					var point = new plus.maps.Point(res.longitude, res.latitude);
					uni.showToast({
						title:point
					});
					plus.maps.Map.reverseGeocode(
						point, {},
						function(event) {
							_this.changsitename = event.address;
							var AddressInfo = {
								address:event.address,
								longitude:event.coord.longitude,
								latitude:event.coord.latitude
							}
							_this.$emit('changes',AddressInfo);
						},
					);
				}
			});
		},
		methods:{
			changSite() {
				var _self = this;
				uni.chooseLocation({
					success: function(res) {
						_self.changsitename = res.address;
						var AddressInfo = {
							address:res.address,
							longitude:res.longitude,
							latitude:res.latitude
						}
						_self.$emit('changes',AddressInfo);
					},
					fail: function(e) {
						uni.showToast({
							title: e
						});
					}
				});
			}
		}
	}
</script>

<style>
</style>
