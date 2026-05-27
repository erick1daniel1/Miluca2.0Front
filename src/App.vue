<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { Transaction, TransactionsForm } from '@/types'
import TransactionTable from '@/components/TransactionTable.vue'
import BalanceCards from '@/components/BalanceCards.vue'
import TransactionForm from './components/TransactionForm.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'


interface Category {
  id: number
  name: string
}

const transactions = ref<Transaction[]>([])
const categories = ref<Category[]>([])

const balance = ref({
  income: 0,
  expense: 0,
  balance: 0
})


const getTransactions = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/finances/transactions/`)
    console.log('transactions:', res.data)  
    transactions.value = res.data
  } catch (error) {
    console.log(error)
  }
}

const getBalance = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/finances/balance/`)
    balance.value = res.data
  } catch (error) {
    console.log(error)
  }
}

const loadCategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/finances/categories/`)
  categories.value = await res.json()
}

onMounted(() => {
  loadCategories()
  getTransactions()
  getBalance()
})

const save = async (formData: TransactionsForm) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/finances/transactions/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...formData, user: 1 })
  })
  const data = await response.json()
  transactions.value.unshift(data)
  getBalance()
  getTransactions()
}
</script>

<template>
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar />
      <SidebarInset class="flex-1">
        <slot />
        <div class="min-h-screen flex-1 w-full bg-neutral-50 p-10">
          <h1 class="text-2xl font-semibold text-neutral-800 mb-6">MiLuca</h1>

          <div class="grid gap-6">

            <!-- BALANCE -->

            <BalanceCards :balance="balance" />

            <!-- FORMULARIO -->
            
            <TransactionForm @submit="save" :categories="categories" />
          
            <!-- TABLA -->
            <TransactionTable :transactions="transactions" />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
</template>