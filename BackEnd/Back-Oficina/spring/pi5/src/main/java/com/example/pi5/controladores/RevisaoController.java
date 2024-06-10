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

import com.example.pi5.dtos.RevisaoDetalhadaDTO;
import com.example.pi5.modelos.RevisaoModel;
import com.example.pi5.serviços.RevisaoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/revisoes")
public class RevisaoController {
    @Autowired
    RevisaoService revisaoService;

    @PostMapping
    public void cadastrarRevisao(@RequestBody RevisaoModel revisaoModel) {
        revisaoService.cadastrarRevisao(revisaoModel);

    }

    @GetMapping
    public List<RevisaoModel> buscarClientes() {
        return revisaoService.buscarRevisao();
    }

    @GetMapping("/{id}")
    public RevisaoModel buscarRevisaoId(@PathVariable Integer id) {
        return revisaoService.buscarRevisaoPorId(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizarPorRevisao(@PathVariable Integer id,
            @RequestBody RevisaoModel revisaoModel) {
        return revisaoService.atualizarPorId(id, revisaoModel);
    }

    @DeleteMapping("/{id}")
    public void deletarFuncionarioPorId(@PathVariable Integer id) {
        revisaoService.deletarPorId(id);
    }



    @GetMapping("/placa/{placa}")
    public ResponseEntity<RevisaoDetalhadaDTO> getRevisaoDetalhada(@PathVariable String placa) {
        RevisaoDetalhadaDTO revisaoDetalhadaDTO = revisaoService.getRevisaoDetalhada(placa);
        if (revisaoDetalhadaDTO != null) {
            return ResponseEntity.ok(revisaoDetalhadaDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    


}
