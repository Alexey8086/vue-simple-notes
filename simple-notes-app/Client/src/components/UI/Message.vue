<template>
    <div v-if="msg" :class="['message', 'alert', msg?.type]">
        <div class="flex-container">
            <span :class="['']">{{ title }}</span>
            <span @click="close" class="alert-close">&times;</span>
        </div>
        <p>{{ msg?.value }}</p>

    </div>
</template>

<script lang="js">
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: '',
    components: {},
    props: [''],
    emits: [''],

    setup() {
        const store = useStore()
        const TITLES = {
            success: 'Успешно!',
            danger: 'Ошибка!',
            warning: 'Внимание!'
        }
        const msg = computed(() => store.getters['message'])
        const title = computed(() => msg.value ? TITLES[msg.value.type] : null)
        return {
            msg,
            title,
            close: () => store.commit('setClearMessage')
        }
    }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.danger {
    border-left: 5px solid $invalid;

    span:first-child  {
        color: $invalid !important;
    }
}

.warning {
    border-left: 5px solid $warning;

    span:first-child  {
        color: $warning!important;
    }
}
.success {
    border-left: 5px solid $valid;

    span:first-child  {
        color: $valid!important;
    }
}

.message {
    @include fonts.regular;

    top: 50px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    width: 80vw;
    background-color: $pure-white;
    padding: 10px;
    padding-bottom: 20px;
    border-radius: 15px;
    border-top: 1px solid $main-text;
    border-right: 1px solid $main-text;
    border-bottom: 1px solid $main-text;
    z-index: 10000;

    .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        span:first-child {
            font-size: 1rem;
            color: $main-text;
        }

        span:last-child {
            color: $invalid;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }

    p {
        margin-top: 25px;
        font-size: 0.9rem;
        color: $main-text;
    }

}

@media (min-width: $tabs) {
    .message {
        top: 50px;
        width: 400px;

        p {
            margin-top: 25px;
            font-size: 1rem;
        }

    }
}

@media (min-width: $desktop) {
    .message {
        top: 50px;
        width: 600px;

        .flex-container {

            span:first-child {
                font-size: 1.6rem;
                color: $main-text;
            }

            span:last-child {
                color: $invalid;
                font-size: 2rem;
                cursor: pointer;
            }
        }

        p {
            margin-top: 25px;
            font-size: 1.2rem;
        }

    }
}
</style> 