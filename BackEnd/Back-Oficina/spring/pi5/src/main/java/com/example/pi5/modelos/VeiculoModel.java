package com.example.pi5.modelos;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VeiculoModel {
    
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private int id;
private String cpf;
private String placa;
private String marca;
private String modelo;
private String ano;

}
