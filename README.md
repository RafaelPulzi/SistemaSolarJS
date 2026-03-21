# 🌌 Sistema Solar JS — Cosmic Visualizer

![GitHub license](https://img.shields.io/github/license/RafaelPulzi/SistemaSolarJS)
![JavaScript](https://img.shields.io/badge/language-JavaScript-yellow)
![Canvas API](https://img.shields.io/badge/API-Canvas-orange)

O **Sistema Solar JS** (ou Cosmic Visualizer) é uma aplicação web de alto impacto visual que cria uma representação dinâmica e interativa do universo. Utilizando o poder da **Canvas API** do HTML5, o projeto renderiza corpos celestes, nebulosas, estrelas cadentes e sistemas orbitais em tempo real, proporcionando uma experiência imersiva diretamente no navegador.

---

## 🚀 Funcionalidades

-   **Visual Deslumbrante:** Renderização de partículas para estrelas, gradientes complexos para nebulosas e rastros luminosos para estrelas cadentes.
-   **Experiência Interativa:** O usuário pode interagir com os elementos através do mouse (hover e clique), obtendo informações ou disparando eventos visuais.
-   **Customização em Tempo Real:** Ajustes dinâmicos de densidade de estrelas, velocidade de animação e esquemas de cores.
-   **Design Responsivo:** O canvas se adapta automaticamente ao tamanho da janela (viewport), garantindo que a proporção do cosmos seja mantida em qualquer dispositivo.

---

## 🛠️ Stack Técnica

-   **Frontend:** HTML5, CSS3, JavaScript (ES6+).
-   **Renderização:** Canvas API (2D Context).
-   **Metodologia:** Programação Orientada a Objetos (POO) para gestão de entidades espaciais.

---

## 🎨 Técnicas e Estratégias de Canvas

Para alcançar a fluidez e o realismo visual, foram aplicadas as seguintes estratégias técnicas:

### 1. Sistema de Partículas (Estrelas e Nebulosas)
Cada estrela é tratada como um objeto individual com propriedades de posição (x, y), brilho (opacity) e tamanho. As nebulosas utilizam **Gradientes Radiais** (`createRadialGradient`) sobrepostos para criar a ilusão de profundidade e densidade gasosa.

### 2. Loop de Animação Otimizado
Utilizamos o `requestAnimationFrame` em vez de `setInterval`. Isso garante que a renderização ocorra em sincronia com a taxa de atualização do monitor, economizando CPU/GPU e evitando "tearing" visual.

### 3. Física de Movimento e Órbitas
-   **Trigonometria:** Uso de `Math.cos()` e `Math.sin()` para calcular trajetórias circulares e elípticas dos planetas e satélites.
-   **Vetores:** Estrelas cadentes implementam vetores de velocidade e aceleração para simular o rastro de movimento.

### 4. Gestão de Memória no Canvas
Para manter a performance, implementamos uma estratégia de "limpeza e redesenho" (`clearRect`) eficiente, além de reciclar objetos que saem da tela para evitar vazamentos de memória (Memory Leaks).

### 5. Camadas de Profundidade (Parallax)
Diferentes velocidades de movimento para estrelas de tamanhos distintos, criando uma percepção de 3D e profundidade de campo, mesmo em um ambiente 2D.

---

## 📂 Estrutura do Projeto

```bash
cosmic-visualizer/
|-- index.html      # Estrutura principal e container do canvas
|-- js/
    |-- main.js     # Inicialização e controle do loop principal
    |-- universo.js # Lógica de comportamento dos corpos celestes
    |-- canva.js    # Configurações específicas de renderização e contexto
|-- css/
    |-- style.css   # Estilização da interface e reset
|-- assets/
    |-- images/     # Assets estáticos (se houver)
    |-- fonts/      # Fontes personalizadas para a UI
|-- README.md
```

---

## 📦 Instalação e Uso

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/RafaelPulzi/SistemaSolarJS.git
   ```
2. **Navegue até a pasta:**
   ```bash
   cd SistemaSolarJS
   ```
3. **Execute o projeto:**
   Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário um servidor backend, pois o projeto é puramente client-side.

---

## 🤝 Contribuição

Contribuições são o que fazem a comunidade open source um lugar incrível para aprender, inspirar e criar.
1. Faça um **Fork** do projeto.
2. Crie uma **Branch** para sua funcionalidade (`git checkout -b feature/NovaFuncionalidade`).
3. Faça o **Commit** de suas alterações (`git commit -m 'Add: Nova Funcionalidade'`).
4. Faça o **Push** para a Branch (`git push origin feature/NovaFuncionalidade`).
5. Abra um **Pull Request**.

---

## 📝 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📬 Contato

**Rafael Pulzi** - [Seu Link do LinkedIn/Portfólio]
Link do Projeto: [https://github.com/RafaelPulzi/SistemaSolarJS](https://github.com/RafaelPulzi/SistemaSolarJS)

---
*Agradecemos a todos que contribuíram ou demonstraram interesse no Sistema Solar JS. Explore o cosmos com responsabilidade!* 🌠
