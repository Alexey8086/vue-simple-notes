<template>
    <div class="spinner-container">
        <LoopingRhombusesSpinner :animation-duration="1000" :size="180" color="#2994EC" />
    </div>
</template>

<script>
import { LoopingRhombusesSpinner } from 'epic-spinners'

export default {
    name: '',
    components: { LoopingRhombusesSpinner },
    props: [''],
    emits: [''],

    setup(props) {



        return {

        }
    }
}

</script>

<style scoped lang='scss'>
.spinner-container {
    position: absolute;
    width: auto;
    height: auto;
    z-index: 100000000;
    top: 40vh;
    margin-left: 50vw;


}
</style> 