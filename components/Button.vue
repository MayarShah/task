<script setup lang="ts">
withDefaults(defineProps<{
    title?: string
    disabled?: boolean
}>(), {
    title: "Title",
})
const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>

<template>
    <button
        class="text-white py-2 px-4 rounded-lg inline-block min-w-[150px] text-center bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        :disabled="disabled" type="button" @click="emit('click')">Buy</button>
</template>