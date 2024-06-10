package com.example.pi5.serviços;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.pi5.modelos.VeiculoModel;
import com.example.pi5.repositorios.VeiculoRepositorio;


@Service
public class VeiculoService {
    
@Autowired
VeiculoRepositorio veiculoRepositorio;


public void cadastrarVeiculo(VeiculoModel veiculoModel){
    veiculoRepositorio.save(veiculoModel);
}

public List<VeiculoModel> buscarVeiculo(){
    return (List<VeiculoModel>) veiculoRepositorio.findAll();
}

public ResponseEntity<Object> atualizarPorId(Integer id, VeiculoModel veiculoModel) {
    Optional<VeiculoModel> veiculoOptional = veiculoRepositorio.findById(id);
    if (veiculoOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Veiculo não encontrado.");
    }
    veiculoRepositorio.save(veiculoModel);
    return ResponseEntity.status(HttpStatus.OK).body(veiculoModel);
}

public void deletarPorId(Integer id) {
    veiculoRepositorio.deleteById(id);

}

}
