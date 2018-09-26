-- Drops the census_db if it exists currently --
DROP DATABASE IF EXISTS census_db;
-- Creates the "census_db" database --
CREATE DATABASE census_db;
USE census_db;

CREATE TABLE censusdata
(
  id INT NOT NULL AUTO_INCREMENT,
  reducedName TEXT(100) NULL,
  areaname TEXT(100) NULL,
  stateCounty INT(40) NULL,
  totalPopulation INT(40) NULL,
  populationUnder18 INT(40) NULL,
  populationOver65 INT(40) NULL,
  familiesBelowPovertyLevel INT(40) NULL,
  medianFamilyIncome INT(40) NULL,
  meanFamilyIncome INT(40) NULL,
  incomeLessThan10K INT(40) NULL,
  incomeBtw10And15K INT(40) NULL,
  incomeBtw15And20K INT(40) NULL,
  incomeBtw20And25K INT(40) NULL,
  incomeBtw25And30K INT(40) NULL,
  incomeBtw30And35K INT(40) NULL,
  incomeBtw35And40K INT(40) NULL,
  incomeBtw40And45K INT(40) NULL,
  incomeBtw45And50K INT(40) NULL,
  incomeBtw50And60K INT(40) NULL,
  incomeBtw60And75K INT(40) NULL,
  incomeBtw75And100K INT(40) NULL,
  incomeBtw100And125K INT(40) NULL,
  incomeBtw125And150K INT(40) NULL,
  incomeBtw150And200K INT(40) NULL,
  income200Plus INT(40) NULL,
  unemploymentRate2009 INT(40) NULL,
  unemploymentRate2010 INT(40) NULL,
  percentageDem1980 INT(40) NULL,
  percentageDem1984 INT(40) NULL,
  percentageDem1988 INT(40) NULL,
  percentageDem1992 INT(40) NULL,
  percentageDem1996 INT(40) NULL,
  percentageDem2000 INT(40) NULL,
  percentageDem2004 INT(40) NULL,
  percentageDem2008 INT(40) NULL,
  percentageRep1980 INT(40) NULL,
  percentageRep1984 INT(40) NULL,
  percentageRep1988 INT(40) NULL,
  percentageRep1992 INT(40) NULL,
  percentageRep1996 INT(40) NULL,
  percentageRep2000 INT(40) NULL,
  percentageRep2004 INT(40) NULL,
  percentageRep2008 INT(40) NULL,
  whitePopulation INT(40) NULL,
  blackPopulation INT(40) NULL,
  americanIndianAndAlaskanNativePopulation INT(40) NULL,
  asianPopulation INT(40) NULL,
  nativeHawaiianAndPacificIslanderPopulation INT(40) NULL,
  twoOrMoreRacesPopulation INT(40) NULL,
  hispanicOrLatinoPopulation INT(40) NULL,
  PRIMARY KEY (id)
);