<script setup lang="ts">
const route = useRoute()
const title = computed(() => route.meta.title || '')
</script>

<template>
    <div class="h-screen flex flex-col bg-gray-50">
        <header class="flex-initial bg-[#E6EDF5] flex justify-center px-4 py-6">
            <div class="container flex flex-col sm:flex-row gap-4 justify-between items-center">
                <p class="text-4xl text-green-500">{{ title }}</p>
                <div class="flex items-center gap-8">
                    <ButtonLink title="Back" href="/" />
                </div>
            </div>
        </header>
        <div class="flex-auto mx-auto container p-8">
            <NuxtPage />
        </div>
        <Footer />
    </div>
</template>