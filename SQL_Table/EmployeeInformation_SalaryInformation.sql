CREATE DATABASE EmployeeInfo;
USE EmployeeInfo;

CREATE TABLE Employee (
    EmployeeId INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeName VARCHAR(255),
    Department VARCHAR(255),
    Sex VARCHAR(10),
    MaritalStatus VARCHAR(20),
    Address VARCHAR(255));
    
  CREATE TABLE SalaryInformation (
    SalaryId INT PRIMARY KEY AUTO_INCREMENT,
    EmployeeId INT,
    Salary DECIMAL(10, 2),
    FOREIGN KEY (EmployeeId) REFERENCES Employee(EmployeeId)
);
  
DESCRIBE Employee;
DESCRIBE SalaryInformation;

