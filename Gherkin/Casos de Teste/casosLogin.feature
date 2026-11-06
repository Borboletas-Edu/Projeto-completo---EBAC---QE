# language: pt

Funcionalidade: Casos de teste - Tela de login
    Como cliente da EBAC-SHOP
    Quero me autenticar
    Para realizar compras

Contexto:
    Dado que eu acesse a página de autenticação da loja EBAC

@CT-US0002-01 @feliz @automatizado
Cenário: CT-US0002-01 - Login com credenciais válidas
    Dado que exista um usuário ativo cadastrado
    Quando eu informar o usuário e a senha corretos
    E clicar em "Login"
    Então o login deve ser realizado
    E o painel Minha Conta deve ser exibido

@CT-US0002-02 @negativo @automatizado @tabela-de-decisao
Cenário: CT-US0002-02 - Login com senha incorreta
    Dado que exista um usuário ativo cadastrado
    Quando eu informar o usuário válido e uma senha inválida
    E clicar em "Login"
    Então deve ser exibida uma mensagem informando que a senha está incorreta

@CT-US0002-03 @negativo @automatizado @tabela-de-decisao
Cenário: CT-US0002-03 - Login com usuário inexistente
    Quando eu informar um usuário inexistente e qualquer senha
    E clicar em "Login"
    Então deve ser exibida uma mensagem informando que o usuário não está registrado

@CT-US0002-04 @negativo @automatizado @particao-de-equivalencia
Esquema do Cenário: CT-US0002-04 - Login com campos obrigatórios vazios
    Quando eu informar o usuário "<usuario>"
    E informar a senha "<senha>"
    E clicar em "Login"
    Então deve ser exibida a mensagem "<mensagem>"

    Exemplos:
        | usuario | senha    | mensagem                       |
        |         | admin123 | Nome de usuário é obrigatório. |
        | admin   |          | O campo da senha está vazio.   |
        |         |          | Nome de usuário é obrigatório. |

@CT-US0002-05 @negativo @manual @valor-limite
Esquema do Cenário: CT-US0002-05 - Bloqueio após 3 senhas incorretas
    Dado que exista um usuário ativo cadastrado
    Quando eu errar a senha <tentativas> vezes seguidas
    E tentar logar com a senha correta
    Então o resultado deve ser "<resultado>"

    Exemplos:
        | tentativas | resultado                                              |
        | 2          | login permitido                                        |
        | 3          | login bloqueado por 15 minutos com mensagem de alerta  |

@CT-US0002-06 @negativo @manual @particao-de-equivalencia
Cenário: CT-US0002-06 - Login de usuário inativo
    Dado que exista um usuário cadastrado e desativado
    Quando eu informar o usuário e a senha corretos
    E clicar em "Login"
    Então o login deve ser recusado
    E deve ser exibida uma mensagem de erro
