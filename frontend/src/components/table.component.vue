<template>
    <v-responsive>
        <v-container>
            <v-skeleton-loader v-if="firstLoad" :loading="loading" type="table" />
            <v-data-table 
                :items="data"
                :headers="headers"
                :sort-by="[{ key: 'ra', order: 'desc' }]"
                v-show="!firstLoad"

                items-per-page="10"
                :items-per-page-options="itemsPerPageOptions"
                items-per-page-text="Registros por página"
                :no-data-text="noDataText"

                class="elevation-1"
            >
            
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="$emit('editUser', item)">mdi-pencil</v-icon>
                <v-icon size="small" @click="$emit('deleteUser', item)">mdi-delete</v-icon>
            </template>

            </v-data-table>
        </v-container>
    </v-responsive>
</template>

<script lang="ts">

const props = ["data", "headers", "loading", "firstLoad", "noDataText"]
const emits = ["editUser", "deleteUser"]

export default {
    name: "Table",
    props,
    emits,
    data() {
        return {
            itemsPerPageOptions: [
                { value: 10, title: "10" },
                { value: 25, title: "25" },
                { value: 50, title: "50" },
                { value: -1, title: "Todos" },
            ]
        }
    },
}

</script>
