<script setup lang="ts">
import { useCheckout } from '~/composables/useCheckout';

definePageMeta({
    title: 'Checkout'
});

const {
    name,
    address,
    errors,
    generalError,
    loading,
    color,
    motiv,
    totalPrice,
    submit,
    canSubmit,
} = useCheckout();
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
                        placeholder="Enter your name" />

                    <TextInput
id="address" v-model="address" :error="errors.address?.[0]" label="Address"
                        placeholder="Enter your address" />
                </Card>

            </div>

            <div class="flex justify-end mt-4">
                <Button title="Buy" :disabled="!canSubmit || loading" @click="submit" />
            </div>
        </div>
    </div>
</template>