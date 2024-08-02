<template>
    <div class="container">
        <h1 class="mt-4 mb-5 is-size-3">Ubah Organisasi</h1>

        <FormOrg
            :isExisting="true"
            @submitFormOrgAsset="editOrgAsset($event)"
            ref="formOrgAssetRef"
            @getMainId="getMainId($event)"
        />
    </div>
</template>

<script>
    import FormOrg from '../form/FormOrgAsset.vue'
    import { swalConfig } from "@/swalConfig";
    export default{
        name: 'existing_organization_asset',
        components:{
            FormOrg,
        },
        data() {
            return {
                identity: {
                    mainId: "",
                },
            }
        },
        methods: {
                getMainId(props) {
                    this.identity.mainId = props;
                    this.getOrgAssetById();
                },
                async getOrgAssetById() {
                    this.$refs.formOrgAssetRef.property.animation.submitLoading = true;
                    try {
                        await this.$axios
                        .get("organizations-assets/" + this.identity.mainId)
                        .then((resp) => {
                            this.$refs.formOrgAssetRef.getDefaultFormValue(
                                resp.data
                            );
                        });
                    } catch (error) {
                        this.$store.dispatch('showError');
                        console.log(error)
                    }finally{
                        this.$refs.formOrgAssetRef.property.animation.submitLoading = false;
                    }
                },
                async editOrgAsset(payload){
                    const data = {
                        organizationId: payload.organizationId,
                        contractAddress: payload.contractAddress,
                        creatorAddress: payload.creatorAddress,
                        contractType: payload.contractType
                    }
                    const result = await swalConfig.fire({
                        title: "Apakah Anda yakin?",
                        showCancelButton: true,
                        confirmButtonText: "Ya",
                        cancelButtonText: "Tidak"
                    });
                    if(result.isConfirmed){
                        this.$refs.formOrgAssetRef.property.animation.submitLoading = true;
                        try {
                            await this.$axios
                            .put("organizations-assets/" + this.identity.mainId, data)
                            .then(() => {
                                this.$store.dispatch('showSuccess',{ text: "Aset organisasi berhasil diubah!", path: "/organization-asset", router: this.$router})
                            });
                        } catch (error) {
                            this.$store.dispatch('showError');
                            console.log(error)
                        } finally {
                            this.$refs.formOrgAssetRef.property.animation.submitLoading = false;
                        }
                    }
                },
            },
    }
</script>