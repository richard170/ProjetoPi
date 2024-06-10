package com.example.pi5.serviços;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.pi5.modelos.FuncionarioModel;
import com.example.pi5.repositorios.FuncionarioRepositorio;

@Service
public class FuncionarioService {
    

@Autowired
FuncionarioRepositorio funcionarioRepositorio;


public void cadastrarFuncionario(FuncionarioModel funcionarioModel) {
    funcionarioRepositorio.save(funcionarioModel);
}

public List<FuncionarioModel> buscarFuncionarios() {
    return (List<FuncionarioModel>) funcionarioRepositorio.findAll();
}

public FuncionarioModel buscarFuncionarioPorId(Integer id) {
    Optional <FuncionarioModel> funcionarioOptional = funcionarioRepositorio.findById(id);
    return funcionarioOptional.orElse(null);
}

public ResponseEntity<Object> atualizarPorId(Integer id, FuncionarioModel funcionarioModel) {
    Optional<FuncionarioModel> funcionarioOptional = funcionarioRepositorio.findById(id);
    if (funcionarioOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado.");
    }
    funcionarioRepositorio.save(funcionarioModel);
    return ResponseEntity.status(HttpStatus.OK).body(funcionarioModel);
}



public void deletarPorId(Integer id) {
    funcionarioRepositorio.deleteById(id);

}

}
