<template>
    <div class="downtime">
        <div class="downtime__container">
            <h2 class="title downtime__title-list">{{ $t('Settings.Downtime.titleDowntime') }}</h2>
            <div class="downtime__easy-item downtime__item" v-for="item in list" :key="item">
                <h2 class="title downtime__title">{{ item.title }}</h2>
                <input type="text" class="settings-input downtime__input" v-model="item.input">
                <div class="downtime__button-container">
                    <label class="switch">
                        <input type="checkbox" checked>
                        <span class="slider round"></span>
                    </label>
                    <button class="trash">
                        <img src="@/assets/images/icons/settings/delete.svg" alt="Trash" class="trash__icon">
                    </button>
                </div>
            </div>
            <h2 class="title downtime__title-list">{{ $t('Settings.Downtime.titlePark') }}</h2>
            <div class="downtime__park-item downtime__item" v-for="item in list" :key="item">
                <h2 class="title downtime__title">{{ item.title }}</h2>
                <input type="text" class="settings-input downtime__input" v-model="item.input">
                <div class="downtime__button-container">
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
@import '@/assets/styles/pages/sttings_down_time/downtime.scss'
</style>

<script>
export default {
    data: () => ({
        list: [
            {
                title: 'Цена за час',
                input: '25,000'
            },
            {
                title: 'Цена за первые 10 минут',
                input: '5,000'
            },
        ]
    }),

    mounted () {
        this.list[0].title = this.$t('Settings.Downtime.pricePerHour');
        this.list[1].title = this.$t('Settings.Downtime.priceForTenMin');
    }
}
</script>