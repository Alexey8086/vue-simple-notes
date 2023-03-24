<template>
    <div class="home-link">
        <ArrowBackIcon width="35px" height="35px" color="#000000" />
        <span @click="pushUrl('/home')">Вернуться домой</span>
    </div>

    <div class="container">
        <div class="info">
            <img id="info__avatar" src="#" alt="ваша аватарка">
            <span id="info__username">John Dou</span>
            <button id="info__change-img-btn" class="btn-primary">изменить изображение</button>
        </div>

        <form action="" method="post">
            <div class="form-group">
                <label for="username">Новое имя:</label>
                <input type="text" id="username" placeholder="введите ваше новое имя" required>
            </div>
            <div class="form-group">
                <label for="email">Новый e-mail:</label>
                <input type="email" id="email" placeholder="введите ваш новый email" required>
            </div>
            <div class="form-group">
                <label for="password">Новый пароль:</label>
                <input type="password" id="password" placeholder="введите новый пароль" required>
            </div>
            <div class="form-group">
                <label for="password=confirm">Подтверждение пароля:</label>
                <input type="password" id="password-confirm" placeholder="повторите новый пароль" required>
            </div>

            <button type="submit" class="btn-primary">сохранить</button>
        </form>
    </div>
</template>

<script>
import ArrowBackIcon from '@/components/icons/ArrowIcon.vue'
import navigate from '@/use/navigate.js'

export default {
    name: '',
    components: { ArrowBackIcon },
    props: [''],
    emits: [''],

    setup() {



        return {
            pushUrl: navigate().pushUrl
        }
    }
}

</script>

<style scoped lang='scss'>
@import '@/styles/settings.scss';
</style> 