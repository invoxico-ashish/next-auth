"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Toast from "@/helpers/Toast";
import Loaders from "@/helpers/Loaders";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import axios from "axios"

export default function LoginPage() {
    const router = useRouter();
    const [loading, setloading] = React.useState(false);
    const [user, setUser] = React.useState({ email: "", password: "" });
    const onLogin = async () => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/login", user);
            toast.success("Login success");
            setTimeout(() => {
                router.push(`/profile`);
            }, (1200));
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />

            {/* <label htmlFor="email">email</label> */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            {/* <label htmlFor="password">password</label> */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            {
                loading ? <Loaders /> :
                    <button
                        onClick={onLogin}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        Login here
                    </button>
            }
            <Link href="/signup">Visit Signup page</Link>
            <Toast />
        </div>
    )
};