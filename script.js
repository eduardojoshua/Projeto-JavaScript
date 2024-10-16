let timerInterval;
let timer = 0;
let isRunning = false; // Variável para controlar o estado do cronômetro
let points = parseInt(localStorage.getItem('points')) || 0; // Carrega os pontos do localStorage ou inicia em 0
let challenges = [
    "Faça 10 flexões",
    "Caminhe por 30 minutos",
    "Faça 15 agachamentos",
    "Corra por 15 minutos",
    "Realize 20 abdominais",
];

document.getElementById('points-count').textContent = points; // Atualiza a exibição de pontos

// Atualiza o display do cronômetro
function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = timer + " segundos";
}

// Função para escolher um desafio aleatório
function getRandomChallenge() {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    return challenges[randomIndex];
}

// Exibir o desafio diário ao carregar a página
document.getElementById('daily-challenge').textContent = getRandomChallenge();

// Iniciar ou parar o cronômetro
document.getElementById('toggle-timer').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        document.getElementById('toggle-timer').textContent = "Iniciar"; // Muda o texto do botão
    } else {
        timerInterval = setInterval(() => {
            timer++;
            updateTimerDisplay();
        }, 1000);
        isRunning = true;
        document.getElementById('toggle-timer').textContent = "Parar"; // Muda o texto do botão
    }
});

// Marcar o desafio como concluído
document.getElementById('complete-challenge').addEventListener('click', () => {
    points += 10; // Adiciona 10 pontos ao concluir um desafio
    if (timer >= 1200) { // Se o tempo gasto for maior ou igual a 20 minutos (1200 segundos)
        points += 5; // Adiciona 5 pontos extras
        alert("Você ganhou 5 pontos extras por dedicar mais de 20 minutos ao exercício!");
    }
    localStorage.setItem('points', points); // Salva os pontos no localStorage
    document.getElementById('points-count').textContent = points; // Atualiza a exibição
    alert(`Desafio concluído! Você ganhou 10 pontos e gastou ${timer} segundos!`);
    
    // Reiniciar o cronômetro e atualizar o desafio
    clearInterval(timerInterval); // Para o cronômetro
    timer = 0; // Reseta o tempo
    isRunning = false; // Muda o estado do cronômetro
    updateTimerDisplay(); // Atualiza a exibição do cronômetro
    document.getElementById('toggle-timer').textContent = "Iniciar"; // Reseta o texto do botão
    document.getElementById('daily-challenge').textContent = getRandomChallenge(); // Gerar novo desafio
});

// Trocar pontos por uma recompensa especial
document.getElementById('claim-reward').addEventListener('click', () => {
    if (points >= 50) {
        points -= 50; // Deduz 50 pontos
        localStorage.setItem('points', points); // Atualiza os pontos no localStorage
        document.getElementById('reward-message').textContent = "Você ganhou uma recompensa especial!";
    } else {
        alert("Você não tem pontos suficientes para trocar por uma recompensa!");
    }
    document.getElementById('points-count').textContent = points; // Atualiza a exibição de pontos
});
