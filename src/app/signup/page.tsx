"use client";
// import { Give_You_Glory } from "next/font/google";
import Link from "next/link";
import React, { useEffect } from "react";
import Toast from "@/helpers/Toast";
import Loaders from "@/helpers/Loaders";
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation";
import axios from "axios"



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: ""
    });
    const [btnDisabled, setBtnDisabled] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const onSignup = async () => {
        try {
            setloading(true);
            const response = await axios.post("api/users/signup", user)
            toast.success(response.data.message)
            setTimeout(() => { router.push('/login') }, 1200);
        } catch (error: any) {
            setloading(false);
            toast.error(error.response.data.error);
        }
    };
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setBtnDisabled(false)
        } else {
            setBtnDisabled(true)
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>signup</h1>
            <hr />
            {/* <label htmlFor="username">username</label> */}
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
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
                        onClick={onSignup}
                        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                        Signup
                    </button>
            }
            <Link href="/login">Visit login page</Link>
            <Toast />
        </div>
    )
};