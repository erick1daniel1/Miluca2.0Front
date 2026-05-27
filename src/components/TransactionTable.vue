<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { Transaction } from '@/types'


const props = defineProps<{
    transactions: Transaction[]
}>()

</script>

<template>
    <!-- TABLA -->
    <Card>
        <CardHeader>
        <CardTitle>Transacciones</CardTitle>
        </CardHeader>
        <CardContent class="overflow-auto max-h-125">
        <DataTable :value="transactions" striped-rows table-style="min-width:50rem" scrollable scroll-height="400px">
            <Column field="id" header="ID" />
            <Column field="type" header="Tipo" />
            <Column field="category_detail.name" header="Categoría" />
            <Column field="amount" header="Monto" />
            <Column field="date" header="Fecha" />
            <Column field="description" header="Descripción" />
        </DataTable>
        </CardContent>
    </Card>
</template>