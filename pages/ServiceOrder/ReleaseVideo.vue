<template>
	<view class="content">
		<!-- 输入文字内容 -->
		<view class="flex px-2 pt-2 bg-white">
			<textarea style="width: 100%; font-size: 28rpx" value="" placeholder="用文字记录您的装修过程" v-model="DataList.content" />
			</view>
    <!-- 上传视频 -->
    <view v-if="DataList.video == ''" @click="UploadVideo" class="my-1 bg-white p-2" style="height: 350rpx">
      <view class="flex flex-column justify-center align-center" style="width: 100%; height: 100%; background-color: #f7f7f7">
        <text class="iconfont" style="color: #ff9900; font-size: 100rpx">&#xe6f9;</text>
        <text>上传视频</text>
      </view>
    </view>
	
	<view v-else @click="openVideo(DataList.video)" class="my-1 bg-white p-2 position-relative" style="height: 350rpx">
	  <image :src="DataList.video + '?x-oss-process=video/snapshot,t_0,f_png,w_0,h_0,m_fast,ar_auto'"
	   lazy-load="true" style="width: 100%;height: 100%;" class="rounded"></image>
	  <text class="iconfont text-white position-absolute" style="font-size: 80rpx; width: 80rpx; height: 80rpx" :style="posterIconStyle">&#xe99a;</text>
	</view>
	
    
    <view class="flex p-2" style="margin-top: 40rpx">
      <u-button type="warning" style="width: 100%; height: 100rpx" @click="submit">发布</u-button>
    </view>
	<u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import chooseMap from "@/components/choose-map/choose-map.vue";
import OssUpload from "@/utils/UploadOss/OssUpload.js";
export default {
  components: {
    chooseMap,
  },
  computed: {
  	posterIconStyle() {
  		let w = this.w / 2 - uni.upx2px(80) / 2;
  		let h = this.h / 2 - uni.upx2px(80) / 2;
  		return `left:${w}px;top:${h}px;`;
  	},
  },
  data() {
    return {
		nodeid: 0,
		taskid: 0,
      DataList: {
        video: "",
		nodeid: 0,
		taskid: 0,
        managingGoods: "",
      }, //Mock数据
    };
  },
  onLoad(Option) {
  	this.nodeid = Option.id
  	this.taskid = Option.taskid
  	console.log(JSON.stringify(Option))
  },
  onReady() {
    var DataLists = {
      code: 200,
      msg: "ok",
      dataList: {
        
      },
    };
  },
  methods: {
   // 打开视频
   openVideo(url) {
   	// 跳转页面
   	uni.navigateTo({
   		url: "/pages/chat/video/video?url=" + url,
   	});
   },
    UploadVideo() {
      // console.log("上传视频");

      var _self = this;
      uni.chooseVideo({
        count: 1,
        maxDuration: 15, //拍摄视频最长拍摄时间，单位秒。最长支持 60 秒。
        sourceType: ["camera", "album"],
        success: function (res) {
          console.log(JSON.stringify(res));
          console.log(res.tempFilePath);
          let videoSrc = res.tempFilePath;

          let pos = videoSrc.lastIndexOf(".");
          let filename = videoSrc.substring(0, pos); // 文件名
          let extendName = videoSrc.substring(pos + 1).toLowerCase(); // 扩展名
          var date = new Date();
          var year = date.getFullYear();
          var month = date.getMonth() + 1;
          var day = date.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          if (month < 10) {
            month = "0" + month;
          }
          var FileName = year + "" + month + "" + day + "" + new Date().getTime() + "." + extendName; //202003021583151162210.mp4
          var fuleFileName = "Anjubang" + "/" + date.getFullYear() + "/" + month + "/" + FileName;
          //视频上传阿里云
          var SuccessUrlVideo = OssUpload.videoUploadBack("video",videoSrc,fuleFileName);
          SuccessUrlVideo.then((response) => {
            console.log(response); //上传成功的回调
            _self.DataList.video = response;
          });
        },
      });
    },
   submit() {
   	console.log(this.DataList.content)
   	console.log(this.DataList.video)
   	// 非空验证
   	if(this.DataList.content == "" || this.DataList.content == undefined){
   		this.$refs.uToast.show({
   			title: '请输入装修过程',
   			type: 'warning'
   		})
   		return;
   	}
   	if(this.DataList.video == "" || this.DataList.video == undefined){
   		this.$refs.uToast.show({
   			title: '请上传视频',
   			type: 'warning'
   		})
   		return;
   	}
   		
     var RequrestUrl = this.AJB.BizUrl + "api/PlanNode/AddPlanNodeDetailed";
     var RequrestDatas = this.DataList;
		 
		 RequrestDatas.nodeid = this.nodeid;
		 RequrestDatas.taskid = this.taskid;
     this.AJB.UniAjax(RequrestUrl, RequrestDatas)
       .then((res) => {
         if (res.code == 200) {
           console.log("add ok");
           uni.navigateBack({
             delta: 1,
           });
         }
       })
       .catch((err) => {
         console.log(err);
       });
   },
  },
};
</script>

<style lang="scss">
/* page{
		background-color: #FFFFFF;
	} */
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
