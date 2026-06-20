import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const Progress = () => {
    const [progress, setProgress] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "https://codexa-backend-l5zg.onrender.com/analysis/progress",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setProgress(res.data);
                if (res.data.length > 0) {
                    setSelectedUser(res.data[0].leetcodeUsername);
                }


            } catch (err) {
                console.error(err);
            }
        };

        fetchProgress();
    }, []);
    const filteredProgress = progress.filter(
        (item) => item.leetcodeUsername === selectedUser
    );
    return (
        <div className="pt-24 max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-8">
                Progress Tracking
            </h1>
            <div className="flex gap-3 mb-6">
                {[...new Set(
                    progress
                        .filter((p) => p.leetcodeUsername)
                        .map((p) => p.leetcodeUsername)
                )].map((user) => (
                    <button
                        key={user}
                        onClick={() => setSelectedUser(user)}
                        className={`px-6 py-3 rounded-2xl border transition-all ${selectedUser === user
                            ? "bg-black text-white"
                            : "bg-white"
                            }`}
                    >
                        {user}
                    </button>
                ))}
            </div>

            {/* Score Progress */}
            <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6">
                    Score Progress
                </h2>

                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="createdAt"
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="score"
                                stroke="#000"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Total Problems Solved */}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                    Total Problems Solved
                </h2>

                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="createdAt"
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <YAxis />
                            <Tooltip
                                labelFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#000"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/*Percentile Progress*/}
            <div className="bg-white p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">
                    Percentile Progress
                </h2>

                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={filteredProgress}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="percentile"
                                tickFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <YAxis domain={[0, 100]}/>
                            <Tooltip
                                labelFormatter={(value) =>
                                    new Date(value).toLocaleDateString()
                                }
                            />
                            <Line
                                type="monotone"
                                dataKey="percentile"
                                stroke="#000"
                                strokeWidth={3}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </div>
    );
};

export default Progress;