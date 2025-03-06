document.getElementById("carroForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    const proprietario = document.getElementById('proprietario').value;
    const placa = document.getElementById('placa').value;
    const horario = document.getElementById('horario').value;
    const horario_saida = document.getElementById('horario_saida').value;

    await fetch('http://localhost:3002/carros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proprietario, placa, horario, horario_saida })
    });

    document.getElementById('carroForm').reset(); 
    loadCarro(); 
    
});