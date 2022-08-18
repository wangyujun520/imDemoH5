<template>
	<view class="content">
		<view v-if="DataList.length == 0" class="flex justify-center align-center" style="height: 80vh">
			<u-empty text="暂无内容" mode="list"></u-empty>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				DataList:[]
			}
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
</style>