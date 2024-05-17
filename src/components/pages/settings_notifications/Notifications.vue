<template>
    <div class="notification">
        <div class="notification__container">
            <div class="notification__item" v-for="item in list" :key="item">
                <h2 class="title notification__title">{{ item.title }}</h2>
                <textarea type="text" class="settings-textarea notification__textarea" :placeholder="$t('Settings.Notifications.printHere')" v-model="item.input"></textarea>
                <div class="notification__button-container">
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                    <button class="trash">
                        <img src="@/assets/images/icons/settings/delete.svg" alt="Trash" class="trash__icon">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/settings_notifications/notifications.scss';
</style>

<script>
export default {
    data: () => ({
        list: [
            {
                title: 'О пополнении баланса',
            },
            {
                title: 'ЦО начале/окончании зарядки',
            },
            {
                title: 'О низком балансе',
            },
        ]
    }),

    mounted () {
        this.list[0].title = this.$t('Settings.Notifications.balanceReplenishment');
        this.list[1].title = this.$t('Settings.Notifications.startOrAndCherge');
        this.list[2].title = this.$t('Settings.Notifications.lowBalance');
    }
}
</script>