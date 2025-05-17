const products = [
    {
        id:1,
        name: "Wireless Bluetooth Headphones",
        price: 99.99,
        description:"High-quality wireless headphones with noise cancellation and 20-hour battery life.",
        category: "electronics",
        image: "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/soundlink_around-ear_wireless_headphones_II/product_silo_images/sl_ae_II_black_EC_02.psd/jcr:content/renditions/cq5dam.web.1920.1920.png",
        rating: 4.5,
        stock:15
    },
    {
        id: 2,
        name: "Slim Fit T-shirt",
        price: 19.99,
        description: "100% cotton slim fit t-shirt, perfect for everyday wear.",
        category: "clothing",
        image: "https://modelatshirts.com/cdn/shop/products/938801dedc6825376274c5a0e5bec85b.jpg?v=1682526355&width=1920",
        rating: 4.2,
        stock: 45
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        price: 24.99,
        description: "Vacuum insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.",
        category: "home",
        image: "https://pearlcraftland.com/cdn/shop/files/b5.jpg?v=1688471205&width=1920",
        rating: 4.8,
        stock: 30
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 199.99,
        description: "Track your fitness, receive notifications, and more with this smart watch.",
        category: "electronics",
        image: "https://m.media-amazon.com/images/I/61e6mSqr5JL.jpg",
        rating: 4.6,
        stock: 12
    },
    {
        id: 5,
        name: "Laptop Backpack",
        price: 49.99,
        description: "Durable backpack with dedicated laptop compartment and multiple pockets.",
        category: "accessories",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/10/EC/GN/QZ/82464038/0w8a5034-500x500.JPG",
        rating: 4.3,
        stock: 25
    },
    {
        id: 6,
        name: "Ceramic Coffee Mug",
        price: 14.99,
        description: "Elegant ceramic coffee mug with a comfortable handle.",
        category: "home",
        image: "https://thelittlepotcompany.co.uk/cdn/shop/articles/IMG_6886.JPG?v=1550361896&width=1920",
        rating: 4.0,
        stock: 50
    },
    {
        id: 7,
        name: "Smartphone Case",
        price: 29.99,
        description: "Protective case for the latest smartphone models with shock absorption.",
        category: "accessories",
        image: "https://www.rokform.com/cdn/shop/products/6-Dimensions-iPhone13_23673e7a-d30b-4f5a-98c5-844215887660.png?v=1631259168&width=1920",
        rating: 4.4,
        stock: 35
    },
    {
        id: 8,
        name: "Wireless Charging Pad",
        price: 34.99,
        description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
        category: "electronics",
        image: "https://www.rokform.com/cdn/shop/products/RF-Roklock-Wireless-Charger-05.jpg?v=1584549639&width=1920",
        rating: 4.1,
        stock: 20
    },
]
//The export default statement allows you to split your code into separate files (modules) and share code between them-Reusability
//The "default" part of export default means that when you import from this file without specifying what you want, you'll get the products array. You can only have one default export per file.
export default products;
