const URL_API = "http://localhost:3000/produtos";

const catalogo = document.getElementById("catalogo");

/**
 * Busca os produtos da API
 */
async function carregarProdutos() {
    try {
        const resposta = await fetch(URL_API);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar produtos.");
        }

        const produtos = await resposta.json();

        exibirProdutos(produtos);

    } catch (erro) {
        console.error("Erro:", erro);

        catalogo.innerHTML = `
            <p>Não foi possível carregar os produtos.</p>
        `;
    }
}

/**
 * Exibe os produtos na tela
 */
function exibirProdutos(produtos) {

    catalogo.innerHTML = "";

    produtos.forEach(produto => {

        const statusEstoque =
            produto.estoque > 0
                ? "Disponível"
                : "Indisponível";

        const classeEstoque =
            produto.estoque > 0
                ? "disponivel"
                : "indisponivel";

        const card = `
            <div class="card">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                >

                <div class="card-conteudo">

                    <h3>${produto.nome}</h3>

                    <p class="preco">
                        R$ ${produto.preco.toFixed(2).replace(".", ",")}
                    </p>

                    <p class="${classeEstoque}">
                        ${statusEstoque}
                    </p>

                    <button
                        class="btn-detalhes"
                        data-id="${produto.id}"
                    >
                        Ver detalhes
                    </button>

                </div>

            </div>
        `;

        catalogo.insertAdjacentHTML("beforeend", card);

    });

}

/**
 * Inicializa a aplicação
 */
carregarProdutos();