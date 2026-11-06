# language: pt

Funcionalidade: US004 - Endereços
    Como cliente da EBAC-SHOP
    Quero ter uma tela dedicada aos meus endereços
    Para editar e salvar endereços para utilização em pedidos futuros

Contexto:
    Dado que eu esteja autenticado como cliente
    E que eu acesse a opção "Endereços" no painel Minha Conta

@RN01 @RN02
Esquema do Cenário: Validar campos obrigatórios do endereço
    Quando eu editar o endereço de <tipo>
    E deixar o campo <campo> vazio
    E salvar o endereço
    Então o sistema deve impedir a gravação
    E deve exibir a mensagem "<campo> é um campo obrigatório."

    Exemplos:
        | tipo        | campo           |
        | faturamento | Nome            |
        | faturamento | Sobrenome       |
        | faturamento | País            |
        | faturamento | Endereço        |
        | faturamento | Cidade          |
        | faturamento | Estado          |
        | faturamento | CEP             |
        | faturamento | Telefone        |
        | faturamento | Endereço de e-mail |
        | entrega     | Nome            |
        | entrega     | Sobrenome       |
        | entrega     | País            |
        | entrega     | Endereço        |
        | entrega     | Cidade          |
        | entrega     | Estado          |
        | entrega     | CEP             |

@RN03
Cenário: Salvar endereço sem o nome da empresa
    Quando eu editar o endereço de entrega
    E preencher todos os campos obrigatórios com dados válidos
    E deixar o campo "Nome da empresa" vazio
    E salvar o endereço
    Então deve ser exibida a mensagem "Endereço alterado com sucesso."

@RN04
Cenário: Manter o mesmo modelo de campos entre faturamento e entrega
    Quando eu abrir a edição do endereço de faturamento
    E abrir a edição do endereço de entrega
    Então os dois formulários devem possuir o mesmo modelo de campos

@RN05
Esquema do Cenário: Editar cada endereço de forma independente
    Quando eu editar o endereço de <tipo>
    E preencher todos os campos obrigatórios com dados válidos
    E salvar o endereço
    Então deve ser exibida a mensagem "Endereço alterado com sucesso."
    E o endereço de <tipo> deve ser exibido com os dados salvos

    Exemplos:
        | tipo        |
        | faturamento |
        | entrega     |

@RN05
Cenário: Conta sem endereços cadastrados
    Dado que eu não tenha endereços cadastrados
    Então a conta deve permanecer ativa
    E devem ser exibidas as opções para cadastrar os endereços de faturamento e de entrega

@RN06
Cenário: Preservar o endereço de pedidos anteriores
    Dado que eu possua um pedido com status finalizado ou pendente
    Quando eu alterar o endereço de entrega
    Então o endereço registrado nesse pedido não deve ser alterado
