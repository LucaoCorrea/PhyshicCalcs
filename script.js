function calcularOhm() {
    const V = parseFloat(document.getElementById('tensao').value);
    const I = parseFloat(document.getElementById('corrente').value);
    const R = parseFloat(document.getElementById('resistencia').value);

    if (isNaN(V) && isNaN(I) && isNaN(R)) {
        alert('Por favor, insira dois dos três valores.');
        return;
    }

    let resultV, resultI, resultR;

    if (!isNaN(I) && !isNaN(R)) {
        resultV = I * R;
    } else if (!isNaN(V) && !isNaN(R)) {
        resultI = V / R;
    } else if (!isNaN(V) && !isNaN(I)) {
        resultR = V / I;
    }

    document.getElementById('resultado').innerText = `
        Tensão (V): ${resultV || V || 0} V\n
        Corrente (I): ${resultI || I || 0} A\n
        Resistência (R): ${resultR || R || 0} Ω
    `;

    document.getElementById('tutorialOhm').innerHTML = `
        <h3>Cálculo da Lei de Ohm</h3>
        <p>A Lei de Ohm é dada pela fórmula:</p>
        <p><strong>V = I × R</strong></p>
        <p>Ou também:</p>
        <p><strong>I = V / R</strong></p>
        <p><strong>R = V / I</strong></p>
        <p>Onde:</p>
        <ul>
            <li>V é a tensão (em Volts).</li>
            <li>I é a corrente (em Amperes).</li>
            <li>R é a resistência (em Ohms).</li>
        </ul>
        <p>Substituindo os valores você encontra os resultados desejados.</p>
    `;
    
    desenharDiagramaOhm(resultV || V || 0, resultI || I || 0, resultR || R || 0);
}

function desenharDiagramaOhm(V, I, R) {
    const canvas = document.getElementById('ohmCanvas');
    const ctx = canvas.getContext('2d');
    const largura = canvas.width;
    const altura = canvas.height;

    ctx.clearRect(0, 0, largura, altura);

    // Desenhar o retângulo do circuito
    ctx.beginPath();
    ctx.moveTo(100, 100);
    ctx.lineTo(300, 100);
    ctx.lineTo(300, 200);
    ctx.lineTo(100, 200);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Desenhar os fios e componentes
    ctx.beginPath();
    ctx.moveTo(100, 150);
    ctx.lineTo(50, 150);
    ctx.moveTo(300, 150);
    ctx.lineTo(350, 150);
    ctx.stroke();

    // Desenhar a fonte de tensão
    ctx.font = '16px Arial';
    ctx.fillText(`V = ${V} V`, 150, 80);

    // Desenhar a corrente
    ctx.fillText(`I = ${I} A`, 150, 220);

    // Desenhar a resistência
    ctx.fillText(`R = ${R} Ω`, 150, 150);
}

function adicionarResistor() {
    const container = document.getElementById('extraResistors');
    const div = document.createElement('div');
    div.className = 'resistor-group';
    const count = container.childElementCount + 4;
    div.innerHTML = `
        <label for="R${count}">Resistência R${count} (Ω):</label>
        <input type="number" id="R${count}" step="any" required>
    `;
    container.appendChild(div);
}

