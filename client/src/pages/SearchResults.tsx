import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";

export default function SearchResults() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q") || "";

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  // Filter products based on search query
  const filteredProducts = products?.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  ) || [];

  return (
    <Layout>
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-2 text-sm mb-4">
        <span className="font-bold">{filteredProducts.length} results</span> for <span className="text-orange-700 font-bold">"{query}"</span>
      </div>

      <div className="flex px-4 gap-4">
        {/* Sidebar Filters */}
        <div className="hidden md:block w-[240px] flex-shrink-0 text-sm">
           <h3 className="font-bold mb-2">Delivery Day</h3>
           <div className="flex items-center gap-2 mb-1">
             <Checkbox id="wham" />
             <Label htmlFor="wham" className="font-normal flex items-center gap-1">
               <span className="text-[#007185] font-bold">WHAM!</span>
               <span>Get It by Tomorrow</span>
             </Label>
           </div>
           
           <h3 className="font-bold mt-4 mb-2">Customer Reviews</h3>
           <div className="flex flex-col gap-1 cursor-pointer">
              <div className="flex items-center gap-1 hover:text-orange-700">
                <span className="text-orange-400">★★★★☆</span>
                <span>& Up</span>
              </div>
              <div className="flex items-center gap-1 hover:text-orange-700">
                <span className="text-orange-400">★★★☆☆</span>
                <span>& Up</span>
              </div>
              <div className="flex items-center gap-1 hover:text-orange-700">
                <span className="text-orange-400">★★☆☆☆</span>
                <span>& Up</span>
              </div>
              <div className="flex items-center gap-1 hover:text-orange-700">
                <span className="text-orange-400">★☆☆☆☆</span>
                <span>& Up</span>
              </div>
           </div>

           <h3 className="font-bold mt-4 mb-2">Price</h3>
           <div className="flex flex-col gap-1">
              <span className="hover:text-orange-700 cursor-pointer">Under $25</span>
              <span className="hover:text-orange-700 cursor-pointer">$25 to $50</span>
              <span className="hover:text-orange-700 cursor-pointer">$50 to $100</span>
              <span className="hover:text-orange-700 cursor-pointer">$100 to $200</span>
              <span className="hover:text-orange-700 cursor-pointer">$200 & Above</span>
           </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 pb-10">
           {isLoading ? (
             <div className="text-center py-12">Loading products...</div>
           ) : filteredProducts.length > 0 ? (
             <>
               <h2 className="font-bold text-xl mb-4">Results</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                 {filteredProducts.map(product => (
                   <ProductCard key={product.id} product={product} />
                 ))}
                 {/* Fill with random other products to make grid look full if only 1 result */}
                 {filteredProducts.length < 4 && products && products.filter(p => !filteredProducts.includes(p)).slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} />
                 ))}
               </div>
             </>
           ) : (
             <div className="py-12 flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold mb-2">No results for "{query}"</h2>
                <p className="text-gray-600">Try checking your spelling or use more general terms.</p>
                <div className="mt-8 w-full">
                  <h3 className="font-bold text-lg mb-4">Recommended for you</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                     {products && products.slice(0, 4).map(product => (
                       <ProductCard key={product.id} product={product} />
                     ))}
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>
    </Layout>
  );
}
