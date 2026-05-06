/// <reference types = 'cypress'/>

class MinhaContaPage {

//extra

    acessarMinhaConta() {
        cy.visit('minha-conta')
    }

    retornarTextoAlerta() {
        return cy.get('.woocommerce-error').invoke('text')
    }

//Acessar modais

    clicarDetalhesConta(){
            cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        }

    clicarEnderecos(){
        cy.get('.woocommerce-MyAccount-navigation-link--edit-address > a').click()
    }

//login

    informarUsuarioLogin(usuario) {
        cy.get('[name="username"]').type(usuario)
    }
    
    informarSenhaLogin(senha) {
        cy.get('#password').type(senha)
    }
    
    clicarLogin() {
        cy.get('[name="login"]').click()
    }


//Cadastro

    informarUsuarioCadastro(email) {
        cy.get('[name="email"]').type(email)
    }
    
    informarSenhaCadastro(senha) {
        cy.get('#reg_password').type(senha)
    }
    
    clicarCadastrar() {
        cy.get('[name="register"]').click()
    }

//Pedidos

//Endereço - Entrega

    clicarEditarEnderecoEntrega(){
        cy.get(':nth-child(2) > .title > .edit').click()
    }

    informarPrimeiroNomeEnderecoEntrega(primeiroNome){
        cy.get('[name="shipping_first_name"]').clear()
        if(primeiroNome){
            cy.get('[name="shipping_first_name"]').type(primeiroNome)
        }
    }

    informarUltimoNomeEnderecoEntrega(ultimoNome){
        cy.get('[name="shipping_last_name"]').clear()
        if(ultimoNome){
            cy.get('[name="shipping_last_name"]').type(ultimoNome)
        }
    }

    informarNomeEmpresaEnderecoEntrega(nomeEmpresa){  
        cy.get('[name="shipping_company"]').clear()
        if(nomeEmpresa){
            cy.get('[name="shipping_company"]').type(nomeEmpresa)
        }
    }

    informarPaisEnderecoEntrega(pais){
        if(pais){
        cy.get('#select2-shipping_country-container').click()
        cy.get('.select2-search__field').type(pais)
        cy.contains('.select2-results__option', pais).click()   
        }   
    }

    informarEnderecoEntrega(endereco){
        cy.get('[name="shipping_address_1"]').clear()
        if(endereco){
            cy.get('[name="shipping_address_1"]').type(endereco)
        }   
    }

    informarComplementoEnderecoEntrega(complemento){
        cy.get('[name="shipping_address_2"]').clear()
        if(complemento){
            cy.get('[name="shipping_address_2"]').type(complemento)
        }   
    }

    informarCidadeEnderecoEntrega(cidade){
        cy.get('[name="shipping_city"]').clear()
        if(cidade){
            cy.get('[name="shipping_city"]').type(cidade)
        }   
    }

    informarEstadoEnderecoEntrega(estado){
        if(estado){
            cy.get('#select2-shipping_state-container').click()
            cy.get('.select2-search__field').type(estado)
            cy.contains('.select2-results__option', estado).click()   
        }   
    }

    informarCepEnderecoEntrega(CEP){
        cy.get('[name="shipping_postcode"]').clear()
        if(CEP){
            cy.get('[name="shipping_postcode"]').type(CEP)
        }   
    }
    
    clicarSalvarEnderecoEntrega(){
        cy.get('[name="save_address"]').click()
    }

//Endereço - Faturamento
    clicarEditarEnderecoFaturamento(){
            cy.get(':nth-child(1) > .title > .edit').click()
        }

    informarPrimeiroNomeEnderecoFaturamento(primeiroNome){
        cy.get('[name="billing_first_name"]').clear()
        if(primeiroNome){
            cy.get('[name="billing_first_name"]').type(primeiroNome)
        }
    }

    informarUltimoNomeEnderecoFaturamento(ultimoNome){
        cy.get('[name="billing_last_name"]').clear()
        if(ultimoNome){
            cy.get('[name="billing_last_name"]').type(ultimoNome)
        }
    }

