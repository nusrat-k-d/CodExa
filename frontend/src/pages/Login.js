
import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://codexa-backend-l5zg.onrender.com/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            window.location.href = "/";
        } catch (err) {
            console.error(err);
            alert("Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg pr-12"
                        value={password}
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;