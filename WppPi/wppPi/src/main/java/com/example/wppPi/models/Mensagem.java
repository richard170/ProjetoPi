package com.example.wppPi.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Entity
public class Mensagem {


    @Id
    private String numero;
    private String mensagem;

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

}

    









