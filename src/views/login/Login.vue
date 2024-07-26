<template>
    <div class="login_container">
        <div class="blocks">
            <div class="left">Sistem Pendataan<br>Organisasi (SPO)</div>
            <div class="right">
                <div class="logo">
                    <img class="login_supported_logo" src="../../assets/img/logo.png" alt="">
                    <h1 class="title">| Login</h1>
                </div>
                <Form @submit="login">
                    <Field name="email" rules="required" v-slot="{ field, errors }">
                        <b-input
                            icon="email"
                            v-bind="field"
                            v-model="email"
                            placeholder="Masukkan email anda disini"
                            class="mt-6 in"
                        />
                        <b-button 
                            native-type="submit"
                            size="is-small"
                            class="mt-4"
                            type="is-success">
                                Masuk
                        </b-button><br><br>
                        <span class="has-text-danger">{{ errors[0] }}</span><br>
                        <!-- <a @click="login2">Masuk dengan google</a>
                        <a @click="google_auth">Masuk dengan google 2</a> -->
                    </Field>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import cookie from "js-cookie";
    import { Form, Field } from "vee-validate";
    export default{
        name: "login",
        components: {
            Form,
            Field,
        },
        data() {
            return {
                
            }
        },
        methods: {
            login(){
                this.$axios.post("auth/simple-login", {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    let token = response.data
                    let forcookie = JSON.stringify(token)
                    cookie.set("token", forcookie, {expires: 1});
                    this.$store.commit('SET_LOGIN', forcookie)
                    this.$Swal.fire({
                            title: "Berhasil!",
                            text: "Anda telah berhasil login!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.href = '/'
                        })
                })
            },
            login2(){
                this.$axios.post("auth/simple-login", {
                    email: this.email,
                    password: this.password
                }).then(response => {
                    let token = response.data
                    let forcookie = JSON.stringify(token)
                    cookie.set("token", forcookie, {expires: 1});
                    this.$store.commit('SET_LOGIN', forcookie)
                    this.$Swal.fire({
                            title: "Berhasil!",
                            text: "Anda telah berhasil login!",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            window.location.href = '/'
                        })
                })
            },
            google_auth(){
                // this.$axios.get("auth/google/callback")
                window.location.href="https://payrollium.b2camp.id/auth/google"
                
                // this.$axios.post("auth/simple-login").then(res=>{
                //     stop();
                // })

                // this.$axios.get("auth/google").then(res=>{
                //     console.log(res)
                //     stop()
                // })

                const xtoken = cookie.get("x-token-id")
                console.log(xtoken)
            }
        },

    }
</script>