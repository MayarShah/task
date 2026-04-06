<script setup lang="ts">
import type { Motiv } from '~/types/Motiv';

const containerRef = ref<HTMLElement | null>(null)

const { motives, selectedMotiv } = defineProps<{
    motives: Motiv[]
    selectedMotiv: Motiv | null
}>()

const selectedMotivIndex = motives.findIndex(motive => motive.name === selectedMotiv?.name)

const selectedIndex = ref<number>(selectedMotivIndex || 0);

const emit = defineEmits<{
    (e: 'select', color: Motiv): void
}>()

const next = () => {
    if (!motives?.length) return
    selectedIndex.value = (selectedIndex.value + 1) % motives.length
    emit('select', motives[selectedIndex.value])
}

const prev = () => {
    if (!motives?.length) return

    selectedIndex.value =
        (selectedIndex.value - 1 + motives.length) % motives.length
    emit('select', motives[selectedIndex.value])
}

const selectMotive = (index: number) => {
    if (!motives?.length) return
    selectedIndex.value = index;
    emit('select', motives[index])
}

watch(selectedIndex, async (index) => {
    await nextTick()
    const container = containerRef.value
    if (!container) return
    const item = container.children[index] as HTMLElement
    item?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
    })
})

</script>

<template>
    <div class="rounded-md shadow-md bg-gray-100 flex md:flex-col items-center w-full md:w-fit flex-initial">
        <button class="p-4 flex-initial" @click="prev">
            <CarouselPrevButtonIcon />
        </button>
        <div
ref="containerRef"
            class="flex flex-auto md:flex-col overflow-x-auto md:overflow-y-auto max-h-[300px] md:px-4 md:w-[100px]">
            <button
v-for="(item, index) in motives" :key="item.name" :class="[
                'flex justify-center border-green-500 p-4 rounded-md  bg-gray-100',
                selectedIndex === index ? 'border shadow' : ''
            ]" @click="selectMotive(index)">
                <div class="shrink-0 rounded-full border transition size-[40px] aspect-square">
                    <img class="object.cover" :src="item.img" >
                </div>
            </button>
        </div>
        <button class="p-4" @click="next">
            <CarouselNextButtonIcon />
        </button>
    </div>
</template>