package com.example.pi5.serviços;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.pi5.dtos.RevisaoDetalhadaDTO;
import com.example.pi5.modelos.ClienteModel;
import com.example.pi5.modelos.RevisaoModel;
import com.example.pi5.modelos.VeiculoModel;
import com.example.pi5.repositorios.RevisaoRepositorio;
import com.example.pi5.repositorios.VeiculoRepositorio;
import com.example.pi5.repositorios.ClienteRepositorio;

@Service
public class RevisaoService {
    
    @Autowired
    RevisaoRepositorio revisaoRepositorio;

    @Autowired
    VeiculoRepositorio veiculoRepositorio;

    @Autowired
    ClienteRepositorio clienteRepositorio;

    public void cadastrarRevisao(RevisaoModel revisaoModel) {
        revisaoRepositorio.save(revisaoModel);
    }

    public List<RevisaoModel> buscarRevisao() {
        return (List<RevisaoModel>) revisaoRepositorio.findAll();
    }

    public RevisaoModel buscarRevisaoPorId(Integer id) {
        Optional<RevisaoModel> revisaoOptional = revisaoRepositorio.findById(id);
        return revisaoOptional.orElse(null);
    }

    public ResponseEntity<Object> atualizarPorId(Integer id, RevisaoModel revisaoModel) {
        Optional<RevisaoModel> revisaoOptional = revisaoRepositorio.findById(id);
        if (revisaoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Revisao não encontrada.");
        }
        revisaoRepositorio.save(revisaoModel);
        return ResponseEntity.status(HttpStatus.OK).body(revisaoModel);
    }

    public void deletarPorId(Integer id) {
        revisaoRepositorio.deleteById(id);

    }


    public RevisaoDetalhadaDTO getRevisaoDetalhada(String placa) {
        RevisaoModel revisao = revisaoRepositorio.findByPlaca(placa);
        VeiculoModel veiculo = veiculoRepositorio.findByPlaca(placa);
        ClienteModel cliente = clienteRepositorio.findByCpf(veiculo.getCpf());

        RevisaoDetalhadaDTO dto = new RevisaoDetalhadaDTO();
        dto.setPlaca(revisao.getPlaca());
        dto.setTipoRevisao(revisao.getTipoRevisao());
        dto.setDetalhesRevisao(revisao.getDetalhesRevisao());
        dto.setOrcamento(revisao.getOrcamento());
        dto.setMarcaVeiculo(veiculo.getMarca());
        dto.setModeloVeiculo(veiculo.getModelo());
        dto.setAnoVeiculo(veiculo.getAno());
        dto.setNomeCliente(cliente.getNome());
        dto.setCpfCliente(cliente.getCpf());
        dto.setTelefoneCliente(cliente.getTelefone());
        dto.setEmailCliente(cliente.getEmail());

        return dto;
    }


}