<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps<{
    balance: {
        income: number
        expense: number
        balance: number
    }
}>()
</script>
<template>
    <div class="grid grid-cols-3 gap-4">
        <Card>
        <CardHeader>
            <CardTitle class="text-sm text-neutral-500">Balance Actual</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-3xl font-bold text-neutral-800">${{ props.balance.balance.toFixed(2) }}</p>
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle class="text-sm text-neutral-500">Ingresos del mes</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-3xl font-bold text-emerald-600">${{ props.balance.income.toFixed(2) }}</p>
        </CardContent>
        </Card>

        <Card>
        <CardHeader>
            <CardTitle class="text-sm text-neutral-500">Gastos del mes</CardTitle>
        </CardHeader>
        <CardContent>
            <p class="text-3xl font-bold text-red-500">${{ props.balance.expense.toFixed(2) }}</p>
        </CardContent>
        </Card>
    </div>
</template>
