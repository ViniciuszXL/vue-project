<template>
    <v-responsive class="align-center text-center fill-height bg-blue-lighten-1">
        <h1>Tela de Login</h1>
        <br>

        <form @submit.prevent="submit">
            <v-card class="pa-12 mx-auto text-black" max-width="400px" elevation="150" rounded="lg">

                <!-- RA -->
                <div class="text-body-1 text-start">E-mail</div>
                <v-text-field 
                    density="compact" 
                    placeholder="Informe o seu e-mail" 
                    prepend-inner-icon="mdi-email-outline" 
                    variant="outlined"
                    v-model="form.email"
                />

                <!-- Password -->
                <div class="text-body-1 text-start">Senha</div>
                <v-text-field 
                    type="password"
                    density="compact" 
                    placeholder="Informe sua senha" 
                    prepend-inner-icon="mdi-lock-outline" 
                    variant="outlined" 
                    v-model="form.password"
                />

                <button type="submit" class="mb-8 bg-blue-lighten-1 button-component">
                    Entrar
                </button>
            </v-card>
        </form>
    </v-responsive>
</template>

<style scoped>

.button-component {
    min-width: 100%;
    height: 44px;

    letter-spacing: 0.0892857143em;
    text-transform: uppercase;
    font-size: 1rem;
    font-weight: 500;

    border-radius: 4px;
}

</style>

<script lang="ts">
import { UserLoginResponse } from '@/types/user.type'
import { mapActions } from 'vuex'
import alert from '../plugins/sweetalert'

export default {
    name: "LoginView",
    components: {},
    data() {
        return {
            form: {
                email: "",
                password: ""
            },
        }
    },
    methods: {
        ...mapActions(["LogIn"]),
        async submit() {
            try {
                const response: UserLoginResponse = await this.LogIn({ ...this.form })
                if (!response.success) {
                    return alert.notification(this, { icon: "error", title: response.message || "" })
                }

                alert.notification(this, { icon: "success", title: response.message || "Autenticação feita com sucesso!" })
                setTimeout(() => this.$router.push("/dashboard"), 2000)
            } catch (error: any) {
                console.log("AQUI", error)

                alert.notification(this, { 
                    icon: "error", 
                    title: error.response.data.message || "Ocorreu um erro ao fazer seu login." 
                })
            }

        }
    }
}
</script>