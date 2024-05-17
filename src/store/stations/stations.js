import axios from 'axios';
const env = import.meta.env;

export default {
    state: {
        stations: {},
        station: {},
        globalStations: []
    },

    actions: {
        async fetchStations(context, filters) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/`;
    
                const response = await axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    },
                })
    
                const stationsData = response.data;
                context.commit('setStations', stationsData);
            }
            catch (error) {
                console.log(error);
            }
        },

        async fetchOneStation(context, params) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/dashboard/stations/${params}`;
    
                const response = await axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    },
                })
    
                const stationsData = response.data;
                context.commit('setOneStations', stationsData);
            }
            catch (error) {
                console.log(error);
            }
        },

        async fetchGlobalStation (context) {
            try {
                const url = `${env.VITE_APP_HOST_LINK}/v1/station/`;
    
                const response = await axios.get(url, {
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access')}`
                    },
                })
    
                console.log(response);
                const stationsData = response.data;
                context.commit('setGlobalStations', stationsData);
            }   
            catch (error) {
                console.log(error);
            }
        }
    },

    mutations: {
        setStations(state, stations) {
            state.stations = stations;
        },

        setOneStations(state, stations) {
            state.stations = stations;
        },

        setGlobalStations(state, stations) {
            state.globalStations = stations;
        }
    },

    getters: {
        getStations(state) {
            return state.stations;
        },

        getOneUsers(state) {
            return state.station;
        },

        getGlobalStations (state) {
            return state.globalStations;
        }
    }
}