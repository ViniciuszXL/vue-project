<template>
    <v-navigation-drawer v-model="drawer" location="left" permanent>
        <v-list-item :title="title" class="text-center font-weight-bold bg-grey pa-5" />
        <v-divider></v-divider>

        <v-list>
            <v-list-title v-for="link in links" :key="link.title">
                <v-list-item link router :to="link.to">
                    <v-icon class="white--text">{{ link.icon }}</v-icon>
                    {{ link.title }}
                </v-list-item>
            </v-list-title>
        </v-list>
    </v-navigation-drawer>

    <v-app-bar>
        <v-app-bar-nav-icon variant="text" @click.stop="updateDrawer" />
        <v-toolbar-title class="text-black text-center">{{ toolbarTitle }}</v-toolbar-title>
    </v-app-bar>
</template>

<script lang="ts">

const props = [
    "title",
    "toolbarTitle"
]

export default {
    name: "Header",
    props,
    data: () => ({
        drawer: true,
        links: [
            { title: "Alunos", icon: "mdi-account", to: "/dashboard" },
        ]
    }),
    methods: {
        updateDrawer() { 
            this.drawer = !this.drawer 
        }
    }
}

</script>