<script setup lang="ts">
defineProps<{
    message: string
}>()
</script>

<template>
    <div class="px-2 py-1 text-sm rounded-md border border-red-500 bg-red-200 text-red-500 mt-2">
        <p>{{ message }}</p>
    </div>
</template>