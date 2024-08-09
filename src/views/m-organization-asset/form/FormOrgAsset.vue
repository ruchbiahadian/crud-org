<template>
  <Form @submit="submitFormOrgAsset">
    <div>
      <b-loading v-model="property.animation.submitLoading"></b-loading>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Organisasi</span
      >
      <Field
        name="form.organizationId"
        rules="required"
        v-slot="{ errors }"
        :model-value="form.organizationId"
      >
        <b-select
          size="is-small"
          class="column"
          as="select"
          label="Expanded"
          v-model="form.organizationId"
          expanded
        >
          <option value="" disabled>Pilih Organisasi</option>
          <option
            v-for="(item, index) in options.organization"
            :key="index"
            :value="item.id"
          >
            {{ item.name }}
          </option>
        </b-select>
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Alamat Kontrak</span
      >
      <Field
        name="form.contractAddress"
        :rules="{ required, min: 10 }"
        v-slot="{ field, errors }"
        :model-value="form.contractAddress"
      >
        <b-input
          v-bind="field"
          size="is-small"
          class="column"
          v-model="form.contractAddress"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Alamat Kreator</span
      >
      <Field
        name="form.creatorAddress"
        :rules="{ required, min: 10 }"
        v-slot="{ field, errors }"
        :model-value="form.creatorAddress"
      >
        <b-input
          v-bind="field"
          size="is-small"
          class="column"
          v-model="form.creatorAddress"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Tipe Kontrak</span
      >
      <Field
        name="form.contractType"
        :rules="{ required, min: 4 }"
        v-slot="{ field, errors }"
        :model-value="form.contractType"
      >
        <b-input
          v-bind="field"
          size="is-small"
          class="column"
          v-model="form.contractType"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="mt-5">
      <b-button
        @click="routeToPageListOrgAsset"
        size="is-small"
        class="mr-1"
        type="is-light"
      >
        Kembali
      </b-button>
      <b-button
        native-type="submit"
        size="is-small"
        class="ml-1"
        type="is-success"
      >
        Simpan
      </b-button>
    </div>
  </Form>
</template>

<script>
import { Form, Field } from "vee-validate";
export default {
  name: "form_organization_asset",
  components: {
    Form,
    Field,
  },
  props: {
    isExisting: {
      default: false,
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      identity: {
        mainId: "",
      },
      form: {
        organizationId: "",
        contractAddress: "",
        creatorAddress: "",
        contractType: "",
        organizationName: "",
      },
      property: {
        animation: {
          submitLoading: false,
        },
      },
      options: {
        organization: [],
      },
      organization: [],
    };
  },
  methods: {
    checkingMainId() {
      let params = this.$route.params.id;
      if (this.isExisting === true && params) {
        this.identity.mainId = params;
        this.$emit("getMainId", this.identity.mainId);
        return;
      }
    },
    getDefaultFormValue(payload) {
      if (this.isExisting === true) {
        this.form.organizationName = payload.organizationName;
        this.form.contractAddress = payload.contractAddress;
        this.form.creatorAddress = payload.creatorAddress;
        this.form.contractType = payload.contractType;
        this.setDefaultDropdownOrg();
        return;
      }
    },
    submitFormOrgAsset() {
      this.$emit("submitFormOrgAsset", this.form);
    },
    routeToPageListOrgAsset() {
      this.$router.push("/organization-asset");
    },
    async getReferenceForOrganization() {
      this.property.animation.submitLoading = true;
      try {
        await this.$axios.get("organizations").then((resp) => {
          let org = resp.data;
          this.organization = resp.data;

          org.forEach((item) => {
            this.options.organization.push({
              id: item._id,
              name: item.name,
            });
          });
        });
      } catch (error) {
        this.$store.dispatch("showError");
        console.log(error);
      } finally {
        this.property.animation.submitLoading = false;
      }
    },
    setDefaultDropdownOrg() {
      this.organization.forEach((item) => {
        if (item.name === this.form.organizationName) {
          this.form.organizationId = item._id;
        }
      });
    },
  },
  mounted() {
    this.checkingMainId();
    this.getReferenceForOrganization();
  },
};
</script>
