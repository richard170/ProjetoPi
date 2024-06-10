package com.example.wppPi.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wppPi.models.Mensagem;
import com.example.wppPi.repositorios.MensagemRepository;

import kong.unirest.core.HttpResponse;
import kong.unirest.core.JsonNode;
import kong.unirest.core.Unirest;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/mensagem")
public class MensagemController {

    @SuppressWarnings("unused")
    @Autowired
    private MensagemRepository mensagemRepository;

    @PostMapping("/enviar-mensagem")
    public void enviarMensagem(@RequestBody Mensagem mensagem) {

        HttpResponse<JsonNode> response = Unirest.post("https://api.wzap.chat/v1/numbers/exists")
                .header("Content-Type", "application/json")
                .header("Token", "5cb988982d7f23236d1ec54a58fd93b07daef944f099f828219979bcb1dfb2f7f96ed121862c671e")
                .body("{\"phone\":\"" + mensagem.getNumero() + "\"}")
                .asJson();

        // Verificar se o objeto JSON contém a chave "exists"
        if (response.getBody().getObject().has("exists")) {
            // Se a chave "exists" existe, então podemos acessá-la com segurança
            boolean exists = response.getBody().getObject().getBoolean("exists");

            if (exists) {
                @SuppressWarnings("unused")
                HttpResponse<String> responseSend = Unirest.post("https://api.wzap.chat/v1/messages")
                        .header("Content-Type", "application/json")
                        .header("Token", "5cb988982d7f23236d1ec54a58fd93b07daef944f099f828219979bcb1dfb2f7f96ed121862c671e")
                        .body("{\"phone\":\"" + mensagem.getNumero() + "\",\"message\":\"" + mensagem.getMensagem() + "\"}")
                        .asString();
                System.out.println("Mensagem enviada com sucesso");
            } else {
                System.out.println("Número não existe");
            }
        } else {
            System.out.println("A resposta não contém a chave 'exists'");
        }

        System.out.println("Resposta completa: " + response.getBody().toString());
    }
}
