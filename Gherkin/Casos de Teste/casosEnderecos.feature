# language: pt

Funcionalidade: Casos de teste - US004 - Endereços
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos meus endereços
    Para editar e salvar endereços para utilização em pedidos futuros

Contexto:
    Dado que eu esteja autenticado como cliente
    E que eu acesse a opção "Endereços" no painel Minha Conta

@CT-US004-01 @feliz @automatizado @RN05
Cenário: CT-US004-01 - Atualizar endereço de entrega com dados válidos
    Quando eu editar o endereço de entrega
    E preencher todos os campos com dados válidos
    E salvar o endereço
    Então deve ser exibida a mensagem "Endereço alterado com sucesso."

@CT-US004-02 @feliz @automatizado @RN05
Cenário: CT-US004-02 - Atualizar endereço de faturamento com dados válidos
    Quando eu editar o endereço de faturamento
    E preencher todos os campos com dados válidos
    E salvar o endereço
    Então deve ser exibida a mensagem "Endereço alterado com sucesso."

@CT-US004-03 @negativo @automatizado @RN01 @RN02 @tabela-de-decisao
Esquema do Cenário: CT-US004-03 - Campos obrigatórios em branco
    Quando eu editar o endereço de faturamento
    E deixar o campo <campo> vazio
    E salvar o endereço
    Então a gravação deve ser impedida
    E deve ser exibida a mensagem "<campo> é um campo obrigatório."

    Exemplos:
        | campo              |
        | Nome               |
        | Sobrenome          |
        | País               |
        | Endereço           |
        | Cidade             |
        | Estado             |
        | CEP                |
        | Telefone           |
        | Endereço de e-mail |

@CT-US004-04 @alternativo @automatizado @RN03 @particao-de-equivalencia
Cenário: CT-US004-04 - Salvar sem o nome da empresa (campo opcional)
    Quando eu editar o endereço de entrega
    E preencher os campos obrigatórios com dados válidos
    E deixar o campo "Nome da empresa" vazio
    E salvar o endereço
    Então deve ser exibida a mensagem "Endereço alterado com sucesso."

@CT-US004-05 @alternativo @manual @RN04
Cenário: CT-US004-05 - Modelo de campos idêntico entre faturamento e entrega
    Quando eu abrir a edição do endereço de faturamento
    E abrir a edição do endereço de entrega
    E comparar os campos
    Então os dois formulários devem possuir o mesmo modelo de campos

@CT-US004-06 @negativo @manual @RN06
Cenário: CT-US004-06 - Alterar endereço não muda o de pedido anterior
    Dado que exista um pedido com status finalizado ou pendente
    Quando eu alterar o endereço
    E abrir o pedido anterior
    Então o endereço do pedido anterior deve permanecer o original
