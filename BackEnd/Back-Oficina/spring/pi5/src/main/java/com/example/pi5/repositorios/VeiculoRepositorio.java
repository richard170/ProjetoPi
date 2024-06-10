package com.example.pi5.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pi5.modelos.VeiculoModel;

public interface VeiculoRepositorio extends JpaRepository<VeiculoModel,Integer> {
    VeiculoModel findByPlaca(String placa);
}
