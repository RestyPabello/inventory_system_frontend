
export interface Item {
    item_id: number;
    item_name: string;
    item_brand: string;
    unit_name: string;
    category_name: string;
    image: string | null;
    description: string | null;
    price: number;
    quantity: number;
    status: string;
    expires_at: string | null;
    purchased_at: string | null;
}

// export interface CardItem {
//   id: string | number;
//   [key: string]: any;
// }
