<template>
  <div class="container">
    <h1 class="mt-4 mb-5 is-size-3">Ubah Organisasi</h1>

    <FormOrg
      :isExisting="true"
      @submitFormOrg="editOrg($event)"
      ref="formOrgRef"
      @getMainId="getMainId($event)"
    />
  </div>
</template>

<script>
import FormOrg from "../form/FormOrg.vue";
import { swalConfig } from "@/swalConfig";

export default {
  name: "existing_organization",
  components: {
    FormOrg,
  },
  data() {
    return {
      identity: {
        mainId: "",
      },
    };
  },
  methods: {
    getMainId(props) {
      this.identity.mainId = props;
      this.getOrgById();
    },
    async getOrgById() {
      this.$refs.formOrgRef.property.animation.submitLoading = true;
      try {
        await this.$axios
          .get("organizations/" + this.identity.mainId)
          .then((resp) => {
            this.$refs.formOrgRef.getDefaultFormValue(resp.data);
          });
      } catch (error) {
        this.$store.dispatch("showError");
        console.log(error);
      } finally {
        this.$refs.formOrgRef.property.animation.submitLoading = false;
      }
    },
    async editOrg(payload) {
      const data = {
        name: payload.name,
        contact: payload.contact,
        address: payload.address,
        imageUrl: payload.imageUrl,
      };
      const result = await swalConfig.fire({
        title: "Apakah Anda yakin?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (result.isConfirmed) {
        this.$refs.formOrgRef.property.animation.submitLoading = true;
        try {
          await this.$axios
            .put("organizations/" + this.identity.mainId, data)
            .then(() => {
              this.$store.dispatch("showSuccess", {
                text: "Organisasi berhasil diubah!",
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
      }
    },
  },
};
</script>
