const URL_API = "http://localhost:3000/produtos";

const listaProdutos =
    document.getElementById("listaProdutos");

async function carregarProdutos() {

    try {

        const resposta =
            await fetch(URL_API);

        if (!resposta.ok) {
            throw new Error(
                "Erro ao carregar produtos."
            );
        }

        const produtos =
            await resposta.json();

        exibirProdutos(produtos);

    } catch (erro) {

        console.error(erro);

        listaProdutos.innerHTML = `
            <p>
                Não foi possível carregar os produtos.
            </p>
        `;
    }

}

function exibirProdutos(produtos) {

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        const item = `
            <div class="produto-admin">

                <h3>${produto.nome}</h3>

                <p>
                    Categoria:
                    ${produto.categoria}
                </p>

                <p>
                    Estoque:
                    ${produto.estoque}
                </p>

                <p>
                    Preço:
                    R$ ${produto.preco
                        .toFixed(2)
                        .replace(".", ",")}
                </p>

                <div class="acoes">

                    <button
                        class="editar"
                        data-id="${produto.id}">
                        Editar
                    </button>

                    <button
                        class="excluir"
                        data-id="${produto.id}">
                        Excluir
                    </button>

                </div>

            </div>
        `;

        listaProdutos.insertAdjacentHTML(
            "beforeend",
            item
        );

    });

}

carregarProdutos();