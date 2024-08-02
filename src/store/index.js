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
    },
  },
  actions: {
    async logout({commit}){
      const customBtn = Swal.mixin({
        customClass: {
          confirmButton: "button is-danger mr-1",
          cancelButton: "button is-light ml-1"
        },
        buttonsStyling: false
      });
      const result = await customBtn.fire({
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
    },
    showError(){
      Swal.fire({
        title: "Terjadi Kesalahan!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
    });
    },
    showSuccess({}, {text, path, router}){
      Swal.fire({
        title: "Berhasil!",
        text: text,
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        if(path){
          router.push(path);
        }else{
          window.location.reload();
        }
      })
    }
  },
})
