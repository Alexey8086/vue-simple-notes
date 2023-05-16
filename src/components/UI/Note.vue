<template>
    <div @click="router.push({name: 'TheNote', params: {id: idx}})" class="note">
        <div class="note__content">
            {{ content }}
        </div>
        <hr />
        <div class="note__title">
            <marquee behavior="scroll" direction="left" bgcolor="transparent">
                {{ title }}
            </marquee>
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
    }

    .note__title {
        padding-right: 20px;
        margin-top: 10px;

        marquee {
            font-size: 16px;
            @include fonts.bold;
            color: $main-text;
        }
    }

    .note__time {
        margin-top: 10px;
        font-size: 16px;
        @include fonts.regular;
        color: $secondary-text;
    }
}

@media (min-width: $tabs) {}

@media (min-width: $desktop) {}
</style> 