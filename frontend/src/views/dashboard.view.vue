<template>
    <!-- HEADER  -->
    <Header title="Módulo acadêmico" toolbarTitle="Consulta de alunos"></Header>

    <!-- SEARCH -->
    <v-responsive>
        <v-container class="d-flex align-center">
            <v-text-field
                class="pt-5 mr-2 shrink"
                density="compact"
                placeholder="Informe o nome do aluno para ser buscado"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                v-model="search"></v-text-field>

            <v-btn dark x-large class="bg-blue text-white" @click="searchUser"> Pesquisar </v-btn>
            <v-btn class="ml-4 bg-green" @click="$router.push('/user/create')">Cadastrar Aluno</v-btn>
        </v-container>
    </v-responsive>

    <!-- TABLE -->
    <Table 
        :data="users" 
        :headers="headers"
        :loading="loading"
        :firstLoad="firstLoad"
        noDataText="Não há alunos cadastrados"

        @editUser="editUser"
        @deleteUser="delUser"></Table>
</template>

<script lang="ts">
    import alert from '../plugins/sweetalert'
    import Header from '../components/header.component.vue'
    import Table from '../components/table.component.vue'
    import { UserInterface, UserListResponse } from '@/types/user.type'
    import { DefaultResponse } from '@/types/response.type'
    import { mapActions } from 'vuex'
import { withMemo } from 'vue'

    export default {
        name: "DashboardView",
        components: {
            Header,
            Table,
        },
        data() {
            return {
                search: undefined,
                loading: true,
                firstLoad: true,
                users: [] as UserInterface[],
                headers: [
                    { title: "Registro Acadêmico", value: "ra", key: "ra" },
                    { title: "Nome", value: "name", key: "name" },
                    { title: "CPF", value: "cpf", key: "cpf" },
                    { title: "E-mail", value: "email", key: "email" },
                    { title: "Ações", key: "actions", sortable: false },
                ],
            }
        },
        created() {
            const fetch = () => this.fetchUsers()
            this.$watch(() => this.$route.params, fetch, { immediate: true })
        },
        methods: {
            ...mapActions(["findUsers", "updateUser", "deleteUser"]),

            fetchUsers(options?: { params?: any; timer?: number, message?: boolean }) {
                this.loading = true
                this.firstLoad = true

                const message = options && options.message != undefined ? options.message : true
                const timer = options?.timer || 1500
                const timeout = setTimeout(async () => {
                    try {
                        const users: UserListResponse = await this.findUsers(options?.params)
                        // An error 
                        if (!users.success) return alert.notification(this, { icon: "error", title: users.message })
                        // With message?
                        if (message) alert.notification(this, { icon: "success", title: users.message })
                        // Remove first load
                        if (this.firstLoad) this.firstLoad = false

                        this.users = users.data || []
                        this.loading = false
                    } catch (error) {
                        alert.notification(this, { icon: "error", title: "Ocorreu um erro ao buscar os usuários cadastrados" })
                    }
                }, timer)

                return () => clearTimeout(timeout)
            },

            editUser(user: UserInterface) {

                const timeout = setTimeout(async () => {
                    try {
                        const nameResult = await alert.confirmation(this, {
                            title: "Nome do aluno",
                            html: "Informe o novo nome do aluno",
                            input: "text",
                            inputPlaceholder: "Digite o nome do aluno",
                            inputValue: user.name,
                            inputValidator: (value) => new Promise((resolve) => resolve(value.length < 1 ? "Informe o nome do aluno." : null)),
                            confirmButtonText: "Próximo passo",
                            cancelButtonText: "Cancelar operação",
                        })

                        if (!nameResult.isConfirmed) return;
                        const name = nameResult.value || user.name
                        const emailResult = await alert.confirmation(this, {
                            title: "E-mail do aluno",
                            html: "Informe o novo e-mail do aluno",
                            input: "email",
                            inputPlaceholder: "Informe o e-mail do aluno",
                            inputValue: user.email,
                            confirmButtonText: "Verificar informações",
                            cancelButtonText: "Cancelar operação"
                        })

                        if (!emailResult.isConfirmed) return;
                        const email = emailResult.value || user.email
                        const result = await alert.confirmation(this, {
                            title: "Atualização de informações",
                            icon: "question",
                            html: `
                            As novas informações do usuário são: <br /> <br />
                            ${user.name} => <strong>${name}</strong> <br />
                            ${user.email} => <strong>${email}</strong>
                            `,
                            confirmButtonText: "Atualizar",
                            cancelButtonText: "Cancelar operação"
                        })

                        if (!result.isConfirmed) return;
                        // Atualização do usuário...

                        const updated: DefaultResponse = await this.updateUser({ user, update: { name, email } })
                        if (!updated || updated && !updated.success) {
                            return alert.notification(this, { icon: "error", title: updated.message || "Ocorreu um erro ao atualizar o cadastro do usuário" })
                        }

                        this.fetchUsers({ timer: 500, message: false })
                        alert.notification(this, { icon: "success", title: updated.message })
                    } catch (error) {
                        alert.notification(this, { icon: "error", title: "Ocorreu um erro ao atualizar o usuário" })
                    }
                }, 0)

                return () => clearTimeout(timeout)
            },

            delUser(user: UserInterface) {
                const timeout = setTimeout(async () => {
                    const result = await alert.confirmation(this, {
                        title: "Você tem certeza que deseja deletar esse aluno?",
                        html: "Essa ação não é reversível. Escolha com atenção!",
                        confirmButtonText: "Sim, deletar",
                        cancelButtonText: "Não deletar"
                    })

                    if (!result.isConfirmed) return;
                    // Deletar usuário... //

                    const deleteResponse: DefaultResponse = await this.deleteUser(user)
                    if (!deleteResponse || deleteResponse && !deleteResponse.success) {
                        return alert.notification(this, { icon: "error", title: deleteResponse.message || "Ocorreu um erro ao atualizar o cadastro do usuário" })
                    }

                    this.fetchUsers({ timer: 500, message: false })
                    alert.notification(this, { icon: "success", title: deleteResponse.message })
                }, 0)

                return () => clearTimeout(timeout)
            },

            searchUser() {
                const timeout = setTimeout(() => {
                    if (this.search == undefined) {
                        return alert.notification(this, { icon: "error", title: "Você não informou nenhum nome para ser buscado" })
                    }

                    this.fetchUsers({ params: { name: this.search }, timer: 500 })
                }, 0)

                return () => clearTimeout(timeout)
            }
        }
    }
</script>