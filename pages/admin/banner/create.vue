<template>
    <HeaderPage title="Tạo Banner"> </HeaderPage>

    <div class="form mt-3 max-width-600">
        <div>
            <div class="mb-3">
                <label for="name" class="block mb-1"
                    >Tên <span class="error">*</span></label
                >
                <InputText
                    type="text"
                    class="w-full"
                    v-model="bannerData.name"
                    id="name"
                    fluid
                />
                <small class="error" v-if="bannerDataError?.name">{{
                    bannerDataError?.name[0]
                }}</small>
            </div>

            <div class="mb-3">
                <label for="description" class="block mb-1">Mô tả</label>
                <Textarea
                    v-model="bannerData.description"
                    id="description"
                    class="w-full"
                    rows="5"
                    fluid
                />
                <small class="error" v-if="bannerDataError?.description">{{
                    bannerDataError?.description[0]
                }}</small>
            </div>

            <div class="mb-3">
                <label for="image" class="block">Ảnh</label>
                <UploadMultipleFile
                    :imgs="bannerData.images_url"
                    :filesUpload="bannerData.images"
                    @selectFiles="setSelectedFiles"
                    :hidenDelete="true"
                ></UploadMultipleFile>
                <small class="error" v-if="bannerDataError?.image">{{
                    bannerDataError?.image[0]
                }}</small>
            </div>

            <div class="mt-3 flex justify-content-between">
                <Button
                    label="Trở lại"
                    @click="back()"
                    severity="secondary"
                ></Button>
                <Button label="Lưu" @click="create()"></Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Api from '~/network/Api';
import UploadMultipleFile from '~/components/General/UploadMultipleFile.vue';
import HeaderPage from '~/components/General/HeaderPage.vue';

definePageMeta({
    layout: 'admin',
});

const bannerData = ref({
    name: '',
    description: '',
    image: null,
    images: [],
    images_url: [],
} as any);
const bannerDataError = ref({
    name: [],
    description: [],
    image: [],
});
const router = useRouter();
const toast = useToast();

const create = async () => {
    bannerData.value.image = bannerData.value.images[0];
    Api.banner
        .store(bannerData.value)
        .then((res: any) => {
            router.push('/admin/banner/');
            toast.add({
                severity: 'success',
                summary: 'Thông báo',
                detail: res.message,
                life: 3000,
            });
        })
        .catch((err: any) => {
            toast.add({
                severity: 'error',
                summary: 'Thông báo',
                detail: err.message,
                life: 3000,
            });
            if (err?.status == 422) {
                bannerDataError.value = err.errors;
            }
        });
};

const setSelectedFiles = (files: File[]) => {
    files.forEach((file: File) => {
        bannerData.value.images[0] = file;
    });
};

const back = () => {
    router.go(-1);
};
</script>

<style lang="scss" scoped>
.max-width-600 {
    max-width: 600px;
}
</style>
