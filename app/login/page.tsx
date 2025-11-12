"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    router.push("/dashboard");
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
            onSubmit={(e) => { e.preventDefault(); handleLogin(); }}
            className="w-full max-w-sm bg-white/80 dark:bg-gray-200 backdrop-blur rounded-lg shadow-md p-6 space-y-4"
        >
            <h2 className="text-2xl font-semibold text-center">Sign in</h2>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                Login
            </button>

            <p className="text-xs text-center text-gray-500">
                Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign up</a>
            </p>
        </form>
    </div>
  );
}
