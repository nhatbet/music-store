<template>
    <a class="tab border-1 surface-border surface-card flex flex-column">
        <div class="surface-50 flex justify-content-center tab-image">
            <BackgroundImageCommon
                :src="
                    item?.images_url?.[0]?.url ||
                    'https://primefaces.org/cdn/primevue/images/product/bamboo-watch.jpg'
                "
            ></BackgroundImageCommon>
        </div>
        <div class="pt-2 gap-1 flex flex-column tab-content">
            <div>
                <div class="text-lg font-medium text-900">
                    {{ item.name }}
                </div>
            </div>
            <div class="flex flex-column gap-2">
                <div class="flex align-items-center justify-content-between">
                    <DisplayRateStars :stars="item?.rating"></DisplayRateStars>
                    <span class="font-semibold text-700 price"
                        >Giá: {{ formatNumberWithCommas(item.price) }} Vnd</span
                    >
                </div>
                <div
                    class="flex justify-content-between gap-2 align-items-center"
                >
                    <div class="avatar-info">
                        <AvatarCommon
                            v-tooltip="item.user.name"
                            :name="item.user.name"
                            :src="item.user?.avatar?.url"
                        />
                    </div>
                    <Button
                        icon="pi pi-arrow-right"
                        label="Xem thêm"
                        class="custom p-1"
                        @click="gotoDetail(item.id)"
                    ></Button>
                </div>
            </div>
        </div>
    </a>
</template>

<script setup lang="ts">
import { formatNumberWithCommas } from '#build/imports';
import { useRouter } from 'vue-router';
import AvatarCommon from './AvatarCommon.vue';
import DisplayRateStars from './DisplayRateStars.vue';
import BackgroundImageCommon from './BackgroundImageCommon.vue';

const props = defineProps({
    classes: {
        type: [String, Array, Object],
        default: '',
    },
    item: {
        type: [Object],
        required: true,
    },
});

const router = useRouter();
const gotoDetail = async (id: number) => {
    router.push('/tab/' + id);
};
</script>

<style lang="scss" scoped>
.tab-content {
    padding: 10px;
}
.detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab {
    border-radius: 3px;
}
.tab-image {
    max-height: 250px;
    overflow: hidden;
    border-radius: 3px 3px 0px 0px;
}

.avatar-info {
    width: 30px;
    height: 30px;
}

.price {
    color: var(--color-2);
}
</style>
