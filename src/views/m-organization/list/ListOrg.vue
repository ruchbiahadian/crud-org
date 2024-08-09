<template>
  <div class="container">
    <h1 class="title mt-5">Daftar Organisasi</h1>

    <b-button
      @click="routeToPageAddOrg"
      label="Tambah Organisasi"
      icon-left="plus"
      size="is-small"
      type="is-success"
      class="mb-5 is-flex is-justify-content-start"
    />

    <b-table :data="organization" striped bordered hoverable narrowed>
      <div>
        <b-loading v-model="property.animation.isLoading"></b-loading>
      </div>

      <b-table-column label="No" centered header-class="table_header">
        <template v-slot="props">
          {{ props.index + 1 }}
        </template>
      </b-table-column>

      <b-table-column label="Nama" centered header-class="table_header">
        <template v-slot="props">
          {{ props.row.name }}
        </template>
      </b-table-column>

      <b-table-column label="Kontak" centered header-class="table_header">
        <template v-slot="props">
          {{ props.row.contact }}
        </template>
      </b-table-column>

      <b-table-column label="Alamat" centered header-class="table_header">
        <template v-slot="props">
          {{ props.row.address }}
        </template>
      </b-table-column>

      <b-table-column label="Gambar" centered header-class="table_header">
        <template v-slot="props">
          <img class="table_image" :src="props.row.imageUrl" alt="Image" />
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
            <b-dropdown-item @click="editOrg(props.row._id)"
              >Rincian
            </b-dropdown-item>
            <b-dropdown-item @click="deleteOrg(props.row._id)"
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
export default {
  name: "organization",
  data() {
    return {
      organization: [],
      property: {
        animation: {
          isLoading: false,
        },
      },
    };
  },
  methods: {
    async getOrganization() {
      this.property.animation.isLoading = true;
      try {
        await this.$axios.get("organizations").then((resp) => {
          this.organization = resp.data;
        });
      } catch (error) {
        this.$store.dispatch("showError");
        console.log(error);
      } finally {
        this.property.animation.isLoading = false;
      }
    },
    editOrg(id) {
      this.$router.push("/detail-organization/" + id);
    },
    async deleteOrg(id) {
      const result = await swalConfig.fire({
        title: "Apakah Anda yakin?",
        showCancelButton: true,
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      });
      if (result.isConfirmed) {
        this.property.animation.isLoading = true;
        try {
          await this.$axios.delete("organizations/" + id).then(() => {
            this.$store.dispatch("showSuccess", {
              text: "Organisasi berhasil dihapus!",
              router: this.$router,
            });
          });
        } catch (error) {
          this.$store.dispatch("showError");
          console.log(error);
        } finally {
          this.property.animation.isLoading = false;
        }
      }
    },
    routeToPageAddOrg() {
      this.$router.push("/create-organization");
    },
  },
  mounted() {
    this.getOrganization();
  },
};
</script>
