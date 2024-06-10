package com.example.pi5.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevisaoDetalhadaDTO {

        private String placa;
        private String tipoRevisao;
        private String detalhesRevisao;
        private String orcamento;
        private String marcaVeiculo;
        private String modeloVeiculo;
        private String anoVeiculo;
        private String nomeCliente;
        private String cpfCliente;
        private String telefoneCliente;
        private String emailCliente;
}
