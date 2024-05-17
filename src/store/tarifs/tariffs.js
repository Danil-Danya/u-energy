import axios from "axios";

const env = import.meta.env;

export default {
    state: {
        tariffs: []
    },

    actions: {
        async fetchTariffs (context) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/common/tariff/`;

                const response = await axios.get(url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    }
                })

                const tariffsData = response.data.results;
                context.commit('setTariffs', tariffsData);
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        setTariffs (state, tariffs) {
            state.tariffs = tariffs;
        }
    },

    getters: {
        getTariffs (state) {
            return state.tariffs;
        }
    }
}