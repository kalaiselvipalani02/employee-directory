"use client";

import Link from "next/link";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";

const GET_EMPLOYEES = gql`
  query {
    getAllEmployees {
      id
      name
      position
      department
    }
  }
`;

const GET_EMPLOYEES_BY_DEPT = gql`
  query GetEmployeesByDepartment($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
      department
    }
  }
`;

const GET_ALL_DEPARTMENTS = gql`
  query {
    getAllDepartments {
      id
      name
    }
  }
`;

export default function HomePage() {
  const { data: allData, loading, error } = useQuery(GET_EMPLOYEES);
  const [selectedDept, setSelectedDept] = useState("All");
  const [getFilteredEmployees, { data: filteredData }] = useLazyQuery(
    GET_EMPLOYEES_BY_DEPT
  );
  const { data: deptData } = useQuery(GET_ALL_DEPARTMENTS);
  // Lazy load employees by department
  const [loadEmployees, { data: empData, loading: empLoading }] = useLazyQuery(
    GET_EMPLOYEES_BY_DEPT
  );

  const handleDepartmentChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    console.log(dept);
    if (dept === "All") return;
    getFilteredEmployees({ variables: { department: dept } });
  };

  useEffect(() => {
    if (selectedDept !== "All") {
      loadEmployees({ variables: { department: selectedDept } });
    }
  }, [selectedDept]);

  const employees =
    selectedDept === "All"
      ? allData?.getAllEmployees || []
      : filteredData?.getEmployeesByDepartment || [];

  if (loading) return <p className="p-4">Loading...</p>;
  if (error)
    return <p className="p-4 text-red-500">Error loading employees.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Employee Directory</h1>
        <Link href="/add">
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Add New Employee
          </button>
        </Link>
      </div>

      {/* Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Filter by Department:</label>
        <select
          value={selectedDept}
          onChange={handleDepartmentChange}
          className="border p-2 rounded"
        >
          <option value="All">All</option>
          {deptData?.getAllDepartments.map((dept) => (
            <option key={dept.id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Name</th>
            <th className="p-2">Position</th>
            <th className="p-2">Department</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-t">
              <td className="p-2">{emp.name}</td>
              <td className="p-2">{emp.position}</td>
              <td className="p-2">{emp.department}</td>
              <td className="p-2">
                <Link href={`/employee/${emp.id}`}>
                  <button className="text-blue-500 underline">View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
