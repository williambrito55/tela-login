const form = document.getElementById('formLogin');
const btnLogar = document.getElementById('btnLogar');
const feedback = document.getElementById('mensagem-feedback');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Inicia estado de loading
    btnLogar.innerText = "Entrando...";
    btnLogar.disabled = true;
    feedback.style.display = "none";

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Sucesso
            btnLogar.innerText = "Logado!";
            btnLogar.classList.add('login-form__button--success');

            feedback.innerText = data.message + " Redirecionando...";
            feedback.style.color = "#fff";
            feedback.style.display = "block";

            setTimeout(() => {
                form.reset();
                btnLogar.innerText = "Login";
                btnLogar.disabled = false;
                btnLogar.classList.remove('login-form__button--success');
                feedback.style.display = "none";
            }, 3000);
        } else {
            // Erro retornado pela API
            throw new Error(data.message || 'Erro ao realizar login');
        }

    } catch (error) {
        // Erro de rede ou erro lançado
        btnLogar.innerText = "Login";
        btnLogar.disabled = false;
        
        feedback.innerText = error.message;
        feedback.style.color = "#ff4d4d"; // Cor de erro
        feedback.style.display = "block";
    }
});