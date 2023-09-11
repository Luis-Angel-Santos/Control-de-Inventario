import { CategoryElement } from "./category-element";

export interface ProductElement {
    id: number;
    name: string;
    price: number;
    quantity: number;
    category: CategoryElement;
    image: any;
}
