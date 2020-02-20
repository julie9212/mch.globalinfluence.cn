import ajax from './axios';

let api = {
    common: {
        login: param => {
            return ajax.post('common/login', param);
        },
        loginInfo: () => { 
            return ajax.post('common/loginInfo');
        },
        out: () => { 
            return ajax.post('common/out');
        },
    },
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
        passup: param => {
            return ajax.post('user/passup', param);
        },
        collectInfo: id => {
            return ajax.post('user/collectInfo', id);
        },
        downloadInfo: id => {
            return ajax.post('user/downloadInfo', id);
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
        changeType: id => {
            return ajax.post('column/changeType', id);
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
    listcontent: {
        list: param => { 
            return ajax.post('listcontent/list', param);
        },
        info: id => { 
            return ajax.post('listcontent/info', id);
        },
        delete: id => {
            return ajax.post('listcontent/delete', id);
        },
        update: param => { 
            return ajax.post('listcontent/update', param);
        },
        changeExamine : id => { 
            return ajax.post('listcontent/changeExamine', id);
        },
    },
    content: {
        list: param => { 
            return ajax.post('content/list', param);
        },
        insert: param => { 
            return ajax.post('content/insert', param);
        },
        update: param => { 
            return ajax.post('content/update', param);
        },
    },
    examine: {
        list: param => { 
            return ajax.post('examine/list', param);
        },
        delete: id => {
            return ajax.post('examine/delete', id);
        },
       examine: param => { 
            return ajax.post('examine/examine', param);
        },
    },
    meeting: {
        list: param => { 
            return ajax.post('meeting/list', param);
        },
       examine: param => { 
            return ajax.post('meeting/examine', param);
        },
    },
    ad: {
        list: param => { 
            return ajax.post('ad/list', param);
        },
        info: id => { 
            return ajax.post('ad/info', id);
        },
        insert: param => { 
            return ajax.post('ad/insert', param);
        },
        delete: id => {
            return ajax.post('ad/delete', id);
        },
        update: param => { 
            return ajax.post('ad/update', param);
        },
    },
    application: {
        list: param => { 
            return ajax.post('application/list', param);
        },
        delete: id => {
            return ajax.post('application/delete', id);
        },
        info: id => { 
            return ajax.post('application/info', id);
        },
        examine: param => { 
            return ajax.post('application/examine', param);
        },
    },
    admininfo: {
        list: param => { 
            return ajax.post('admininfo/list', param);
        },
        passupdate: param => { 
            return ajax.post('admininfo/passupdate', param);
        },
        update: param => { 
            return ajax.post('admininfo/update', param);
        },
    },

};

export default {
    install: Vue => { 
        Vue.api = api,
        Vue.prototype.$api = api
    }
}