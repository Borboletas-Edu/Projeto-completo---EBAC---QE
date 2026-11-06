// Camada de setup via API REST do WooCommerce (/wp-json/wc/v3).
// Roda no lado Node (cy.task), mantendo as credenciais de admin fora do navegador.

function criarClienteWooCommerce(baseUrl, usuario, senha) {
  const apiUrl = `${baseUrl}/wp-json/wc/v3`
  const headers = {
    Authorization: `Basic ${Buffer.from(`${usuario}:${senha}`).toString('base64')}`,
    'Content-Type': 'application/json',
  }

  async function requisicao(metodo, caminho, corpo) {
    const resposta = await fetch(`${apiUrl}${caminho}`, {
      method: metodo,
      headers,
      body: corpo ? JSON.stringify(corpo) : undefined,
    })
    const dados = await resposta.json().catch(() => null)
    if (!resposta.ok) {
      throw new Error(`[estoque] ${metodo} ${caminho} retornou ${resposta.status}: ${JSON.stringify(dados)}`)
    }
    return dados
  }

  return {
    buscarProdutoPorSlug: async (slug) => (await requisicao('GET', `/products?slug=${encodeURIComponent(slug)}`))[0],
    listarVariacoes: (produtoId) => requisicao('GET', `/products/${produtoId}/variations?per_page=100`),
    atualizarEstoqueVariacao: (produtoId, variacaoId, quantidade) =>
      requisicao('PUT', `/products/${produtoId}/variations/${variacaoId}`, {
        manage_stock: true,
        stock_quantity: quantidade,
      }),
  }
}

function possuiAtributo(variacao, valor) {
  return variacao.attributes.some((atributo) => atributo.option.toLowerCase() === String(valor).toLowerCase())
}

/**
 * Garante estoque para cada item usado nos testes.
 * itens: [{ slug, tamanho, cor, minimo }]
 * Só repõe (para `reposicao` unidades) as variações com estoque abaixo de `minimo`.
 */
async function garantirEstoque({ baseUrl, usuario, senha, itens, reposicao = 100 }) {
  const api = criarClienteWooCommerce(baseUrl, usuario, senha)
  const resultado = []

  for (const item of itens) {
    const produto = await api.buscarProdutoPorSlug(item.slug)
    if (!produto) throw new Error(`[estoque] Produto não encontrado: ${item.slug}`)

    const variacoes = await api.listarVariacoes(produto.id)
    const variacao = variacoes.find((v) => possuiAtributo(v, item.tamanho) && possuiAtributo(v, item.cor))
    if (!variacao) throw new Error(`[estoque] Variação não encontrada: ${item.slug} ${item.tamanho}/${item.cor}`)

    const estoqueAtual = variacao.stock_quantity ?? 0
    const precisaRepor = !variacao.manage_stock || variacao.stock_status !== 'instock' || estoqueAtual < item.minimo

    if (precisaRepor) {
      await api.atualizarEstoqueVariacao(produto.id, variacao.id, reposicao)
    }
    resultado.push(`${item.slug} ${item.tamanho}/${item.cor}: ${estoqueAtual} -> ${precisaRepor ? reposicao : estoqueAtual}`)
  }

  return resultado
}

module.exports = { garantirEstoque }
