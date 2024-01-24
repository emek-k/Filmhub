-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sty 18, 2024 at 03:57 PM
-- Wersja serwera: 8.2.0
-- Wersja PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `użytkownicy`
--
CREATE DATABASE IF NOT EXISTS `użytkownicy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `użytkownicy`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kolejka`
--

DROP TABLE IF EXISTS `kolejka`;
CREATE TABLE IF NOT EXISTS `kolejka` (
  `IDUżytkownik` int NOT NULL,
  `IDFilm` int NOT NULL,
  PRIMARY KEY (`IDUżytkownik`,`IDFilm`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `obejrzane`
--

DROP TABLE IF EXISTS `obejrzane`;
CREATE TABLE IF NOT EXISTS `obejrzane` (
  `IDUżytkownik` int NOT NULL,
  `IDFilm` int NOT NULL,
  PRIMARY KEY (`IDUżytkownik`,`IDFilm`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ulubione`
--

DROP TABLE IF EXISTS `ulubione`;
CREATE TABLE IF NOT EXISTS `ulubione` (
  `IDUżytkownik` int NOT NULL,
  `IDFilm` int NOT NULL,
  PRIMARY KEY (`IDUżytkownik`,`IDFilm`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ulubione`
--

INSERT INTO `ulubione` (`IDUżytkownik`, `IDFilm`) VALUES
(1, 1),
(1, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `użytkownicy`
--

DROP TABLE IF EXISTS `użytkownicy`;
CREATE TABLE IF NOT EXISTS `użytkownicy` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(100) NOT NULL,
  `Hasło` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `użytkownicy`
--

INSERT INTO `użytkownicy` (`Id`, `Username`, `Hasło`, `Email`) VALUES
(1, 'A', 'a', 'Izual400@gmail.com'),
(3, 'C', 'c', 'Izual400@gmail.com');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
