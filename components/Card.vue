<script setup lang="ts">
withDefaults(defineProps<{
    title?: string
}>(), {
    title: "Card title",
})
</script>

<template>
    <div class="px-4 py-3 rounded-md shadow-md flex flex-col gap-6 flex-auto bg-gray-100">
        <div class="flex-initial text-xl">
            <p>{{ title }}</p>
        </div>
        <div class="flex flex-col flex-auto font-semibold gap-2">
            <slot />
        </div>
    </div>
</template>