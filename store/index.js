import Vue from 'vue'
import Vuex from 'vuex'

import audio from '@/store/modules/audio.js'
import im from '@/store/modules/im.js'
Vue.use(Vuex)

export default new Vuex.Store({
	modules:{
		audio,
		im
	}
})