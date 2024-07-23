import { createStore } from 'vuex'
import cookie from "js-cookie";
import Swal from 'sweetalert2';

export default createStore({
  state: {
    token: null,
    sidebar: false,
  },
  mutations: {
    SET_LOGIN(state, payload){
      state.token = payload;
    },
    SET_LOGOUT(state){
      cookie.remove("token")
      state.token = null;
    },
    SET_SIDEBAR(state){
      state.sidebar = !state.sidebar;
    }
  },
  actions: {
    async logout({commit}, router){
      const result = await Swal.fire({
        title: "Apakah Anda yakin?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak"
      });

      if(result.isConfirmed){
          Swal.fire({
            title: "Berhasil!",
            text: "Anda telah logout",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        }).then(() => {
          commit('SET_LOGOUT')
          window.location.reload()
        })
      }
    },
    setSidebar({commit}){
      commit('SET_SIDEBAR')
    }
  }
})
