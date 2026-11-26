let produtosCarregados = [];

const URL_API =
"https://obscure-goggles-x5qxwj966996f977x-3000.app.github.dev/produtos";

console.log("catalogo.js carregado");
console.log(URL_API);

const catalogo = document.getElementById("catalogo");

const campoPesquisa =
    document.getElementById("campoPesquisa");

const filtros =
    document.querySelectorAll(".filtro");

const modal = document.getElementById("modal");

const modalNome =
    document.getElementById("modalNome");

const modalImagem =
    document.getElementById("modalImagem");

const modalDescricao =
    document.getElementById("modalDescricao");

const modalPreco =
    document.getElementById("modalPreco");

const modalEstoque =
    document.getElementById("modalEstoque");

const modalCategoria =
    document.getElementById("modalCategoria");

const fecharModal =
    document.getElementById("fecharModal");

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

        produtosCarregados = produtos;

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

        catalogo.insertAdjacentHTML(
            "beforeend",
            card
        );

    });

    const botoesDetalhes =
        document.querySelectorAll(".btn-detalhes");

    botoesDetalhes.forEach(botao => {

        botao.addEventListener(
            "click",
            () => {

                const idProduto =
                    botao.dataset.id;

                abrirModal(idProduto);

            }
        );

    });

}

function pesquisarProdutos() {

    const textoDigitado =
        campoPesquisa.value.toLowerCase();

    const produtosFiltrados =
        produtosCarregados.filter(produto => {

            return produto.nome
                .toLowerCase()
                .includes(textoDigitado);

        });

    exibirProdutos(produtosFiltrados);

}

function filtrarCategoria(categoria) {

    if (categoria === "Todas") {

        exibirProdutos(produtosCarregados);

        return;
    }

    const produtosFiltrados =
        produtosCarregados.filter(produto => {

            return produto.categoria === categoria;

        });

    exibirProdutos(produtosFiltrados);

}

function abrirModal(idProduto) {

    const produto = produtosCarregados.find(
        item => item.id == idProduto
    );

    if (!produto) return;

    modalNome.textContent =
        produto.nome;

    modalImagem.src =
        produto.imagem;

    modalImagem.alt =
        produto.nome;

    modalDescricao.textContent =
        produto.descricao;

    modalPreco.textContent =
        `R$ ${produto.preco
            .toFixed(2)
            .replace(".", ",")}`;

    modalEstoque.textContent =
        produto.estoque;

    modalCategoria.textContent =
        produto.categoria;

    modal.classList.remove("oculto");
}

fecharModal.addEventListener(
    "click",
    () => {
        modal.classList.add("oculto");
    }
);

campoPesquisa.addEventListener(
    "input",
    pesquisarProdutos
);

filtros.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            filtros.forEach(item => {
                item.classList.remove("ativo");
            });

            botao.classList.add("ativo");

            const categoria =
                botao.dataset.categoria;

            filtrarCategoria(categoria);

        }
    );

});

/**
 * Inicializa a aplicação
 */
carregarProdutos(); 