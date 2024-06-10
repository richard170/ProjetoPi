package com.example.pi5.serviços;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.pi5.modelos.ClienteModel;
import com.example.pi5.repositorios.ClienteRepositorio;

@Service
public class ClienteService {
    
@Autowired
    ClienteRepositorio clienteReposity;


    public void cadastrarCliente(ClienteModel clienteModel) {
        clienteReposity.save(clienteModel);
    }

    public List<ClienteModel> buscarClientes() {
        return (List<ClienteModel>) clienteReposity.findAll();
    }

    public ClienteModel buscarClientePorId(Integer id) {
        Optional <ClienteModel> clienteOptional = clienteReposity.findById(id);
        return clienteOptional.orElse(null);
    }

    public ResponseEntity<Object> atualizarPorId(Integer id, ClienteModel clienteModel) {
        Optional<ClienteModel> clienteOptional = clienteReposity.findById(id);
        if (clienteOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }
        clienteReposity.save(clienteModel);
        return ResponseEntity.status(HttpStatus.OK).body(clienteModel);
    }
    
    

    public void deletarPorId(Integer id) {
        clienteReposity.deleteById(id);

    }

}
