# Comandos para Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto:

## Configuração Inicial

### 1. Frontend
  Para configurar e iniciar o frontend do projeto, execute os seguintes passos:
  - Abra um terminal (recomendamos Git Bash) no diretório `PI5/Projeto`.
  - Execute os comandos abaixo: 
    npm install
    npm update
    ng serve
  Isso instalará as dependências necessárias e iniciará o servidor de desenvolvimento Angular.

###2. Backend
  Para iniciar os serviços backend, siga os passos para cada serviço:
  
  BackEnd Oficina:
    Navegue até o arquivo Pi5Application.java localizado em:
    BackEnd/Back-Oficina/spring/pi5/src/main/java/com/example/pi5/Pi5Application.java
    
    Execute a classe Pi5Application.java para iniciar o serviço de oficina.
  
  BackEnd WhatsApp:
    Navegue até o arquivo WppPiApplication.java localizado em:
    WppPi/wppPi/src/main/java/com/example/wppPi/WppPiApplication.java
    
    Execute a classe WppPiApplication.java para iniciar o serviço de integração com o WhatsApp.


###3. Possíveis Erros
  Erro de Senha
  Se encontrar um erro relacionado à senha do banco de dados:
  
  Verifique o arquivo application.properties em:
  BackEnd/Back-Oficina/spring/pi5/src/main/resources/application.properties
  
  Confirme se as credenciais e configurações do banco de dados estão corretas.

###4. Requisitos Adicionais
  É necessário ter um banco de dados PostgreSQL instalado e configurado para o funcionamento correto do backend.
  Para mais informações, consulte a documentação do projeto ou entre em contato com o suporte técnico.