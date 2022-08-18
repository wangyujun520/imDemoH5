<template>
	<view class="content">
		<!-- 输入文字内容 -->
		<view class="flex px-2 pt-2 bg-white">
			<textarea style="width: 100%; font-size: 28rpx" value="" placeholder="用文字记录您的装修过程" v-model="DataList.content" />
			</view>
    <!-- 上传图片 -->
    <upload-imgs @upload="upload"></upload-imgs>
    
    <view class="flex p-2" style="margin-top: 40rpx"><u-button type="warning" style="width: 100%; height: 100rpx" @click="submit">发布</u-button></view>
  <u-toast ref="uToast"></u-toast>
  </view>
  
</template>

<script>
import uploadImgs from "@/components/push-img/get-imgs.vue";
import chooseMap from "@/components/choose-map/choose-map.vue";
import OssUpload from "@/utils/UploadOss/OssUpload.js";
export default {
  components: {
    uploadImgs,
    chooseMap,
  },
  data() {
    return {
		nodeid: 0,
		taskid: 0,
      DataList: {
        managingGoods: [],
        content: "",
		nodeid: 0,
		taskid: 0,
        photos: "",
        address: "",
      },
    };
  },
  // onShow() {
  onReady() {
    var DataLists = {
      code: 200,
      msg: "ok",
      dataList: {
        
      },
    };
  },
  onLoad(Option) {
  	this.nodeid = Option.id
  	this.taskid = Option.taskid
  	console.log(JSON.stringify(Option))
  },
  methods: {
      deleteCurrent(index) {
        console.log("删除" + index);
  
        this.DataList.managingGoods.splice(index, 1);
      },
      upload(arr) {
        this.DataList.photos = arr;
      },
      skipProductsConcern() {
        // 跳转到我关注的商品页面
        uni.navigateTo({
          url: "/pages/tabBar/find/ProductsConcern",
        });
      },
      submit() {
  		// 非空验证
  		if(this.DataList.content == ""){
  			this.$refs.uToast.show({
  				title: '请输入装修过程',
  				type: 'warning'
  			})
  			return;
  		}
  		if(this.DataList.photos.length == 0){
  			this.$refs.uToast.show({
  				title: '请上传图片',
  				type: 'warning'
  			})
  			return;
  		}
  		
        var uploads = [];
        for (let k = 0; k < this.DataList.photos.length; k++) {
          let imgSrc = this.DataList.photos[k];
          let pos = imgSrc.lastIndexOf(".");
          let filename = imgSrc.substring(0, pos); // 文件名
          let extendName = imgSrc.substring(pos + 1).toLowerCase(); // 扩展名
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
          var FileName = year + "" + month + "" + day + "" + new Date().getTime() + k + "." + extendName; //202003021583151162210.jpg
          var fuleFileName = "find" + "/" + date.getFullYear() + "/" + month + "/" + FileName;
          var SuccessUrlImg = OssUpload.fileUploadBack("image",imgSrc,fuleFileName);
          uploads.push(SuccessUrlImg);
        }
  
        Promise.all(uploads).then((response) => {
          this.DataList.photos = response;
          var RequrestUrl = this.AJB.BizUrl + "api/PlanNode/AddPlanNodeDetailed";
          var RequrestDatas = this.DataList;
		  RequrestDatas.nodeid = this.nodeid;
		  RequrestDatas.taskid = this.taskid;
          this.AJB.UniAjax(RequrestUrl, RequrestDatas)
            .then((res) => {
              // console.log(JSON.stringify(res));
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
