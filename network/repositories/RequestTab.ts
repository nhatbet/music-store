import BaseApi from '../BaseApi';

export default () => ({
    getCreatedByMy() {
        return BaseApi.setAuth().get('request-tabs/created/by-me');
    },
    store(payload: any) {
        return BaseApi.setAuth().post('request-tabs', payload);
    },
    update(id: number, payload: any) {
        return BaseApi.setAuth().put('request-tabs/' + id, payload);
    },
    delete(id: number) {
        return BaseApi.setAuth().delete('request-tabs/' + id);
    },

    // only manage
    index(payload: any) {
        return BaseApi.setAuth().get('admin/request-tabs', payload);
    },
    updateStatus(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/request-tabs/update-status/' + id, payload);
    },
    updateReceiver(id: number, payload: any) {
        return BaseApi.setAuth().post('admin/request-tabs/update-receiver/' + id, payload);
    },
    adminDelete(id: number) {
        return BaseApi.setAuth().delete('admin/request-tabs/' + id);
    },
});
