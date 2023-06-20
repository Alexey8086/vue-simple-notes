<template>
    <svg :width="width" :height="height" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"
        :stroke="color" stroke-width="0.00024000000000000003">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.048">
        </g>
        <g id="SVGRepo_iconCarrier">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                :fill="color">
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
            default: '#000000'
        },
    },
}
</script>
  