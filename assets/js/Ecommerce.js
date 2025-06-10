    // Usuário e senha fictícios
    const usuarioPadrao = "admin";
    const senhaPadrao = "1234";
    let usuarioLogado = "";

    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Controle do tipo de login
let tipoLogin = "adm"; // padrão

function selecionarTipoLogin(tipo) {
    tipoLogin = tipo;
    document.getElementById('btn-login-adm').classList.toggle('ativo', tipo === 'adm');
    document.getElementById('btn-login-usuario').classList.toggle('ativo', tipo === 'usuario');
}

// Ajuste a função de login:
function fazerLogin() {
    const usuario = document.getElementById('login-usuario').value;
    const senha = document.getElementById('login-senha').value;
    if (tipoLogin === "adm") {
        if (usuario === usuarioPadrao && senha === senhaPadrao) {
            usuarioLogado = "admin";
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('conteudo').style.display = 'block';
            document.getElementById('area-admin').style.display = 'block';
            document.getElementById('login-erro').style.display = 'none';
        } else {
            document.getElementById('login-erro').style.display = 'block';
        }
    } else {
        // login de usuário comum
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.find(u => u.usuario === usuario && u.senha === senha)) {
            usuarioLogado = "cliente";
            document.getElementById('login-modal').style.display = 'none';
            document.getElementById('conteudo').style.display = 'block';
            document.getElementById('area-admin').style.display = 'none';
            document.getElementById('login-erro').style.display = 'none';
        } else {
            document.getElementById('login-erro').style.display = 'block';
        }
    }
    renderizarProdutos(produtos);
    atualizarCategorias();
}

// Inicialize o tipo de login ao abrir a página
selecionarTipoLogin('adm');

    function logout() {
        mostrarMensagemCentral("Você saiu do sistema!");
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1800);
    }

    function mostrarMensagemCentral(mensagem) {
        const msgAntiga = document.getElementById('mensagem-central');
        if (msgAntiga) msgAntiga.remove();
        const div = document.createElement('div');
        div.id = 'mensagem-central';
        div.textContent = mensagem;
        div.style.position = 'fixed';
        div.style.top = '50%';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -50%)';
        div.style.background = '#232f3e';
        div.style.color = '#fff';
        div.style.padding = '30px 40px';
        div.style.borderRadius = '10px';
        div.style.fontSize = '1.2em';
        div.style.zIndex = '9999';
        div.style.boxShadow = '0 2px 12px #0005';
        document.body.appendChild(div);
        setTimeout(() => { div.remove(); }, 1700);
    }

    function finalizarCompra() {
        if (carrinho.length === 0) {
            mostrarMensagemCentral("Seu carrinho está vazio!");
            return;
        }
        mostrarMensagemCentral("Compra finalizada com sucesso! Obrigado pela preferência.");
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    function adicionarCarrinho(index) {
        carrinho.push(produtos[index]);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        mostrarMensagemCentral('Produto adicionado ao carrinho!');
        atualizarCarrinho();
    }

    function abrirCarrinho() {
        document.getElementById('carrinho').style.display = 'block';
        atualizarCarrinho();
    }

    function fecharCarrinho() {
        document.getElementById('carrinho').style.display = 'none';
    }

    function removerCarrinho(index) {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinho();
    }

    document.getElementById('form-cadastro-produto').addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('novo-nome').value.trim();
        const preco = parseFloat(document.getElementById('novo-preco').value);
        const categoria = document.getElementById('novo-categoria').value.trim();
        const imagem = document.getElementById('novo-imagem').value.trim();
        if(nome && !isNaN(preco) && categoria && imagem) {
            produtos.push({ nome, preco, categoria, imagem });
            localStorage.setItem('produtos', JSON.stringify(produtos));
            renderizarProdutos(produtos);
            atualizarCategorias();
            this.reset();
        }
    });

    function renderizarProdutos(lista) {
        const div = document.getElementById('produtos');
        div.innerHTML = '';
        lista.forEach((p, i) => {
            div.innerHTML += `
                <div class="produto">
                    <img src="${p.imagem}" alt="${p.nome}">
                    <h3>${p.nome}</h3>
                    <p>Categoria: ${p.categoria}</p>
                    <p>R$ ${p.preco.toFixed(2)}</p>
                    <button onclick="adicionarCarrinho(${i})">Adicionar ao Carrinho</button>
                    ${usuarioLogado === "admin" ? `<button onclick="removerProduto(${i})" style="background:#e74c3c;color:#fff;border:none;padding:6px 12px;border-radius:6px;cursor:pointer;margin-left:8px;">Remover</button>` : ""}
                </div>
            `;
        });
    }

    // Função para o admin remover produtos
