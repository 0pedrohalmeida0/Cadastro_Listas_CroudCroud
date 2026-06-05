// Link da API do CrudCrud para o recurso "clientes"
const API_URL = 'https://crudcrud.com/api/9f5c6b1a41134855b81fffa094be07bf/clientes';

const formCliente = document.getElementById('form-cliente');
const listaClientes = document.getElementById('lista-clientes');


// Função responsável por buscar todos os clientes na API
async function listarClientes() {
    try {        
        const response = await fetch(API_URL);
        const clientes = await response.json();        
       
        // Limpa a lista atual no HTML para evitar duplicados ao recarregar
        listaClientes.innerHTML = '';
        
        // Percorre cada cliente retornado da API
        clientes.forEach(cliente => {
            const li = document.createElement('li');
            
            // O CrudCrud gera automaticamente um identificador único no campo '_id'
            li.innerHTML = `
                <div>
                    <strong>${cliente.nome}</strong> <br>
                    <small>${cliente.email}</small>
                </div>
                <button class="btn-excluir" onclick="excluirCliente('${cliente._id}')">Excluir</button>
            `;
            
            // Adiciona o item montado dentro da lista 
            listaClientes.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        alert('Não foi possível carregar a lista de clientes.');
    }
}

// Função responsável por enviar os dados do formulário para a API.
async function cadastrarCliente(event) {
    // Evita o comportamento padrão do formulário de recarregar a página ao enviar
    event.preventDefault();
    
    // Captura os valores digitados pelo usuário nos inputs
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    
    // Monta o objeto payload que será enviado no corpo da requisição
    const dadosCliente = { nome, email };
    
    try {
        // Envia a requisição POST para salvar o novo cliente
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dadosCliente) // Converte o objeto JS para uma string JSON válida
        });
        
        if (response.ok) {
            // Se o servidor respondeu com sucesso, limpa os campos do formulário
            formCliente.reset();
            // Atualiza a listagem na tela para exibir o novo cliente inserido
            listarClientes();
        } else {
            alert('Erro ao salvar o cliente no servidor.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        alert('Houve uma falha na comunicação com a API.');
    }
}


/**
 * Função responsável por deletar um cliente através do ID único.
 * @param {string} id - O identificador único (_id) gerado pela API
 */
async function excluirCliente(id) {
    // Confirmação de segurança com o usuário
    if (!confirm('Deseja realmente excluir este cliente?')) return;
    
    try {
        // Monta a URL correspondente ao recurso específico, ex: API_URL/id_do_cliente
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' // Método HTTP específico para remoção
        });
        
        if (response.ok) {
            // Se a exclusão foi bem-sucedida, atualiza a lista na tela
            listarClientes();
        } else {
            alert('Não foi possível excluir o cliente no servidor.');
        }
    } catch (error) {
        console.error('Erro ao excluir cliente:', error);
        alert('Erro ao tentar conectar com o servidor.');
    }
}

// Ouvinte de evento: quando o formulário for enviado, executa a função de cadastro
formCliente.addEventListener('submit', cadastrarCliente);

// Ouvinte de evento: executa a listagem assim que a estrutura do HTML estiver pronta na tela
document.addEventListener('DOMContentLoaded', listarClientes);

console.log('Projeto desenvolvido por Pedro Henrique de Almeida, 2026');