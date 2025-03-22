document.addEventListener('DOMContentLoaded', function() {
    // Menu de navegação responsivo
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link (em mobile)
    const menuLinks = document.querySelectorAll('.menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Rolagem suave ao clicar nos links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtro de projetos
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const projetos = document.querySelectorAll('.projeto');
    
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove classe ativo de todos os botões
            filtroBtns.forEach(b => b.classList.remove('ativo'));
            
            // Adiciona classe ativo ao botão clicado
            this.classList.add('ativo');
            
            const filtro = this.getAttribute('data-filtro');
            
            // Filtra os projetos
            projetos.forEach(projeto => {
                if (filtro === 'todos') {
                    projeto.style.display = 'block';
                } else if (projeto.getAttribute('data-categoria') === filtro) {
                    projeto.style.display = 'block';
                } else {
                    projeto.style.display = 'none';
                }
            });
        });
    });
    
    // Slider de depoimentos
    const depoimentos = document.querySelectorAll('.depoimento');
    const btnAnterior = document.querySelector('.depoimento-anterior');
    const btnProximo = document.querySelector('.depoimento-proximo');
    
    if (depoimentos.length > 0) {
        let depoimentoAtual = 0;
        
        // Função para mostrar o depoimento atual
        function mostrarDepoimento() {
            depoimentos.forEach(depo => depo.classList.remove('ativo'));
            depoimentos[depoimentoAtual].classList.add('ativo');
        }
        
        // Inicializa com o primeiro depoimento
        mostrarDepoimento();
        
        // Botão próximo
        if (btnProximo) {
            btnProximo.addEventListener('click', function() {
                depoimentoAtual++;
                if (depoimentoAtual >= depoimentos.length) {
                    depoimentoAtual = 0;
                }
                mostrarDepoimento();
            });
        }
        
        // Botão anterior
        if (btnAnterior) {
            btnAnterior.addEventListener('click', function() {
                depoimentoAtual--;
                if (depoimentoAtual < 0) {
                    depoimentoAtual = depoimentos.length - 1;
                }
                mostrarDepoimento();
            });
        }
        
        // Alternar depoimentos automaticamente a cada 5 segundos
        setInterval(function() {
            depoimentoAtual++;
            if (depoimentoAtual >= depoimentos.length) {
                depoimentoAtual = 0;
            }
            mostrarDepoimento();
        }, 5000);
    }
    
    // Formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar o código para enviar o formulário por email
            // Por enquanto, vamos apenas mostrar uma mensagem de sucesso
            
            // Simulando o envio com um pequeno delay
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
                contatoForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Detecção de posição de rolagem para animação do menu
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('scrolled');
        }
    });
});
