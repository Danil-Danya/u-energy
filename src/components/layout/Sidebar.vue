<template>
    <aside class="sidebar">
        <div class="sidebar__container">
            <div class="sidebar__content">
                <div class="sidebar__logo">
                    <router-link to="/dashboard">
                        <img src="@/assets/images/static/sidebar/logo.png" alt="Logo" class="sidear__logo-img">
                    </router-link>
                </div>
                <div class="sidebar__navigation">
                    <ul class="sidebar__navigation-ul">
                        <li v-for="(link, index) in links" :key="link">
                            <router-link :to="link.path" class="sidebar-link">
                                <img :src="linkIcon[index]" alt="Icon" class="sidebar__icon">
                                <p class="sidebar__text">{{ link.text }}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>

export default {
    data: () => ({
        links: [],
        linkIcon: [
            require("@/assets/images/icons/sidebar/dashboard.svg",),
            require("@/assets/images/icons/sidebar/analitics.svg"),
            require("@/assets/images/icons/sidebar/client-base.svg"),
            require("@/assets/images/icons/sidebar/station-controle.svg"),
            require("@/assets/images/icons/sidebar/settings.svg"),
        ]
    }),

    mounted () {
        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.links = messages[lang].Sidebar.links;
    }
}

</script>