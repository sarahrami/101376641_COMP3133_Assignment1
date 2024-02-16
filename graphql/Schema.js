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
  type Query {
    login(usernameOrEmail: String!, password: String!): String
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
  }
  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addEmployee(first_name: String!, last_name: String!, email: String!, gender: Gender!, salary: Float!): Employee
    updateEmployeeById(id: ID!, first_name: String, last_name: String, email: String, gender: Gender, salary: Float): Employee
    deleteEmployeeById(id: ID!): String
  }
`);

module.exports = schema;