function atualizarDiagramaWheatstone() {
    const R1 = parseFloat(document.getElementById('R1').value);
    const R2 = parseFloat(document.getElementById('R2').value);
    const R3 = parseFloat(document.getElementById('R3').value);

    if (isNaN(R1) || isNaN(R2) || isNaN(R3)) {
        alert('Por favor, insira todas as resistências.');
        return;
    }

    // Coleta resistores extras
    const resistoresExtras = [];
    for (let i = 4; i <= 6; i++) {
        const valor = parseFloat(document.getElementById(`R${i}`).value);
        if (!isNaN(valor)) {
            resistoresExtras.push(valor);
        }
    }

    // Calcula Rx
    const Rx = (R3 * R2) / R1;
    document.getElementById('resultadoWheatstone').innerText = `
        Resistência R1: ${R1} Ω\n
        Resistência R2: ${R2} Ω\n
        Resistência R3: ${R3} Ω\n
        Resistências adicionais: ${resistoresExtras.join(', ')} Ω\n
        Resistência Rx (desconhecida): ${Rx.toFixed(2)} Ω
    `;

    document.getElementById('tutorialWheatstone').innerHTML = `
        <h3>Cálculo da Resistência Rx na Ponte de Wheatstone</h3>
        <p>Para que a ponte de Wheatstone esteja em equilíbrio, a resistência desconhecida Rx pode ser calculada pela fórmula:</p>
        <p><strong>Rx = (R3 × R2) / R1</strong></p>
        <p>Onde:</p>
        <ul>
            <li>R1, R2 e R3 são as resistências conhecidas.</li>
        </ul>
        <p>Substituindo os valores:</p>
        <p>Rx = (${R3} × ${R2}) / ${R1} = ${Rx.toFixed(2)} Ω</p>
    `;

    desenharDiagramaWheatstone(R1, R2, R3, Rx, resistoresExtras);
}

