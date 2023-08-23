CREATE DATABASE IF NOT EXISTS companydb;
USE companydb;

CREATE TABLE employee(
    id int(11) NOT NULL AUTO_INCREMENT,
    name varchar(45) DEFAULT NULL,
    salary int(5) DEFAULT NULL,
    PRIMARY KEY(id)
)

DESCRIBE employee;

