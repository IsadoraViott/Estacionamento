create database estacionamento;

use estacionamento;

create table usuarios (
	id int primary key not null auto_increment,
    nome varchar(255) not null,
    senha varchar(255) not null, 
    status enum ('ativo', 'inativo') default ('ativo'),
    created_at timestamp default current_timestamp
);

create table carros (
	id int primary key not null auto_increment,
    proprietario varchar(255) not null, 
    placa varchar(255) not null,
    horario varchar(255) not null, 
    horario_saida varchar(255),
    status enum ('ativo', 'inativo') default ('ativo'),
    created_at timestamp default current_timestamp
);

INSERT INTO usuarios (nome, senha) VALUES("teste", "exemplo");