function desenharDiagramaWheatstone(R1, R2, R3, Rx, resistoresExtras) {
    const canvas = document.getElementById('wheatstoneCanvas');
    const ctx = canvas.getContext('2d');
    const largura = canvas.width;
    const altura = canvas.height;
    const margem = 50;
    const larguraLinha = 2;
    const raio = 10;

    ctx.clearRect(0, 0, largura, altura);

    // Desenhar o retângulo da Ponte de Wheatstone
    ctx.beginPath();
    ctx.moveTo(margem, altura / 2 - 50);
    ctx.lineTo(largura - margem, altura / 2 - 50);
    ctx.lineTo(largura - margem, altura / 2 + 50);
    ctx.lineTo(margem, altura / 2 + 50);
    ctx.closePath();
    ctx.strokeStyle = '#000';
    ctx.stroke();

    // Desenhar as linhas internas
    ctx.beginPath();
    ctx.moveTo(margem + 150, altura / 2 - 50);
    ctx.lineTo(margem + 150, altura / 2 + 50);
    ctx.moveTo(margem + 450, altura / 2 - 50);
    ctx.lineTo(margem + 450, altura / 2 + 50);
    ctx.moveTo(margem, altura / 2);
    ctx.lineTo(margem + 150, altura / 2);
    ctx.moveTo(margem + 450, altura / 2);
    ctx.lineTo(largura - margem, altura / 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = larguraLinha;
    ctx.stroke();

    // Desenhar os pontos
    ctx.beginPath();
    ctx.arc(margem, altura / 2, raio, 0, 2 * Math.PI);
    ctx.arc(margem + 150, altura / 2 - 50, raio, 0, 2 * Math.PI);
    ctx.arc(margem + 150, altura / 2 + 50, raio, 0, 2 * Math.PI);
    ctx.arc(margem + 450, altura / 2 - 50, raio, 0, 2 * Math.PI);
    ctx.arc(margem + 450, altura / 2 + 50, raio, 0, 2 * Math.PI);
    ctx.arc(largura - margem, altura / 2, raio, 0, 2 * Math.PI);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = larguraLinha;
    ctx.stroke();

    // Adicionar texto
    ctx.font = '16px Arial';
    ctx.fillText(`R1 = ${R1} Ω`, margem + 70, altura / 2 - 70);
    ctx.fillText(`R2 = ${R2} Ω`, margem + 70, altura / 2 + 70);
    ctx.fillText(`R3 = ${R3} Ω`, margem + 370, altura / 2 - 70);
    ctx.fillText(`Rx = ${Rx.toFixed(2)} Ω`, margem + 370, altura / 2 + 70);

    // Adicionar resistores adicionais
    resistoresExtras.forEach((valor, index) => {
        ctx.fillText(`R${index + 4} = ${valor} Ω`, margem + 370, altura / 2 + 120 + (index * 20));
    });
}

function calcularDivisorTensao() {
    const Vin = parseFloat(document.getElementById('Vin').value);
    const R1 = parseFloat(document.getElementById('R1_div').value);
    const R2 = parseFloat(document.getElementById('R2_div').value);

    if (isNaN(Vin) || isNaN(R1) || isNaN(R2)) {
        alert('Por favor, insira todos os valores.');
        return;
    }

    const Vout = (R2 / (R1 + R2)) * Vin;
    document.getElementById('resultadoDivisorTensao').innerText = `
        Tensão de Entrada (Vin): ${Vin} V\n
        Resistência R1: ${R1} Ω\n
        Resistência R2: ${R2} Ω\n
        Tensão de Saída (Vout): ${Vout.toFixed(2)} V
    `;

    document.getElementById('tutorialDivisorTensao').innerHTML = `
        <h3>Cálculo do Divisor de Tensão</h3>
        <p>A fórmula para calcular a tensão de saída em um divisor de tensão é:</p>
        <p><strong>Vout = (R2 / (R1 + R2)) × Vin</strong></p>
        <p>Onde:</p>
        <ul>
            <li>Vin é a tensão de entrada.</li>
            <li>R1 e R2 são as resistências.</li>
            <li>Vout é a tensão de saída.</li>
        </ul>
        <p>Substituindo os valores:</p>
        <p>Vout = (${R2} / (${R1} + ${R2})) × ${Vin} = ${Vout.toFixed(2)} V</p>
    `;
}

function calcularDivisorCorrente() {
    const Iin = parseFloat(document.getElementById('Iin').value);
    const R1 = parseFloat(document.getElementById('R1_corr').value);
    const R2 = parseFloat(document.getElementById('R2_corr').value);

    if (isNaN(Iin) || isNaN(R1) || isNaN(R2)) {
        alert('Por favor, insira todos os valores.');
        return;
    }

    const I1 = (R2 / (R1 + R2)) * Iin;
    const I2 = Iin - I1;
    document.getElementById('resultadoDivisorCorrente').innerText = `
        Corrente de Entrada (Iin): ${Iin} A\n
        Resistência R1: ${R1} Ω\n
        Resistência R2: ${R2} Ω\n
        Corrente através de R1 (I1): ${I1.toFixed(2)} A\n
        Corrente através de R2 (I2): ${I2.toFixed(2)} A
    `;

    document.getElementById('tutorialDivisorCorrente').innerHTML = `
        <h3>Cálculo do Divisor de Corrente</h3>
        <p>A fórmula para calcular a corrente em um divisor de corrente é:</p>
        <p><strong>I1 = (R2 / (R1 + R2)) × Iin</strong></p>
        <p><strong>I2 = Iin - I1</strong></p>
        <p>Onde:</p>
        <ul>
            <li>Iin é a corrente de entrada.</li>
            <li>R1 e R2 são as resistências.</li>
            <li>I1 é a corrente através de R1.</li>
            <li>I2 é a corrente através de R2.</li>
        </ul>
        <p>Substituindo os valores:</p>
        <p>I1 = (${R2} / (${R1} + ${R2})) × ${Iin} = ${I1.toFixed(2)} A</p>
        <p>I2 = ${Iin} - ${I1.toFixed(2)} = ${I2.toFixed(2)} A</p>
    `;
}

function calcularPotencia() {
    const V = parseFloat(document.getElementById('tensao_pot').value);
    const I = parseFloat(document.getElementById('corrente_pot').value);
    const R = parseFloat(document.getElementById('resistencia_pot').value);

    if (isNaN(V) && isNaN(I) && isNaN(R)) {
        alert('Por favor, insira dois dos três valores.');
        return;
    }

    let resultP;

    if (!isNaN(V) && !isNaN(I)) {
        resultP = V * I;
    } else if (!isNaN(V) && !isNaN(R)) {
        resultP = Math.pow(V, 2) / R;
    } else if (!isNaN(I) && !isNaN(R)) {
        resultP = Math.pow(I, 2) * R;
    }

    document.getElementById('resultadoPotencia').innerText = `
        Potência (P): ${resultP || 0} W
    `;

    document.getElementById('tutorialPotencia').innerHTML = `
        <h3>Cálculo da Potência</h3>
        <p>A fórmula para calcular a potência em um circuito é:</p>
        <p><strong>P = V × I</strong></p>
        <p>Ou também:</p>
        <p><strong>P = (V²) / R</strong></p>
        <p><strong>P = I² × R</strong></p>
        <p>Onde:</p>
        <ul>
            <li>P é a potência (em Watts).</li>
            <li>V é a tensão (em Volts).</li>
            <li>I é a corrente (em Amperes).</li>
            <li>R é a resistência (em Ohms).</li>
        </ul>
        <p>Substituindo os valores você encontra o resultado desejado.</p>
    `;
}

function calcularSerieParalelo() {
    const resistenciasSerie = document.getElementById('resistencias_serie').value.split(',').map(Number).filter(Boolean);
    const resistenciasParalelo = document.getElementById('resistencias_paralelo').value.split(',').map(Number).filter(Boolean);

    const resistenciaTotalSerie = resistenciasSerie.reduce((total, R) => total + R, 0);
    const resistenciaTotalParalelo = resistenciasParalelo.length ? 1 / resistenciasParalelo.reduce((total, R) => total + 1 / R, 0) : 0;

    document.getElementById('resultadoSerieParalelo').innerText = `
        Resistências em Série: ${resistenciasSerie.join(', ')} Ω\n
        Resistência Total em Série: ${resistenciaTotalSerie} Ω\n
        Resistências em Paralelo: ${resistenciasParalelo.join(', ')} Ω\n
        Resistência Total em Paralelo: ${resistenciaTotalParalelo.toFixed(2)} Ω
    `;

    document.getElementById('tutorialSerieParalelo').innerHTML = `
        <h3>Cálculo de Resistências em Série e Paralelo</h3>
        <p>Para resistências em série:</p>
        <p><strong>R_total_serie = R1 + R2 + R3 + ...</strong></p>
        <p>Para resistências em paralelo:</p>
        <p><strong>1 / R_total_paralelo = 1 / R1 + 1 / R2 + 1 / R3 + ...</strong></p>
        <p>Onde:</p>
        <ul>
            <li>R_total_serie é a resistência total em série.</li>
            <li>R_total_paralelo é a resistência total em paralelo.</li>
            <li>R1, R2, R3, ... são as resistências individuais.</li>
        </ul>
        <p>Substituindo os valores você encontra os resultados desejados.</p>
    `;
}

function atualizarDiagramaWheatstone() {
 const R1 = parseFloat(document.getElementById('R1').value);
 const R2 = parseFloat(document.getElementById('R2').value);
 const R3 = parseFloat(document.getElementById('R3').value);

 if (isNaN(R1) || isNaN(R2) || isNaN(R3)) {
     alert('Por favor, insira todas as resistências.');
     return;
 }

 // Coleta resistores extras
 const resistoresExtras = [];
 const container = document.getElementById('extraResistors');
 const inputs = container.getElementsByTagName('input');
 for (let i = 0; i < inputs.length; i++) {
     const valor = parseFloat(inputs[i].value);
     if (!isNaN(valor)) {
         resistoresExtras.push(valor);
     }
 }

 // Calcula Rx
 const Rx = (R3 * R2) / R1;
 document.getElementById('resultadoWheatstone').innerText = `
     Resistência R1: ${R1} Ω\n
     Resistência R2: ${R2} Ω\n
     Resistência R3: ${R3} Ω\n
     Resistências adicionais: ${resistoresExtras.join(', ')} Ω\n
     Resistência Rx (desconhecida): ${Rx.toFixed(2)} Ω
 `;

 document.getElementById('tutorialWheatstone').innerHTML = `
     <h3>Cálculo da Resistência Rx na Ponte de Wheatstone</h3>
     <p>Para que a ponte de Wheatstone esteja em equilíbrio, a resistência desconhecida Rx pode ser calculada pela fórmula:</p>
     <p><strong>Rx = (R3 × R2) / R1</strong></p>
     <p>Onde:</p>
     <ul>
         <li>R1, R2 e R3 são as resistências conhecidas.</li>
     </ul>
     <p>Substituindo os valores:</p>
     <p>Rx = (${R3} × ${R2}) / ${R1} = ${Rx.toFixed(2)} Ω</p>
 `;

 desenharDiagramaWheatstone(R1, R2, R3, Rx, resistoresExtras);
}
