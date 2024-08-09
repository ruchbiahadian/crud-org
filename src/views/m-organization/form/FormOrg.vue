<template>
  <Form @submit="submitFormOrg">
    <div>
      <b-loading v-model="property.animation.submitLoading"></b-loading>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Nama</span
      >
      <Field
        name="form.name"
        :rules="{ required, min: 1 }"
        v-slot="{ field, errors }"
        :model-value="form.name"
      >
        <b-input
          v-bind="field"
          size="is-small"
          class="column"
          v-model="form.name"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Kontak</span
      >
      <Field
        name="form.contact"
        :rules="{ required, min: 10 }"
        v-slot="{ field, errors }"
        :model-value="form.contact"
      >
        <b-input
          v-bind="field"
          size="is-small"
          class="column"
          type="number"
          v-model="form.contact"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Alamat</span
      >
      <Field
        name="form.address"
        :rules="{ required, min: 10 }"
        v-slot="{ field, errors }"
        :model-value="form.address"
      >
        <b-input
          type="textarea"
          v-bind="field"
          class="column"
          size="is-small"
          v-model="form.address"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="columns">
      <span class="column is-one-fifth is-flex is-justify-content-start"
        >Gambar</span
      >
      <Field
        name="form.imageUrl"
        rules="required"
        v-slot="{ field, errors }"
        :model-value="form.imageUrl"
      >
        <b-input
          size="is-small"
          v-bind="field"
          class="column"
          v-model="form.imageUrl"
        />
        <span class="has-text-danger">{{ errors[0] }}</span>
      </Field>
    </div>
    <div class="mt-5">
      <b-button
        @click="routeToPageListOrg"
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
  name: "form_organization",
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
        name: "",
        contact: "",
        address: "",
        imageUrl: "",
      },
      property: {
        animation: {
          submitLoading: false,
        },
      },
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
        this.form.name = payload.name;
        this.form.contact = payload.contact;
        this.form.address = payload.address;
        this.form.imageUrl = payload.imageUrl;
        return;
      }
    },
    submitFormOrg() {
      this.$emit("submitFormOrg", this.form);
    },
    routeToPageListOrg() {
      this.$router.push("/");
    },
  },
  mounted() {
    this.checkingMainId();
  },
};
</script>
