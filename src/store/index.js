import { createStore } from 'vuex';

import users from './users/users';
import stations from './stations/stations';
import tariffs from './tarifs/tariffs';
import staff from './staff/staff';
import total from './total/total';

export default createStore({
    modules: {
        users,
        stations,
        tariffs,
        total,
        staff,
    }
})