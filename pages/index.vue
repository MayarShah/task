<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useOrderStore } from '~/stores/order';
import type { Color } from '~/types/Color';
import type { Motiv } from '~/types/Motiv';

definePageMeta({
    layout: 'shirt-editor',
    title: 'Design your Shirt'
})

const orderStore = useOrderStore()

const [{ data: colorsData }, { data: motivesData }] = await Promise.all([
    useFetch<Color[]>('/api/colors'),
    useFetch<Motiv[]>('/api/motives')
])

if (!orderStore.initialized && colorsData.value && motivesData.value) {
    orderStore.setColors(colorsData.value)
    orderStore.setMotives(motivesData.value)
    orderStore.setColor(colorsData.value[0])
    orderStore.setMotiv(motivesData.value[0])
    orderStore.initialized = true
}

const { color, motiv, colors, motives } = storeToRefs(orderStore);

const handleColorSelect = (color: Color) => {
    orderStore.setColor(color)
}

const handleMotivSelect = (motiv: Motiv) => {
    orderStore.setMotiv(motiv)
}

</script>

<template>
    <div class="flex justify-between flex-col md:flex-row items-center h-full gap-4">
        <ColorCarousel :selected-color="color" :colors="colors" @select="handleColorSelect" />
        <ShirtViewer v-if="color && motiv" :show-info="false" :color="color" :motiv="motiv" />
        <MotivesCarousel :selected-motiv="motiv" :motives="motives" @select="handleMotivSelect" />
    </div>
</template>