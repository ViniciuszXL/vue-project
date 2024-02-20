<template>
    <!-- HEADER  -->
    <Header title="Módulo acadêmico" toolbarTitle="Cadastro de aluno"></Header>

    <!-- INPUTS -->
    <v-responsive>
        <v-container class="pa-12">
            <h1>Formulário de cadastro</h1>
            <v-divider></v-divider>
            <br>

            <!-- NAME -->
            <div class="text-body-1 text-start">Nome completo <span class="text-red">*</span></div>
            <v-text-field 
                density="compact" 
                placeholder="Informe o nome completo" 
                variant="outlined"
                v-model="form.name"
            />

            <!-- NAME -->
            <div class="text-body-1 text-start">E-mail <span class="text-red">*</span></div>
            <v-text-field 
                density="compact" 
                placeholder="Informe apenas um e-mail" 
                variant="outlined"
                v-model="form.email"
                type="email"
                :rules="emailRules"
            />

            <!-- RA -->
            <div class="text-body-1 text-start">RA <span class="text-red">*</span></div>
            <v-text-field 
                density="compact" 
                placeholder="Informe o registro acadêmico" 
                variant="outlined"
                v-model="form.ra"
                type="number"
            />

            <!-- CPF -->
            <div class="text-body-1 text-start">CPF <span class="text-red">*</span></div>
            <v-text-field 
                density="compact" 
                placeholder="Informe seu CPF (000.000.000-00)" 
                variant="outlined"
                v-model="form.cpf"
                :rules="cpfRules"
            />

            <v-container class="text-right">
                <v-btn dark x-large class="bg-red text-white" @click="$router.push('/dashboard')">Cancelar</v-btn>
                <v-btn class="ml-4 bg-green" @click="create">Salvar</v-btn>
            </v-container>
        </v-container>
    </v-responsive>
</template>

<script lang="ts">
    import Header from '../components/header.component.vue'
    import alert from '../plugins/sweetalert'
    import { mapActions } from 'vuex'
import { UserCreateResponse } from '@/types/user.type'

    export default {
        name: "UserCreateView",
        components: {
            Header,
        },
        data() {
            return {
                form: {
                    name: undefined,
                    email: undefined,
                    ra: undefined,
                    cpf: undefined
                },
                emailRules: [
                    (v: any) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'O email precisa ser válido!'
                ],
                cpfRules: [
                    (v: any) => /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/.test(v) || "O CPF informado é inválido!"
                ]
            }
        },
        methods: {
            ...mapActions(["createUser"]),

            create() {
                const timeout = setTimeout(async () => {
                    try {
                        const isUndefined = Object.entries(this.form).filter(d => d[1] == undefined)
                        if (isUndefined.length > 0) {
                            return alert.notification(this, { icon: "error", title: "Todos os campos devem ser preenchidos." })
                        }
                        
                        // Create user here //
                        const user: UserCreateResponse = await this.createUser({ ...this.form })
                        if (!user.success) {
                            return alert.notification(this, { icon: "error", title: user.message })
                        }

                        alert.notification(this, { icon: "success", title: user.message })

                        const timeoutRedirect = setTimeout(() => this.$router.push("/dashboard"), 1500)
                        return () => clearTimeout(timeoutRedirect)
                    } catch (error) {
                        alert.notification(this, { icon: "error", title: "Ocorreu um erro ao buscar os usuários cadastrados" })
                    }
                }, 0)

                return () => clearTimeout(timeout)
            }
        }
    }
</script>