-- MySQL dump 10.13  Distrib 8.0.23, for macos10.15 (x86_64)
--
-- Host: localhost    Database: Groupomania
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Groupomania`;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `idComments` int NOT NULL AUTO_INCREMENT,
  `Posts_idPosts` int NOT NULL,
  `Posts_Utilisateurs_id` int NOT NULL,
  `Utilisateurs_id` int NOT NULL,
  `contents` varchar(255) NOT NULL,
  PRIMARY KEY (`idComments`,`Posts_idPosts`,`Posts_Utilisateurs_id`,`Utilisateurs_id`),
  KEY `fk_Comments_Posts1_idx` (`Posts_idPosts`,`Posts_Utilisateurs_id`),
  KEY `fk_Comments_Utilisateurs1_idx` (`Utilisateurs_id`),
  CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_idPosts`, `Posts_Utilisateurs_id`) REFERENCES `Posts` (`idPosts`, `Utilisateurs_id`),
  CONSTRAINT `fk_Comments_Utilisateurs1` FOREIGN KEY (`Utilisateurs_id`) REFERENCES `Utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (13,49,54,8,'Ça va merci et vous ?'),(14,49,54,54,'Super merci !'),(15,49,54,8,'Au plaisir !');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `idPosts` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `Utilisateurs_id` int NOT NULL,
  PRIMARY KEY (`idPosts`,`Utilisateurs_id`),
  KEY `fk_Posts_Utilisateurs_idx` (`Utilisateurs_id`),
  CONSTRAINT `fk_Posts_Utilisateurs` FOREIGN KEY (`Utilisateurs_id`) REFERENCES `Utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (49,'Salut, comment allez-vous ?',54),(50,'Coucou, nouvelle ici, enchantée !',8);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Utilisateurs`
--

DROP TABLE IF EXISTS `Utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Utilisateurs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(45) NOT NULL,
  `nom` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pseudo` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Utilisateurs`
--

LOCK TABLES `Utilisateurs` WRITE;
/*!40000 ALTER TABLE `Utilisateurs` DISABLE KEYS */;
INSERT INTO `Utilisateurs` VALUES (8,'Lea','Tota','lt@gmail.com','TLea','$2b$10$Q3g3qKb.T/LO65bDUwdl5.Z83vbWwRYhqTrIZzz3/CTKdGWCmWU8y'),(54,'Steven','Rana','sr@gmail.com','RSteven27','$2b$10$Pj60Ghqm6B73wJsGRC8UnuzSNwdZpMtJ1Ya/nEGMB6Rmu7VUS6//S');
/*!40000 ALTER TABLE `Utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-22 14:36:17
