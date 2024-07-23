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
                    const result = await this.$Swal.fire({
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
                                this.$Swal.fire({
                                    title: "Berhasil!",
                                    text: "Organisasi berhasil diubah!",
                                    icon: "success",
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(() => {
                                    this.$router.push("/organization-asset");
                                })
                            });
                        } catch (error) {
                            
                        } finally {
                            this.$refs.formOrgAssetRef.property.animation.submitLoading = false;
                        }
                    }
                },
            },
    }
</script>