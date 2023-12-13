export function styleScrollbar() {
  var style = document.createElement('style');
  style.innerHTML = `
    /* Estilos da barra de rolagem */
    ::-webkit-scrollbar {
      width: 10px; /* Largura da barra de rolagem */
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1; /* Cor do fundo da barra de rolagem */
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888; /* Cor do polegar da barra de rolagem */
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* Cor do polegar da barra de rolagem ao passar o mouse */
    }
  `;

  document.head.appendChild(style);
}