-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 30 oct. 2022 à 11:53
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `retraites`
--

-- --------------------------------------------------------

--
-- Structure de la table `retraites`
--

DROP TABLE IF EXISTS `retraites`;
CREATE TABLE IF NOT EXISTS `retraites` (
  `idRetraite` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(120) NOT NULL,
  `postnom` varchar(112) NOT NULL,
  `prenom` varchar(120) NOT NULL,
  `numeroPhone` varchar(24) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `profession` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `dateDeRetraites` varchar(255) NOT NULL,
  `solde` varchar(120) NOT NULL,
  `nbreAnnesServices` int NOT NULL,
  `descrip` varchar(255) NOT NULL,
  PRIMARY KEY (`idRetraite`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `retraites`
--

INSERT INTO `retraites` (`idRetraite`, `nom`, `postnom`, `prenom`, `numeroPhone`, `photo`, `profession`, `grade`, `adresse`, `dateDeRetraites`, `solde`, `nbreAnnesServices`, `descrip`) VALUES
(1, 'Stéphane KIKONI', 'DOSA', 'Cronos', '0817247035', 'KIKONI.JPG', 'Développeur', 'DG', 'AV de la SCIENCE 5 GOMBE', '2022-10-02', '1200', 2, 'Bon développeur'),
(4, 'REGIDESO', 'DOSA', 'Pierre', '0817247035', 'phpMZw257_1.jpg', 'Manager', 'CPT', 'Av. Huilerie n°1', '2022-10-20', '223', 12, 'Moyen mais généreux'),
(3, 'CREAS', 'MULUMEODERWAGGG', 'Stéphane', '0817247035', '4k_wallpaper_black_and_white_Bone_close_up_creepy_dark_dead_eerie-1563621.jpg!d.jpeg', 'Développeur', 'CPT', 'AV LODJA GOMBE, N°8', '2022-10-21', '123', 6, 'Bon dév doux');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`idUser`, `username`, `email`, `password`) VALUES
(1, 'StephaneCash', 'kikonistephane@gmail.com', '1111');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
