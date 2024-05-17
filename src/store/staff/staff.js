import axios from "axios";

const env = import.meta.env;

export default {
    state: {
        staff: []
    },

    actions: {
        async fetchStaff (context, params) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/staff/`;
                console.log(url);

                const response = await axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    },
                    params
                });

                
                console.log(response);
                const staffData = response.data;
                context.commit('setStaff', staffData);
            }
            catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        setStaff (state, staff) {
            state.staff = staff;
        }
    },

    getters: {
        getStaff (state) {
            return state.staff;
        }
    }
}