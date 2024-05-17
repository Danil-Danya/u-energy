<template>
    <div class="integrations">
        <div class="integrations__container">
            <div class="integrations__item">
                <h2 class="title integrations__title">API</h2>
                <div class="integrations__input-container">
                    <img src="@/assets/images/icons/settings/copy.svg" alt="Icon" class="integrations__input-icon">
                    <input type="text" class="settings-input integrations__input" v-model="api_key">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_integrations/integrations.scss';
</style>

<script>

export default {
    data: () => ({
        api_key: 'sk_your_api_key_1234567890abcdefgh'
    })
}

</script>