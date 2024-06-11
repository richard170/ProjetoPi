# Comandos para Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto:

# Configuração Inicial

# 1. Frontend
  Para configurar e iniciar o frontend do projeto, execute os seguintes passos:
  - Abra um terminal (recomendamos Git Bash) no diretório `PI5/Projeto`.
  - Execute os comandos abaixo:
    
        npm install
        npm update
        ng serve

# 2. Backend
  - Para iniciar os serviços backend, siga os passos para cada serviço:
  
  ### 1. BackEnd Oficina: 
  - Navegue até o arquivo Pi5Application.java localizado em:
         
        BackEnd/Back-Oficina/spring/pi5/src/main/java/com/example/pi5/Pi5Application.java
      
  - Execute a classe Pi5Application.java para iniciar o serviço de oficina.
  
  ### 2. BackEnd WhatsApp:
  - Navegue até o arquivo WppPiApplication.java localizado em:
    
        WppPi/wppPi/src/main/java/com/example/wppPi/WppPiApplication.java

  - Execute a classe WppPiApplication.java para iniciar o serviço de integração com o WhatsApp.


# 3. Possíveis Erros

  ### 1. Erro de Senha:
  
  - Se encontrar um erro relacionado à senha do banco de dados verifique o arquivo application.properties em:
    
        BackEnd/Back-Oficina/spring/pi5/src/main/resources/application.properties
  
  - Confirme se as credenciais e configurações do banco de dados estão corretas.

  ### 2. Erro de porta
  - Identificar e encerrar o processo que está usando a porta 8080:
  Você pode fazer isso usando o comando netstat executando um CMD como administrador para encontrar o ID do processo (PID) que está usando a porta e então encerrá-lo usando o   
  Gerenciador de Tarefas ou o comando taskkill.

        netstat -aon | findstr :8080
        
        taskkill /PID [PID encontrado] /F
  - Retire os [ ] e coloque o pid para finalizar a porta 8080

# 4. Requisitos Adicionais
  É necessário ter um banco de dados PostgreSQL instalado e configurado para o funcionamento correto do backend.
  Para mais informações, consulte a documentação do projeto ou entre em contato com o suporte técnico.

# 5. Abrir projeto:

    http://localhost:4200/tela-login
  - usuario:
    
        123

  - senha:
    
        123
