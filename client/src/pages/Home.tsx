import { Layout } from "@/components/layout/Layout";
import { ProductCard } from "@/components/product/ProductCard";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";
import { Link } from "wouter";

export default function Home() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: productsApi.getAll,
  });

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full max-w-[1500px] mx-auto">
        <div className="relative z-0">
          <Carousel className="w-full">
            <CarouselContent>
              {[1, 2, 3].map((i) => (
                <CarouselItem key={i}>
                  <div className="h-[250px] md:h-[400px] w-full bg-gradient-to-t from-gray-100 to-gray-200 relative">
                     {/* Add gradient overlay at bottom to blend with background */}
                     <div className="absolute inset-0 bg-[url('https://placehold.co/1500x600/232f3e/FFF?text=WHAM!+Daily+Deals')] bg-cover bg-center"></div>
                     <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-100 to-transparent"></div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 h-20 w-12 rounded-sm bg-transparent border-transparent hover:border-white hover:bg-white/20 text-white" />
            <CarouselNext className="right-4 h-20 w-12 rounded-sm bg-transparent border-transparent hover:border-white hover:bg-white/20 text-white" />
          </Carousel>
        </div>
        
        {/* Category Cards - Overlaying Hero */}
        <div className="relative z-10 -mt-32 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-[1480px] mx-auto mb-8">
          {[
            { title: "Gaming Accessories", img: "https://images.unsplash.com/photo-1678851836066-dc27614cc56b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBhY2Nlc3NvcmllcyUyMHJnYnxlbnwwfDJ8fHwxNzY3MzExMzI4fDA&ixlib=rb-4.1.0&q=80&w=1080" },
            { title: "Shop Laptop Deals", img: "https://images.unsplash.com/photo-1742119857260-b764e7c6e56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxsYXB0b3AlMjBjb21wdXRlciUyMG1vZGVybnxlbnwwfDJ8fHwxNzY3MzExMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
            { title: "Refresh Your Space", img: "https://images.unsplash.com/photo-1762606368623-81bb2d5f5778?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3IlMjBtb2Rlcm4lMjBpbnRlcmlvcnxlbnwwfDJ8fHwxNzY3MzExMzM0fDA&ixlib=rb-4.1.0&q=80&w=1080" },
            { title: "Deals in PCs", img: "https://images.unsplash.com/photo-1701960804409-ca945c8f1286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4NTEyMzJ8MHwxfHNlYXJjaHwxfHxkZXNrdG9wJTIwY29tcHV0ZXIlMjBwYyUyMHNldHVwfGVufDB8Mnx8fDE3NjczMTEzMzd8MA&ixlib=rb-4.1.0&q=80&w=1080" },
          ].map((cat, i) => (
            <div key={i} className="bg-white p-5 flex flex-col gap-4 shadow-sm z-20">
              <h2 className="font-bold text-xl">{cat.title}</h2>
              <div className="flex-1 overflow-hidden">
                 <img src={cat.img} alt={cat.title} className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-500" />
              </div>
              <Link href="/products"><a className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium">See more</a></Link>
            </div>
          ))}
        </div>
      </div>

      {/* Product Rows */}
      <div className="px-4 py-4 max-w-[1480px] mx-auto w-full flex flex-col gap-6">

        {isLoading ? (
          <div className="text-center py-12">Loading products...</div>
        ) : products && products.length > 0 ? (
          <>
            {/* Row 1 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-bold">Best Sellers in Computers & Accessories</h2>
                <Link href="/products"><a className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">See more</a></Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>

            {/* Banner Ad */}
            <div className="w-full h-24 bg-white flex items-center justify-center border border-gray-200 my-4 text-gray-400 text-sm">
              Sponsored: WHAM! Cloud Services - 99.9% Uptime (sometimes)
            </div>

            {/* Row 2 */}
            <div className="bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-bold">Frequently Repurchased in Supplies</h2>
                <Link href="/products"><a className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline">See more</a></Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.slice(4, 8).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">No products available</div>
        )}

      </div>
    </Layout>
  );
}
