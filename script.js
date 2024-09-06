const url = "http://localhost:3000";
const tabela = document.querySelector("#tabela");
const paginacao = document.querySelector("#paginacao")

let livros = []
let qtdPaginas = 0;
let paginaAtual = 0;

async function listarLivros(pagina = 1){
    await fetch(`${url}/livros?_page=${pagina}`)
            .then(result => result.json())
            .then(result => {
                livros = result.data;
                qtdPaginas = result.pages;
                result.next == null ? paginaAtual = result.prev + 1 : 
                result.next - 1;
            })
            .catch(error => console.log(error))
}

function mudarPagina(pagina){
    console.log(`Mudando página ${pagina}`)
    listarLivros(pagina)
    renderizarTabela()
    renderizarPaginacao()
}

function renderizarPaginacao(){
    if(qtdPaginas > 0){
        let p = "";
        for(let i = 1; i <= qtdPaginas; i++){
            p += `<div><a href='#' onClick='mudarPagina(${i})'>${i}</a></div>`;
        }
        paginacao.innerHTML = p;
    }
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
    renderizarPaginacao()
    renderizarTabela()
}

run()