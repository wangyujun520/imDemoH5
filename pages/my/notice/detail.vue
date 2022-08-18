<template>
	<view class="content p-3">
		<view class="flex flex-column p-3 bg-white">
			<view class="flex flex-column py-3 border-bottom mb-3">
				<text style="color: #101010;font-size: 30rpx;">{{DataList.title}}</text>
				<text style="color: #9D9D9D;font-size: 24rpx;">{{DataList.update}}</text>
			</view>
			<!-- <text style="color: #444;font-size: 26rpx;">一时失志不免怨叹一时落魄不免胆寒哪怕失去希望每日醉茫茫无魂有体亲像稻草人人生可比是海上的波浪有时起有时落好运歹运 总嘛要照起工来行三分天注定 七分靠打拼爱拼才会赢
一时失志不免怨叹一时落魄不免胆寒哪怕失去希望每日醉茫茫无魂有体亲像稻草人人生可比是海上的波浪有时起有时落好运歹运 总嘛要照起工来行三分天注定 七分靠打拼爱拼才会赢

一时失志不免怨叹一时落魄不免胆寒哪怕失去希望每日醉茫茫无魂有体亲像稻草人人生可比是海上的波浪有时起有时落好运歹运 总嘛要照起工来行三分天注定 七分靠打拼爱拼才会赢</text>
			<text class="mt-3" style="color: #9D9D9D;font-size: 26rpx;">安居邦网络科技有限公司</text> -->
			
			<view class="" v-html="DataList.content">
				
			</view>
			
		</view>
	</view>
</template>

<script>
	export default{
		onLoad(options) {
			let requestData = {
				id:options.id
			}
			this.$post(this.$url.Article.GetArticle,requestData,{}).then(res=>{
				this.DataList = res.data
			});
		},
		data(){
			return{
				DataList:{}
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	page{
		background-color: #F7F7F7;
	}
	/deep/ img {
		width: 100% !important;
	}
</style>
