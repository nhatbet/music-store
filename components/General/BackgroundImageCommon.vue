<template>
    <a class="bg">
        <img :src="src" />
    </a>
</template>

<script lang="ts" setup>
const props = defineProps({
    src: {
        type: [String],
        required: false,
    },
});
</script>

<style lang="scss" scoped>
.bg {
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    aspect-ratio: 2/ 1.3;
    overflow: hidden;
    img {
        width: 100%;
    }
}
</style>
