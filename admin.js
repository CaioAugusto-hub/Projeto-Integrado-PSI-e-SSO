const URL_API = "http://localhost:3000/produtos";

const listaProdutos =
    document.getElementById("listaProdutos");

const formProduto =
    document.getElementById("formProduto");

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
    const botoesExcluir =
    document.querySelectorAll(".excluir");

botoesExcluir.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            const id =
                botao.dataset.id;

            excluirProduto(id);

        }
    );

});

}

async function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `${URL_API}/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error(
                "Erro ao excluir produto."
            );
        }

        carregarProdutos();

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível excluir o produto."
        );

    }

}

async function cadastrarProduto(event) {

    event.preventDefault();

    const nome =
        document.getElementById("nome").value;

    const categoria =
        document.getElementById("categoria").value;

    const descricao =
        document.getElementById("descricao").value;

    const preco =
        Number(
            document.getElementById("preco").value
        );

    const estoque =
        Number(
            document.getElementById("estoque").value
        );

    const imagem =
        document.getElementById("imagem").value;

    const novoProduto = {
        nome,
        categoria,
        descricao,
        preco,
        estoque,
        imagem
    };

    try {

        const resposta = await fetch(
            URL_API,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify(
                    novoProduto
                )
            }
        );

        if (!resposta.ok) {
            throw new Error(
                "Erro ao cadastrar produto."
            );
        }

        formProduto.reset();

        carregarProdutos();

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível cadastrar o produto."
        );

    }

}

formProduto.addEventListener(
    "submit",
    cadastrarProduto
);

carregarProdutos();