<template>
    <aside ref="sidebarRef" class="sidebar">
        <header>
            <LogoIcon class="Sidebar-logo-icon" />
            <span>Simple Notes</span>
            <CloseIcon @click="closeSidebar" class="sidebar-close-btn" />
            <hr>
        </header>

        <div class="user-info">
            <img src="#" alt="аватарка">
            <span>John Dou</span>
        </div>

        <div class="sidebar__item">
            <AddIcon />
            <span>Создать заметку</span>
        </div>
        <div class="sidebar__item">
            <LightThemeIcon />
            <span>Сменить тему</span>
        </div>
        <div class="sidebar__item">
            <SettingsIcon />
            <span>Настройки</span>
        </div>
        <div class="sidebar__item">
            <QuitIcon />
            <span style="color: red;">Выйти</span>
        </div>
    </aside>
</template>
 
<script>
// import navigate from '@/use/navigate.js'
import LogoIcon from '@/components/icons/LogoIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import DarkThemeIcon from '@/components/icons/DarkThemeIcon.vue'
import LightThemeIcon from '@/components/icons/LightThemeIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import QuitIcon from '@/components/icons/QuitIcon.vue'

import { ref, watch } from 'vue'


export default {
    components: { LogoIcon, CloseIcon, AddIcon, DarkThemeIcon, LightThemeIcon, SettingsIcon, QuitIcon },
    props: ['sidebarIsOpen'],
    emits: ['update:sidebarIsOpen'],
    setup(props, { emit }) {

        // Референция до dom элемента
        const sidebarRef = ref(null)

        const closeSidebar = () => {
            sidebarRef.value.classList.remove('open')
            emit('update:sidebarIsOpen', false)
        }

        watch(() => props.sidebarIsOpen, (newValue) => {
            // Если обновлённое значение 'sidebarIsOpen' явл. true, то открываем sidebar
            // с помощью добавления css класса open
            if (newValue) sidebarRef.value.classList.add('open')
        })



        return {
            closeSidebar,
            sidebarRef,

            LogoIcon,
            CloseIcon,
            AddIcon,
            DarkThemeIcon,
            LightThemeIcon,
            SettingsIcon,
            QuitIcon,
        }
    },

}

</script>
 
 
<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.sidebar {
    // display: none;
    z-index: 100;
    background-color: $white;
    box-shadow: 4px 10px 6px -6px #000000;
    opacity: 0.9;
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: -100vw;
    padding: 20px 24px 0 24px;
    transition: all 0.3s ease-in-out;

    &.open {
        left: 0;
    }

    header {
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: left;
        flex-wrap: wrap;
        margin-bottom: 75px;

        .sidebar-close-btn {
            display: inline-block;
        }

        svg:nth-child(1) {
            width: 42px;
            height: 43px;

        }

        svg:nth-child(2) {
            width: 24px;
            height: 24px;
            display: inline-block
        }

        span {
            font-size: 24px;
            @include fonts.bold;
            color: $main-text;
            width: calc(100% - 24px - 42px - 37px);
            margin-left: 20px;
        }

        hr {
            width: 100%;
            background-color: $secondary-text;
            height: 1px;
            margin-top: 20px;
            order: 1;
        }
    }



    .user-info {
        display: flex;
        justify-content: left;
        align-items: center;
        align-content: center;
        margin-bottom: 68px;

        img {
            width: 109px;
            height: 109px;
            border: 1px solid $main-text;
            border-radius: 50%;
            background-color: aquamarine;
        }

        span {
            font-size: 20px;
            @include fonts.bold;
            margin-left: 23px;
        }
    }

    .sidebar__item {
        display: flex;
        align-items: center;
        align-content: center;

        img {
            width: 40px;
            height: 40%;
        }

        span {
            transition: all 0.12s ease-in-out;
            font-size: 20px;
            @include fonts.regular;
            margin-left: 20px;
            cursor: pointer;

            &:hover {
                font-weight: bold;
            }
        }

        & {
            margin-bottom: 45px;
        }
    }
}

@media (min-width: $tabs) {
    .sidebar {
        width: 66vw;

        header {
            justify-content: space-between;
            margin-bottom: 95px;

            span {
                width: 170px;
                font-size: 1.2rem;
                display: inline-block;
            }
        }

        .user-info {
            margin-bottom: 90px;

            img {
                background-color: rgb(255, 199, 126);
            }

            span {
                font-size: 24px;
                @include fonts.bold;
                margin-left: 40px;
            }
        }

        .sidebar__item {
            display: flex;
            align-items: center;
            align-content: center;

            span {
                font-size: 24px;
                @include fonts.regular;
                margin-left: 40px;
            }

            & {
                margin-bottom: 65px;
            }
        }
    }
}

@media (min-width: $desktop) {

    $sidebar-width: 30vw;

    .sidebar {
        width: $sidebar-width;
        left: -$sidebar-width;
        padding: 20px 40px 0 40px;

        header {
            margin-bottom: 120px;

            span {
                font-size: 1rem;
                @include fonts.bold;
                color: $main-text;
                width: 130px;
                margin-left: 0;
            }
        }

        .user-info {

            img {
                background-color: rgb(137, 108, 234);
            }

            span {
                font-size: 24px;
                @include fonts.bold;
                margin-left: 40px;
            }

            & {
                margin-bottom: 110px;
            }
        }

        .sidebar__item {
            display: flex;
            align-items: center;
            align-content: center;

            span {
                font-size: 1.2rem;
                margin-left: 42px;
            }

            & {
                margin-bottom: 60px;
            }
        }
    }
}
</style> 