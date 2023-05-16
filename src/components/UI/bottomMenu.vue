<template>
    <div class="bottom-menu">
        <div class="bottom-menu__container">
            <button v-if="editBtnShow" @click="editNote" class="btn-primary warning">редактировать</button>
            <button v-if="saveBtnShow" @click="saveNote" class="btn-primary okey">сохранить</button>
            <button v-if="deleteBtnShow" @click="$emit('deleteNote')" class="btn-primary danger">удалить</button>
            <button v-if="cancelBtnShow" @click="$emit('cancelNote')" class="btn-primary cancel">отмена</button>
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
        customLog(isNewNote)

        if (!isNewNote) {
            editBtnShow.value = true
            deleteBtnShow.value = true
        }

        const editNote = () => {
            context.emit('editNote')
            editBtnShow.value = false
            deleteBtnShow.value = false
            cancelBtnShow.value = true
            saveBtnShow.value = true
            customLog('editNote Alert')
        }

        const saveNote = () => {
            context.emit('saveNote')
        }

        const deleteNote = () => {
            context.emit('deleteNote')
        
        }
        
        const cancelNote = () => {
            context.emit('cancelNote')
        
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
    background-color: $pure-white;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.25);
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

        .btn-primary {
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
                border: 1px solid $okey;
                color: $main-text;

                &:hover {
                    background-color: $okey;
                    color: $pure-white;
                }
            }

            &.warning {
                border: 2px solid $warning;
                color: $main-text;

                &:hover {
                    background-color: $warning;
                    color: $pure-white;
                }
            }

            &.danger {
                border: 1px solid $invalid;
                color: $main-text;

                &:hover {
                    background-color: $invalid;
                    color: $pure-white;
                }
            }

            &.cancel {
                border: 1px solid $primary-plus;
                color: $main-text;

                &:hover {
                    background-color: $primary;
                    color: $pure-white;
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
            background-color: transparent;
            backdrop-filter: blur(3px);
            box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.25);
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