import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/auth/login",
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

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

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