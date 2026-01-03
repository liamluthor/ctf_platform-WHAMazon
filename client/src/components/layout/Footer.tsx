import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary text-white mt-8">
      <div className="bg-[#37475a] hover:bg-[#485769] text-center py-4 text-sm font-medium cursor-pointer transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Back to top
      </div>
      
      <div className="max-w-[1000px] mx-auto py-12 px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-base mb-2">Get to Know Us</h3>
          <Link href="/careers" className="hover:underline text-gray-300">Careers</Link>
          <Link href="/products" className="hover:underline text-gray-300">Blog</Link>
          <Link href="/products" className="hover:underline text-gray-300">About WHAMazon</Link>
          <Link href="/products" className="hover:underline text-gray-300">Investor Relations</Link>
          <Link href="/products" className="hover:underline text-gray-300">WHAMazon Devices</Link>
          <Link href="/products" className="hover:underline text-gray-300">WHAMazon Science</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-base mb-2">Make Money with Us</h3>
          <Link href="/products" className="hover:underline text-gray-300">Sell products on WHAMazon</Link>
          <Link href="/products" className="hover:underline text-gray-300">Sell on WHAMazon Business</Link>
          <Link href="/products" className="hover:underline text-gray-300">Sell apps on WHAMazon</Link>
          <Link href="/products" className="hover:underline text-gray-300">Become an Affiliate</Link>
          <Link href="/products" className="hover:underline text-gray-300">Advertise Your Products</Link>
          <Link href="/products" className="hover:underline text-gray-300">Self-Publish with Us</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-base mb-2">WHAMazon Payment Products</h3>
          <Link href="/products" className="hover:underline text-gray-300">WHAMazon Business Card</Link>
          <Link href="/products" className="hover:underline text-gray-300">Shop with Points</Link>
          <Link href="/products" className="hover:underline text-gray-300">Reload Your Balance</Link>
          <Link href="/products" className="hover:underline text-gray-300">WHAMazon Currency Converter</Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-base mb-2">Let Us Help You</h3>
          <Link href="/products" className="hover:underline text-gray-300">WHAMazon and COVID-19</Link>
          <Link href="/profile" className="hover:underline text-gray-300">Your Account</Link>
          <Link href="/profile" className="hover:underline text-gray-300">Your Orders</Link>
          <Link href="/products" className="hover:underline text-gray-300">Shipping Rates & Policies</Link>
          <Link href="/products" className="hover:underline text-gray-300">Returns & Replacements</Link>
          <Link href="/products" className="hover:underline text-gray-300">Help</Link>
        </div>
      </div>
      
      <div className="border-t border-gray-600 py-8 text-center bg-primary">
        <div className="flex justify-center items-center gap-8 mb-4">
          <span className="font-bold text-xl italic">WHAMazon</span>
        </div>
        <p className="text-xs text-gray-400">© 1996-2024, WHAMazon.com, Inc. or its affiliates (Not really)</p>
      </div>
    </footer>
  );
}
