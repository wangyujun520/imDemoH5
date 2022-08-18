<template>
	<view class="page" :style="{ height: `${sysHeight}px`, width: `${sysWidth}px` }">
		<view
			v-if="index <= number"
			class="move-view"
			:key="item._id"
			@touchend="touchend"
			@tap="tapCard(item)"
			v-for="(item, index) in dataList"
			@touchmove="touchMove"
			@touchstart="touchStart"
			:animation="animationData[index]"
			:style="{
				transform:
					index < number
						? `rotate(${rotate * index}deg) scale(${1 - (1 - scale.x) * index},${1 - (1 - scale.y) * index}) skew(${skew.x * index}deg, ${skew.y *
								index}deg) translate(${translate.x * index}px, ${translate.y * index}px)`
						: `rotate(${rotate * (number - 1)}deg) scale(${1 - (1 - scale.x) * (number - 1)},${1 - (1 - scale.y) * (number - 1)}) skew(${skew.x *
								(number - 1)}deg, ${skew.y * (number - 1)}deg) translate(${translate.x * (number - 1)}px, ${translate.y * (number - 1)}px)`,
				zIndex: `${99999 - item._id}`,
				opacity: index < number ? `${1 - (1 - opacity) * index}` : `${1 - (1 - opacity) * (number - 1)}`
			}"
		>
			<view class="cardBox">
				<card-box
					:src="item.src"
					:number="item.number"
					:name="item.name"
					:sex="item.sex"
					:constellation="item.constellation"
					:address="item.address"
					:old="item.old"
					ref="cardBox"
				></card-box>
			</view>
		</view>

		<view class="loathe"><view class="iconfont icon-chacha1" :style="{ fontSize: '40rpx' }" @tap="tapLoathe"></view></view>
		<text class="loathetext">不喜欢</text>

		<view class="love"><view class="iconfont icon-xinaixin" :style="{ fontSize: '40rpx' }" @tap="tapLove"></view></view>
		<text class="lovetext">喜欢</text>

		<view class="lineprogress"><u-line-progress :percent="progress" :show-percent="false" active-color="#727272" inactive-color="#F2F2F2" height="14"></u-line-progress></view>
	</view>
</template>

