type Selection = {
    categories: Item[];
    user_status: Item[];
    user_role: Item[];
    user_gender: Item[];
    request_tab_status: Item[];
    order_status: Item[];
    article_status: Item[];
    article_types: Item[];
};

type Item = {
    label: string;
    value: number;
    description: string;
};

export type { Selection, Item };
