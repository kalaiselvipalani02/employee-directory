import { gql } from "apollo-server";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Int!
  }

  type CompanyDepartment {
    id: ID!
    name: String!
    floor: Int!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getAllDepartments: [CompanyDepartment!]!
  }

  type Mutation {
    addEmployee(
      name: String!
      position: String!
      department: String!
      salary: Int!
    ): Employee

    addDepartment(name: String!, floor: Int!): CompanyDepartment
  }
`;
