<template>
    <div class="container">
        <h1 class="title mt-5">Daftar Aset Organisasi</h1>

        <b-button
            @click="routeToPageAddOrgAsset"
            label="Tambah Aset"
            icon-left="plus"
            size="is-small"
            type="is-success"
            class="mb-5 is-flex is-justify-content-start"
        />

        <b-table
            :data="organizationAsset" 
            striped
            bordered
            hoverable
            narrowed
        >
            <div>
                <b-loading v-model="property.animation.isLoading"></b-loading>
            </div>

            <b-table-column label="No" centered header-class="table_header">
                <template v-slot="props">
                    {{ props.index + 1 }}
                </template>
            </b-table-column>

            <b-table-column label="Nama Organisasi" centered header-class="table_header">
                <template v-slot="props">
                    {{ props.row.organizationName?props.row.organizationName:'-' }}
                </template>
            </b-table-column>

            <b-table-column label="Alamat Kontrak" centered header-class="table_header">
                <template v-slot="props">
                    {{ props.row.contractAddress }}
                </template>
            </b-table-column>

            <b-table-column label="Alamat Kreator" centered header-class="table_header">
                <template v-slot="props">
                    {{ props.row.creatorAddress }}
                </template>
            </b-table-column>

            <b-table-column label="Tipe Kontrak" centered header-class="table_header">
                <template v-slot="props">
                    {{ props.row.contractType }}
                </template>
            </b-table-column>

            <b-table-column label="Aksi" centered header-class="table_header">
                <template v-slot="props">
                    <b-dropdown>
                        <template #trigger="{ active }">
                        <b-button
                            size="is-small"
                            label="Aksi"
                            type="is-success"
                            :icon-right="active ? 'menu-up' : 'menu-down'"
                        />
                        </template>
                        <b-dropdown-item
                            @click="editOrgAsset(props.row._id)"
                            >Rincian
                        </b-dropdown-item>
                        <b-dropdown-item
                            @click="getOrgIdByAsset(props.row.organizationName)"
                            >Delete
                        </b-dropdown-item>
                    </b-dropdown>
                </template>

            </b-table-column>

        </b-table>
    </div>
</template>

<script>
import { swalConfig } from "@/swalConfig";
export default{
    name: 'organization-asset',
    data() {
        return {
            organizationAsset: [],
            property: {
                animation: {
                    isLoading: false,
                },
            },
        }
    },
    methods: {
        async getOrganizationAsset(){
                this.property.animation.isLoading = true;
                try {
                    await this.$axios
                    .get("organizations-assets")
                    .then((resp) => {
                        this.organizationAsset = resp.data;
                    });
                } catch (error) {
                    this.$store.dispatch('showError');
                    console.log(error)
                } finally {
                    this.property.animation.isLoading = false;
                }
        },
        routeToPageAddOrgAsset() {
            this.$router.push("/create-organization-asset");
        },
        async deleteOrgAsset(id){
                const result = await swalConfig.fire({
                    title: "Apakah Anda yakin?",
                    showCancelButton: true,
                    confirmButtonText: "Ya",
                    cancelButtonText: "Tidak"
                });
                if(result.isConfirmed){
                    this.property.animation.isLoading = true;
                    try {
                        await this.$axios
                        .delete("organizations-assets/" + id)
                        .then(() => {
                            this.$store.dispatch('showSuccess',{ text: "Aset organisasi berhasil dihapus!", router: this.$router})
                        });
                    } catch (error) {
                        this.$store.dispatch('showError');
                        console.log(error)
                    } finally {
                        this.property.animation.isLoading = false;
                    }
                }
        },
        editOrgAsset(id){
            this.$router.push('/detail-organization-asset/' + id);
        },
        async getOrgIdByAsset(name){
            this.property.animation.isLoading = true;
            let org = [];

            try {
                await this.$axios
                .get("organizations")
                .then((resp) => {
                    org = resp.data
                });
                } catch (error) {
                    this.$store.dispatch('showError');
                    console.log(error)
                } finally {
                    let temp = null;
                    org.forEach(item => {
                        if(item.name === name){
                            temp = item._id
                        }
                    })
                    this.deleteOrgAsset(temp)
                    this.property.animation.isLoading = false;
                }
        }
    },
    mounted() {
        this.getOrganizationAsset()
    },
}
</script>