-- Script para criar a tabela contact_form_submissions
-- Execute este script no phpMyAdmin do banco isoart_site

CREATE TABLE `contact_form_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `solution` varchar(100) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comentário da tabela
ALTER TABLE `contact_form_submissions` COMMENT = 'Submissões do formulário de contato do site'; 