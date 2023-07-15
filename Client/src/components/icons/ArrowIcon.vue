<template>
    <svg class="arrow-icon-svg icon" :width="width" :height="height" viewBox="0 0 1024 1024" version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z">
            </path>
        </g>
    </svg>
</template>
      
<script lang="js">
export default {
    props: {
        width: {
            type: String,
            required: false,
            default: '27px'
        },
        height: {
            type: String,
            required: false,
            default: '27px'
        },
        color: {
            type: String,
            required: false,
            default: '#000000'
        },
    },
}
</script>

<style scoped lang="scss">
    .arrow-icon-svg {
        fill: var(--main-text);
    }
</style>
      