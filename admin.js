const URL_API =
"https://projeto-integrado-psi-e-sso.onrender.com/";

const listaProdutos =
    document.getElementById("listaProdutos");

const formProduto =
    document.getElementById("formProduto");

const idProduto =
    document.getElementById("idProduto");

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

const botoesEditar =
    document.querySelectorAll(".editar");

botoesEditar.forEach(botao => {

    botao.addEventListener(
        "click",
        () => {

            const id =
                botao.dataset.id;

            editarProduto(id);

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

async function editarProduto(id) {

    try {

        const resposta =
            await fetch(`${URL_API}/${id}`);

        if (!resposta.ok) {
            throw new Error(
                "Erro ao carregar produto."
            );
        }

        const produto =
            await resposta.json();

        idProduto.value =
            produto.id;

        document.getElementById("nome").value =
            produto.nome;

        document.getElementById("categoria").value =
            produto.categoria;

        document.getElementById("descricao").value =
            produto.descricao;

        document.getElementById("preco").value =
            produto.preco;

        document.getElementById("estoque").value =
            produto.estoque;

        document.getElementById("imagem").value =
            produto.imagem;

    } catch (erro) {

        console.error(erro);

        alert(
            "Não foi possível carregar o produto."
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

    const id = idProduto.value;

    const url =
    id
        ? `${URL_API}/${id}`
        : URL_API;

    const metodo =
    id
        ? "PATCH"
        : "POST";

    try {

        const resposta = await fetch(
    url,
            {
                method: metodo,
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

        idProduto.value = "";

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