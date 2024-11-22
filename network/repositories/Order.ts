import BaseApi from '~/network/BaseApi';

export default () => ({
    store(payload: any) {
        return BaseApi.setAuth().post('orders', payload);
    },

    show(id: number) {
        return BaseApi.setAuth().get('orders/', id);
    },

    getMyOrder() {
        return BaseApi.setAuth().get('orders/created-by-me');
    },
});
