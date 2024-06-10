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

import com.example.pi5.modelos.VeiculoModel;
import com.example.pi5.serviços.VeiculoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/veiculos")
public class VeiculoController {
    

@Autowired
VeiculoService veiculoService;

@PostMapping
    public void cadastrarVeiculo(@RequestBody VeiculoModel veiculoModel) {
        veiculoService.cadastrarVeiculo(veiculoModel);

    }


    @GetMapping
    public List<VeiculoModel> buscarVeiculos() {
        return veiculoService.buscarVeiculo();
    }



    @PutMapping("/{idVeiculo}")
    public ResponseEntity<Object> atualizarPorFuncionario(@PathVariable Integer idVeiculo, @RequestBody VeiculoModel veiculoModel) {
        return veiculoService.atualizarPorId(idVeiculo, veiculoModel);
    }



    @DeleteMapping("/{idVeiculo}")
    public void deletarFuncionarioPorId(@PathVariable Integer idVeiculo){
        veiculoService.deletarPorId(idVeiculo);
    }


}
