<template>
    <div class="promotions">
        <div class="promotions__container">
            <div class="promotions__item">
                <h2 class="title promotions__title">{{ $t('Settings.Promotions.firstCharge') }}</h2>
                <input type="text" class="settings-input">
                <div class="promotions__button-container">
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
@import '@/assets/styles/pages/settings_promotions_and_discounts/promotions.scss';
</style>

<script>
export default {
    data: () => ({
        // list: [
        //     {
        //         title: 'Скидка на первую зарядку',
        //         input: '10%'
        //     },
        //     {
        //         title: 'Скидка на первую зарядку',
        //         input: '10%'
        //     },
        // ]
    }),
}

</script>