    informarNomeEmpresaEnderecoFaturamento(nomeEmpresa){  
        cy.get('[name="billing_company"]').clear()
        if(nomeEmpresa){
            cy.get('[name="billing_company"]').type(nomeEmpresa)
        }
    }

    informarPaisEnderecoFaturamento(pais){
        if(pais){
        cy.get('#select2-billing_country-container').click()
        cy.get('.select2-search__field').type(pais)
        cy.contains('.select2-results__option', pais).click()   
        }   
    }

    informarEnderecoFaturamento(endereco){
        cy.get('[name="billing_address_1"]').clear()
        if(endereco){
            cy.get('[name="billing_address_1"]').type(endereco)
        }   
    }

    informarComplementoEnderecoFaturamento(complemento){
        cy.get('[name="billing_address_2"]').clear()
        if(complemento){
            cy.get('[name="billing_address_2"]').type(complemento)
        }   
    }

    informarCidadeEnderecoFaturamento(cidade){
        cy.get('[name="billing_city"]').clear()
        if(cidade){
            cy.get('[name="billing_city"]').type(cidade)
        }   
    }

    informarEstadoEnderecoFaturamento(estado){
        if(estado){
            cy.get('#select2-billing_state-container').click()
            cy.get('.select2-search__field').type(estado)
            cy.contains('.select2-results__option', estado).click()   
        }   
    }

    informarCepEnderecoFaturamento(CEP){
        cy.get('[name="billing_city"]').clear()
        if(CEP){
            cy.get('[name="billing_city"]').type(CEP)
        }   
    }
    
    informarTelefoneEnderecoFaturamento(telefone){
        cy.get('[name="billing_phone"]').clear()
        if(telefone){
            cy.get('[name="billing_phone"]').type(telefone)
        }   
    }

    informarEmailEnderecoFaturamento(email){
        cy.get('[name="billing_phone"]').clear()
        if(email){
            cy.get('[name="billing_phone"]').type(email)
        }   
    }

    clicarSalvarEnderecoFaturamento(){
        cy.get('[name="save_address"]').click()
    }

//Detalhes conta

    informarPrimeiroNomeDetalhesConta(primeiroNome){
        cy.get('[name="account_first_name"]').clear()
        if(primeiroNome){
            cy.get('[name="account_first_name"]').type(primeiroNome)
        }
    }

    informarUltimoNomeDetalhesConta(ultimoNome){
        cy.get('[name="account_last_name"]').clear()
        if(ultimoNome){
            cy.get('[name="account_last_name"]').type(ultimoNome)
        }
    }

    informarNomeExibicaoDetalhesConta(nomeExibicao){  
        cy.get('[name="account_display_name"]').clear()
        if(nomeExibicao){
            cy.get('[name="account_display_name"]').type(nomeExibicao)
        }
    }

    informarEmailDetalhesConta(email){
        cy.get('[name="account_email"]').clear()
        if(email){
            cy.get('[name="account_email"]').type(email)
        }   
    }

    informarSenhaAtualDetalhesConta(senha){
        cy.get('[name="password_current"]').clear()
        if(senha){
            cy.get('[name="password_current"]').type(senha)
        }
    }

    informarNovaSenhaDetalhesConta(novaSenha){
        cy.get('[name="password_1"]').clear()
        if(novaSenha){
            cy.get('[name="password_1"]').type(novaSenha)
        }
    }

    informarConfirmarSenha(novaSenhaConfirmar){
        cy.get('[name="password_2"]').clear()
        if(novaSenhaConfirmar){
            cy.get('[name="password_2"]').type(novaSenhaConfirmar)
        }
    }

    clicarSalvarAlteracoesDetalhesConta(){
        cy.get('[name="save_account_details"]').click()
    }

//Sair
    sairConta(){
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout').click()
    } 
      
}

export default new MinhaContaPage()
