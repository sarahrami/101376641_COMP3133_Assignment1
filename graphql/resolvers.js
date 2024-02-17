const UserModel = require("../models/User");
const EmployeeModel = require("../models/Employee");
const bcrypt = require('bcrypt');

const root = {
    signup: async (args) => {
      const userExist = await UserModel.findOne({ username: args.username });

      if (userExist) {
        return {user: null, message: "User already exists."};
      }
      const hashedPassword = await bcrypt.hash(args.password, 10);
      const user = new UserModel({
        username: args.username,
        email: args.email,
        password: hashedPassword,
      });
      try{
        const newUser = await user.save();
      return {user: newUser, message: "User created."};
      }catch (error) {
        return { message: ` ${error}`};
      }
      
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
      return `${usernameOrEmail} successfully logged in.` ;
    },
    addEmployee: async (args) => {
      const employeeExist = await EmployeeModel.findOne({ email: args.email });
      if (employeeExist) {
        return {message: "Employee already exists."};
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
        return {employee: newEmployee, message: "Employee created."};
      } catch (error) {
        return { message: ` ${error}`};
      }
    },        
    searchEmployeeById: async ({ id }) => {
      try {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
          return { message: "Employee not found." };
        }
        return { employee, message: "Employee retrieved." };
      } catch (error) {
        return { message: `${error}` };
      }
    }
    ,
    
    updateEmployeeById: async ({ id, ...empFields }) => {
      const employee = await EmployeeModel.findById(id);
      if (!employee) {
        return { message: "Employee not found." };
      }
      try{
        Object.assign(employee, empFields);
        await employee.save();
        return { employee: employee, message: "Employee updated." };
      }catch (error) {
        return { message: `Failed to update employee due to: ${error}`};
      }
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