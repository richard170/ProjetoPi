package com.example.pi5.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pi5.modelos.FuncionarioModel;
import com.example.pi5.serviços.FuncionarioService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
    

@Autowired
FuncionarioService funcionarioService;

    @PostMapping
    public void cadastrarFuncionario(@RequestBody FuncionarioModel funcionarioModel) {
        funcionarioService.cadastrarFuncionario(funcionarioModel);

    }


    @GetMapping
    public List<FuncionarioModel> buscarClientes() {
        return funcionarioService.buscarFuncionarios();
    }


    @GetMapping("/{idFuncionario}")
    public FuncionarioModel buscarFuncionarioId(@PathVariable Integer idFuncionario) {
        return funcionarioService.buscarFuncionarioPorId(idFuncionario);
    }

    @PutMapping("/{idFuncionario}")
    public ResponseEntity<Object> atualizarPorFuncionario(@PathVariable Integer idFuncionario, @RequestBody FuncionarioModel funcionarioModel) {
        return funcionarioService.atualizarPorId(idFuncionario, funcionarioModel);
    }



    @DeleteMapping("/{idFuncionario}")
    public void deletarFuncionarioPorId(@PathVariable Integer idFuncionario){
        funcionarioService.deletarPorId(idFuncionario);
    }


}
