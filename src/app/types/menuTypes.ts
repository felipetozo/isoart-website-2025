// types/menuTypes.ts

export interface SubProduct {
    id: number;
    name: string;
    slug: string;
    description: string;
    image: string;
}

export interface MenuItem {
    id: number;
    title: string;
    slug: string;
    description: string;
    image: string;
    link: string;
    subproducts: SubProduct[];
}

export type MenuData = MenuItem[];