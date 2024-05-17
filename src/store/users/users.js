import axios from 'axios';
const env = import.meta.env;

export default {
    state: {
        users: {},
        user: {}
    },

    actions: {
        async fetchUsers (context, filters) {
            const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/users/`;

            const response = await axios.get(url, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
                params: filters ? filters : ''
            })

            const usersData = response.data;
            context.commit('setUsers', usersData);
        },

        async fetchOneUser (context, id) {
            const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/users/${id}`;

            const response = await axios.get(url, {
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                },
            })

            const usersData = response.data;
            context.commit('setUser', usersData);
        }
    },

    mutations: {
        setUsers (state, users) {
            state.users = users;
        },

        setUser (state, user) {
            state.user = user;
        }
    },

    getters: {
        getUsers (state) {
            return state.users;
        },

        getUser (state) {
            return state.user;
        }
    }
}