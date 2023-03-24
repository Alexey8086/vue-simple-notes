<template>
    <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" :stroke="color">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
            <path d="M16 8L8 16M8.00001 8L16 16" :stroke="color" stroke-width="0.696" stroke-linecap="round"
                stroke-linejoin="round"></path>
        </g>
    </svg>
</template>
      
<script>
export default {
    props: {
        width: {
            type: String,
            required: false,
            default: '37px'
        },
        height: {
            type: String,
            required: false,
            default: '37px'
        },
        color: {
            type: String,
            required: false,
            default: '#FF0505'
        },
    },
    setup(props) {

        return {

        }
    }

}
</script>

<style scoped lang="scss">
    @import '@/styles/libs/variables.scss';

    @media (min-width: $tabs) {
        svg {
            width: 50px !important;
            height: 50px !important;
        }
    }
</style>