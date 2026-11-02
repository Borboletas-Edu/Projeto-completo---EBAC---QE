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

Cenário: Não permitir login de usuário inativo
    Dado que o usuário "inativo" esteja desativado na plataforma
    Quando informar o usuario "inativo"
    E informar a senha correta desse usuário
    Então o login não deve ser realizado
    E a plataforma deve exibir uma mensagem de erro

Cenário: Manter o bloqueio durante os 15 minutos
    Dado que o usuário "admin" tenha errado a senha 3 vezes
    Quando eu informar o usuario "admin"
    E informar a senha correta "admin123" antes de 15 minutos
    Então o login não deve ser realizado
    E a plataforma deve informar que o acesso está bloqueado

Cenário: Liberar o login após o período de bloqueio
    Dado que o usuário "admin" tenha errado a senha 3 vezes
    E que tenham se passado 15 minutos
    Quando eu informar o usuario "admin"
    E informar a senha correta "admin123"
    Então o login deve ser registrado como valido

Esquema do Cenário: Autenticação com credenciais invalidas
    Quando informar o <usuario>
    E informar a <senha>
    Então deve ser exibido a mensagem <mensagem>

    Exemplos:
        | usuario    | senha       | mensagem                                                                                                                              |
        | admin      | senhaErrada | A senha informada para o usuário admin está incorreta. Perdeu a senha?                                                                |
        | userErrado | admin123    | O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail. |
        | userErrado | senhaErrada | O usuário userErrado não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail. |
        |            | admin123    | Nome de usuário é obrigatório.                                                                                                        |
        | admin      |             | O campo da senha está vazio.                                                                                                          |
        |            |             | Nome de usuário é obrigatório.                                                                                                        |
