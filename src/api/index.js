import ajax from './axios';

let api = {
    user: {
        list: param => { 
            return ajax.post('user/list', param);
        },
        info: id => { 
            return ajax.post('user/info', id);
        },
        insert: param => { 
            return ajax.post('user/insert', param);
        },
        delete: id => {
            return ajax.post('user/delete', id);
        },
        update: param => { 
            return ajax.post('user/update', param);
        },
        changeStatus: id => {
            return ajax.post('user/changeStatus', id);
        },

    },

};

export default {
    install: Vue => { 
        Vue.api = api,
        Vue.prototype.$api = api
    }
}