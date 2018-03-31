export interface FaqEntry {
    question: string;
    answer: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    available: boolean;
    buyable: boolean;
    description?: string;
    faq?: FaqEntry[];
    imageUrl?: string;
}
