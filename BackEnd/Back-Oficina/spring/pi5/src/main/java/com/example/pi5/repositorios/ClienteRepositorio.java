package com.example.pi5.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pi5.modelos.ClienteModel;

public interface ClienteRepositorio extends JpaRepository <ClienteModel,Integer> {
    ClienteModel findByCpf(String cpf);
}
