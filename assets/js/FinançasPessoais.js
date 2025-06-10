let transacoes = JSON.parse(localStorage.getItem('transacoes')) || [];

        function atualizarDashboard() {
            let receitas = transacoes.filter(t => t.tipo === 'entrada').reduce((acc, t) => acc + t.valor, 0);
            let despesas = transacoes.filter(t => t.tipo === 'saida').reduce((acc, t) => acc + t.valor, 0);
            let saldo = receitas - despesas;

            document.getElementById('total-receitas').textContent = receitas.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
            document.getElementById('total-despesas').textContent = despesas.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
            document.getElementById('saldo').textContent = saldo.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

            const tbody = document.getElementById('lista-transacoes');
            tbody.innerHTML = '';
            transacoes.forEach((t, i) => {
                tbody.innerHTML += `
                    <tr>
                        <td>${t.descricao}</td>
                        <td class="${t.tipo}">${t.valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</td>
                        <td>${t.tipo === 'entrada' ? 'Receita' : 'Despesa'}</td>
                        <td><button onclick="removerTransacao(${i})" style="background:#e74c3c;color:#fff;border:none;padding:4px 10px;border-radius:4px;cursor:pointer;">X</button></td>
                    </tr>
                `;
            });
        }

        document.getElementById('form-transacao').addEventListener('submit', function(e) {
            e.preventDefault();
            const descricao = document.getElementById('descricao').value.trim();
            const valor = parseFloat(document.getElementById('valor').value);
            const tipo = document.getElementById('tipo').value;
            if(descricao && !isNaN(valor) && valor > 0) {
                transacoes.push({ descricao, valor, tipo });
                localStorage.setItem('transacoes', JSON.stringify(transacoes));
                atualizarDashboard();
                this.reset();
            }
        });

        function removerTransacao(index) {
            transacoes.splice(index, 1);
            localStorage.setItem('transacoes', JSON.stringify(transacoes));
            atualizarDashboard();
        }

        // Botão de sair do sistema com mensagem centralizada
        document.getElementById('btn-sair').onclick = function() {
            mostrarMensagemCentral('Deseja realmente sair do sistema?', () => {
                window.location.href = '../index.html';
            });
        };

        // Função para mostrar mensagem centralizada com confirmação
        function mostrarMensagemCentral(mensagem, onConfirm) {
            // Cria o overlay
            const overlay = document.createElement('div');
            overlay.style.position = 'fixed';
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(24,28,36,0.85)';
            overlay.style.display = 'flex';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.zIndex = 2000;

            // Cria a caixa de mensagem
            const box = document.createElement('div');
            box.style.background = '#232837';
            box.style.color = '#fff';
            box.style.padding = '32px 28px';
            box.style.borderRadius = '14px';
            box.style.boxShadow = '0 2px 24px #0007';
            box.style.textAlign = 'center';
            box.style.minWidth = '260px';

            box.innerHTML = `
        <p style="font-size:1.15em; margin-bottom:22px;">${mensagem}</p>
        <button id="confirmar-sair" style="background:#e74c3c;color:#fff;border:none;padding:10px 28px;border-radius:8px;font-size:1em;cursor:pointer;margin-right:18px;">Sim</button>
        <button id="cancelar-sair" style="background:#00740a;color:#fff;border:1px solid #fff;padding:10px 28px;border-radius:8px;font-size:1em;cursor:pointer;">Não</button>
    `;

            overlay.appendChild(box);
            document.body.appendChild(overlay);

            document.getElementById('confirmar-sair').onclick = function() {
                document.body.removeChild(overlay);
                if (onConfirm) onConfirm();
            };
            document.getElementById('cancelar-sair').onclick = function() {
                document.body.removeChild(overlay);
            };
        }

        atualizarDashboard();