-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 01, 2026 at 03:59 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `erpsoul`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_cliente`
--

CREATE TABLE `tb_cliente` (
  `id_cliente` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `dt_nasc` date NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `id_natureza` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_cliente`
--

INSERT INTO `tb_cliente` (`id_cliente`, `nome`, `cpf`, `cnpj`, `dt_nasc`, `id_endereco`, `id_natureza`, `id_status`, `id_usuario`) VALUES
(1, 'Cliente Teste', '61258128802', NULL, '1990-08-10', 1, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_conta`
--

CREATE TABLE `tb_conta` (
  `id_conta` int(11) NOT NULL,
  `fornecedor` varchar(50) DEFAULT NULL,
  `cliente` varchar(50) DEFAULT NULL,
  `dt_vencimento` date NOT NULL,
  `valor` float NOT NULL,
  `numero_documento` varchar(30) DEFAULT NULL,
  `competencia` varchar(50) DEFAULT NULL,
  `observacoes` varchar(250) DEFAULT NULL,
  `dt_pagamento` date DEFAULT NULL,
  `id_forma_pagamento` int(11) DEFAULT NULL,
  `id_tipo_conta` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_conta`
--

INSERT INTO `tb_conta` (`id_conta`, `fornecedor`, `cliente`, `dt_vencimento`, `valor`, `numero_documento`, `competencia`, `observacoes`, `dt_pagamento`, `id_forma_pagamento`, `id_tipo_conta`, `id_status`, `id_usuario`) VALUES
(1, 'Fornecedor Teste', NULL, '2026-02-20', 250, '12345678910', NULL, NULL, NULL, NULL, 1, 4, 1),
(2, NULL, 'Cliente Teste', '2026-02-20', 340, '1234567891011', NULL, NULL, NULL, NULL, 2, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id_empresa` int(11) NOT NULL,
  `nome_fantasia` varchar(50) NOT NULL,
  `razao_social` varchar(100) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(12) NOT NULL,
  `faturamento` varchar(16) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_endereco`
--

CREATE TABLE `tb_endereco` (
  `id_endereco` int(11) NOT NULL,
  `tipo_logradouro` varchar(30) DEFAULT NULL,
  `logradouro` varchar(60) NOT NULL,
  `numero` varchar(8) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `bairro` varchar(45) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_endereco`
--

INSERT INTO `tb_endereco` (`id_endereco`, `tipo_logradouro`, `logradouro`, `numero`, `cep`, `bairro`, `cidade`, `uf`) VALUES
(1, NULL, 'Praça Pero Afonso', '123', '04840600', 'Conjunto Habitacional Brigadeiro Faria Lima', 'São Paulo', 'SP');

-- --------------------------------------------------------

--
-- Table structure for table `tb_forma_pagamento`
--

CREATE TABLE `tb_forma_pagamento` (
  `id_forma_pagamento` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_forma_pagamento`
--

INSERT INTO `tb_forma_pagamento` (`id_forma_pagamento`, `tipo`, `descricao`) VALUES
(1, 1, 'PIX'),
(2, 2, 'Cartão de Crédito'),
(3, 3, 'Cartão de Débito'),
(4, 4, 'Dinheiro'),
(5, 5, 'Boleto');

-- --------------------------------------------------------

--
-- Table structure for table `tb_natureza`
--

CREATE TABLE `tb_natureza` (
  `id_natureza` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_natureza`
--

INSERT INTO `tb_natureza` (`id_natureza`, `tipo`, `descricao`) VALUES
(1, 1, 'Pessoa Física'),
(2, 2, 'Pessoa Jurídica');

-- --------------------------------------------------------

--
-- Table structure for table `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id_produto` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `preco_custo` float DEFAULT NULL,
  `preco_venda` float DEFAULT NULL,
  `sku` varchar(50) NOT NULL,
  `codigo_de_barras` varchar(50) NOT NULL,
  `quantidade` varchar(14) DEFAULT NULL,
  `dt_validade` date DEFAULT NULL,
  `descricao` varchar(250) DEFAULT NULL,
  `id_tipo_produto` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_produto`
--

INSERT INTO `tb_produto` (`id_produto`, `nome`, `marca`, `preco_custo`, `preco_venda`, `sku`, `codigo_de_barras`, `quantidade`, `dt_validade`, `descricao`, `id_tipo_produto`, `id_status`, `id_usuario`) VALUES
(1, 'Produto Teste', 'Marca Produto', 10, 12, '12345678910', '10987654321', '60', NULL, NULL, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_produtos_venda`
--

CREATE TABLE `tb_produtos_venda` (
  `id_produtos_venda` int(11) NOT NULL,
  `preco_unitario` float NOT NULL,
  `quantidade` varchar(14) NOT NULL,
  `id_produto` int(11) NOT NULL,
  `id_venda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_produtos_venda`
--

INSERT INTO `tb_produtos_venda` (`id_produtos_venda`, `preco_unitario`, `quantidade`, `id_produto`, `id_venda`) VALUES
(1, 12, '40', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_servico`
--

CREATE TABLE `tb_servico` (
  `id_servico` int(11) NOT NULL,
  `servico` varchar(100) NOT NULL,
  `cod_servico` varchar(14) NOT NULL,
  `cod_lc` float NOT NULL,
  `aliquota_iss` float NOT NULL,
  `valor_servico` float NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `dt_inicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `dt_vencimento` date NOT NULL,
  `id_natureza` int(11) NOT NULL,
  `id_status` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_servico`
--

INSERT INTO `tb_servico` (`id_servico`, `servico`, `cod_servico`, `cod_lc`, `aliquota_iss`, `valor_servico`, `descricao`, `dt_inicio`, `dt_vencimento`, `id_natureza`, `id_status`, `id_cliente`, `id_usuario`) VALUES
(1, 'Serviço Teste', '123456', 12345, 12.34, 12000, '', '2026-02-01 02:54:21', '2026-02-10', 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_status`
--

CREATE TABLE `tb_status` (
  `id_status` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_status`
--

INSERT INTO `tb_status` (`id_status`, `tipo`, `descricao`) VALUES
(1, 1, 'INATIVO'),
(2, 2, 'ATIVO'),
(3, 3, 'CONCLUÍDO'),
(4, 4, 'EM ANDAMENTO'),
(5, 5, 'VENCIDO'),
(6, 6, 'CANCELADO'),
(7, 7, 'FORA DE LINHA'),
(8, 8, 'ESTORNADA');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_conta`
--

CREATE TABLE `tb_tipo_conta` (
  `id_tipo_conta` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_tipo_conta`
--

INSERT INTO `tb_tipo_conta` (`id_tipo_conta`, `tipo`, `descricao`) VALUES
(1, 1, 'A pagar'),
(2, 2, 'A receber');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_produto`
--

CREATE TABLE `tb_tipo_produto` (
  `id_tipo_produto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_tipo_produto`
--

INSERT INTO `tb_tipo_produto` (`id_tipo_produto`, `tipo`, `descricao`) VALUES
(1, 1, 'Próprio'),
(2, 2, 'Terceiro');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tokens`
--

CREATE TABLE `tb_tokens` (
  `id_token` int(11) NOT NULL,
  `token` varchar(512) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `expira_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_tokens`
--

INSERT INTO `tb_tokens` (`id_token`, `token`, `criado_em`, `expira_em`, `id_usuario`) VALUES
(12, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2OTkxNDI3MiwiZXhwIjoxNzcwMDAwNjcyfQ.qyoTD8fQLuah5d_-QgGE8a6PeWIE3-DTiuxuYlL8wJ8', '2026-02-01 02:51:12', '2026-02-02 02:51:12', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `hash` varchar(60) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `telefone` varchar(14) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `faturamento` float DEFAULT NULL,
  `foto` longblob DEFAULT NULL,
  `id_status` int(11) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_usuario`
--

INSERT INTO `tb_usuario` (`id_usuario`, `nome`, `email`, `senha`, `hash`, `cpf`, `cnpj`, `telefone`, `cargo`, `faturamento`, `foto`, `id_status`, `id_endereco`, `id_empresa`) VALUES
(1, 'Conta Teste', 'teste@erpsoul.com', '$2b$10$aOapFLX5h2g5J7.CmOsZGuzA5bZnTtvkhZxtVbGRj7TRMqdOnNYbW', '$2b$10$o.OsjWMLw1bY790dGPTOuemxs22mk6GKd/p0WoaY.XVkxov0AT.Ci', '04937494899', NULL, '11993567314', 'Gerente', 10000, NULL, 2, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_venda`
--

CREATE TABLE `tb_venda` (
  `id_venda` int(11) NOT NULL,
  `dt_venda` date NOT NULL,
  `total_venda` float NOT NULL,
  `observacoes` varchar(250) DEFAULT NULL,
  `id_forma_pagamento` int(11) DEFAULT NULL,
  `id_status` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_venda`
--

INSERT INTO `tb_venda` (`id_venda`, `dt_venda`, `total_venda`, `observacoes`, `id_forma_pagamento`, `id_status`, `id_cliente`, `id_usuario`) VALUES
(1, '2026-01-31', 480, NULL, NULL, 4, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `UNIQUE` (`cpf`,`cnpj`),
  ADD KEY `FOREIGN` (`id_endereco`,`id_natureza`,`id_status`,`id_usuario`) USING BTREE;

--
-- Indexes for table `tb_conta`
--
ALTER TABLE `tb_conta`
  ADD PRIMARY KEY (`id_conta`),
  ADD KEY `FOREIGN` (`id_forma_pagamento`,`id_tipo_conta`,`id_status`,`id_usuario`);

--
-- Indexes for table `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `UNIQUE` (`cnpj`,`email`),
  ADD KEY `FOREIGN` (`id_endereco`);

--
-- Indexes for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  ADD PRIMARY KEY (`id_endereco`);

--
-- Indexes for table `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  ADD PRIMARY KEY (`id_forma_pagamento`);

--
-- Indexes for table `tb_natureza`
--
ALTER TABLE `tb_natureza`
  ADD PRIMARY KEY (`id_natureza`);

--
-- Indexes for table `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `FOREIGN` (`id_tipo_produto`,`id_status`,`id_usuario`);

--
-- Indexes for table `tb_produtos_venda`
--
ALTER TABLE `tb_produtos_venda`
  ADD PRIMARY KEY (`id_produtos_venda`),
  ADD KEY `FOREIGN` (`id_produto`,`id_venda`) USING BTREE;

--
-- Indexes for table `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD PRIMARY KEY (`id_servico`),
  ADD KEY `FOREIGN` (`id_natureza`,`id_status`,`id_cliente`,`id_usuario`);

--
-- Indexes for table `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`id_status`);

--
-- Indexes for table `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  ADD PRIMARY KEY (`id_tipo_conta`);

--
-- Indexes for table `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  ADD PRIMARY KEY (`id_tipo_produto`);

--
-- Indexes for table `tb_tokens`
--
ALTER TABLE `tb_tokens`
  ADD PRIMARY KEY (`id_token`),
  ADD KEY `FOREIGN` (`id_usuario`);

--
-- Indexes for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UNIQUE` (`email`,`cpf`,`cnpj`),
  ADD KEY `FOREIGN` (`id_status`,`id_endereco`,`id_empresa`);

--
-- Indexes for table `tb_venda`
--
ALTER TABLE `tb_venda`
  ADD PRIMARY KEY (`id_venda`),
  ADD KEY `FOREIGN` (`id_forma_pagamento`,`id_status`,`id_cliente`,`id_usuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_conta`
--
ALTER TABLE `tb_conta`
  MODIFY `id_conta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  MODIFY `id_forma_pagamento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_natureza`
--
ALTER TABLE `tb_natureza`
  MODIFY `id_natureza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_produtos_venda`
--
ALTER TABLE `tb_produtos_venda`
  MODIFY `id_produtos_venda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_servico`
--
ALTER TABLE `tb_servico`
  MODIFY `id_servico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_status`
--
ALTER TABLE `tb_status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  MODIFY `id_tipo_conta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  MODIFY `id_tipo_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_tokens`
--
ALTER TABLE `tb_tokens`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_venda`
--
ALTER TABLE `tb_venda`
  MODIFY `id_venda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
