async function cadastrar(event) {
    event.preventDefault()

    const proprietario = document.getElementById('proprietario').value;
    const placa = document.getElementById('placa').value;
    const horario = document.getElementById('horario').value;
    const horario_saida = document.getElementById('horario_saida').value;


    const data = {
        proprietario,
        placa,
        horario,
        horario_saida
    }


    try {
        const response = await fetch('http://localhost:3002/carros', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })


        const results = await response.json();


        if (results.success) {
            console.log(results)
            alert(results.message)
            window.location.assign('index.html')
        } else {
            alert(results.message)
        }
    }
    catch (error) {
        console.log(error);
    }
}