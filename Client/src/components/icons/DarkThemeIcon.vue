<template>
    <svg xmlns="http://www.w3.org/2000/svg" :height="height" :width="width" viewBox="0 96 960 960">
        <path :fill="color"
            d="M593 976q-88.114 0-166.557-32.5Q348 911 288.43 855.592q-59.57-55.409-94-129.625Q160 651.75 160 568.383 160 484 194.5 409.5q34.5-74.5 94-130t137.943-88Q504.886 159 593 159q47 0 88 10t79 27q-90 64-146 160t-56 211.5q0 115.5 56 212T760 939q-38 17-79 27t-88 10Zm0-60h26.419Q632 916 640 915q-66-74-104-162t-38-185q0-97 38-185t104-163q-8-1-20.581-1H593q-153 0-263 101.962-110 101.963-110 247Q220 713 330 814.5T593 916Zm-95-349Z" />
    </svg>
</template>
  
<script lang="js">
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
            default: '#C0BFBF'
        },
    },
}
</script>
  