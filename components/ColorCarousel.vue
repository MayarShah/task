<script setup lang="ts">
import type { Color } from '~/types/Color';

const containerRef = ref<HTMLElement | null>(null)

const { colors, selectedColor } = defineProps<{
    colors: Color[]
    selectedColor: Color | null
}>()

const selectedColorIndex = colors.findIndex(color => color.name === selectedColor?.name)

const selectedIndex = ref<number>(selectedColorIndex || 0);

const emit = defineEmits<{
    (e: 'select', color: Color): void
}>()

const next = () => {
    if (!colors?.length) return
    selectedIndex.value = (selectedIndex.value + 1) % colors.length
    emit('select', colors[selectedIndex.value])
}

const prev = () => {
    if (!colors?.length) return
    selectedIndex.value =
        (selectedIndex.value - 1 + colors.length) % colors.length

    emit('select', colors[selectedIndex.value])
}

const selectColor = (index: number) => {
    selectedIndex.value = index
    emit('select', colors[index])
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
v-for="(item, index) in colors" :key="item.name" :class="[
                'flex justify-center border-green-500 p-4 rounded-md  bg-gray-100',
                selectedIndex === index ? 'border shadow' : ''
            ]" @click="selectColor(index)">
                <div
class="shrink-0 rounded-full border transition size-[40px] aspect-square"
                    :style="{ backgroundColor: item.color }" />
            </button>
        </div>
        <button class="p-4 flex-initial" @click="next">
            <CarouselNextButtonIcon />
        </button>
    </div>
</template>