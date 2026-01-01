import { Link, useLocation } from "wouter";
import logo from "@assets/generated_images/whamazon_logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

export default function Register() {
  const [_, setLocation] = useLocation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake register
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link href="/">
        <a className="mb-6">
          <img src={logo} alt="WHAMazon" className="h-10 object-contain" />
        </a>
      </Link>

      <div className="w-full max-w-[350px] border border-gray-300 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-normal mb-4">Create account</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="name" className="font-bold text-xs">Your name</Label>
            <Input 
              id="name" 
              placeholder="First and last name"
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] placeholder:text-gray-400 text-sm"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="font-bold text-xs">Mobile number or email</Label>
            <Input 
              id="email" 
              type="text" 
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="font-bold text-xs">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="At least 6 characters"
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] placeholder:text-gray-400 text-sm"
            />
             <div className="flex items-center gap-1 text-[11px] text-gray-500 font-normal">
               <Info className="w-3 h-3 text-blue-600" />
               Passwords must be at least 6 characters.
             </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="password-confirm" className="font-bold text-xs">Re-enter password</Label>
            <Input 
              id="password-confirm" 
              type="password" 
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
            />
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-orange-400 text-black border border-gray-400 shadow-sm rounded-sm text-sm font-normal py-1 mt-2">
            Continue
          </Button>

          <div className="text-xs text-gray-600 mt-4 leading-normal">
            By creating an account, you agree to WHAMazon's <a href="#" className="text-blue-700 hover:text-orange-700 hover:underline">Conditions of Use</a> and <a href="#" className="text-blue-700 hover:text-orange-700 hover:underline">Privacy Notice</a>.
          </div>
          
           <div className="border-t border-gray-200 mt-6 pt-4">
              <div className="text-xs">
                Already have an account? <Link href="/login"><a className="text-blue-700 hover:text-orange-700 hover:underline">Sign in</a></Link>
              </div>
               <div className="text-xs mt-1">
                Buying for work? <a href="#" className="text-blue-700 hover:text-orange-700 hover:underline">Create a free business account</a>
              </div>
           </div>
        </form>
      </div>

      <div className="mt-4 border-t border-gray-200 w-full pt-8 flex flex-col items-center gap-2">
        <div className="flex gap-8 text-xs text-blue-700">
           <a href="#" className="hover:text-orange-700 hover:underline">Conditions of Use</a>
           <a href="#" className="hover:text-orange-700 hover:underline">Privacy Notice</a>
           <a href="#" className="hover:text-orange-700 hover:underline">Help</a>
        </div>
        <div className="text-xs text-gray-500">
          © 1996-2024, WHAMazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}
