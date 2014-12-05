/*
SQLyog Ultimate v8.3 
MySQL - 5.6.16 : Database - gradecalculator_db
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`gradecalculator_db` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `gradecalculator_db`;

/*Table structure for table `classes` */

CREATE TABLE `classes` (
  `class_number` varchar(64) NOT NULL,
  `class_title` varchar(64) NOT NULL,
  `class_description` varchar(64) NOT NULL,
  `class_professor_name` varchar(64) DEFAULT NULL,
  `class_greensheet_file` varchar(128) NOT NULL,
  PRIMARY KEY (`class_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `grades` */

CREATE TABLE `grades` (
  `user_email` varchar(64) NOT NULL,
  `user_class_number` varchar(64) NOT NULL,
  `grade_a` float NOT NULL DEFAULT '90',
  `grade_b_min` float NOT NULL DEFAULT '80',
  `grade_b_max` float NOT NULL DEFAULT '89',
  `grade_c_min` float NOT NULL DEFAULT '70',
  `grade_c_max` float NOT NULL DEFAULT '79',
  `grade_d_min` float NOT NULL DEFAULT '60',
  `grade_d_max` float NOT NULL DEFAULT '69',
  `grade_f` float NOT NULL DEFAULT '59',
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `maximum_points` */

CREATE TABLE `maximum_points` (
  `user_email` varchar(64) NOT NULL,
  `user_class_number` varchar(64) NOT NULL,
  `user_max_homework_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `user_max_labs_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `user_max_project_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `user_max_presentation_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `user_max_midterm_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  `user_max_final_points` int(10) unsigned zerofill NOT NULL DEFAULT '0000000000',
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `scaling` */

CREATE TABLE `scaling` (
  `user_email` varchar(64) NOT NULL,
  `user_class_number` varchar(64) NOT NULL,
  `scale_homework` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `scale_labs` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `scale_project` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `scale_presentation` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `scale_midterm` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  `scale_final` float unsigned zerofill NOT NULL DEFAULT '000000000000',
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `user_classes_binding` */

CREATE TABLE `user_classes_binding` (
  `binding_number` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_email` varchar(64) NOT NULL,
  `user_class_number` varchar(64) NOT NULL,
  PRIMARY KEY (`binding_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Table structure for table `user_marks` */

CREATE TABLE `user_marks` (
  `user_email` varchar(64) NOT NULL,
  `user_class_number` varchar(64) NOT NULL,
  `user_homework_marks` float unsigned NOT NULL DEFAULT '0',
  `user_labs_marks` float unsigned NOT NULL DEFAULT '0',
  `user_project_marks` float unsigned NOT NULL DEFAULT '0',
  `user_presentation_marks` float unsigned NOT NULL DEFAULT '0',
  `user_midterm_marks` float unsigned NOT NULL DEFAULT '0',
  `user_final_marks` float unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_email`,`user_class_number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `users` */

CREATE TABLE `users` (
  `user_number` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Users unique number',
  `user_email` varchar(64) NOT NULL,
  `user_first_name` varchar(64) NOT NULL,
  `user_last_name` varchar(64) NOT NULL,
  `user_phone_number` varchar(64) NOT NULL,
  `user_student_id` varchar(64) NOT NULL,
  `user_password` varchar(128) NOT NULL,
  `user_profile_pic` varchar(128) DEFAULT NULL,
  `user_access_token` varchar(512) DEFAULT NULL,
  `user_type` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
