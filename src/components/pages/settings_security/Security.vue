<template>
    <div class="security">
        <div class="security__container">
            <div class="security__item">
                <h2 class="title security__title"> {{ $t('Settings.Security.privacyPolicy') }} </h2>
                <textarea type="text" class="settings-textarea security__textarea" :placeholder="$t('Settings.Security.printHere')"></textarea>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/settings_security/security.scss';
</style>