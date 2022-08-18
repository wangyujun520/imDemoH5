<template>
    <view>
        <web-view :src="url"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                url: ''
            }
        },
        onLoad(e) {
             // 获取传递过来的链接
            this.url = e.url
			// 动态获取标题
			uni.setNavigationBarTitle({
			　　title:e.title
			})
        }
    }
</script>