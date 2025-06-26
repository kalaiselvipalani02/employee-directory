"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ADD_EMPLOYEE = gql`
  mutation (
    $name: String!
    $position: String!
    $department: String!
    $salary: Int!
  ) {
    addEmployee(
      name: $name
      position: $position
      department: $department
      salary: $salary
    ) {
      id
      name
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

export default function AddEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE);

  const { data: deptData } = useQuery(GET_ALL_DEPARTMENTS);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addEmployee({
        variables: { ...form, salary: parseInt(form.salary) },
      });
      router.push("/"); // redirect to home page
    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.position) newErrors.position = "Position is required";
    if (!form.department) newErrors.department = "Department is required";
    if (!form.salary) newErrors.salary = "Salary is required";
    else if (isNaN(form.salary)) newErrors.salary = "Salary must be a number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Add New Employee
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "position", "department", "salary"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize">{field}</label>
            <input
              name={field}
              type={field === "salary" ? "number" : "text"}
              value={form[field]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors[field] && (
              <p className="text-red-500 text-sm">{errors[field]}</p>
            )}
          </div>
        ))}
        <button
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Adding..." : "Add Employee"}
        </button>
        {error && <p className="text-red-500">Something went wrong.</p>}
      </form>
    </div>
  );
}
