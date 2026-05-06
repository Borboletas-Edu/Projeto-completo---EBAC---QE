import DetalhesProdutoPage from "../page/DetalhesProdutoPage"

class DetalhesProdutoFlow {
    
    adicionarProdutoCarrinho(nomeProduto, tamanhoProduto, corProduto, quantidadeProduto){
        cy.visit(`product/${nomeProduto.trim().replace(/\s+/g, "-")}`)
        cy.wait(1000)
        DetalhesProdutoPage.selecionarTamanho(tamanhoProduto)
        DetalhesProdutoPage.selecionarCor(corProduto)
        DetalhesProdutoPage.selecionarQuantidade(quantidadeProduto)
        DetalhesProdutoPage.clicarComprar()
    }

}

export default new DetalhesProdutoFlow()