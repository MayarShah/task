<script setup lang="ts">
withDefaults(defineProps<{
    title?: string
    href?: string
}>(), {
    title: "Title",
    href: "/",
})
</script>

<template>
    <NuxtLink :to="href" class="text-white py-2 px-4 rounded-lg inline-block min-w-[150px] text-center bg-blue-500">
        {{ title }}
    </NuxtLink>
</template>