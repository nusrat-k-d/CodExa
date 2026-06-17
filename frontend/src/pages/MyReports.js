import React, { useEffect, useState } from "react";
import axios from "axios";

const MyReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTJmYzIzNzk2ZmVkNTUwYWE0ZjNmYzUiLCJpYXQiOjE3ODE2OTA1NTQsImV4cCI6MTc4MjI5NTM1NH0.hJqb9htWr0_YzB590RUH7RXie2nTx0t_ilMnSsBST4Q"; // temporary

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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReports;