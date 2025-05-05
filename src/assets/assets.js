/**************** asset folder inserted all images and icons for EsaltareDekor ****************/

/* Importe For all Images And Icons */
import ED_logo from './ED_logo.png';

import SliderImage1 from './Slider1.png';
import SliderImage2 from './Slider1.png';
import SliderImage3 from './Slider1.png';

import Deal from './Deal.jpg';
import Deal1 from './Deal1.jpg';
import Deal2 from './Deal2.jpg';
import Deal3 from './Deal3.jpg';
import Deal4 from './Deal4.jpg';

import Category1 from './Storage.png';
import Category2 from './Kitchen.png';
import Category3 from './Lighting.png';
import Category4 from './HomeDecor.png';
import Category5 from './Furniture.png';

import Product1 from './Product1.png';


import Sale1 from './Sale1.jpg';


import brand1 from './B1.png';
import brand2 from './B2.png';
import brand3 from './B3.png';
import brand4 from './B4.png';


import producta1 from './producta1.png';
import producta2 from './producta2.png';
import producta3 from './producta3.png';

import AuthLogo from './auth.png';

import order1 from './order1.png';

/* Export For all Images And Icons in object Format */

export const assets = {
    ED_logo,
}
export const Slider_Images = {
    SliderImage1,
    SliderImage2,
    SliderImage3,
}
export const Deals = {
    Deal,
    Deal1,
    Deal2,
    Deal3,
    Deal4,
}
export const Sale = {
    Sale1,
}

/**********************************/
export const NewArrivals = [
    {
        id: 1,
        category: "Furniture",
        title: "Ziad Cahir",
        price: "5264",
        originalPrice: "589645",
        image: Deal1,
        slug: "4568-chair-crafted-from-1",
        images: [Deal1, Deal2, Deal3],
        rating: 4.7,
        ratingsCount: 98,
        discount: 15,
        saved: 3013,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 2,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-2",
        images: [Deal2, Deal3, Deal4],
        rating: 4.5,
        ratingsCount: 110,
        discount: 21,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 3,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-3",
        images: [Deal2, Deal1, Deal4],
        rating: 4.6,
        ratingsCount: 125,
        discount: 22,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 4,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal3,
        slug: "accent-chair-crafted-from-4",
        images: [Deal3, Deal2, Deal2],
        rating: 4.4,
        ratingsCount: 89,
        discount: 20,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 5,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "14537",
        image: Deal1,
        slug: "accent-chair-crafted-from-5",
        images: [Deal1, Deal3, Deal4],
        rating: 4.8,
        ratingsCount: 102,
        discount: 17,
        saved: 3013,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 6,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-6",
        images: [Deal2, Deal3, Deal2],
        rating: 4.2,
        ratingsCount: 76,
        discount: 25,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 7,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-7",
        images: [Deal2, Deal1, Deal3],
        rating: 4.3,
        ratingsCount: 95,
        discount: 19,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 8,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal3,
        slug: "accent-chair-crafted-from-8",
        images: [Deal3, Deal4, Deal2],
        rating: 4.5,
        ratingsCount: 120,
        discount: 20,
        saved: 5000,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    }
];
/**********************************/
export const SimilarProducts = [
    {
        id: 1,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "14537",
        image: Deal1,
        slug: "accent-chair-crafted-from-1",
    },
    {
        id: 2,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-2",
    },
    {
        id: 3,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-3",
    },
    {
        id: 4,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal3,
        slug: "accent-chair-crafted-from-4",
    },
    {
        id: 5,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "14537",
        image: Deal1,
        slug: "accent-chair-crafted-from-5",
    },
    {
        id: 6,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-6",
    },
    {
        id: 7,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal2,
        slug: "accent-chair-crafted-from-7",
    },
    {
        id: 8,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "23550",
        image: Deal3,
        slug: "accent-chair-crafted-from-8",
    }
];

