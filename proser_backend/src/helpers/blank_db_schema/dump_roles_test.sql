-- MySQL dump 10.17  Distrib 10.3.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: roles_test
-- ------------------------------------------------------
-- Server version	10.3.13-MariaDB-1:10.3.13+maria~bionic-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ACL`
--

DROP TABLE IF EXISTS `ACL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ACL` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `property` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `accessType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `permission` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalId` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `AccessToken`
--

DROP TABLE IF EXISTS `AccessToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccessToken` (
  `id` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ttl` int(11) DEFAULT NULL,
  `scopes` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HcaAgent`
--

DROP TABLE IF EXISTS `HcaAgent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HcaAgent` (
  `hca_agent_id` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `hca_agent_text_key` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_date` datetime DEFAULT NULL,
  `hca_agent_date_text` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_start` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_agent_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_legal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_internal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_agent_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_agente_extension` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_supervisor_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_supervisor_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_schedule_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_schedule_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_schedule_start` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_schedule_end` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_min_start` int(10) DEFAULT NULL,
  `hca_agent_min_end` int(10) DEFAULT NULL,
  `hca_agent_key_cdr` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_agent_key_audit` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`hca_agent_id`),
  KEY `hca_agent_text_key` (`hca_agent_text_key`),
  KEY `hca_agent_agent_id` (`hca_agent_agent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `HcaQueue`
--

DROP TABLE IF EXISTS `HcaQueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `HcaQueue` (
  `hca_queue_id` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `hca_queue_text_key` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_date` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_date_text` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_start` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_queue_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hcs_queue_queue_number` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_queue_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_client_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_client_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_service_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_service_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_scale_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_scale_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `hca_queue_scale_red` int(10) DEFAULT NULL,
  `hca_queue_scale_yellow` int(10) DEFAULT NULL,
  `hca_queue_scale_green` int(10) DEFAULT NULL,
  `hca_queue_scale_blue` int(10) DEFAULT NULL,
  PRIMARY KEY (`hca_queue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvAgent`
--

DROP TABLE IF EXISTS `InvAgent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvAgent` (
  `inv_agent_id` int(10) NOT NULL,
  `inv_agent_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_chk` int(10) DEFAULT NULL,
  `inv_agent_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_extension` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_legal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_internal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_supervisor_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_supervisor_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_schedule_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_schedule_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_password` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_agent_eccp_password` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_agent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvBreak`
--

DROP TABLE IF EXISTS `InvBreak`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvBreak` (
  `inv_break_id` int(10) NOT NULL,
  `inv_break_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_break_chk` int(10) DEFAULT NULL,
  `inv_break_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_break_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_break_description` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_break_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_break_productivity` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_break_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvCampaign`
--

DROP TABLE IF EXISTS `InvCampaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvCampaign` (
  `inv_campaign_id` int(10) NOT NULL,
  `inv_campaign_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_chk` int(10) DEFAULT NULL,
  `inv_campaign_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_description` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_queue_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_queue_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_queue_number` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_aftercall_time` int(10) DEFAULT NULL,
  `inv_campaign_start` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_end` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_campaign_start_date_text` date DEFAULT NULL,
  `inv_campaign_end_date_text` date DEFAULT NULL,
  `inv_campaign_start_time_text` time DEFAULT NULL,
  `inv_campaign_end_time_text` time DEFAULT NULL,
  PRIMARY KEY (`inv_campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvClient`
--

DROP TABLE IF EXISTS `InvClient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvClient` (
  `inv_client_id` int(10) NOT NULL,
  `inv_client_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_client_chk` int(10) DEFAULT NULL,
  `inv_client_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_client_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_client_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvPerson`
--

DROP TABLE IF EXISTS `InvPerson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvPerson` (
  `inv_person_legal_id` int(11) NOT NULL,
  `inv_person_internal_id` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_person_full_name` varchar(150) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_person_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_person_chk` int(10) DEFAULT NULL,
  PRIMARY KEY (`inv_person_legal_id`),
  KEY `inv_person_internal_id` (`inv_person_internal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvQueue`
--

DROP TABLE IF EXISTS `InvQueue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvQueue` (
  `inv_queue_id` int(10) NOT NULL,
  `inv_queue_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_queue_chk` int(10) DEFAULT NULL,
  `inv_queue_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_queue_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_queue_number` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_queue_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_queue_use` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_queue_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvReport`
--

DROP TABLE IF EXISTS `InvReport`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvReport` (
  `inv_report_id` int(11) NOT NULL AUTO_INCREMENT,
  `inv_report_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_report_field` longtext COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_report_table` longtext COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvScale`
--

DROP TABLE IF EXISTS `InvScale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvScale` (
  `inv_scale_id` int(10) NOT NULL,
  `inv_scale_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_scale_chk` int(10) DEFAULT NULL,
  `inv_scale_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_scale_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_scale_red` int(10) DEFAULT NULL,
  `inv_scale_yellow` int(10) DEFAULT NULL,
  `inv_scale_green` int(10) DEFAULT NULL,
  `inv_scale_blue` int(10) DEFAULT NULL,
  PRIMARY KEY (`inv_scale_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvSchedule`
--

DROP TABLE IF EXISTS `InvSchedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvSchedule` (
  `inv_schedule_id` int(10) NOT NULL,
  `inv_schedule_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_schedule_chk` int(10) DEFAULT NULL,
  `inv_schedule_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_schedule_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_schedule_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_schedule_description` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_schedule_days` longtext COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_schedule_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvService`
--

DROP TABLE IF EXISTS `InvService`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvService` (
  `inv_service_id` int(10) NOT NULL,
  `inv_service_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_service_chk` int(10) DEFAULT NULL,
  `inv_service_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_service_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_service_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_service_use` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `InvSupervisor`
--

DROP TABLE IF EXISTS `InvSupervisor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `InvSupervisor` (
  `inv_supervisor_id` int(10) NOT NULL,
  `inv_supervisor_status` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_chk` int(10) DEFAULT NULL,
  `inv_supervisor_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_shortname` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_legal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_internal_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_schedule_id` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `inv_supervisor_schedule_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`inv_supervisor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MainAudit`
--

DROP TABLE IF EXISTS `MainAudit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MainAudit` (
  `audit_id` int(10) NOT NULL,
  `id_agent` int(10) DEFAULT NULL,
  `id_break` int(10) DEFAULT NULL,
  `datetime_init` datetime DEFAULT NULL,
  `datetime_end` datetime DEFAULT NULL,
  `duration` time DEFAULT NULL,
  `ext_parked` varchar(10) COLLATE utf8_spanish_ci DEFAULT NULL,
  `__TIME__` int(10) DEFAULT NULL,
  `audit_secs_duration` int(10) DEFAULT NULL,
  `audit_status` varchar(1) COLLATE utf8_spanish_ci DEFAULT NULL,
  `audit_date_agent_id` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `audit_date` date DEFAULT NULL,
  PRIMARY KEY (`audit_id`),
  KEY `audit_date` (`audit_date`),
  KEY `id_break` (`id_break`),
  KEY `audit_date_agent_id` (`audit_date_agent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `MainCdr`
--

DROP TABLE IF EXISTS `MainCdr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MainCdr` (
  `id` int(10) NOT NULL,
  `calldate` datetime DEFAULT NULL,
  `clid` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `src` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `dst` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `dcontext` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `channel` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `dstchannel` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `lastapp` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `lastdata` varchar(80) COLLATE utf8_spanish_ci DEFAULT NULL,
  `duration` int(10) DEFAULT NULL,
  `billsec` int(10) DEFAULT NULL,
  `disposition` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `amaflags` int(10) DEFAULT NULL,
  `accountcode` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `uniqueid` varchar(32) COLLATE utf8_spanish_ci DEFAULT NULL,
  `userfield` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `recordingfile` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cnum` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cnam` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `outbound_cnum` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `outbound_cnam` varchar(40) COLLATE utf8_spanish_ci DEFAULT NULL,
  `dst_cnam` varchar(40) COLLATE utf8_spanish_ci NOT NULL,
  `did` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `__CALLCENTER__` int(10) DEFAULT NULL,
  `cdr_main_callcenter_name` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `__CASE__` int(10) DEFAULT NULL,
  `cdr_main_case` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_main_subcase` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `__TYPE__` int(10) DEFAULT NULL,
  `cdr_type_queue` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_type_extension` varchar(50) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_type_tel_number` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_type_hca_agent_id` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_type_hca_queue_id` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `__DATES__` int(10) DEFAULT NULL,
  `cdr_date` date DEFAULT NULL,
  `cdr_dates_aaaa` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_aaaa_mm` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_aaaa_mm_dd` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_week` int(10) DEFAULT NULL,
  `cdr_dates_week_day` int(10) DEFAULT NULL,
  `cdr_dates_week_day_name` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_month` int(10) DEFAULT NULL,
  `cdr_dates_month_name` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_time` varchar(30) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_dates_minutes` int(10) DEFAULT NULL,
  `cdr_dates_seconds` int(10) DEFAULT NULL,
  `__QLOG__` int(10) DEFAULT NULL,
  `cdr_qlog_uniqueid` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_qlog_ivroption_time` datetime DEFAULT NULL,
  `cdr_qlog_enterqueue_time` datetime DEFAULT NULL,
  `cdr_qlog_connect_time` datetime DEFAULT NULL,
  `cdr_qlog_completecaller_time` datetime DEFAULT NULL,
  `cdr_qlog_completeagent_time` datetime DEFAULT NULL,
  `cdr_qlog_abandon_time` datetime DEFAULT NULL,
  `cdr_qlog_complete_time` datetime DEFAULT NULL,
  `__DURATION_TIME___` int(10) DEFAULT NULL,
  `cdr_qlog_secs_at_ivr` int(10) DEFAULT NULL,
  `cdr_qlog_secs_at_queue` int(10) DEFAULT NULL,
  `cdr_qlog_secs_with_agent` int(10) DEFAULT NULL,
  `cdr_qlog_secs_at_abandon` int(10) DEFAULT NULL,
  `cdr_duration_wait` int(10) DEFAULT NULL,
  `cdr_qlog_secs_at_hold` int(10) DEFAULT NULL,
  `cdr_qlog_secs_at_operation` int(10) DEFAULT NULL,
  `__QLOG_RESULT__` int(10) DEFAULT NULL,
  `cdr_qlog_result_hung_by` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_hung_agent` int(10) DEFAULT NULL,
  `__CLASIFICATION__` int(10) DEFAULT NULL,
  `cdr_call_type` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_call_class` varchar(20) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_call_production` int(10) DEFAULT NULL,
  `cdr_call_internal` int(10) DEFAULT NULL,
  `cdr_call_transfer` int(10) DEFAULT NULL,
  `cdr_call_in` int(10) DEFAULT NULL,
  `cdr_call_out` int(10) DEFAULT NULL,
  `cdr_call_in_auto` int(10) DEFAULT NULL,
  `__RECEIVED__` int(10) DEFAULT NULL,
  `cdr_call_received` int(10) DEFAULT NULL,
  `cdr_call_abandoned` int(10) DEFAULT NULL,
  `cdr_call_atended` int(10) DEFAULT NULL,
  `cdr_call_short` int(10) DEFAULT NULL,
  `cdr_call_before_time` int(10) DEFAULT NULL,
  `__MADE__` int(10) DEFAULT NULL,
  `cdr_call_made` int(10) DEFAULT NULL,
  `cdr_call_fail` int(10) DEFAULT NULL,
  `cdr_call_answered` int(10) DEFAULT NULL,
  `cdr_call_efective` int(10) DEFAULT NULL,
  `cdr_call_hungout` int(10) DEFAULT NULL,
  `__AUTOMATIC__` int(10) DEFAULT NULL,
  `cdr_call_auto_bbdd` int(10) DEFAULT NULL,
  `cdr_call_auto_run` int(10) DEFAULT NULL,
  `cdr_call_auto_left` int(10) DEFAULT NULL,
  `cdr_call_auto_turn` int(10) DEFAULT NULL,
  `__RESULTS__` int(10) DEFAULT NULL,
  `cdr_call_result_inbound` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_call_result_outbound` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `cdr_call_result_auto` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cdr_type_hca_agent_id` (`cdr_type_hca_agent_id`),
  KEY `calldate` (`calldate`),
  KEY `cdr_type_hca_queue_id` (`cdr_type_hca_queue_id`),
  KEY `cdr_date` (`cdr_date`),
  KEY `cdr_call_received` (`cdr_call_received`),
  KEY `cdr_call_abandoned` (`cdr_call_abandoned`),
  KEY `cdr_call_atended` (`cdr_call_atended`),
  KEY `cdr_call_short` (`cdr_call_short`),
  KEY `cdr_call_before_time` (`cdr_call_before_time`),
  KEY `cdr_call_made` (`cdr_call_made`),
  KEY `cdr_call_fail` (`cdr_call_fail`),
  KEY `cdr_call_answered` (`cdr_call_answered`),
  KEY `cdr_call_efective` (`cdr_call_efective`),
  KEY `cdr_call_hungout` (`cdr_call_hungout`),
  KEY `cdr_call_auto_bbdd` (`cdr_call_auto_bbdd`),
  KEY `cdr_call_auto_run` (`cdr_call_auto_run`),
  KEY `cdr_call_auto_left` (`cdr_call_auto_left`),
  KEY `cdr_call_auto_turn` (`cdr_call_auto_turn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci ROW_FORMAT=COMPACT;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `description` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `RoleMapping`
--

DROP TABLE IF EXISTS `RoleMapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RoleMapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `principalType` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `principalId` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `principalId` (`principalId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `realm` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `username` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inv_agentes`
--

DROP TABLE IF EXISTS `inv_agentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inv_agentes` (
  `A` varchar(20) DEFAULT NULL,
  `B` varchar(19) DEFAULT NULL,
  `C` varchar(22) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  `ownerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ownerId` int(11) NOT NULL,
  `memberId` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Userbase`
--

DROP TABLE IF EXISTS `Userbase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Userbase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `lastname` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `profile` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `realm` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `username` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(512) COLLATE utf8_spanish_ci NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `verificationToken` varchar(512) COLLATE utf8_spanish_ci DEFAULT NULL,
  `memberId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-28  8:43:00
