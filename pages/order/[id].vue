<template>
    <div class="cart my-5 pb-5">
        <h2>Thanh toán đơn hàng</h2>
        <DataTable :value="items" dataKey="id" tableStyle="min-width: 50rem">
            <Column field="name" header="Tên">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>
            <Column header="Ảnh">
                <template #body="slotProps">
                    <img
                        src="https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg"
                        class="w-6rem border-round"
                    />
                </template>
            </Column>
            <Column field="price" header="Giá">
                <template #body="slotProps">
                    {{ slotProps.data.price }} VND
                </template>
            </Column>

            <template #footer>
                <div class="mb-3">
                    <div>
                        Tổng số tiền cần chuyển khoản là: {{ totalPrice }} Vnd
                    </div>
                    <div class="tutorial-link" @click="gotoTutorial()">
                        Click để xem chi tiết hướng dẫn thanh toán
                    </div>
                </div>

                <div class="footer">
                    <div class="quantity">
                        <div>
                            <div class="mb-3">
                                <label class="block mb-2" for=""
                                    >Ảnh chụp bill chuyển khoản
                                </label>
                                <div class="mb-3" v-if="imageUrl">
                                    <img
                                        :src="imageUrl"
                                        alt="Uploaded Image"
                                        style="max-width: 300px"
                                    />
                                </div>
                                <ImageUploader
                                    label="Tải ảnh bill chuyển khoản"
                                    collection="avatar"
                                    @upload="handleUpload"
                                ></ImageUploader>
                            </div>
                            <div>
                                <label class="block mb-2" for=""
                                    >Ghi chú <span class="error">*</span></label
                                >
                                <Textarea v-model="note" rows="5" cols="30" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            label="Gửi yêu cầu thanh toán"
                            class="custom"
                            @click="createOrder"
                        ></Button>
                    </div>
                </div>
            </template>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Api from '~/network/Api';
import { useToast } from 'primevue/usetoast';
import ImageUploader from '~/components/General/ImageUploader.vue';

const toast = useToast();
const totalPrice = ref(0);
const route = useRoute();
var ids = route.query.ids;
if (typeof ids == 'string') {
    ids = [ids];
}
const note = ref('');
const imageUrl = ref();
const bill = ref();

const items = ref([]);
onMounted(async () => {
    await getTabs();
});
const handleUpload = (file: any) => {
    imageUrl.value = URL.createObjectURL(file);
    bill.value = file;
};
const getTabs = async () => {
    await Api.tab
        .getTabByIds({ ids: ids })
        .then((res: any) => {
            items.value = res.data;
            totalPrice.value = items.value.reduce(
                (total, i: any) => total + i.price,
                0,
            );
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const createOrder = async () => {
    await Api.order
        .store({
            tab_ids: ids,
            note: note.value,
            bill: bill.value,
        })
        .then((res: any) => {
            console.log('res', res);
        })
        .catch((err: any) => {
            console.log(err);
        });
};

const gotoTutorial = () => {
    window.open('/tutorial', '_blank');
};
</script>

<style scoped lang="scss">
.footer {
    display: flex;
    justify-content: space-between;
    align-items: end;
}
.cart {
    min-height: 70vh;
}
.tutorial-link {
    border-bottom: 1px solid black;
    cursor: pointer;
}
</style>
