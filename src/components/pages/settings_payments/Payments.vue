<template>
    <div class="payments__container">
        <div class="payments__way">
            <h2 class="title payments__title">{{ $t('Settings.Payments.method') }}</h2>
            <div class="payments__item-container">
                <div class="payments__item" v-for="image in images" :key="image">
                    <img :src="image" alt="Payments" class="payments__img">
                </div>
            </div>
        </div>
        <div class="payments__price-container">
            <h2 class="title payments__title">{{ $t('Settings.Payments.minSumm') }}</h2>
            <input type="text" class="settings-input">
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_payme/payme.scss';
</style>

<script>

export default {
    data: () => ({
        images: [
            require('@/assets/images/icons/settings/payme.svg'),
            require('@/assets/images/icons/settings/click.svg'),
            require('@/assets/images/icons/settings/uzumbank.svg'),
        ]
    })
}

</script>