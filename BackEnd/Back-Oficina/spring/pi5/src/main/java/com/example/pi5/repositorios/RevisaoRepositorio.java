package com.example.pi5.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pi5.modelos.RevisaoModel;

public interface RevisaoRepositorio extends JpaRepository<RevisaoModel, Integer> {
    RevisaoModel findByPlaca(String placa);
}
