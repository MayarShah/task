<script setup lang="ts">
import type { Color } from '~/types/Color';
import type { Motiv } from '~/types/Motiv';

defineProps<{
    color: Color,
    motiv: Motiv,
    showInfo: boolean,
}>()
</script>

<template>
    <div class="flex flex-col items-center justify-center size-full">
        <div class="size-full sm:size-[400px] relative flex justify-center">
            <Shirt :color="color?.color" />
            <div class="h-[30%] aspect-square absolute top-[30%]">
                <img v-if="motiv?.img" :src="motiv.img" class="object-contain size-full" >
            </div>
        </div>
        <div v-if="color && motiv && showInfo">
            <p>Motiv: {{ motiv.name }}</p>
            <p>Shirt: {{ color.name }}</p>
        </div>
    </div>
</template>