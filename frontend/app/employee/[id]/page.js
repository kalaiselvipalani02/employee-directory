"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const GET_EMPLOYEE_DETAILS = gql`
  query ($id: ID!) {
    getEmployeeDetails(id: $id) {
      name
      position
      department
      salary
    }
  }
`;

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_EMPLOYEE_DETAILS, {
    variables: { id },
  });

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">Error loading employee.</p>;

  const emp = data.getEmployeeDetails;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-10 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Employee Details
      </h1>
      <p>
        <strong>Name:</strong> {emp.name}
      </p>
      <p>
        <strong>Position:</strong> {emp.position}
      </p>
      <p>
        <strong>Department:</strong> {emp.department}
      </p>
      <p>
        <strong>Salary:</strong> ₹{emp.salary}
      </p>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-300 px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
}
