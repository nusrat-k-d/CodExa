import React from "react";
import { useLocation } from "react-router-dom";

const ReportDetails = () => {
    const location = useLocation();
    const report = location.state;

    if (!report) {
        return (
            <div className="p-8">
                Report not found
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">
                {report.leetcodeUsername}
            </h1>

            <div className="bg-white p-6 rounded-2xl shadow">
                <p>Score: {report.score}</p>
                <p>Level: {report.level}</p>
                <p>Percentile: {report.percentile}%</p>
                <p>Total Solved: {report.total}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow mt-6">
                <h2 className="text-2xl font-bold mb-4">
                    Weak Topics
                </h2>

                <div className="flex flex-wrap gap-2">
                    {report.weakTopics?.map((topic) => (
                        <span
                            key={topic}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-full"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow mt-6">
                <h2 className="text-2xl font-bold mb-4">
                    Suggestions
                </h2>

                <ul className="space-y-2">
                    {report.suggestions?.map((item, index) => (
                        <li key={index}>
                            • {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow mt-6">
                <h2 className="text-2xl font-bold mb-4">
                    Daily Plan
                </h2>

                <ul className="space-y-2">
                    {report.dailyPlan?.map((item, index) => (
                        <li key={index}>
                            • {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow mt-6">
                <h2 className="text-2xl font-bold mb-4">
                    Recommendations
                </h2>

                <div className="space-y-3">
                    {report.recommendations?.map((rec) => (
                        <a
                            key={rec._id}
                            href={rec.link}
                            target="_blank"
                            rel="noreferrer"
                            className="block text-blue-600 hover:underline"
                        >
                            {rec.topic}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReportDetails;