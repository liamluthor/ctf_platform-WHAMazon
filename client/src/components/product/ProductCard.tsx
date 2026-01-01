import { Product } from "@/lib/products";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-sm flex flex-col h-full hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="bg-gray-50 mb-4 h-48 flex items-center justify-center p-2 rounded-sm relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="flex-1 flex flex-col gap-1">
        <a href={`/product/${product.id}`} className="text-base font-medium leading-snug hover:text-orange-700 hover:underline line-clamp-3 mb-1 text-[#0F1111]">
          {product.title}
        </a>
        
        <div className="flex items-center gap-1 mb-1">
          <div className="flex text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-current" : "text-gray-300 fill-gray-300"}`} 
              />
            ))}
          </div>
          <span className="text-xs text-blue-700 hover:underline hover:text-orange-700 cursor-pointer">{product.reviews.toLocaleString()}</span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline gap-1">
            <span className="text-xs align-top font-normal relative top-[-4px]">$</span>
            <span className="text-2xl font-medium text-[#0F1111]">{Math.floor(product.price)}</span>
            <span className="text-xs align-top font-normal relative top-[-4px]">{product.price.toFixed(2).split('.')[1]}</span>
          </div>
          
          {product.isPrime && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
              <Check className="w-4 h-4 text-orange-500 font-bold" />
              <span className="font-bold text-[#007185]">Prime</span>
              <span>FREE delivery</span>
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-1">
            Delivery by <span className="font-bold text-black">Tomorrow</span>
          </div>

          <Button className="w-full mt-3 bg-accent hover:bg-orange-400 text-black border-none rounded-full text-xs h-8 font-normal shadow-none">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
