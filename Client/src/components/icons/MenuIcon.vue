<template>
    <svg :width="width" :height="height" viewBox="0 0 24 24" fill="none">
        <path d="M4 17H20M4 12H20M4 7H20" :stroke="color" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
</template>
  
<script>
  export default {
    props: {
        width: {
            type: String,
            required: false,
            default: '45px'
        },
        height: {
            type: String,
            required: false,
            default: '45px'
        },
        color: {
            type: String,
            required: false,
            default: '#82AFFF'
        },
    },
  }
</script>
  