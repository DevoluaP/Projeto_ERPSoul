-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2026 at 03:33 AM
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
-- Database: `dberpsoul`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_acl`
--

CREATE TABLE `tb_acl` (
  `id_acl` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) NOT NULL,
  `id_perfil` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_acl`
--

INSERT INTO `tb_acl` (`id_acl`, `tipo`, `descricao`, `id_perfil`) VALUES
(1, 1, 'MASTER', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_assinatura_plano`
--

CREATE TABLE `tb_assinatura_plano` (
  `id_assinatura_plano` int(11) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_expedicao` date NOT NULL,
  `id_dados_bancario` int(11) NOT NULL,
  `id_plano` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_bandeira`
--

CREATE TABLE `tb_bandeira` (
  `id_bandeira` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_categoria_conta`
--

CREATE TABLE `tb_categoria_conta` (
  `id_categoria_conta` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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
  `id_tipo_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_status` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_competencia`
--

CREATE TABLE `tb_competencia` (
  `id_competencia` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_conta`
--

CREATE TABLE `tb_conta` (
  `id_conta` int(11) NOT NULL,
  `vencimento` date NOT NULL,
  `vencimento_original` date NOT NULL,
  `num_documento` varchar(30) NOT NULL,
  `id_finalidade_nf` int(11) NOT NULL,
  `id_nota_fiscal` int(11) NOT NULL,
  `id_forma_pagamento` int(2) NOT NULL,
  `id_categoria_conta` int(11) NOT NULL,
  `id_tipo_conta` int(11) NOT NULL,
  `id_status_conta` int(3) NOT NULL,
  `id_ocorrencia` int(11) NOT NULL,
  `id_portador` int(11) NOT NULL,
  `id_competencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_dados_bancario`
--

CREATE TABLE `tb_dados_bancario` (
  `id_dados_bancario` int(11) NOT NULL,
  `nome_cartao` varchar(100) NOT NULL,
  `numero_cartao` varchar(100) NOT NULL,
  `cvv` varchar(3) NOT NULL,
  `cpf_cartao` varchar(11) NOT NULL,
  `validade` date NOT NULL,
  `id_bandeira` int(2) NOT NULL,
  `id_tipo_cartao` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_empresa`
--

CREATE TABLE `tb_empresa` (
  `id_empresa` int(11) NOT NULL,
  `razao_social` varchar(100) NOT NULL,
  `nome_fantasia` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `telefone` varchar(12) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
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
  `cidade` varchar(30) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `bairro` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_finalidade_nf`
--

CREATE TABLE `tb_finalidade_nf` (
  `id_finalidade_nf` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_forma_pagamento`
--

CREATE TABLE `tb_forma_pagamento` (
  `id_forma_pagamento` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_fornecedor`
--

CREATE TABLE `tb_fornecedor` (
  `id_fornecedor` int(11) NOT NULL,
  `tb_fornecedorcol` varchar(45) NOT NULL,
  `razao_social` varchar(100) NOT NULL,
  `nome_fantasia` varchar(100) NOT NULL,
  `cnpj` varchar(14) NOT NULL,
  `responsavel` varchar(30) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_natureza`
--

CREATE TABLE `tb_natureza` (
  `id_natureza` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
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
-- Table structure for table `tb_nota_fiscal`
--

CREATE TABLE `tb_nota_fiscal` (
  `id_nota_fiscal` int(11) NOT NULL,
  `numero_serie` varchar(50) NOT NULL,
  `dt_emissão` date NOT NULL,
  `dt_hsaida` date NOT NULL COMMENT 'Data e Hora da saída nota fiscal',
  `id_unidade` int(11) NOT NULL,
  `id_venda` int(11) NOT NULL,
  `id_finalidade_nf` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_upload_nf` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_ocorrencia`
--

CREATE TABLE `tb_ocorrencia` (
  `id_ocorrencia` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_parcelamento`
--

CREATE TABLE `tb_parcelamento` (
  `id_parcelamento` int(11) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `qtd_parcela` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_perfil`
--

CREATE TABLE `tb_perfil` (
  `id_perfil` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_perfil`
--

INSERT INTO `tb_perfil` (`id_perfil`, `tipo`, `descricao`) VALUES
(1, 1, 'MASTER');

-- --------------------------------------------------------

--
-- Table structure for table `tb_plano`
--

CREATE TABLE `tb_plano` (
  `id_plano` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(30) NOT NULL,
  `preco` varchar(10) NOT NULL,
  `periodo` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_portador`
--

CREATE TABLE `tb_portador` (
  `id_portador` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_produto`
--

CREATE TABLE `tb_produto` (
  `id_produto` int(11) NOT NULL,
  `sku_produto` varchar(50) NOT NULL,
  `nome_produto` varchar(50) NOT NULL,
  `marca_produto` varchar(50) NOT NULL,
  `validade` date NOT NULL,
  `largura` float NOT NULL,
  `altura` float NOT NULL,
  `peso_liquido` float NOT NULL,
  `peso_bruto` float NOT NULL,
  `formato` varchar(20) NOT NULL,
  `gtinean` varchar(20) NOT NULL,
  `gtinean_tributario` varchar(20) NOT NULL,
  `id_portador` int(11) NOT NULL,
  `id_tipo_produto` int(11) NOT NULL,
  `id_unidade_medida` int(11) NOT NULL,
  `id_reabastecer_produto` int(11) NOT NULL,
  `id_fornecedor` int(11) NOT NULL,
  `id_status_produto` int(3) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_reabastecer_produto`
--

CREATE TABLE `tb_reabastecer_produto` (
  `id_reabastecer_produto` int(11) NOT NULL,
  `quantidade` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_servico`
--

CREATE TABLE `tb_servico` (
  `id_servico` int(11) NOT NULL,
  `servico` varchar(100) NOT NULL,
  `cod_servico` int(11) NOT NULL,
  `cod_lc` float NOT NULL,
  `aliquota_iss` float NOT NULL,
  `valor_servico` float NOT NULL,
  `descricao` varchar(250) NOT NULL,
  `dt_inicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `dt_vencimento` date NOT NULL,
  `id_natureza` int(1) NOT NULL,
  `id_status` int(3) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Triggers `tb_servico`
--
DELIMITER $$
CREATE TRIGGER `verifica_vencimento` BEFORE UPDATE ON `tb_servico` FOR EACH ROW BEGIN
    IF NEW.dt_vencimento < CURRENT_DATE AND OLD.id_status != 3 AND OLD.id_status != 5 AND OLD.id_status != 6 THEN
        SET NEW.id_status = 5;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `tb_status`
--

CREATE TABLE `tb_status` (
  `id_status` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_status`
--

INSERT INTO `tb_status` (`id_status`, `tipo`, `descricao`) VALUES
(1, 0, 'INATIVO'),
(2, 1, 'ATIVO'),
(3, 2, 'CONCLUÍDO'),
(4, 3, 'EM ANDAMENTO'),
(5, 4, 'VENCIDO'),
(6, 5, 'CANCELADO');

-- --------------------------------------------------------

--
-- Table structure for table `tb_status_conta`
--

CREATE TABLE `tb_status_conta` (
  `id_status_conta` int(3) NOT NULL,
  `tipo` int(3) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_status_produto`
--

CREATE TABLE `tb_status_produto` (
  `id_status_produto` int(2) NOT NULL,
  `tipo` int(2) NOT NULL,
  `descricao` varchar(50) NOT NULL,
  `id_portador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_cartao`
--

CREATE TABLE `tb_tipo_cartao` (
  `id_tipo_cartao` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
  `descricao` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_cliente`
--

CREATE TABLE `tb_tipo_cliente` (
  `id_tipo_cliente` int(1) NOT NULL,
  `tipo` int(1) NOT NULL,
  `descricao` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tb_tipo_cliente`
--

INSERT INTO `tb_tipo_cliente` (`id_tipo_cliente`, `tipo`, `descricao`) VALUES
(1, 1, 'Físico'),
(2, 2, 'Jurídico');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_conta`
--

CREATE TABLE `tb_tipo_conta` (
  `id_tipo_conta` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_produto`
--

CREATE TABLE `tb_tipo_produto` (
  `id_tipo_produto` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_tipo_venda`
--

CREATE TABLE `tb_tipo_venda` (
  `id_tipo_venda` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

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

-- --------------------------------------------------------

--
-- Table structure for table `tb_unidade`
--

CREATE TABLE `tb_unidade` (
  `id_unidade` int(11) NOT NULL,
  `nome_unidade` varchar(50) NOT NULL,
  `telefone` varchar(12) NOT NULL,
  `email` varchar(200) NOT NULL,
  `faturamento` float NOT NULL,
  `lucro_liq` float NOT NULL,
  `vl_patrimonio` float NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_unidade_medida`
--

CREATE TABLE `tb_unidade_medida` (
  `id_unidade_medida` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_upload_nf`
--

CREATE TABLE `tb_upload_nf` (
  `id_upload_nf` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_usuario`
--

CREATE TABLE `tb_usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `nome_empresa` varchar(50) NOT NULL,
  `email` varchar(250) NOT NULL,
  `email_contador` varchar(250) DEFAULT NULL,
  `senha` varchar(60) NOT NULL,
  `hash` varchar(60) NOT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  `cnpj` varchar(14) DEFAULT NULL,
  `whatsapp` varchar(14) NOT NULL,
  `cargo` varchar(50) NOT NULL,
  `faturamento` varchar(16) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL,
  `id_perfil` int(2) NOT NULL,
  `id_status` int(3) NOT NULL,
  `id_endereco` int(11) NOT NULL,
  `id_plano` int(2) NOT NULL,
  `id_assinatura_plano` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_venda`
--

CREATE TABLE `tb_venda` (
  `id_venda` int(11) NOT NULL,
  `valor_total` float NOT NULL,
  `id_venda_produto` int(11) NOT NULL,
  `id_venda_servico` int(11) NOT NULL,
  `id_parcelamento` int(11) NOT NULL,
  `id_forma_pagamento` int(2) NOT NULL,
  `id_tipo_venda` int(11) NOT NULL,
  `id_unidade` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_venda_produto`
--

CREATE TABLE `tb_venda_produto` (
  `id_venda_produto` int(11) NOT NULL,
  `qtd_produto` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `tb_venda_servico`
--

CREATE TABLE `tb_venda_servico` (
  `id_venda_servico` int(11) NOT NULL,
  `id_servico` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_acl`
--
ALTER TABLE `tb_acl`
  ADD PRIMARY KEY (`id_acl`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`),
  ADD KEY `FK_id_perfil` (`id_perfil`);

--
-- Indexes for table `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  ADD PRIMARY KEY (`id_assinatura_plano`) USING BTREE,
  ADD KEY `FOREIGN` (`id_dados_bancario`,`id_plano`) USING BTREE;

--
-- Indexes for table `tb_bandeira`
--
ALTER TABLE `tb_bandeira`
  ADD PRIMARY KEY (`id_bandeira`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_categoria_conta`
--
ALTER TABLE `tb_categoria_conta`
  ADD PRIMARY KEY (`id_categoria_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_cliente`
--
ALTER TABLE `tb_cliente`
  ADD PRIMARY KEY (`id_cliente`),
  ADD KEY `FOREIGN` (`id_endereco`,`id_tipo_cliente`,`id_usuario`,`id_status`) USING BTREE;

--
-- Indexes for table `tb_competencia`
--
ALTER TABLE `tb_competencia`
  ADD PRIMARY KEY (`id_competencia`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_conta`
--
ALTER TABLE `tb_conta`
  ADD PRIMARY KEY (`id_conta`),
  ADD KEY `fk_tb_conta_tb_categoria_conta1` (`id_categoria_conta`),
  ADD KEY `fk_tb_conta_tb_competencia1` (`id_competencia`),
  ADD KEY `fk_tb_conta_tb_forma_pagamento1` (`id_forma_pagamento`),
  ADD KEY `fk_tb_conta_tb_nota_fiscal1` (`id_nota_fiscal`),
  ADD KEY `fk_tb_conta_tb_ocorrencia1` (`id_ocorrencia`),
  ADD KEY `fk_tb_conta_tb_portador1` (`id_portador`),
  ADD KEY `fk_tb_conta_tb_status_conta1` (`id_status_conta`),
  ADD KEY `fk_tb_conta_tb_tipo_conta1` (`id_tipo_conta`),
  ADD KEY `FOREIGN` (`id_finalidade_nf`,`id_nota_fiscal`,`id_forma_pagamento`,`id_categoria_conta`,`id_tipo_conta`,`id_status_conta`,`id_ocorrencia`,`id_portador`,`id_competencia`,`id_usuario`) USING BTREE;

--
-- Indexes for table `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  ADD PRIMARY KEY (`id_dados_bancario`),
  ADD KEY `FOREIGN` (`id_bandeira`,`id_tipo_cartao`),
  ADD KEY `fk_tb_dados_bancario_tb_tipo_cartao1` (`id_tipo_cartao`);

--
-- Indexes for table `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD PRIMARY KEY (`id_empresa`),
  ADD UNIQUE KEY `UQ_cnpj` (`cnpj`),
  ADD KEY `FK_id_endereco` (`id_endereco`) USING BTREE;

--
-- Indexes for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  ADD PRIMARY KEY (`id_endereco`);

--
-- Indexes for table `tb_finalidade_nf`
--
ALTER TABLE `tb_finalidade_nf`
  ADD PRIMARY KEY (`id_finalidade_nf`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  ADD PRIMARY KEY (`id_forma_pagamento`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_fornecedor`
--
ALTER TABLE `tb_fornecedor`
  ADD PRIMARY KEY (`id_fornecedor`),
  ADD UNIQUE KEY `UQ_cnpj` (`cnpj`);

--
-- Indexes for table `tb_natureza`
--
ALTER TABLE `tb_natureza`
  ADD PRIMARY KEY (`id_natureza`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  ADD PRIMARY KEY (`id_nota_fiscal`),
  ADD KEY `FOREIGN` (`id_unidade`,`id_venda`,`id_finalidade_nf`,`id_cliente`,`id_upload_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_cliente1` (`id_cliente`),
  ADD KEY `fk_tb_nota_fiscal_tb_finalidade_nf1` (`id_finalidade_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_upload_nf1` (`id_upload_nf`),
  ADD KEY `fk_tb_nota_fiscal_tb_venda1` (`id_venda`);

--
-- Indexes for table `tb_ocorrencia`
--
ALTER TABLE `tb_ocorrencia`
  ADD PRIMARY KEY (`id_ocorrencia`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_parcelamento`
--
ALTER TABLE `tb_parcelamento`
  ADD PRIMARY KEY (`id_parcelamento`);

--
-- Indexes for table `tb_perfil`
--
ALTER TABLE `tb_perfil`
  ADD PRIMARY KEY (`id_perfil`) USING BTREE,
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_plano`
--
ALTER TABLE `tb_plano`
  ADD PRIMARY KEY (`id_plano`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_portador`
--
ALTER TABLE `tb_portador`
  ADD PRIMARY KEY (`id_portador`) USING BTREE,
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `fk_tb_produto_tb_fornecedor1` (`id_fornecedor`),
  ADD KEY `fk_tb_produto_tb_reabastecer_produto1` (`id_reabastecer_produto`),
  ADD KEY `fk_tb_produto_tb_status1` (`id_status_produto`),
  ADD KEY `fk_tb_produto_tb_tipo_produto1` (`id_tipo_produto`),
  ADD KEY `fk_tb_produto_tb_unidade_medida1` (`id_unidade_medida`),
  ADD KEY `FOREIGN` (`id_portador`,`id_tipo_produto`,`id_unidade_medida`,`id_reabastecer_produto`,`id_fornecedor`,`id_status_produto`,`id_usuario`) USING BTREE;

--
-- Indexes for table `tb_reabastecer_produto`
--
ALTER TABLE `tb_reabastecer_produto`
  ADD PRIMARY KEY (`id_reabastecer_produto`);

--
-- Indexes for table `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD PRIMARY KEY (`id_servico`),
  ADD KEY `FOREIGN` (`id_status`,`id_usuario`,`id_natureza`,`id_cliente`) USING BTREE;

--
-- Indexes for table `tb_status`
--
ALTER TABLE `tb_status`
  ADD PRIMARY KEY (`id_status`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_status_conta`
--
ALTER TABLE `tb_status_conta`
  ADD PRIMARY KEY (`id_status_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_status_produto`
--
ALTER TABLE `tb_status_produto`
  ADD PRIMARY KEY (`id_status_produto`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`),
  ADD KEY `FK_id_portador` (`id_portador`);

--
-- Indexes for table `tb_tipo_cartao`
--
ALTER TABLE `tb_tipo_cartao`
  ADD PRIMARY KEY (`id_tipo_cartao`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_tipo_cliente`
--
ALTER TABLE `tb_tipo_cliente`
  ADD PRIMARY KEY (`id_tipo_cliente`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  ADD PRIMARY KEY (`id_tipo_conta`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  ADD PRIMARY KEY (`id_tipo_produto`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_tipo_venda`
--
ALTER TABLE `tb_tipo_venda`
  ADD PRIMARY KEY (`id_tipo_venda`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_tokens`
--
ALTER TABLE `tb_tokens`
  ADD PRIMARY KEY (`id_token`) USING BTREE,
  ADD KEY `FK_id_usuario` (`id_usuario`);

--
-- Indexes for table `tb_unidade`
--
ALTER TABLE `tb_unidade`
  ADD PRIMARY KEY (`id_unidade`),
  ADD KEY `FOREIGN` (`id_empresa`,`id_endereco`),
  ADD KEY `fk_tb_unidade_tb_endereco1` (`id_endereco`);

--
-- Indexes for table `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  ADD PRIMARY KEY (`id_unidade_medida`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_upload_nf`
--
ALTER TABLE `tb_upload_nf`
  ADD PRIMARY KEY (`id_upload_nf`),
  ADD UNIQUE KEY `UQ_tipo` (`tipo`);

--
-- Indexes for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UNIQUE` (`email`,`cpf`,`cnpj`) USING BTREE,
  ADD KEY `FOREIGN` (`id_empresa`,`id_perfil`,`id_status`,`id_endereco`,`id_plano`,`id_assinatura_plano`) USING BTREE;

--
-- Indexes for table `tb_venda`
--
ALTER TABLE `tb_venda`
  ADD PRIMARY KEY (`id_venda`),
  ADD KEY `fk_tb_venda_tb_cliente1` (`id_cliente`),
  ADD KEY `fk_tb_venda_tb_forma_pagamento1` (`id_forma_pagamento`),
  ADD KEY `fk_tb_venda_tb_parcelamento1` (`id_parcelamento`),
  ADD KEY `fk_tb_venda_tb_tipo_venda1` (`id_tipo_venda`),
  ADD KEY `fk_tb_venda_tb_unidade1` (`id_unidade`),
  ADD KEY `fk_tb_venda_tb_venda_servico1` (`id_venda_servico`),
  ADD KEY `FOREIGN` (`id_venda_produto`,`id_venda_servico`,`id_parcelamento`,`id_forma_pagamento`,`id_tipo_venda`,`id_unidade`,`id_cliente`,`id_usuario`) USING BTREE;

--
-- Indexes for table `tb_venda_produto`
--
ALTER TABLE `tb_venda_produto`
  ADD PRIMARY KEY (`id_venda_produto`);

--
-- Indexes for table `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  ADD PRIMARY KEY (`id_venda_servico`),
  ADD KEY `FK_id_servico` (`id_servico`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_acl`
--
ALTER TABLE `tb_acl`
  MODIFY `id_acl` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  MODIFY `id_assinatura_plano` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_bandeira`
--
ALTER TABLE `tb_bandeira`
  MODIFY `id_bandeira` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_categoria_conta`
--
ALTER TABLE `tb_categoria_conta`
  MODIFY `id_categoria_conta` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_cliente`
--
ALTER TABLE `tb_cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_competencia`
--
ALTER TABLE `tb_competencia`
  MODIFY `id_competencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_conta`
--
ALTER TABLE `tb_conta`
  MODIFY `id_conta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  MODIFY `id_dados_bancario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_empresa`
--
ALTER TABLE `tb_empresa`
  MODIFY `id_empresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_endereco`
--
ALTER TABLE `tb_endereco`
  MODIFY `id_endereco` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_finalidade_nf`
--
ALTER TABLE `tb_finalidade_nf`
  MODIFY `id_finalidade_nf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_forma_pagamento`
--
ALTER TABLE `tb_forma_pagamento`
  MODIFY `id_forma_pagamento` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_fornecedor`
--
ALTER TABLE `tb_fornecedor`
  MODIFY `id_fornecedor` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_natureza`
--
ALTER TABLE `tb_natureza`
  MODIFY `id_natureza` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  MODIFY `id_nota_fiscal` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_ocorrencia`
--
ALTER TABLE `tb_ocorrencia`
  MODIFY `id_ocorrencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_parcelamento`
--
ALTER TABLE `tb_parcelamento`
  MODIFY `id_parcelamento` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_perfil`
--
ALTER TABLE `tb_perfil`
  MODIFY `id_perfil` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tb_plano`
--
ALTER TABLE `tb_plano`
  MODIFY `id_plano` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_portador`
--
ALTER TABLE `tb_portador`
  MODIFY `id_portador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_produto`
--
ALTER TABLE `tb_produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_reabastecer_produto`
--
ALTER TABLE `tb_reabastecer_produto`
  MODIFY `id_reabastecer_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_servico`
--
ALTER TABLE `tb_servico`
  MODIFY `id_servico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_status`
--
ALTER TABLE `tb_status`
  MODIFY `id_status` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_status_conta`
--
ALTER TABLE `tb_status_conta`
  MODIFY `id_status_conta` int(3) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_status_produto`
--
ALTER TABLE `tb_status_produto`
  MODIFY `id_status_produto` int(2) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tipo_cartao`
--
ALTER TABLE `tb_tipo_cartao`
  MODIFY `id_tipo_cartao` int(1) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tipo_cliente`
--
ALTER TABLE `tb_tipo_cliente`
  MODIFY `id_tipo_cliente` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tb_tipo_conta`
--
ALTER TABLE `tb_tipo_conta`
  MODIFY `id_tipo_conta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tipo_produto`
--
ALTER TABLE `tb_tipo_produto`
  MODIFY `id_tipo_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tipo_venda`
--
ALTER TABLE `tb_tipo_venda`
  MODIFY `id_tipo_venda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_tokens`
--
ALTER TABLE `tb_tokens`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tb_unidade`
--
ALTER TABLE `tb_unidade`
  MODIFY `id_unidade` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_unidade_medida`
--
ALTER TABLE `tb_unidade_medida`
  MODIFY `id_unidade_medida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_upload_nf`
--
ALTER TABLE `tb_upload_nf`
  MODIFY `id_upload_nf` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_usuario`
--
ALTER TABLE `tb_usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_venda`
--
ALTER TABLE `tb_venda`
  MODIFY `id_venda` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_venda_produto`
--
ALTER TABLE `tb_venda_produto`
  MODIFY `id_venda_produto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  MODIFY `id_venda_servico` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_assinatura_plano`
--
ALTER TABLE `tb_assinatura_plano`
  ADD CONSTRAINT `fk_tb_assinatura_plano_tb_dados_bancario1` FOREIGN KEY (`id_dados_bancario`) REFERENCES `tb_dados_bancario` (`id_dados_bancario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_conta`
--
ALTER TABLE `tb_conta`
  ADD CONSTRAINT `fk_tb_conta_tb_categoria_conta1` FOREIGN KEY (`id_categoria_conta`) REFERENCES `tb_categoria_conta` (`id_categoria_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_competencia1` FOREIGN KEY (`id_competencia`) REFERENCES `tb_competencia` (`id_competencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_finalidade_nf1` FOREIGN KEY (`id_finalidade_nf`) REFERENCES `tb_finalidade_nf` (`id_finalidade_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_forma_pagamento1` FOREIGN KEY (`id_forma_pagamento`) REFERENCES `tb_forma_pagamento` (`id_forma_pagamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_nota_fiscal1` FOREIGN KEY (`id_nota_fiscal`) REFERENCES `tb_nota_fiscal` (`id_nota_fiscal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_ocorrencia1` FOREIGN KEY (`id_ocorrencia`) REFERENCES `tb_ocorrencia` (`id_ocorrencia`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_portador1` FOREIGN KEY (`id_portador`) REFERENCES `tb_portador` (`id_portador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_status_conta1` FOREIGN KEY (`id_status_conta`) REFERENCES `tb_status_conta` (`id_status_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_conta_tb_tipo_conta1` FOREIGN KEY (`id_tipo_conta`) REFERENCES `tb_tipo_conta` (`id_tipo_conta`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_dados_bancario`
--
ALTER TABLE `tb_dados_bancario`
  ADD CONSTRAINT `fk_tb_dados_bancario_tb_bandeira1` FOREIGN KEY (`id_bandeira`) REFERENCES `tb_bandeira` (`id_bandeira`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_dados_bancario_tb_tipo_cartao1` FOREIGN KEY (`id_tipo_cartao`) REFERENCES `tb_tipo_cartao` (`id_tipo_cartao`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_empresa`
--
ALTER TABLE `tb_empresa`
  ADD CONSTRAINT `fk_tb_empresa_tb_endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_nota_fiscal`
--
ALTER TABLE `tb_nota_fiscal`
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_finalidade_nf1` FOREIGN KEY (`id_finalidade_nf`) REFERENCES `tb_finalidade_nf` (`id_finalidade_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_unidade1` FOREIGN KEY (`id_unidade`) REFERENCES `tb_unidade` (`id_unidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_upload_nf1` FOREIGN KEY (`id_upload_nf`) REFERENCES `tb_upload_nf` (`id_upload_nf`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_nota_fiscal_tb_venda1` FOREIGN KEY (`id_venda`) REFERENCES `tb_venda` (`id_venda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_produto`
--
ALTER TABLE `tb_produto`
  ADD CONSTRAINT `fk_tb_produto_tb_fornecedor1` FOREIGN KEY (`id_fornecedor`) REFERENCES `tb_fornecedor` (`id_fornecedor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_reabastecer_produto1` FOREIGN KEY (`id_reabastecer_produto`) REFERENCES `tb_reabastecer_produto` (`id_reabastecer_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_status1` FOREIGN KEY (`id_status_produto`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_status_produto1` FOREIGN KEY (`id_portador`) REFERENCES `tb_status_produto` (`id_portador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_tipo_produto1` FOREIGN KEY (`id_tipo_produto`) REFERENCES `tb_tipo_produto` (`id_tipo_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_produto_tb_unidade_medida1` FOREIGN KEY (`id_unidade_medida`) REFERENCES `tb_unidade_medida` (`id_unidade_medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_servico`
--
ALTER TABLE `tb_servico`
  ADD CONSTRAINT `fk_tb_servico_tb_status1` FOREIGN KEY (`id_status`) REFERENCES `tb_status` (`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_unidade`
--
ALTER TABLE `tb_unidade`
  ADD CONSTRAINT `fk_tb_unidade_tb_empresa1` FOREIGN KEY (`id_empresa`) REFERENCES `tb_empresa` (`id_empresa`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_unidade_tb_endereco1` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id_endereco`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_venda`
--
ALTER TABLE `tb_venda`
  ADD CONSTRAINT `fk_tb_venda_tb_cliente1` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_forma_pagamento1` FOREIGN KEY (`id_forma_pagamento`) REFERENCES `tb_forma_pagamento` (`id_forma_pagamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_parcelamento1` FOREIGN KEY (`id_parcelamento`) REFERENCES `tb_parcelamento` (`id_parcelamento`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_tipo_venda1` FOREIGN KEY (`id_tipo_venda`) REFERENCES `tb_tipo_venda` (`id_tipo_venda`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_unidade1` FOREIGN KEY (`id_unidade`) REFERENCES `tb_unidade` (`id_unidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_venda_produto1` FOREIGN KEY (`id_venda_produto`) REFERENCES `tb_venda_produto` (`id_venda_produto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_tb_venda_tb_venda_servico1` FOREIGN KEY (`id_venda_servico`) REFERENCES `tb_venda_servico` (`id_venda_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `tb_venda_servico`
--
ALTER TABLE `tb_venda_servico`
  ADD CONSTRAINT `fk_tb_venda_servico_tb_servico1` FOREIGN KEY (`id_servico`) REFERENCES `tb_servico` (`id_servico`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
