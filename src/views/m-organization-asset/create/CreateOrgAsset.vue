<template>
  <div class="container">
    <h1 class="mt-4 mb-5 is-size-3">Tambah Asset Organisasi</h1>

    <FormOrgAsset
      :isExisting="false"
      @submitFormOrgAsset="addOrgAsset($event)"
      ref="formOrgAssetRef"
    />
  </div>
</template>

<script>
import FormOrgAsset from "../form/FormOrgAsset.vue";
export default {
  name: "create_organization_asset",
  components: {
    FormOrgAsset,
  },
  methods: {
    async addOrgAsset(payload) {
      const data = {
        organizationId: payload.organizationId,
        contractAddress: payload.contractAddress,
        creatorAddress: payload.creatorAddress,
        contractType: payload.contractType,
      };

      this.$refs.formOrgAssetRef.property.animation.submitLoading = true;
      try {
        await this.$axios.post("organizations-assets", data).then(() => {
          this.$store.dispatch("showSuccess", {
            text: "Aset organisasi berhasil ditambahkan!",
            path: "/organization-asset",
            router: this.$router,
          });
        });
      } catch (error) {
        this.$store.dispatch("showError");
        console.log(error);
      } finally {
        this.$refs.formOrgAssetRef.property.animation.submitLoading = false;
      }
    },
  },
};
</script>
