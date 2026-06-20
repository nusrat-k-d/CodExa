import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://codexa-backend-l5zg.onrender.com/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            console.log(response.data);
            alert("Registration Successful!");
            navigate("/login");

        } catch (err) {
            console.error(err);
            alert("Registration Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-2xl shadow-lg w-96"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Register
                </h1>

                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded-lg mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full border p-3 rounded-lg pr-12"
                        value={password}
                        autoComplete="new-password"
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
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;