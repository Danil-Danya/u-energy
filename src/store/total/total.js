import axios from "axios";

const env = import.meta.env;

export default {
    state: {
        total: []
    },

    actions: {
        async fetchTotal (context) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stats/`;

                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/json',
                        //'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                })

                const totalData = response.data;
                context.commit('setTotal', totalData);
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        setTotal (state, total) {
            state.total = total;
        }
    },

    getters: {
        getTotal (state) {
            return state.total;
        }
    }
}