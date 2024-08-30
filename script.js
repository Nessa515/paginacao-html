const url = "http://localhost:3000";
const tabela = document.querySelector("#tabela");

let livros = []

async function listarLivros(){
    await fetch(`${url}/livros`)
    // Tranformando o response.body em um JSON
    .then(response => {return response.json() })
    // Colocando o response na variável livros
    .then(response => livros = response)
    // Caso haja algum problema um catch será lançado
    .catch(error => console.log(error))
}


function renderizarTabela(){
    tabela.innerHTML = `
        <table class="tabela">
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Autor</th>
            </tr>
            ${livros.map(livro => 
                `   
                <tr>
                    <td>${livro.id}</td>
                    <td>${livro.nome}</td>
                    <td>${livro.genero}</td>
                    <td>${livro.autor}</td>
                </tr>
                `
            ).join('')}
        </table>
    `;
}

async function run(){
    await listarLivros()
    renderizarTabela()
}

run()