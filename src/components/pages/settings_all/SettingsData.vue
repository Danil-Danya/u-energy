<template>
    <div class="data">
        <div class="data__container">
            <div class="data__item" v-for="list in dataLists" :key="list">
                <h2 class="title data__title">{{ list.title }}</h2>
                <input :type="list.type" class="settings-input">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_all/data.scss';
</style>

<script>
export default {
    data: () => ({
        dataLists: [
            {
                title: 'Телефон',
                type: 'number'
            },
            {
                title: 'Email',
                type: 'mail'
            },
            {
                title: 'Адрес',
                type: 'text'
            },
            {
                title: 'Instagram',
                type: 'text'
            },
            {
                title: 'Telegram',
                type: 'text'
            },
            {
                title: 'YouTube',
                type: 'text'
            },
        ]
    }),

    mounted () {
        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.dataLists = messages[lang].Settings.All.dataLists;
    }
}

</script>