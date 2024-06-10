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

import com.example.pi5.modelos.ClienteModel;
import com.example.pi5.serviços.ClienteService;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/clientes")
public class ClienteController {
    
@Autowired
ClienteService clienteService;

 @PostMapping
    public void cadastrarCliente(@RequestBody ClienteModel clienteModel) {
            clienteService.cadastrarCliente(clienteModel);

    }


    @GetMapping
    public List<ClienteModel> buscarClientes() {
        return clienteService.buscarClientes();
    }


    @GetMapping("/{idCliente}")
    public ClienteModel buscarClienteId(@PathVariable Integer idCliente) {
    return clienteService.buscarClientePorId(idCliente);
    }
    
    @PutMapping("/{idCliente}")
    public ResponseEntity<Object> atualizarPorCliente(@PathVariable Integer idCliente, @RequestBody ClienteModel clienteModel) {
            return clienteService.atualizarPorId(idCliente, clienteModel);
    }



    @DeleteMapping("/{idCliente}")
    public void deletarClientePorId(@PathVariable Integer idCliente){
        clienteService.deletarPorId(idCliente);
    }


}
