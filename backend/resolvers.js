import { ObjectId } from "mongodb";
import { getDb } from "./db.js";

export const resolvers = {
  Query: {
    getAllEmployees: async () => {
      const db = getDb();
      const employees = await db
        .collection("employees")
        .find({}, { projection: { name: 1, position: 1, department: 1 } })
        .toArray();

      return employees.map((emp) => ({
        id: emp._id ? emp._id.toString() : "", // Convert ObjectId to string
        name: emp.name,
        position: emp.position,
        department: emp.department,
      }));
    },
    getEmployeeDetails: async (_, { id }) => {
      const db = getDb();
      const employee = await db
        .collection("employees")
        .findOne({ _id: new ObjectId(id) });

      if (!employee) return null;

      return {
        id: employee._id.toString(), // Convert Mongo ObjectId to string
        name: employee.name,
        position: employee.position,
        department: employee.department,
        salary: employee.salary,
      };
    },
    getEmployeesByDepartment: async (_, { department }) => {
      const db = getDb();
      const employees = await db
        .collection("employees")
        .find({ department })
        .toArray();

      return employees.map((emp) => ({
        id: emp._id?.toString() ?? "unknown-id",
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
      }));
    },
    getAllDepartments: async () => {
      const db = getDb();
      const departments = await db.collection("departments").find().toArray();

      return departments.map((dept) => ({
        id: dept._id.toString(),
        name: dept.name,
        floor: dept.floor,
      }));
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = getDb();
      const result = await db.collection("employees").insertOne({
        name,
        position,
        department,
        salary,
      });
      return {
        id: result.insertedId,
        name,
        position,
        department,
        salary,
      };
    },

    addDepartment: async (_, { name, floor }, { db }) => {
      const result = await db.collection("departments").insertOne({
        name,
        floor,
      });
      return {
        id: result.insertedId,
        name,
        floor,
      };
    },
  },
};
