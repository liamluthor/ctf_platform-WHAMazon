import { Layout } from "@/components/layout/Layout";
import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Package, RefreshCw, Lock, CreditCard } from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="max-w-[1000px] mx-auto w-full px-4 py-8">
        
        {/* Breadcrumb / Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-normal">Your Account</h1>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
           <Card className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg">
             <CardContent className="p-4 flex items-start gap-4">
                <Package className="w-8 h-8 text-orange-500" />
                <div>
                   <h3 className="text-lg font-normal text-gray-800">Your Orders</h3>
                   <p className="text-xs text-gray-500">Track, return, or buy things again</p>
                </div>
             </CardContent>
           </Card>

           <Card className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg">
             <CardContent className="p-4 flex items-start gap-4">
                <Lock className="w-8 h-8 text-orange-500" />
                <div>
                   <h3 className="text-lg font-normal text-gray-800">Login & security</h3>
                   <p className="text-xs text-gray-500">Edit login, name, and mobile number</p>
                </div>
             </CardContent>
           </Card>

           <Card className="hover:bg-gray-50 cursor-pointer border-gray-300 rounded-lg">
             <CardContent className="p-4 flex items-start gap-4">
                <CreditCard className="w-8 h-8 text-orange-500" />
                <div>
                   <h3 className="text-lg font-normal text-gray-800">Your Payments</h3>
                   <p className="text-xs text-gray-500">Manage payment methods and settings</p>
                </div>
             </CardContent>
           </Card>
        </div>

        <div className="w-full border-b border-gray-200 mb-6"></div>

        {/* Order History Section */}
        <h2 className="text-2xl font-normal mb-4">Your Orders</h2>
        
        <div className="flex gap-1 text-sm text-blue-700 border-b border-gray-200 mb-4">
           <div className="px-4 py-2 border-b-2 border-orange-500 font-bold text-black cursor-pointer">Orders</div>
           <div className="px-4 py-2 hover:text-orange-700 hover:underline cursor-pointer">Buy Again</div>
           <div className="px-4 py-2 hover:text-orange-700 hover:underline cursor-pointer">Not Yet Shipped</div>
           <div className="px-4 py-2 hover:text-orange-700 hover:underline cursor-pointer">Cancelled Orders</div>
        </div>

        <div className="flex flex-col gap-6">
           {/* Order 1 */}
           <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-xs text-gray-600 gap-4">
                 <div className="flex gap-8">
                    <div>
                       <div className="uppercase">Order Placed</div>
                       <div className="text-gray-900">December 25, 2025</div>
                    </div>
                    <div>
                       <div className="uppercase">Total</div>
                       <div className="text-gray-900">$2,499.99</div>
                    </div>
                     <div>
                       <div className="uppercase">Ship To</div>
                       <div className="text-blue-700 hover:underline hover:text-orange-700 cursor-pointer">Hacker Man</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-gray-900">Order # 112-3423423-234234</div>
                    <div className="flex gap-2 justify-end text-blue-700">
                       <a href="#" className="hover:underline hover:text-orange-700">View order details</a>
                       <span>|</span>
                       <a href="#" className="hover:underline hover:text-orange-700">Invoice</a>
                    </div>
                 </div>
              </div>
              <div className="p-4 bg-white flex flex-col md:flex-row gap-6">
                 <div className="w-full md:w-[200px] flex-shrink-0 flex items-center justify-center bg-gray-50 p-2">
                    <img src={products[0].image} className="max-h-24 object-contain" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Delivered Yesterday</h3>
                    <div className="text-sm text-gray-500 mb-4">Handed directly to resident</div>
                    
                    <a href="#" className="text-blue-700 hover:text-orange-700 hover:underline font-medium text-base line-clamp-2">
                       {products[0].title}
                    </a>
                    <div className="text-xs text-gray-500 mt-1">Sold by: WHAMazon Services LLC</div>
                    
                    <div className="mt-4 flex gap-2">
                       <Button size="sm" className="bg-accent hover:bg-orange-400 text-black border-none rounded-md shadow-sm text-xs h-8 font-normal">Buy it again</Button>
                       <Button variant="outline" size="sm" className="border-gray-300 text-black rounded-md shadow-sm text-xs h-8 font-normal hover:bg-gray-50">View your item</Button>
                    </div>
                 </div>
                 <div className="w-full md:w-[250px] flex-shrink-0 flex flex-col gap-2">
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Track package</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Return or replace items</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Share gift receipt</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Write a product review</Button>
                 </div>
              </div>
           </div>

           {/* Order 2 */}
           <div className="border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between text-xs text-gray-600 gap-4">
                 <div className="flex gap-8">
                    <div>
                       <div className="uppercase">Order Placed</div>
                       <div className="text-gray-900">November 10, 2025</div>
                    </div>
                    <div>
                       <div className="uppercase">Total</div>
                       <div className="text-gray-900">$24.99</div>
                    </div>
                     <div>
                       <div className="uppercase">Ship To</div>
                       <div className="text-blue-700 hover:underline hover:text-orange-700 cursor-pointer">Hacker Man</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-gray-900">Order # 112-9999999-000000</div>
                    <div className="flex gap-2 justify-end text-blue-700">
                       <a href="#" className="hover:underline hover:text-orange-700">View order details</a>
                       <span>|</span>
                       <a href="#" className="hover:underline hover:text-orange-700">Invoice</a>
                    </div>
                 </div>
              </div>
              <div className="p-4 bg-white flex flex-col md:flex-row gap-6">
                 <div className="w-full md:w-[200px] flex-shrink-0 flex items-center justify-center bg-gray-50 p-2">
                    <img src={products[6].image} className="max-h-24 object-contain" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">Delivered Nov 12</h3>
                    <div className="text-sm text-gray-500 mb-4">Left in mailroom</div>
                    
                    <a href="#" className="text-blue-700 hover:text-orange-700 hover:underline font-medium text-base line-clamp-2">
                       {products[6].title}
                    </a>
                    <div className="text-xs text-gray-500 mt-1">Sold by: BookDepository</div>
                    
                    <div className="mt-4 flex gap-2">
                       <Button size="sm" className="bg-accent hover:bg-orange-400 text-black border-none rounded-md shadow-sm text-xs h-8 font-normal">Buy it again</Button>
                       <Button variant="outline" size="sm" className="border-gray-300 text-black rounded-md shadow-sm text-xs h-8 font-normal hover:bg-gray-50">View your item</Button>
                    </div>
                 </div>
                 <div className="w-full md:w-[250px] flex-shrink-0 flex flex-col gap-2">
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Track package</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Return or replace items</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Share gift receipt</Button>
                     <Button variant="outline" className="w-full border-gray-300 text-black rounded-md shadow-sm text-sm font-normal hover:bg-gray-50">Write a product review</Button>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </Layout>
  );
}
