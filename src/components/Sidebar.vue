<template>
  <section>
    <b-sidebar
      type="is-success"
      :fullheight="fullheight"
      v-model="sidebar"
      class="sidebar"
      :can-cancel = false
    >
      <div>
        <div class="toogle" @click="setSidebar">
          <b-icon type="is-light" icon="close"></b-icon>
        </div>
        <div class="txt">
          Sistem Pendataan Organisasi (SPO)
        </div>
        <div class="menu_list">Menu</div>
        <div class="item">
            <a @click="routeToPageOrganization">Organisasi</a>
        </div>
        <div class="item">
            <a @click="routeToPageOrganizationAsset">Aset Organisasi</a>
        </div>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      open: true,
      fullheight: true,
    };
  },
  computed: mapState([
      'sidebar', 
  ]),
  methods: {
    routeToPageOrganization(){
      this.$router.push('/');
    },
    routeToPageOrganizationAsset(){
      this.$router.push('/organization-asset');
    },
    setSidebar(){
      this.$store.dispatch("setSidebar")
    }
  },
};
</script>