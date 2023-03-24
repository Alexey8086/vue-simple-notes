<template>
    <div class="bottom-menu">
        <div class="bottom-menu__container">
            <button class="btn-primary warning">редактировать</button>
            <button class="btn-primary okey">сохранить</button>
            <button class="btn-primary danger">удалить</button>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    components: {},
    props: [''],
    emits: [''],

    setup() {



        return {

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
    position: sticky;
    z-index: 2;
    background-color: $pure-white;
    bottom: 0;
    width: 100vw;
    height: 40px;
    box-shadow: 0px 1px 8px 1px rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 10px 10px;

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
                display: none;
                border: 1px solid $okey;
                color: $okey;

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