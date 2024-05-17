<template>
    <div class="drag">
        <label for="drag-input" class="title">{{ $t('Settings.All.logo') }}</label>
        <div class="drag-input-container">
            <input type="file" class="drag-input" id="drag-input">
            <p class="drag-text">{{ $t('Settings.All.uploadLogo') }}</p>
            <img src="@/assets/images/icons/settings/upload.svg" alt="Icon" class="drag-img">
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_all/drag.scss';
</style>