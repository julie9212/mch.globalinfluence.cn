// 缓存
export default {

    // ===========================sessionStorage 设置缓存==================================
    /**
     * session设置缓存
     * @param {string} name 
     * @param {array} data 
     */
    sessionSet(name, data) { 
        this.sessionRemove(name)
        sessionStorage.setItem(name, JSON.stringify(data));
    },

    /**
     * session 获取缓存
     * @param {string} name 
     */
    sessionGet(name) { 
        return JSON.parse(sessionStorage.getItem(name));
    },

    /**
     * session 删除缓存
     * @param {string} name 
     */
    sessionRemove(name) { 
        sessionStorage.removeItem(name);
    },

    // ===========================localStorage 设置缓存==================================

    /**
     * local设置缓存
     * @param {string} name 
     * @param {array} data 
     */
    localSet(name, data) {
        this.localRemove(name)
        localStorage.setItem(name, JSON.stringify(data));
    },

    /**
     * local 获取缓存
     * @param {string} name 
     */
    localGet(name) {
        return JSON.parse(localStorage.getItem(name));
    },

    /**
     * local 删除缓存
     * @param {string} name 
     */
    localRemove(name) {
        localStorage.removeItem(name);
    },


};