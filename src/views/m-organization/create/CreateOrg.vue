<template>
  <div class="container">
    <h1 class="mt-4 mb-5 is-size-3">Tambah Organisasi</h1>

    <FormOrg
      :isExisting="false"
      @submitFormOrg="addOrg($event)"
      ref="formOrgRef"
    />
  </div>
</template>

<script>
import FormOrg from "../form/FormOrg.vue";
export default {
  name: "create_organization",
  components: {
    FormOrg,
  },
  methods: {
    async addOrg(payload) {
      const data = {
        name: payload.name,
        contact: payload.contact,
        address: payload.address,
        imageUrl: payload.imageUrl,
      };
      this.$refs.formOrgRef.property.animation.submitLoading = true;
      try {
        await this.$axios.post("organizations", data).then(() => {
          this.$store.dispatch("showSuccess", {
            text: "Organisasi berhasil ditambahkan!",
            path: "/",
            router: this.$router,
          });
        });
      } catch (error) {
        this.$store.dispatch("showError");
        console.log(error);
      } finally {
        this.$refs.formOrgRef.property.animation.submitLoading = false;
      }
    },
  },
};
</script>
