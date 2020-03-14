-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 14, 2020 at 07:43 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `l4LcSSvOu5`
--

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `ItemId` int(11) DEFAULT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `OwnerId` int(11) DEFAULT NULL,
  `Description` varchar(2000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDateTime` timestamp NULL DEAFULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Rent`
--

CREATE TABLE `Rent` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RentId` int(11) DEFAULT NULL,
  `CustomerId` int(11) DEFAULT NULL,
  `ItemId` int(11) DEFAULT NULL,
  `RentStatusId` int(11) DEFAULT NULL,
  `RentStartDate` datetime DEFAULT NULL,
  `RentEndDate` datetime DEFAULT NULL,
  `StartDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDateTime` timestamp NULL DEAFULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RentStatus`
--

CREATE TABLE `RentStatus` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RentStatusId` int(11) DEFAULT NULL,
  `Name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDateTime` timestamp NULL DEAFULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `RoleId` int(11) DEFAULT NULL,
  `Name` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `Description` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDateTime` timestamp NULL DEAFULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserRole`
--

CREATE TABLE `UserRole` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) NOT NULL,
  `RoleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `Name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Email` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `Password` varchar(200) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `StartDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `EndDateTime` timestamp NULL DEAFULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `ItemId` (`ItemId`),
  ADD KEY `OwnerId` (`OwnerId`);

--
-- Indexes for table `Rent`
--
ALTER TABLE `Rent`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `CustomerId` (`CustomerId`),
  ADD KEY `RentId` (`RentId`),
  ADD KEY `StatusId` (`RentStatusId`),
  ADD KEY `RentItemId` (`ItemId`);

--
-- Indexes for table `RentStatus`
--
ALTER TABLE `RentStatus`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RentStatus` (`RentStatusId`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleId` (`RoleId`);

--
-- Indexes for table `UserRole`
--
ALTER TABLE `UserRole`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `RoleUserId` (`UserId`),
  ADD KEY `RoleRoleId` (`RoleId`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserId` (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `ItemId` FOREIGN KEY (`ItemId`) REFERENCES `Items` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Rent`
--
ALTER TABLE `Rent`
  ADD CONSTRAINT `RentId` FOREIGN KEY (`RentId`) REFERENCES `Rent` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `RentItemId` FOREIGN KEY (`ItemId`) REFERENCES `Items` (`itemid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `StatusId` FOREIGN KEY (`RentStatusId`) REFERENCES `RentStatus` (`rentstatusid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `RentStatus`
--
ALTER TABLE `RentStatus`
  ADD CONSTRAINT `RentStatus` FOREIGN KEY (`RentStatusId`) REFERENCES `RentStatus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Roles`
--
ALTER TABLE `Roles`
  ADD CONSTRAINT `RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `UserRole`
--
ALTER TABLE `UserRole`
  ADD CONSTRAINT `RoleRoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`roleid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
