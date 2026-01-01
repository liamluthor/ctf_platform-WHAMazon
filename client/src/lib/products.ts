import laptopImg from '@assets/stock_images/modern_laptop_comput_cc66f786.jpg';
import headphonesImg from '@assets/stock_images/wireless_noise_cance_8cb46cff.jpg';
import sneakersImg from '@assets/stock_images/colorful_running_sne_ff00427e.jpg';
import watchImg from '@assets/stock_images/smart_watch_bad58c47.jpg';

export interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isPrime: boolean;
  category: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    title: "WHAM! Book Pro 16-inch - M3 Max, 36GB Unified Memory, 1TB SSD",
    price: 2499.99,
    rating: 4.8,
    reviews: 12453,
    image: laptopImg,
    isPrime: true,
    category: "Electronics",
    description: "The most powerful WHAM! Book ever. Crushes standard CTF challenges with ease."
  },
  {
    id: "2",
    title: "SonicBass 5000 Noise Cancelling Headphones - Wireless Bluetooth",
    price: 299.00,
    rating: 4.5,
    reviews: 8902,
    image: headphonesImg,
    isPrime: true,
    category: "Electronics",
    description: "Silence the haters and focus on your hacking. 40 hours battery life."
  },
  {
    id: "3",
    title: "SpeedRunner X - Professional Marathon Running Shoes",
    price: 129.95,
    rating: 4.2,
    reviews: 342,
    image: sneakersImg,
    isPrime: false,
    category: "Fashion",
    description: "Run away from security guards faster than ever before."
  },
  {
    id: "4",
    title: "SmartTime Elite - Fitness Tracker & Heart Rate Monitor",
    price: 199.50,
    rating: 4.7,
    reviews: 5671,
    image: watchImg,
    isPrime: true,
    category: "Electronics",
    description: "Track your heart rate while deploying to production on a Friday."
  },
  {
    id: "5",
    title: "Hacker Hoodie - Black, Oversized, Anonymous",
    price: 49.99,
    rating: 4.9,
    reviews: 666,
    image: "https://placehold.co/400x400/131921/FFFFFF?text=Hoodie",
    isPrime: true,
    category: "Fashion",
    description: "Essential attire for any main character in a cyber thriller."
  },
  {
    id: "6",
    title: "Mechanical Keyboard - Blue Switches, RGB Backlight",
    price: 89.99,
    rating: 4.6,
    reviews: 2311,
    image: "https://placehold.co/400x400/333333/FFFFFF?text=Keyboard",
    isPrime: true,
    category: "Electronics",
    description: "Click clack your way to victory. Your coworkers will love you."
  },
  {
    id: "7",
    title: "SQL Injection for Dummies - 2nd Edition",
    price: 24.99,
    rating: 3.5,
    reviews: 12,
    image: "https://placehold.co/400x600/f0f0f0/333333?text=Book",
    isPrime: false,
    category: "Books",
    description: "A classic. Learn how to drop tables like a pro."
  },
  {
    id: "8",
    title: "USB-C Hub Multiport Adapter - 7 in 1",
    price: 35.00,
    rating: 4.3,
    reviews: 899,
    image: "https://placehold.co/400x400/dddddd/333333?text=Dongle",
    isPrime: true,
    category: "Electronics",
    description: "Because your laptop only has two ports for some reason."
  }
];
