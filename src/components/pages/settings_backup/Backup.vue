<template>
    <div class="backup">
        <div class="backup__container">
            <div class="backup__data">
                <h2 class="title backup__title">{{ $t('Settings.Backup.periodicity') }}</h2>
                <div class="backup__data-radiocontainer">
                    <div class="backup__radio">
                        <input type="radio" name="rb" id="rb1" checked> 
                        <label for="rb1" class="backup__label">{{ $t('Settings.Backup.everyday') }}</label>
                    </div>
                    <div class="backup__radio">
                        <input type="radio" name="rb" id="rb2" checked> 
                        <label for="rb2" class="backup__label">{{ $t('Settings.Backup.everyweek') }}</label>
                    </div>
                    <div class="backup__radio">
                        <input type="radio" name="rb" id="rb3" checked> 
                        <label for="rb3" class="backup__label">{{ $t('Settings.Backup.everymonth') }}</label>
                    </div>
                </div>
            </div>
            <div class="backup__storage">
                <h2 class="title backup__title">{{ $t('Settings.Backup.storage') }}</h2>
                <select name="Local" id="Local" class="backup__select settings-input">
                    <option value="Локальное хранилище">{{ $t('Settings.Backup.hubstorage') }}</option>
                    <option value="Облачное хранилище<">{{ $t('Settings.Backup.localstorage') }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/settings_backup/backup.scss';
</style>