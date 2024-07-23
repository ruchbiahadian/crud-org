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
import FormOrgAsset from '../form/FormOrgAsset.vue'
export default{
    name: 'create_organization_asset',
    components:{
        FormOrgAsset,
    },
    methods:{
            async addOrgAsset(payload){
                const data = {
                    organizationId: payload.organizationId,
                    contractAddress: payload.contractAddress,
                    creatorAddress: payload.creatorAddress,
                    contractType: payload.contractType
                }

                this.$refs.formOrgAssetRef.property.animation.submitLoading = true;
                try {
                    await this.$axios
                    .post("organizations-assets", data)
                    .then(() => {
                        this.$Swal.fire({
                            title: "Berhasil!",
                            text: "Aset Organisasi berhasil ditambahkan!",
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
        },
    },
}
</script>