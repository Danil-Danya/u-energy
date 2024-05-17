<template>
    <div class="admin__list">
        <div class="admin__list-container">
            <button class="admin__list-button" @click="toggleIsShow">{{ $t('Settings.AdminPanel.addStuff') }}</button>
            <div class="admin__list-table-header">
                <div class="admin__list-table-header-item" :class="`admin__list-table-header-${key}`" v-for="(user, key) in userList" :key="user">
                    <h2 class="title admin__list-title">{{ user }}</h2>
                </div>
            </div>
            <div class="admin__list-table">
                <div class="admin__list-table-item" v-for="item in getStaff.results">
                    <div class="admin__list-table-name">
                        <img src="@/assets/images/icons/settings/user.svg" alt="User" class="admin__list-avatar">
                        <p class="admin__list-text">{{item.first_name}} {{item.last_name}}</p>
                    </div>
                    <div class="admin__list-table-login">
                        <p class="admin__list-text">+998909999999</p>
                    </div>
                    <div class="admin__list-table-password">
                        <p class="admin__list-text">*************</p>
                    </div>
                    <div class="admin__list-table-device">
                        <p class="admin__list-text">Windows 10 Pro 1020h</p>
                    </div>
                    <div class="admin__list-table-time">
                        <p class="admin__list-text">15 минут назад</p>
                    </div>
                    <div class="admin__list-table-action">
                        <label class="switch">
                            <input type="checkbox" checked>
                            <span class="slider round"></span>
                        </label>
                        <!-- <span class="admin__list-line"></span> -->
                        <img src="@/assets/images/icons/settings/edit.svg" alt="Edit" class="admin__list-edit">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <AddStuffPopup :isShow="isShow" @toggleIsShow="toggleIsShow" />
    </div>
</template>

<script>
//import userList from '@/state/allAdminData.json';
import AddStuffPopup from '@/components/reused/popup/AddStuffPopup.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        userList: {},
        isShow: false
    }),

    components: {
        AddStuffPopup
    },

    computed: {
        ...mapGetters(['getStaff']),
    },
    
    methods: {
        ...mapActions(['fetchStaff']),

        toggleIsShow () {
            this.isShow = !this.isShow;
        }
    },

    async mounted () {
        await this.fetchStaff();
        console.log(this.getStaff);
        
        const lang = localStorage.getItem('locale');
        this.userList = this.$i18n.messages[lang].Settings.AdminPanel.allAdmin;
    }
}

</script>