export const products = [
    {
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "14537",
        image: Product1,
        slug: "accent-chair-1"
    },
    {
        category: "Furniture",
        title: "Wooden coffee table",
        price: "5000",
        originalPrice: "4500",
        image: Product1,
        slug: "wooden-coffee-table"
    },
    {
        category: "Electronics",
        title: "LED television 55 inch",
        price: "12000",
        originalPrice: "15000",
        image: Product1,
        slug: "led-television-55"
    },
    {
        category: "Home Appliances",
        title: "Washing machine",
        price: "7500",
        originalPrice: "8500",
        image: Product1,
        slug: "washing-machine"
    },
    {
        category: "Furniture",
        title: "Modern office desk",
        price: "7000",
        originalPrice: "6500",
        image: Product1,
        slug: "modern-office-desk"
    }
];


export const Auth_Logo = {
    AuthLogo,
}

export const categories = [
    { title: "Storage", image: Category1 },
    { title: "Kitchen", image: Category2 },
    { title: "Lighting", image: Category3 },
    { title: "HomeDecor", image: Category4 },
    { title: "Furniture", image: Category5 },
];

export const brands = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand4,
    brand3,
    brand2,
    brand1,
];







export const ProductCategory = [
    {
        id: 1,
        category: "Furniture",
        title: "Accent chair crafted from",
        price: "18550",
        originalPrice: "14537",
        image: Deal1,
        slug: "accent-chair-crafted-from-1",
        rating: 4.7,
        ratingsCount: 98,
        discount: 15,
        saved: 3013,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Hand-crafted from premium materials",
            "Ergonomic design with lumbar support",
            "Limited edition"
        ]
    },
    {
        id: 2,
        category: "Kitchen",
        title: "Modern Kitchen Island",
        price: "10500",
        originalPrice: "13000",
        image: Deal2,
        slug: "accent-chair-crafted-from-2",
        rating: 4.2,
        ratingsCount: 72,
        discount: 19,
        saved: 2500,
        deliveryNote: "Delivered within 7 business days",
        description: [
            "Made of solid wood and steel",
            "Large storage space",
            "Rustic design"
        ]
    },
    {
        id: 3,
        category: "Lighting",
        title: "Pendant Lighting Fixture",
        price: "5200",
        originalPrice: "6400",
        image: Deal3,
        slug: "accent-chair-crafted-from-3",
        rating: 4.5,
        ratingsCount: 56,
        discount: 19,
        saved: 1200,
        deliveryNote: "Delivered within 3 business days",
        description: [
            "Energy-efficient LED lighting",
            "Sleek, modern design",
            "Perfect for dining areas"
        ]
    },
    {
        id: 4,
        category: "Furniture",
        title: "Wooden Coffee Table",
        price: "2999",
        originalPrice: "3899",
        image: Deal1,
        slug: "accent-chair-crafted-from-4",
        rating: 4.0,
        ratingsCount: 43,
        discount: 23,
        saved: 900,
        deliveryNote: "Delivered within 6 business days",
        description: [
            "Solid wood construction",
            "Modern and minimalistic design",
            "Easy to assemble"
        ]
    },
    {
        id: 5,
        category: "Home Decor",
        title: "Vintage Wall Clock",
        price: "1200",
        originalPrice: "1500",
        image: Deal2,
        slug: "accent-chair-crafted-from-5",
        rating: 4.8,
        ratingsCount: 120,
        discount: 20,
        saved: 300,
        deliveryNote: "Delivered within 4 business days",
        description: [
            "Classic design",
            "Silent movement",
            "Perfect for living rooms"
        ]
    },
    {
        id: 6,
        category: "Storage",
        title: "Storage Shelf Unit",
        price: "1800",
        originalPrice: "2200",
        image: Deal3,
        slug: "storage-shelf-unit-6",
        rating: 4.6,
        ratingsCount: 85,
        discount: 18,
        saved: 400,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Steel frame with wooden shelves",
            "Perfect for organizing",
            "Sturdy and durable"
        ]
    },
    {
        id: 7,
        category: "Lighting",
        title: "Desk Lamp",
        price: "1500",
        originalPrice: "2000",
        image: Deal1,
        slug: "accent-chair-crafted-from-7",
        rating: 4.3,
        ratingsCount: 59,
        discount: 25,
        saved: 500,
        deliveryNote: "Delivered within 2 business days",
        description: [
            "Adjustable height and brightness",
            "Sleek and modern",
            "Ideal for home offices"
        ]
    },
    {
        id: 8,
        category: "Kitchen",
        title: "Stainless Steel Cookware Set",
        price: "3200",
        originalPrice: "3800",
        image: Deal2,
        slug: "accent-chair-crafted-from-8",
        rating: 4.5,
        ratingsCount: 92,
        discount: 16,
        saved: 600,
        deliveryNote: "Delivered within 8 business days",
        description: [
            "Non-stick surface",
            "Durable stainless steel",
            "Oven safe"
        ]
    },
    {
        id: 9,
        category: "Furniture",
        title: "Wooden Dining Table",
        price: "7500",
        originalPrice: "8500",
        image: Deal3,
        slug: "accent-chair-crafted-from-9",
        rating: 4.9,
        ratingsCount: 200,
        discount: 12,
        saved: 1000,
        deliveryNote: "Delivered within 7 business days",
        description: [
            "Solid wood construction",
            "Seats 6 people comfortably",
            "Stylish and timeless"
        ]
    },
    {
        id: 10,
        category: "Storage",
        title: "Plastic Storage Bins (Set of 3)",
        price: "900",
        originalPrice: "1200",
        image: Deal1,
        slug: "accent-chair-crafted-from-10",
        rating: 4.2,
        ratingsCount: 45,
        discount: 25,
        saved: 300,
        deliveryNote: "Delivered within 4 business days",
        description: [
            "Durable and stackable",
            "Great for organizing",
            "Easy to label"
        ]
    },
    {
        id: 11,
        category: "Home Decor",
        title: "Decorative Throw Blanket",
        price: "1500",
        originalPrice: "1800",
        image: Deal2,
        slug: "accent-chair-crafted-from-11",
        rating: 4.7,
        ratingsCount: 60,
        discount: 17,
        saved: 300,
        deliveryNote: "Delivered within 3 business days",
        description: [
            "Soft and cozy",
            "Perfect for chilly evenings",
            "Elegant design"
        ]
    },
    {
        id: 12,
        category: "Lighting",
        title: "LED Ceiling Lights",
        price: "2500",
        originalPrice: "3000",
        image: Deal3,
        slug: "accent-chair-crafted-from-12",
        rating: 4.4,
        ratingsCount: 80,
        discount: 17,
        saved: 500,
        deliveryNote: "Delivered within 5 business days",
        description: [
            "Energy-efficient LED bulbs",
            "Stylish design",
            "Perfect for living rooms"
        ]
    }
];


export const productDataCart = {
    title: "Corner sofa made of beech wood and linen fabric",
    rating: 4.7,
    ratingsCount: 3,
    price: 28100,
    originalPrice: 38642,
    discount: 31,
    saved: 10542,
    description: [
        "High quality beech wood.",
        "33 density sponge.",
        "Linen"
    ],
    deliveryNote: "Delivery during the period from March 1st to March 5th, excluding holidays and official holidays.",
    images: [
        producta1,
        producta2,
        producta3,
    ]
};

export const orders = [
    {
        username: "ADMGSA",
        email: "ADMGSA@gmail.com",
        avatar: "",
        orders: [
            {
                id: 1,
                name: "White and Brown MDF TV Unit - 40×40×240 cm",
                orderId: "12AHav1246",
                date: "1/2/2025",
                image: order1
            },
            {
                id: 2,
                name: "Modern Wooden Dining Table",
                orderId: "45BGxy9898",
                date: "3/3/2025",
                image: order1
            },
            {
                id: 3,
                name: "Modern Wooden Dining Table",
                orderId: "45BGxy9898",
                date: "3/3/2025",
                image: order1
            }
        ]
    },

];


