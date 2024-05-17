<template>
    <div class="clients__table">
        <div class="clients__head">
            <p class="clients__head-text" :class="`clients__head-${key}`" v-for="(name, key) of list" :key="name">
                {{ name.toUpperCase() }}
            </p>
        </div>
        <div class="clients__table-item" v-if="usersLength > 0">
            <div class="clients__table-item-info" v-for="(client, index) in getUsers.results" :key="client">
                <div class="clients__table-item-numeration">
                    <p class="clients__table-text">{{ index + 1 }}</p>
                </div>
                <div class="clients__table-item-avatar">
                    <img :src="require('@/assets/images/static/clients/default-avatar.jpg')" alt="Avatar" class="clients__table-item-avatar-img">
                </div>
                <div class="clients__table-item-name">
                    <router-link :to="`/clients/user-menagement?user_id=${client.id}`">
                        <p class="clients__table-text">{{ client.first_name }} {{ client.last_name }}</p>
                    </router-link>
                </div>
                <div class="clients__table-item-phone">
                    <a :href="`tel:${client.tel}`" class="clients__table-text">{{ client.phone_number }}</a>
                </div>
                <div class="clients__table-item-email">
                    <a :href="`mailto:${client.email}`" class="clients__table-text">{{ client.email }}</a>
                </div>
                <div class="clients__table-item-balance">
                    <p class="clients__table-text">{{ client.balance }}</p>
                </div>
                <div class="clients__table-item-history">
                    <p class="clients__table-text clients__table-history">{{ client.history }}</p>
                </div>
                <!-- <div class="clients__table-item-method-replenishment">
                    <img :src="client.method_replenishment" alt="Payment Method" class="clients__table-item-method-replenishment-img">
                </div> -->
                <div class="clients__table-item-date">
                    <p class="clients__table-text">{{ client.created_at }}</p>
                </div>
                <div class="clients__table-item-action">
                    <img src="@/assets/images/icons/clients/action.svg" alt="Action" class="clients__table-item-action-img">
                </div>
            </div>
        </div>
        <Preloader v-else/>
        <button class="clients__button" @click="page--">{{ $t('Analytics.Clients.back') }}</button>
        <button class="clients__button" @click="page=1">1</button>
        <button class="clients__button" @click="page=getUsers.total_pages" v-if="usersLength > size">
            {{getUsers.total_pages}}
        </button>
        <button class="clients__button" @click="page++">{{ $t('Analytics.Clients.next') }}</button>
    </div>
</template>

<script>
import allClientData from '@/state/allClientData.json';
import Preloader from '../preloaders/Preloader.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        list: allClientData,
        size: 10,
        page: 1,
        usersLength: 0,
        clientsData : [{
            "name": "John London",
            "phone": "+998909999999",
            "email": "john@example.com",
            "balance": '10,00,000 сум',
            "history": '+1.000.000 сум',
            "method_replenishment": require('@/assets/images/icons/clients/payment.png'),
            "date_and_time": "2024-04-12",
            "action": require('@/assets/images/icons/clients/action.svg'),
            "avatar": require('@/assets/images/static/clients/default-avatar.jpg'),
        }],
    }),

    props: {
        search: String
    },

    components: {
        Preloader
    },

    computed: {
        ...mapGetters(['getUsers'])
    },

    methods: {
        ...mapActions(['fetchUsers']),

        async fetchClientUsers () {
            const filters = {
                page: this.page,
                size: this.size,
                search: this.search
            }

            await this.fetchUsers(filters);
        }
    },

    watch: {
        'page': {
            async handler () {
                this.getUsers.results = undefined;

                if (this.page < 1)
                    this.page = 1;

                if (this.page > this.getUsers.total_pages) 
                    this.page = this.getUsers.total_pages;

                await this.fetchClientUsers();
            },
            deep: true
        },
        'search': {
            async handler () {
                await this.fetchClientUsers();
            },
            deep: true
        }
    },

    async mounted () {
        await this.fetchClientUsers();
        this.usersLength = this.getUsers.results.length;

        const messages = this.$i18n.messages;
        const lang = localStorage.getItem('locale');
        
        this.list = messages[lang].Analytics.Clients.clients;
    }
}

</script>