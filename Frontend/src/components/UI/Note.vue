<template>
    <div @click="router.push({ name: 'TheNote', params: { id: idx } })" class="note">
        <div class="note__content">
            {{ content }}
        </div>
        <hr />
        <div class="note__title">
            <!-- <marquee behavior="scroll" direction="left" bgcolor="transparent">
                {{ title }}
            </marquee> -->

            <div class="running-line">
                {{ title }}
            </div>
        </div>
        <div class="note__time">{{ date }}</div>
    </div>
</template>

<script lang="js">
import { useRouter } from 'vue-router'

export default {
    name: '',
    components: {},
    props: ['content', 'title', 'date', 'idx'],
    emits: [''],



    setup(props) {

        const router = useRouter()


        return {
            router,

            content: props.content,
            title: props.title,
            date: props.date,
            idx: props.idx,
        }
    }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.note {
    // width: 250px;
    height: 220px;
    background: $white;
    box-shadow: 3px 5px 9px rgba(0, 0, 0, 0.25);
    border-radius: 25px;
    padding: 20px;

    &:hover {
        transition: all ease-in-out 0.12s;
        transform: scale(1.02);
        cursor: pointer;
    }

    .note__content {
        font-size: 13px;
        @include fonts.light;
        color: $main-text;
        height: 60%;
        overflow: hidden;
    }

    .note__title {
        padding-right: 20px;
        width: auto;
        overflow: hidden;

        .running-line {
            font-size: 16px;
            @include fonts.bold;
            color: $main-text;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            animation: running-line-animation 7s linear infinite;
            animation-play-state: paused;
        }
    }

    @keyframes running-line-animation {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(100%);
        }
    }

    .note__time {
        margin-top: 10px;
        font-size: 16px;
        @include fonts.regular;
        color: $secondary-text;
    }
}

.note:hover .running-line {
    animation-play-state: running;
}

@media (min-width: $tabs) {}

@media (min-width: $desktop) {}
</style> 