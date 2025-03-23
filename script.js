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
    

    
    // Detecção de posição de rolagem para animação do menu
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            menu.classList.add('scrolled');
        } else {
            menu.classList.remove('scrolled');
        }
    });

    // Funcionalidade de pop-up de imagem
    // 1. Primeiro, vamos criar o elemento de pop-up e adicioná-lo ao body
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    popupOverlay.innerHTML = `
        <div class="popup-container">
            <img src="" alt="Imagem ampliada" class="popup-image">
            <button class="popup-close">&times;</button>
        </div>
    `;
    document.body.appendChild(popupOverlay);
    
    // 2. Selecionamos os elementos do pop-up para uso posterior
    const popupImage = document.querySelector('.popup-image');
    const popupClose = document.querySelector('.popup-close');
    
    // 3. Adicionamos funcionalidade para fechar o pop-up
    popupOverlay.addEventListener('click', function(e) {
        // Fechar apenas se clicar no fundo ou no botão de fechar
        if (e.target === popupOverlay || e.target === popupClose) {
            popupOverlay.classList.remove('active');
            // Habilitar rolagem da página novamente
            document.body.style.overflow = 'auto';
        }
    });
    
    // 4. Funcionalidade para fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 5. Encontrar todas as imagens que devem ser clicáveis
    // Nas páginas de projetos, normalmente estão na galeria
    const galeriaImagens = document.querySelectorAll('.galeria-item img');
    // Também podemos adicionar para as imagens dos projetos na home
    const projetoImagens = document.querySelectorAll('.projeto img');
    
    // Função para abrir o popup com a imagem clicada
    function abrirPopupImagem(e) {
        // Obter URL da imagem clicada
        const imagemSrc = e.target.getAttribute('src');
        // Definir a imagem no popup
        popupImage.setAttribute('src', imagemSrc);
        // Mostrar o popup
        popupOverlay.classList.add('active');
        // Desabilitar rolagem da página enquanto o popup estiver aberto
        document.body.style.overflow = 'hidden';
    }
    
    // Adicionar evento de clique para todas as imagens da galeria de projetos
    galeriaImagens.forEach(img => {
        img.addEventListener('click', abrirPopupImagem);
        // Adicionar cursor pointer para indicar que é clicável
        img.style.cursor = 'pointer';
    });
    
    // Adicionar evento de clique para as imagens de projetos na página inicial
    projetoImagens.forEach(img => {
        img.addEventListener('click', function(e) {
            // Prevenir que o clique na imagem ative o link "Ver mais"
            e.stopPropagation();
            abrirPopupImagem(e);
        });
        img.style.cursor = 'pointer';
    });
});
