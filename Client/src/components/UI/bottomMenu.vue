<template>
    <div class="bottom-menu">
        <div class="bottom-menu__container">
            <button v-if="editBtnShow" @click="editNote" class="btn-primary warning">редактировать</button>
            <button v-if="saveBtnShow" @click="saveNote" class="btn-primary okey">сохранить</button>
            <button v-if="deleteBtnShow" @click="deleteNote" class="btn-primary danger">удалить</button>
            <button v-if="cancelBtnShow" @click="cancelNote" class="btn-primary cancel">отмена</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: '',
    components: {},
    props: [''],
    emits: ['editNote', 'saveNote', 'deleteNote', 'cancelNote'],

    setup(_, context) {
        const editBtnShow = ref(false)
        const saveBtnShow = ref(false)
        const deleteBtnShow = ref(false)
        const cancelBtnShow = ref(false)

        const route = useRoute()
        const isNewNote = route.meta?.isNewNote

        if (!isNewNote) {
            editBtnShow.value = true
            deleteBtnShow.value = true
        } else {
            saveBtnShow.value = true
        }

        const editNote = () => {
            context.emit('editNote')
            editBtnShow.value = false
            deleteBtnShow.value = false
            cancelBtnShow.value = true
            saveBtnShow.value = true
        }

        const saveNote = () => {
            context.emit('saveNote')
        }

        const deleteNote = () => {
            context.emit('deleteNote')
        }

        const cancelNote = () => {
            context.emit('cancelNote')
            editBtnShow.value = true
            deleteBtnShow.value = true
            cancelBtnShow.value = false
            saveBtnShow.value = false
        }


        return {
            editBtnShow,
            saveBtnShow,
            deleteBtnShow,
            cancelBtnShow,

            editNote,
            saveNote,
            deleteNote,
            cancelNote,
        }
    }
}

</script>

<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

$menu-height: 40px;
$menu-tabs-height: 60px;
$menu-desk-height: 50px;

.bottom-menu {
    position: fixed;
    z-index: 1;
    background-color: var(--pure-white);
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    // border-radius: 0px 0px 10px 10px;

    .bottom-menu__container {
        background-color: transparent;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: left;
        gap: 20px;
        padding-left: 24px;
        box-shadow: 0px 1px 8px 1px var(--shadow-primary);


        .btn-primary {
            color: var(--main-text);
            transition: 0.5s;
            background-color: transparent;

            padding: 10px;
            border-radius: 50px;
            height: 30px;
            font-size: 17px;
            display: flex;
            align-items: center;
            justify-content: center;

            @include fonts.light;

            &.okey {
                border: 1px solid var(--okey);
                color: var(--main-text);

                &:hover {
                    background-color: var(--okey);
                    color: white;
                }
            }

            &.warning {
                border: 2px solid var(--warning);
                color: var(--main-text);

                &:hover {
                    background-color: var(--warning);
                    color: white;
                }
            }

            &.danger {
                border: 1px solid var(--invalid);
                color: var(--main-text);

                &:hover {
                    background-color: var(--invalid);
                    color: white;
                }
            }

            &.cancel {
                border: 1px solid var(--primary-cyan);
                color: var(--main-text);

                &:hover {
                    background-color: var(--cyan);
                    color: white;
                }
            }
        }
    }


}

@media (min-width: $tabs) {

    .bottom-menu {
        height: $menu-tabs-height;
        background-color: transparent;
        box-shadow: none;

        .bottom-menu__container {
            width: $note-content-block-tabs-width;
            margin: 0 auto;
            backdrop-filter: blur(3px);
            border-radius: 19px 19px 0px 0px;

            .btn-primary {
                height: 40px;
                font-size: 1rem;
            }
        }
    }
}

@media (min-width: $desktop) {

    .bottom-menu {
        height: $menu-desk-height;

        .bottom-menu__container {
            width: $note-content-block-desk-width;

            .btn-primary {
                height: 40px;
                font-size: 1.2rem;
            }
        }


    }
}
</style> 