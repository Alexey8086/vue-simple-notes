<template>
    <aside ref="sidebarRef" class="sidebar">
        <header>
            <LogoIcon @click="router.push('/home')" class="Sidebar-logo-icon" />
            <span>Simple Notes</span>
            <CloseIcon @click="closeSidebar" class="sidebar-close-btn" />
            <hr>
        </header>

        <div class="user-info">
            <img :src="imageUrl.value" :alt="altText">
            <span>{{ user?.name }}</span>
        </div>

        <div class="sidebar__item">
            <AddIcon />
            <span @click="createNoteLink">Создать заметку</span>
        </div>
        <div class="sidebar__item">
            <LightThemeIcon v-if="theme == 'light'" />
            <DarkThemeIcon v-if="theme == 'dark'" />

            <span @click="changeThemeLink">Сменить тему</span>
        </div>
        <div class="sidebar__item">
            <SettingsIcon />
            <span @click="settingsLink">Настройки</span>
        </div>
        <div class="sidebar__item">
            <QuitIcon />
            <span @click="logoutLink" style="color: red;">Выйти</span>
        </div>
    </aside>
    <div @click="closeSidebar" ref="sidebarBackDrop" class="sidebarBackDrop"></div>
</template>
 
<script>
import LogoIcon from '@/components/icons/LogoIcon.vue'
import CloseIcon from '@/components/icons/CloseIcon.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import DarkThemeIcon from '@/components/icons/DarkThemeIcon.vue'
import LightThemeIcon from '@/components/icons/LightThemeIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import QuitIcon from '@/components/icons/QuitIcon.vue'

import { ref, watch, computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'



export default {
    components: { LogoIcon, CloseIcon, AddIcon, DarkThemeIcon, LightThemeIcon, SettingsIcon, QuitIcon },
    props: ['sidebarIsOpen', 'user', 'imageUrl', 'altText'],
    emits: ['update:sidebarIsOpen'],
    setup(props, { emit }) {

        const router = useRouter()
        const store = useStore()
        const theme = computed(() => store.state.theme)

        const { user } = toRefs(props)



        // Референция до dom элемента
        const sidebarRef = ref(null)
        const sidebarBackDrop = ref(null)

        const closeSidebar = () => {
            sidebarRef.value.classList.remove('open')
            sidebarBackDrop.value.classList.remove('openBackDrop')
            emit('update:sidebarIsOpen', false)
        }

        watch(() => props.sidebarIsOpen, (newValue) => {
            // Если обновлённое значение 'sidebarIsOpen' явл. true, то открываем sidebar
            // с помощью добавления css класса open
            if (newValue) {
                sidebarRef.value.classList.add('open')
                sidebarBackDrop.value.classList.add('openBackDrop')
            }
        })

        const createNoteLink = () => {
            closeSidebar()
            router.push('/note/new')
        }

        const changeThemeLink = () => {
            let theme = store.state.theme
            if (theme === 'light' || !theme) {
                theme = 'dark'
            } else theme = 'light'

            store.dispatch('changeTheme', theme)
            closeSidebar()
        }

        const settingsLink = () => {
            router.push('/settings')
            closeSidebar()
        }

        const logoutLink = () => {
            closeSidebar()
            store.commit('auth/setLogout')
            router.push('/signin')
        }

        return {
            createNoteLink,
            settingsLink,
            closeSidebar,
            changeThemeLink,
            logoutLink,
            router,
            store,
            sidebarRef,
            sidebarBackDrop,

            LogoIcon,
            CloseIcon,
            AddIcon,
            DarkThemeIcon,
            LightThemeIcon,
            SettingsIcon,
            QuitIcon,
            user,
            theme,
        }
    },

}

</script>
 
 
<style scoped lang='scss'>
@use '@/styles/libs/fonts.scss';
@import '@/styles/libs/variables.scss';

.sidebarBackDrop {
    position: fixed;
    z-index: 99;
    width: 100vw;
    height: 100vh;
    display: none;

    &.openBackDrop {
        display: block;
    }
}

.sidebar {
    // display: none;
    z-index: 100;
    background-color: var(--sidebar-bg);
    box-shadow: 4px 10px 6px -6px var(--main-text);
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
            cursor: pointer;
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
            color: var(--main-text);
            width: calc(100% - 24px - 42px - 37px);
            margin-left: 20px;
        }

        hr {
            width: 100%;
            background-color: var(--secondary-text);
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
            border: 1px solid var(--main-text);
            border-radius: 50%;
            background-color: rgb(64, 138, 241);
            object-fit: cover;

        }

        span {
            font-size: 20px;
            @include fonts.bold;
            margin-left: 23px;
            color: var(--main-text);
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
            color: var(--main-text);

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
                color: var(--main-text);
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