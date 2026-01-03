import { Link, useLocation } from "wouter";
import logo from "@assets/generated_images/whamazon_logo.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [_, setLocation] = useLocation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      setLocation("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Link href="/">
        <a className="mb-6">
          <img src={logo} alt="WHAMazon" className="h-10 object-contain" />
        </a>
      </Link>

      <div className="w-full max-w-[350px] border border-gray-300 rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-normal mb-4">Sign in</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="space-y-1">
            <Label htmlFor="username" className="font-bold text-xs">Username</Label>
            <Input
              id="username"
              type="text"
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <Label htmlFor="password" className="font-bold text-xs">Password</Label>
            </div>
            <Input
              id="password"
              type="password"
              className="h-8 rounded-sm border-gray-400 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-orange-400 focus-visible:border-orange-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-orange-400 text-black border border-gray-400 shadow-sm rounded-sm text-sm font-normal py-1 mt-2">
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="text-xs text-gray-600 mt-4 leading-normal">
            By continuing, you agree to WHAMazon's <Link href="/products"><a className="text-blue-700 hover:text-orange-700 hover:underline">Conditions of Use</a></Link> and <Link href="/products"><a className="text-blue-700 hover:text-orange-700 hover:underline">Privacy Notice</a></Link>.
          </div>
          
          <div className="flex items-center gap-2 text-xs text-gray-600 mt-2 cursor-pointer group">
             <span className="text-gray-500">►</span> 
             <span className="group-hover:underline group-hover:text-orange-700 text-blue-700">Need help?</span>
          </div>
        </form>
      </div>

      <div className="flex items-center w-full max-w-[350px] mb-6">
         <div className="flex-1 border-t border-gray-300"></div>
         <div className="px-2 text-xs text-gray-500">New to WHAMazon?</div>
         <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <Link href="/register">
        <a className="w-full max-w-[350px]">
          <Button variant="outline" className="w-full bg-gray-50 hover:bg-gray-100 border-gray-300 shadow-sm rounded-sm text-sm font-normal text-black h-8">
            Create your WHAMazon account
          </Button>
        </a>
      </Link>

      <div className="mt-8 border-t border-gray-200 w-full pt-8 flex flex-col items-center gap-2">
        <div className="flex gap-8 text-xs text-blue-700">
           <Link href="/products"><a className="hover:text-orange-700 hover:underline">Conditions of Use</a></Link>
           <Link href="/products"><a className="hover:text-orange-700 hover:underline">Privacy Notice</a></Link>
           <Link href="/products"><a className="hover:text-orange-700 hover:underline">Help</a></Link>
        </div>
        <div className="text-xs text-gray-500">
          © 1996-2024, WHAMazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}
