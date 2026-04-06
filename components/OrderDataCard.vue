<script setup lang="ts">

withDefaults(defineProps<{
    title?: string
    colorPrice?: number
    motivePrice?: number
    sum?: number
}>(), {
    title: "Title",
    colorPrice: 0,
    motivePrice: 0,
    sum: 0,
})
</script>

<template>
    <Card :title="title">
        <div class="flex flex-col flex-auto font-semibold gap-2">
            <div class="flex items-center justify-between">
                <p>Motive:</p>
                <p>{{ motivePrice }}€</p>
            </div>
            <div class="flex items-center justify-between">
                <p>Shirt:</p>
                <p>{{ colorPrice }}€</p>
            </div>
        </div>
        <div class="flex items-center justify-between border-t pt-4 flex-initial font-semibold">
            <p>Total:</p>
            <p>{{ sum }}€</p>
        </div>
    </Card>
</template>