function removerProduto(index) {
    if (usuarioLogado === "admin") {
        if (confirm("Tem certeza que deseja remover este produto?")) {
            produtos.splice(index, 1);
            localStorage.setItem('produtos', JSON.stringify(produtos));
            renderizarProdutos(produtos);
            atualizarCategorias(); 
            mostrarMensagemCentral("Produto removido!");
        }
    }
}

    function atualizarCarrinho() {
        const itensDiv = document.getElementById('itens-carrinho');
        const totalDiv = document.getElementById('total-carrinho');
        itensDiv.innerHTML = '';
        let total = 0;
        carrinho.forEach((item, i) => {
            total += item.preco;
            itensDiv.innerHTML += `
                <div class="carrinho-item">
                    <span>${item.nome}</span>
                    <span>R$ ${item.preco.toFixed(2)}</span>
                    <button onclick="removerCarrinho(${i})" style="background:#e74c3c;color:#fff;border:none;padding:2px 8px;border-radius:4px;cursor:pointer;">X</button>
                </div>
            `;
        });
        totalDiv.textContent = "Total: R$ " + total.toFixed(2);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }

    document.getElementById('busca').addEventListener('input', filtrarProdutos);
    document.getElementById('categoria').addEventListener('change', filtrarProdutos);

    function filtrarProdutos() {
        const busca = document.getElementById('busca').value.toLowerCase();
        const categoria = document.getElementById('categoria').value;
        const filtrados = produtos.filter(p =>
            (p.nome.toLowerCase().includes(busca)) &&
            (categoria === "" || p.categoria === categoria)
        );
        renderizarProdutos(filtrados);
    }

    // Funções de cadastro
function abrirCadastro() {
    document.getElementById('login-modal').style.display = 'none';
    document.getElementById('cadastro-modal').style.display = 'flex';
    document.getElementById('cadastro-feedback').style.display = 'none';
}

function fecharCadastro() {
    document.getElementById('cadastro-modal').style.display = 'none';
    document.getElementById('login-modal').style.display = 'flex';
    document.getElementById('form-cadastro-usuario').reset();
    document.getElementById('cadastro-feedback').style.display = 'none';
}

// Cadastro com validação (substitua a função atual)
document.getElementById('form-cadastro-usuario').addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('cadastro-usuario').value.trim();
    const senha = document.getElementById('cadastro-senha').value.trim();
    const senha2 = document.getElementById('cadastro-senha2').value.trim();
    const cpf = document.getElementById('cadastro-cpf').value.trim();
    const email = document.getElementById('cadastro-email').value.trim();
    const telefone = document.getElementById('cadastro-telefone').value.trim();
    const feedback = document.getElementById('cadastro-feedback');
    feedback.style.display = 'block';

    if (!usuario || !senha || !senha2 || !cpf || !email || !telefone) {
        feedback.textContent = "Preencha todos os campos!";
        feedback.style.color = "red";
        return;
    }
    if (senha.length < 4) {
        feedback.textContent = "A senha deve ter pelo menos 4 caracteres.";
        feedback.style.color = "red";
        return;
    }
    if (senha !== senha2) {
        feedback.textContent = "As senhas não coincidem!";
        feedback.style.color = "red";
        return;
    }
    if (!/^\d{11}$/.test(cpf)) {
        feedback.textContent = "CPF deve conter 11 dígitos numéricos.";
        feedback.style.color = "red";
        return;
    }
    if (!/^\d{10,11}$/.test(telefone)) {
        feedback.textContent = "Telefone deve conter 10 ou 11 dígitos numéricos.";
        feedback.style.color = "red";
        return;
    }
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    if (usuarios.find(u => u.usuario === usuario)) {
        feedback.textContent = "Usuário já existe!";
        feedback.style.color = "red";
        return;
    }
    usuarios.push({ usuario, senha, cpf, email, telefone });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    feedback.textContent = "Usuário cadastrado com sucesso!";
    feedback.style.color = "green";
    setTimeout(() => {
        fecharCadastro();
    }, 1200);
});

    function atualizarCategorias() {
        const select = document.getElementById('categoria');
        // Pega todas as categorias dos produtos cadastrados
        const categorias = [...new Set(produtos.map(p => p.categoria))];
        // Limpa e adiciona as opções
        select.innerHTML = `<option value="">Todas as categorias</option>`;
        categorias.forEach(cat => {
            select.innerHTML += `<option value="${cat}">${cat}</option>`;
        });
    }

    // Inicialização
    renderizarProdutos(produtos);
    atualizarCategorias();