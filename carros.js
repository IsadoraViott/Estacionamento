// Carregar e exibir carros

async function loadCarro(event) {
    try {
    const response = await fetch('http://localhost:3002/carros');
    const data = await response.json();
    const tbody = document.getElementById('listaCarros');
    tbody.innerHTML = '';

    if (data.success && data.data) {
        data.data.forEach(carros => {
            const linha = document.createElement('div');
            linha.classList.add('carro-item');
            linha.innerHTML = `
                <div class="titulos">
                    <h2 class="carro-inf">${carros.proprietario}</h2>
                    <h2 class="carro-inf">${carros.placa}</h2>
                    <h2 class="carro-inf">${carros.horario}</h2>
                    <h2 class="carro-inf">${carros.horario_saida}</h2>
                </div>
                <div class="post-actions">
                    <button class="botao" onclick="editCarro(${carros.id})">Editar</button>
                    <button class="botao" onclick="deleteCarro(${carros.id})">Deletar</button>
                </div>
                <hr>
            `;
            tbody.appendChild(linha);
        });
    }
} catch (error) {
    console.error("Erro ao carregar carros", error);
};

}



// Editar cadastro dos carros
async function editCarro(id) {
    const proprietario = prompt("Novo proprietario (manter o mesmo)");
    const placa = prompt("Nova placa (manter a mesma)");
    const horario = prompt("Novo horário (manter o mesmo)");
    const horario_saida = prompt("Novo horário de saída (adicionar o horário)")

    await fetch(`http://localhost:3002/carros/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proprietario, placa, horario, horario_saida })
    });

    await loadCarro();
}

// Deletar carros

async function deleteCarro(id) {
    await fetch(`http://localhost:3002/carros/${id}`, {
        method: 'DELETE'
    });
    await loadCarro();
}

loadCarro();

