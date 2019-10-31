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
    column: {
        list: param => { 
            return ajax.post('column/list', param);
        },
        info: id => { 
            return ajax.post('column/info', id);
        },
        insert: param => { 
            return ajax.post('column/insert', param);
        },
        delete: id => {
            return ajax.post('column/delete', id);
        },
        update: param => { 
            return ajax.post('column/update', param);
        },
    },
    subcolumn: {
        list: param => { 
            return ajax.post('subcolumn/list', param);
        },
        info: id => { 
            return ajax.post('subcolumn/info', id);
        },
        insert: param => { 
            return ajax.post('subcolumn/insert', param);
        },
        delete: id => {
            return ajax.post('subcolumn/delete', id);
        },
        update: param => { 
            return ajax.post('subcolumn/update', param);
        },
        changeType : id => { 
            return ajax.post('subcolumn/changeType', id);
        },
    },
    content: {
        list: param => { 
            return ajax.post('content/list', param);
        },
    },

};

export default {
    install: Vue => { 
        Vue.api = api,
        Vue.prototype.$api = api
    }
}