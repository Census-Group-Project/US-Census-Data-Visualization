-- Drops the census1_db if it exists currently --
DROP DATABASE IF EXISTS census1_db;
-- Creates the "census1_db" database --
CREATE DATABASE census1_db;
USE census1_db;

CREATE TABLE census123
(
  id INT NOT NULL AUTO_INCREMENT,
  Areaname TEXT(100) NULL,
  STCOU INT(40) NULL,
  PST100209D INT(40) NULL,
  PRIMARY KEY (id)
);