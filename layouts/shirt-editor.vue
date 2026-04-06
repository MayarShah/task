<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOrderStore } from '~/stores/order';
definePageMeta({
    layout: 'shirt-editor'
})
const orderStore = useOrderStore()
const { color, motiv, totalPrice } = storeToRefs(orderStore);
</script>

<template>
    <div class="h-screen flex flex-col bg-gray-50">
        <header class="flex-initial bg-[#E6EDF5] flex justify-center px-4 py-6">
            <div class="container flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p class="text-4xl text-green-500">Design your shirt</p>
                <div class="flex items-center gap-8">
                    <p v-if="color && motiv" class="text-2xl font-bold">{{ totalPrice }}€</p>
                    <ButtonLink title="Got to Checkout" href="/checkout" />
                </div>
            </div>
        </header>
        <div class="flex-auto mx-auto container p-8">
            <NuxtPage />
        </div>
        <Footer />
    </div>
</template>