<script>
import clCardDel from '@/components/cl-cardDel/cl-cardDel';
import cardBox from './card-box';
export default {
	mixins: [clCardDel],
	components: { cardBox },
	onBackPress(e) {
		// 这里可以自定义返回逻辑，比如下面跳转其他页面
		console.log(JSON.stringify(e));
		uni.switchTab({
			url: "/pages/tabbar/settle/settle"
		});
		// return true 表示禁止默认返回
		return true;
	},
	data() {
		return {
			TestDataList:[],
			DataList:[],
			progress:0,
			sign:''
		};
	},
	watch:{
		TestDataList(val){
			// console.log(val.length)
			// console.log(this.DataList.length)
			this.progress = parseInt((val.length/this.DataList.length)*100);
			// console.log(this.progress)
			if(this.progress == 100){
				uni.setStorageSync('TestDataList', this.TestDataList);
				uni.navigateTo({
					url: '/pages/tabbar/settle/StyleTest/Waiting'
				});
			}
		}
	},
	methods: {
		// like(item) {
		// 	//跳转到测试详情界面
		// 	uni.navigateTo({
		// 		url:'/pages/tabBar/settle/StyleTest/DecorationStyle?id='+item
		// 	})
		// },
		// nolike() {
		// 	//跳转到等待中界面
		// 	uni.navigateTo({
		// 		url: '/pages/tabBar/settle/StyleTest/Waiting'
		// 	});
		// },
		tapLove() {
			if (this.dataList.length == 0) return;
			this.moveX = 10; //设置角度y为0水平
			this.moveY = 1;
			this._del();
		},
		tapLoathe() {
			if (this.dataList.length == 0) return;
			this.moveX = -10; //设置角度
			this.moveY = 1;
			this._del();
		},
		//设置初始参数
		init() {
			this.number = 3; //card 3
			this.translate = { x: 0, y: 8 }; //y下移10px
			this.scale = { x: 0.95, y: 1 }; //x 缩小0.9
			this.type = true;
			this.moveRotate = {
				//设置位移图片旋转角度距离  card中心点 - 指向坐标
				x: 0,
				y: uni.getSystemInfoSync().screenHeight
			};
			let requestData = {
				count: 30, //数量
				sign: ""
			}
			this.$post(this.$url.Case.GetTestStyles, requestData,{
				isLoading:true,
				loadingTitle:'加载中...'
			}).then(res => {
				if(res.code == 200 && res.status==0){
					this.DataList = res.data.list
					this.sign = res.data.sign
					res.data.list.forEach(item=>{
						let data = {
							src:item.img,
							id:item.id
						}
						this.dataList.push(data)
					})
				}
			});
		},
		//获取数据
		getData() {
			let promise = new Promise((resolve, reject) => {
				if (this.dataList.length > 0) {
					resolve();
					return promise;
				}
				resolve();
			});
			return promise;
		},
		//触摸中判断
		moveJudge(x, y, ratio) {
			let el = this.$refs.cardBox[0];

			if (x > 20) {
				el.moveRight(ratio);
			} else if (x < -20) {
				el.moveLeft(ratio);
			} else {
				el.moveCenter();
			}
		},
		//触摸结束判断
		endJudge(x, y) {
			let el = this.$refs.cardBox[0];
			if (Math.abs(x) < 40) {
				this._back();
				el._back();
			} else {
				this._del();
				el.clearAnimation();
			}
		},
		//删除card时
		delCard(x, y) {
			if (x > 0) {
				console.log(this.dataList[0].id, '喜欢');
				
				let love = {
					id:this.dataList[0].id,
					like:true
				}
				this.TestDataList.push(love);
				
				let requestData = {
					sign: this.sign, //测试标识
					id: this.dataList[0].id, //产品id
					like: '1' //喜欢状态，1=喜欢；-1=不喜欢
				}
				this.$post(this.$url.Case.LikeResult, requestData,{
					isLoading:false
				}).then(res => {
					if(res.code == 200 && res.status==0){
						console.log(JSON.stringify(res))
						// 标识已经出结果
						if(res.data.test_status==0){
							console.log('已经出结果')
							//跳转到等待中界面
							// uni.navigateTo({
							// 	url: '/pages/tabbar/settle/stylet-test/Waiting'
							// });
							uni.navigateTo({
								url:'/pages/tabbar/settle/style-test/DecorationStyle?catalog='+res.data.result
							})
						}
						
					}
				});
			} else {
				console.log(this.dataList[0].id, '不喜欢');
				let love = {
					id:this.dataList[0].id,
					like:false
				}
				this.TestDataList.push(love);
				let requestData = {
					sign: this.sign, //测试标识
					id: this.dataList[0].id, //产品id
					like: '-1' //喜欢状态，1=喜欢；-1=不喜欢
				}
				this.$post(this.$url.Case.LikeResult, requestData,{
					isLoading:false
				}).then(res => {
					if(res.code == 200 && res.status==0){
						console.log(JSON.stringify(res))
						// 标识已经出结果
						if(res.data.test_status==0){
							console.log('已经出结果')
							// 跳转到测试详情界面
							uni.navigateTo({
								url:'/pages/tabbar/settle/style-test/DecorationStyle?catalog='+res.data.result
							})
						}
					}
				});
			}
			// like(item) {
			// 	//跳转到测试详情界面
			// 	uni.navigateTo({
			// 		url:'/pages/tabBar/settle/StyleTest/DecorationStyle?id='+item
			// 	})
			// },
			// nolike() {
			// 	//跳转到等待中界面
			// 	uni.navigateTo({
			// 		url: '/pages/tabBar/settle/StyleTest/Waiting'
			// 	});
			// },
			
			
		},
		tapCard(item) {
			console.log(item, '点击');
		}
	}
};
</script>

<style lang="scss" scoped>
@font-face {
	font-family: 'iconfont';
	src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
		format('woff2');
}

.iconfont {
	font-family: 'iconfont' !important;
	font-size: 12px;
	font-style: normal;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.icon-xinaixin:before {
	content: '\e601';
}
.icon-chacha1:before {
	content: '\e646';
}
.page {
	background-color: #ffffff;
	width: 100%;
	position: absolute;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
}
.move-area {
	position: absolute;
}
.move-view {
	width: 600rpx;
	position: absolute;
	height: 700rpx;
	left: 50%;
	top: 50%;
	margin-left: -300rpx;
	margin-top: -500rpx;
}
.cardBox {
	position: relative;
	width: 600rpx;
	// height: 900rpx;
	height: 700rpx; //高度
}
.lineprogress {
	position: absolute;
	width: 650rpx;
	height: 180rpx;
	top: 50rpx;
	left: 50rpx;
}
.love {
	position: absolute;
	width: 80rpx;
	height: 80rpx;
	top: 1000rpx;
	right: 100rpx;
	border-radius: 50%;
	background-color: #ea2a36;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99999;
	color: #ffffff;
}
.lovetext {
	position: absolute;
	top: 1100rpx;
	right: 110rpx;
}

.loathe {
	position: absolute;
	width: 80rpx;
	height: 80rpx;
	top: 1000rpx;
	left: 100rpx;
	border-radius: 50%;
	background-color: #a09e9f;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 99999;
	color: #ffffff;
}
.loathetext {
	position: absolute;
	top: 1100rpx;
	left: 100rpx;
}
</style>
<style>
	page {
		background-color: #f7f7f7;
	}
</style>