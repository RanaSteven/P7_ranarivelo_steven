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
  `status_moderation` tinyint(1) NOT NULL,
  PRIMARY KEY (`idComments`,`Posts_idPosts`,`Posts_Utilisateurs_id`,`Utilisateurs_id`),
  KEY `fk_Comments_Posts1_idx` (`Posts_idPosts`,`Posts_Utilisateurs_id`),
  KEY `fk_Comments_Utilisateurs1_idx` (`Utilisateurs_id`),
  CONSTRAINT `fk_Comments_Posts1` FOREIGN KEY (`Posts_idPosts`, `Posts_Utilisateurs_id`) REFERENCES `Posts` (`idPosts`, `Utilisateurs_id`),
  CONSTRAINT `fk_Comments_Utilisateurs1` FOREIGN KEY (`Utilisateurs_id`) REFERENCES `Utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (13,49,54,8,'Ça va merci et vous ?',1),(14,49,54,54,'Super merci !',1),(15,49,54,8,'Au plaisir !',0),(19,50,8,8,'Coucou !!',0),(24,51,54,8,'Moi aussi c\'était trop cool !',0),(36,51,54,8,'test Commentaire 24',1),(37,51,54,54,'test commentaire 25',1),(38,79,8,8,'Test commentaire 26',1);
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
  `status_moderation` tinyint(1) NOT NULL,
  `urls_images` json DEFAULT NULL,
  PRIMARY KEY (`idPosts`,`Utilisateurs_id`),
  KEY `fk_Posts_Utilisateurs_idx` (`Utilisateurs_id`),
  CONSTRAINT `fk_Posts_Utilisateurs` FOREIGN KEY (`Utilisateurs_id`) REFERENCES `Utilisateurs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (49,'Salut, comment allez-vous ?',54,0,NULL),(50,'Coucou, nouvelle ici, enchantée !',8,1,NULL),(51,'Je me suis bien amusé aujourd\'hui c\'était sympa !!',54,1,NULL),(52,'Bonne Soirée à vous !',8,0,NULL),(53,'Soutenance projet 7',8,0,NULL),(79,'Salut 25 Mars',8,1,NULL),(84,'Bienvenu 26 Mars',54,0,'[\"http://localhost:3000/images/marvel-logo.png1616751743663.png\"]'),(85,'Bienvenu',54,1,'[\"http://localhost:3000/images/giphy1.gif1616755817636.undefined\"]');
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
  `droit` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Utilisateurs`
--

LOCK TABLES `Utilisateurs` WRITE;
/*!40000 ALTER TABLE `Utilisateurs` DISABLE KEYS */;
INSERT INTO `Utilisateurs` VALUES (8,'LEA','TOT','lt@gmail.com','TL','$2b$10$EBP4lQaLeCLdQegwx3iUyejk0/NDyXnLWLkqucgBlgPXW7rbkTdLm',1),(54,'Steven','RANARIVELO','sr@gmail.com','RSteven','$2b$10$Pj60Ghqm6B73wJsGRC8UnuzSNwdZpMtJ1Ya/nEGMB6Rmu7VUS6//S',0),(65,'user','admin','admin@gmail.com','admin','$2b$10$vCvXVKqnWSbfNjeg9VhS4.kevi1bJG2QAujekPWdXWGd0v5fItLlu',1),(66,'user','user','user@gmail.com','user','$2b$10$V//m.kF.kFyg8Xz1oWtwM.HAoiW4ivAxq2iwX3I8vne24W2aG2emq',1);
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

-- Dump completed on 2021-03-26 13:06:15
