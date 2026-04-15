# language: pt

Funcionalidade: Tela de login
    Como cliente da EBAC-SHOP
    Quero me autenticar
    Para realizar compras

Contexto:
    Dado que eu acesse a página de autenticação da loja EBAC

Cenário: Autenticação com credenciais válidas
    Quando informar o usuario "admin"
    E informar a senha "admin123"
    Então o login deve ser registrado como valido

Cenário: Bloqueio de acesso após multiplas tentativas
    Quando eu informar o usuario "admin"
    E informar a senha "senhaErrada" 3 vezes
    Então a plataforma deve exibir uma mensagem de alerta
    E bloquear novas tentativas por 15 minutos. 

Esquema do Cenário: Autenticação sem informar dados obrigatorios
    Quando informar o <usuario>
    E informar a <senha>
    Então deve ser exibido a mensagem <mensagem>

        Exemplos:
        | usuario | senha    | mensagem                       |
        |         | admin123 | Nome de usuário é obrigatório. |
        | admin   |          | O campo da senha está vazio.   |
        |         |          | Nome de usuário é obrigatório. |

Esquema do Cenário: Autenticação com credenciais invalidas
    Quando informar o <usuario>
    E informar a <senha>
    Então deve ser exibido a mensagem <mensagem>

        Exemplos:
        | usuario    | senha       | mensagem                                                                                                                              |
        | admin      | senhaErrada | A senha informada para o usuário admin está incorreta. Perdeu a senha?                                                                |
        | userErrado | admin123    | O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail. |
        | userErrado | senhaErrada | O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail. |

