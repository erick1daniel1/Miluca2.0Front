<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { reactive } from 'vue'

const today: string = new Date().toISOString().split('T')[0]!
const form = reactive({
    type: 'expense',
    category: null,
    amount: 0,
    date: today,
    description: ''
})

const props = defineProps<{
    categories: {
        id: number
        name: string
    }[]
}>()

const emit = defineEmits<{
    submit: [data: {
    type: string
    category: number | null
    amount: number
    date: string
    description: string
    }]
}>()

const save = () => {
    emit('submit', form)
}

</script>
<template>

<Card>
    <CardHeader>
        <CardTitle>Nueva Transacción</CardTitle>
    </CardHeader>
    <CardContent class="overflow-auto max-h-96">
        <form @submit.prevent="save" class="flex gap-4 flex-wrap items-end">
            <div class="flex flex-col gap-1">
                <label class="text-xs text-neutral-500">Tipo</label>
                <select v-model="form.type" class="border rounded-md px-3 py-2 text-sm">
                    <option value="income">Ingreso</option>
                    <option value="expense">Gasto</option>
                </select>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-xs text-neutral-500">Categoría</label>
                <select v-model="form.category" class="border rounded-md px-3 py-2 text-sm">
                    <option disabled value="">Seleccione una categoría</option>
                    <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ cat.name }}
                    </option>
                </select>
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-xs text-neutral-500">Monto</label>
                <input v-model="form.amount" type="number" class="border rounded-md px-3 py-2 text-sm w-32" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-xs text-neutral-500">Fecha</label>
                <input v-model="form.date" type="date" class="border rounded-md px-3 py-2 text-sm" />
            </div>
            <div class="flex flex-col gap-1">
                <label class="text-xs text-neutral-500">Descripción</label>
                <input v-model="form.description" class="border rounded-md px-3 py-2 text-sm" />
            </div>
            <button type="submit" class="bg-neutral-800 text-white px-4 py-2 rounded-md text-sm hover:bg-neutral-700">
                Guardar
            </button>
        </form>
    </CardContent>
</Card>

</template>