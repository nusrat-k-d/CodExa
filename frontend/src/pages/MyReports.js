import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/analysis/my-reports",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReports(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        My Reports
      </h1>

      <div className="grid gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="bg-white border rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {report.leetcodeUsername}
            </h2>

            <div className="mt-4 space-y-2">
              <p>Total Solved: {report.total}</p>
              <p>Score: {report.score}</p>
              <p>Level: {report.level}</p>
              <p>
                Saved:
                {" "}
                {new Date(
                  report.createdAt
                ).toLocaleDateString()}
              </p>
              <button
                onClick={() =>
                  navigate(`/report/${report._id}`, {
                    state: report,
                  })
                }
                className="mt-4 bg-black text-white px-4 py-2 rounded-xl"
              >
                View Details
              </button>

            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default MyReports;