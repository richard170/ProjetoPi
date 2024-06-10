package com.example.pi5.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pi5.modelos.FuncionarioModel;

public interface FuncionarioRepositorio extends JpaRepository<FuncionarioModel,Integer> {
    
}
