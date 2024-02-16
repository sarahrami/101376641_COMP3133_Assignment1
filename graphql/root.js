const UserModel = require("../models/User");
const EmployeeModel = require("../models/Employee");
const bcrypt = require('bcrypt');

const root = {
    signup: async (args) => {
      const userExist = await UserModel.findOne({ username: args.username });

      if (userExist) {
        return null;
      }
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = new UserModel({
        username: args.username,
        email: args.email,
        password: hashedPassword,
      });

      const newUser = await user.save();
      return newUser;
    },
    login: async ({ usernameOrEmail, password }) => {
      const isEmail = usernameOrEmail.includes("@");
      const user = isEmail
        ? await UserModel.findOne({ email: usernameOrEmail })
        : await UserModel.findOne({ username: usernameOrEmail });

      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!user || !passwordMatch) {
        return "Credentials are wrong" ;
      }
      return "User successfully logged in!" ;
    },
    addEmployee: async (args) => {
      const employeeExist = await EmployeeModel.findOne({ email: args.email });
      if (employeeExist) {
        return null;
      }
    
      const employee = new EmployeeModel({
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        gender: args.gender,
        salary: args.salary,
      });
    
      try {
        const newEmployee = await employee.save();
        return newEmployee;
      } catch (error) {
        return { error: "Failed to add employee" };
      }
    },        
    searchEmployeeById: async ({ id }) => {
      const employee = await EmployeeModel.findById(id);
    
      if (!employee) {
        return null
      } else {
        return employee;
      }
    },
    
    updateEmployeeById: async ({ id, ...empFields }) => {
      const employee = await EmployeeModel.findById(id);
      if (!employee) {
        return { message: "Employee not found." };
      }
      Object.assign(employee, empFields);
      await employee.save();
      return employee;
    },
    deleteEmployeeById: async ({ id }) => {
      const employee = await EmployeeModel.findByIdAndDelete(id);
  
      if (!employee) {
        return "Employee not found";
      } else {
        return "Employee successfully deleted.";
      }
    },
    getAllEmployees: async () => {
      const employees = await EmployeeModel.find();
      return employees;
    }
  };
  module.exports = root;