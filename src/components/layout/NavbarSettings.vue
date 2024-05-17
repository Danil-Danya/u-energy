<template>
    <div class="navbar__settings">
        <h2 class="title navbar__settings-title">{{ $t('Settings.Navbar.title') }}</h2>
        <nav class="navbar__settings-container">
            <ul class="navbar__settings-ul">
                <li v-for="link in links" :key="link">
                    <router-link :to="link.path" class="navbar__settings-link">
                        {{ link.text }}
                    </router-link>
                </li>
            </ul>
            <span class="navbar__settings-line"></span>
        </nav>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/layout/navbar_settings.scss';
</style>

<script>
export default {
    data: () => ({
        links: [
            {
                text: 'Общие',
                path: '/settings/all'
            },
            {
                text: 'Платежи',
                path: '/settings/payments'
            },
            {
                text: 'Акции и скидки',
                path: '/settings/promotions-and-discounts'
            },
            {
                text: 'Простой / Парковка',
                path: '/settings/downtime'
            },
            {
                text: 'Уведомления',
                path: '/settings/notifications'
            },
            {
                text: 'Безопасность',
                path: '/settings/security'
            },
            {
                text: 'Резервное копирование',
                path: '/settings/backup'
            },
            {
                text: 'Доступ к админ панели',
                path: '/settings/admin'
            },
            {
                text: 'Интеграции',
                path: '/settings/integration'
            },
        ]
    }),

    mounted () {
        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.links = messages[lang].Settings.Navbar.links;
    }
}
</script>