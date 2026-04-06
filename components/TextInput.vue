<script setup lang="ts">
withDefaults(defineProps<{
    label?: string
    placeholder?: string
    error?: string
    id: string
    modelValue: string
}>(), {
    label: "Title",
    placeholder: "Text input",
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="">
        <label :for="id" class="text-sm font-light">{{ label }}</label>
        <input
:id="id" :value="modelValue"
            type="text" :placeholder="placeholder" :aria-invalid="!!error" :aria-describedby="error ? `${id}-error` : undefined"
            class="px-3 py-2 border border-gray-400 rounded-md text-xl w-full placeholder-gray-300 mt-1"
            @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" >
        <ErrorMessage v-if="error" :message="error" />
    </div>
</template>