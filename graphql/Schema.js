const { buildSchema } = require("graphql");

const schema = buildSchema(`
  enum Gender {
    Male
    Female
    Other
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
  }
  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender!
    salary: Float!
  }
  type SignupResponse {
    user: User
    message: String
  }
  type EmployeeResponse {
    employee: Employee
    message: String
  }
  type Query {
    login(usernameOrEmail: String!, password: String!): String
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): EmployeeResponse
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): SignupResponse
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: Gender!, salary: Float!): EmployeeResponse
    updateEmployeeById(id: ID!, first_name: String, last_name: String, email: String, gender: Gender, salary: Float): EmployeeResponse
    deleteEmployeeById(id: ID!): String
  }
`);

module.exports = schema;
