import { Link, useLocation } from "wouter";
import { Search, ShoppingCart, Menu, MapPin } from "lucide-react";
import logo from "@assets/generated_images/whamazon_logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Header() {
  const [location, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="flex flex-col w-full">
      {/* Top Nav - Dark Blue */}
      <div className="bg-primary text-white py-2 px-4 flex items-center gap-4 h-[60px]">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center hover:outline-1 outline-white p-1 rounded-sm cursor-pointer mr-2">
            <img src={logo} alt="WHAMazon" className="h-8 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tighter italic ml-1 text-white">.com</span>
          </a>
        </Link>

        {/* Deliver To */}
        <div className="hidden md:flex flex-col leading-none text-xs hover:outline-1 outline-white p-2 rounded-sm cursor-pointer">
          <span className="text-gray-300 ml-4">Deliver to</span>
          <div className="flex items-center font-bold">
            <MapPin className="w-4 h-4 mr-1" />
            <span>New York 10001</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 ring-accent ring-offset-0">
          <div className="bg-gray-100 text-gray-600 px-3 flex items-center border-r text-xs cursor-pointer hover:bg-gray-200">
            All <span className="ml-1">▼</span>
          </div>
          <Input 
            className="flex-1 rounded-none border-none bg-white text-black h-full focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-500"
            placeholder="Search WHAMazon"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" className="bg-accent hover:bg-orange-400 text-black border-none rounded-none px-4 h-full">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-1 md:gap-4">
          <Link href="/login">
            <a className="hidden md:flex flex-col leading-none text-xs hover:outline-1 outline-white p-2 rounded-sm cursor-pointer">
              <span className="text-white">Hello, sign in</span>
              <span className="font-bold">Account & Lists</span>
            </a>
          </Link>

          <Link href="/profile">
            <a className="hidden md:flex flex-col leading-none text-xs hover:outline-1 outline-white p-2 rounded-sm cursor-pointer">
              <span className="text-white">Returns</span>
              <span className="font-bold">& Orders</span>
            </a>
          </Link>

          <Link href="/cart">
            <a className="flex items-end hover:outline-1 outline-white p-2 rounded-sm cursor-pointer relative">
              <ShoppingCart className="w-8 h-8" />
              <span className="font-bold text-orange-400 absolute top-0 left-[22px] text-sm">0</span>
              <span className="font-bold text-sm hidden md:inline mb-1">Cart</span>
            </a>
          </Link>
        </div>
      </div>

      {/* Sub Nav - Darker Gray */}
      <div className="bg-secondary text-white px-4 py-1.5 flex items-center text-sm gap-4 overflow-x-auto whitespace-nowrap">
        <div className="flex items-center font-bold cursor-pointer hover:outline-1 outline-white p-1 rounded-sm">
          <Menu className="w-5 h-5 mr-1" />
          All
        </div>
        <a href="#" className="hover:outline-1 outline-white p-1 rounded-sm cursor-pointer">Today's Deals</a>
        <a href="#" className="hover:outline-1 outline-white p-1 rounded-sm cursor-pointer">Customer Service</a>
        <a href="#" className="hover:outline-1 outline-white p-1 rounded-sm cursor-pointer">Registry</a>
        <a href="#" className="hover:outline-1 outline-white p-1 rounded-sm cursor-pointer">Gift Cards</a>
        <a href="#" className="hover:outline-1 outline-white p-1 rounded-sm cursor-pointer">Sell</a>
      </div>
    </header>
  );
}
