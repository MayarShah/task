<script setup lang="ts">
definePageMeta({
    title: 'Order success'
})
</script>

<template>
    <div class="flex justify-center items-center flex-col h-full gap-4">
        <p class="text-4xl text-gray-500 font-bold text-center">Thank you for your order.</p>
        <ButtonLink title="Design another product" href="/" />
    </div>
</template>