export default {
	state:{//全局变量
		isLogin: false,
		isSDKReady: false ,// TIM SDK 是否 ready
		MyUserId:'',//自己的聊天UserID
		conversationActive:{},	//聊天进行中的会话
		toUserId:'',			//聊天对象id
		conversationList:[],		//会话列表
		currentMessageList:[],		//消息列表
		groupMessageList:[],//群聊消息列表
		MessageReadList:[],//消息是否已读
		MessageRevoke:[],//消息是否撤回
		MsgList:[],//聊天列表（用于消息撤回）
		// AddMsgList:[]//追加聊天列表（用于消息撤回）
	},
	mutations: {//全局方法
		//初始化聊天列表
		InitMsgList(state,InitList){
			state.MsgList = [];
			state.MsgList = InitList;
			// console.log(JSON.stringify(state.MsgList))
		},
		// 追加聊天列表数据
		// AdditionalMsgList(state,Add){
		// 	state.AddMsgList = Add;
		// },
		//更新消息已读状态
		updateMessageReadList(state,MessageRead){
			state.MessageReadList = MessageRead;
		},
		//更新消息撤回状态
		updateMessageRevoke(state,Revoke){
			state.MessageRevoke = Revoke;
		},
		//更新自己的UserID
		UpdateMyUserID(state,UserID){
			state.MyUserId = UserID;
			// console.log(UserID)
		},
		//更新登录状态
		toggleIsLogin(state, isLogin) {
		  state.isLogin = typeof isLogin === 'undefined' ? !state.isLogin : isLogin
		  // console.log(state.isLogin)
		},
		//更新TIMSDK状态
		toggleIsSDKReady(state, isSDKReady) {
		  state.isSDKReady = typeof isSDKReady === 'undefined' ? !state.isSDKReady : isSDKReady,
		  console.log(state.isSDKReady)
		},
		//退出登录重置状态
		reset(state) {
			state.isLogin = false;
			state.isSDKReady = false;
		},
		//选择好友聊天--创建会话/拼接会话id
		createConversationActive(state,toUserId){
			state.conversationActive.conversationID = 'C2C'+toUserId
			state.toUserId = toUserId
			state.currentMessageList = []
		},
		//选择已有会话聊天--更新选中会话详情
		updateConversationActive(state,conversationItem){
			state.conversationActive = Object.assign({}, conversationItem.conversation);
			state.toUserId = conversationItem.user.userId
			state.currentMessageList = []
		},
		//更新会话列表
		updateConversationList(state,newConversationList){
			state.conversationList = newConversationList
		},
		/**
		 * 将消息插入当前会话列表
		 * 调用时机：收/发消息事件触发时
		 * @param {Object} state
		 * @param {Message[]|Message} data
		 * @returns
		 */
		pushCurrentMessageList(state, data) {
			console.log(data)
			if(state.toUserId === data[0].from){
				state.currentMessageList = data;
			}else{
				//群聊
				state.groupMessageList = data;
			}
		},
		/**
		 * 滑到顶部请求更多的历史消息
		 * */
		unshiftCurrentMessageList(state,data){
			console.log(data)
			if(data){
				state.currentMessageList = [...data,...state.currentMessageList]
			}
		},
	},
	actions:{
		// 全局计算属性
	}
}