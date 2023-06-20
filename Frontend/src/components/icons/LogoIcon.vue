<template>
    <svg class="sidebar-close-btn" :width="width" :height="height" viewBox="0 0 48.00 48.00" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>

        <g id="SVGRepo_iconCarrier">
            <rect :width="width" :height="height" fill="none" fill-opacity="0.01">
            </rect>
            <path d="M8 6C8 4.89543 8.89543 4 10 4H30L40 14V42C40 43.1046 39.1046 44 38 44H10C8.89543 44 8 43.1046 8 42V6Z"
                fill="#2F88FF" :stroke="color" stroke-width="1.2" stroke-linejoin="round">
            </path>
            <path d="M16 20H32" :stroke="stroke" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            </path>
            <path d="M16 28H32" :stroke="stroke" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            </path>
            <path d="M16 36H32" :stroke="stroke" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            </path>
        </g>
    </svg>
</template>
  
<script>
export default {
    props: {
        width: {
            type: String,
            required: false,
            default: '42px'
        },
        height: {
            type: String,
            required: false,
            default: '43px'
        },
        color: {
            type: String,
            required: false,
            default: '#82AFFF'
        },
        stroke: {
            type: String,
            required: false,
            default: '#FFFFFF'
        }
    },
}
</script>

<style scoped lang="scss">
@import '@/styles/libs/variables.scss';

@media (min-width: $tabs) {
    .Sidebar-logo-icon {
        width: 50px !important;
        height: 50px !important;
    }
}
</style>
  