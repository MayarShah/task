<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOrderStore } from '~/stores/order';
import type { ApiError } from '~/types/ApiError';

definePageMeta({
    title: 'Checkout'
})

const router = useRouter()

const orderStore = useOrderStore()
const { color, motiv, totalPrice } = storeToRefs(orderStore)
const { resetOrder } = orderStore

const name = ref('')
const address = ref('')
const errors = ref<{ name?: string[]; address?: string[] }>({})
const generalError = ref<string | null>(null)
const loading = ref(false)

const submit = async () => {
    loading.value = true
    errors.value = {}

    try {
        await $fetch('/api/order', {
            method: 'POST',
            body: {
                name: name.value,
                address: address.value,
            },
        })
        await router.push('/success')
        resetOrder();
    }
    catch (err: unknown) {
        const e = err as ApiError
        if (e.data) {
            errors.value = e.data.errors ?? {}
            generalError.value = e.data.message ?? null
        }
    }
    finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ShirtViewer v-if="color && motiv" :show-info="true" :color="color" :motiv="motiv" />
        <div class="flex flex-col">
            <div class="flex-auto grid grid-cols-1 lg:grid-cols-2 gap-10 w-full h-full">
                <OrderDataCard
title="Order Data" :motive-price="motiv?.price" :color-price="color?.price"
                    :sum="totalPrice" />
                <Card title="Personal Data">
                    <ErrorMessage v-if="generalError" :message="generalError" />
                    <TextInput
id="name" v-model="name" :error="errors.name?.[0]" label="Name"
                        placeholder="Enter ypur name" />
                    <TextInput
id="address" v-model="address" :error="errors.address?.[0]"
                        label="Address" placeholder="Enter your address" />
                </Card>
            </div>
            <div class="flex justify-end mt-4">
                <Button title="Buy" :disabled="loading" @click="submit" />
            </div>
        </div>
    </div>
</template>