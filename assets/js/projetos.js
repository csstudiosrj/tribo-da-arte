/* ==========================================================================
   PORTFÓLIO — edite aqui para adicionar, remover ou trocar projetos.

   Como trocar uma foto:
   1) Envie a imagem para a pasta  assets/img/projetos/  (ex.: escultura-01.jpg)
   2) No projeto desejado, preencha  image: "assets/img/projetos/escultura-01.jpg"
      (enquanto estiver vazio "", o site mostra um espaço elegante "Foto em breve")

   Categorias disponíveis (campo "cat"):
   esculturas | mockups | aderecos | eventos | vitrines | audiovisual

   Dicas de imagem: formato JPG ou WebP, largura de 1600px, até 400 KB.
   ========================================================================== */

window.TRIBO_CATEGORIAS = [
  { id: "todos", nome: "Todos" },
  { id: "esculturas", nome: "Esculturas & Monumentos" },
  { id: "mockups", nome: "Mockups" },
  { id: "aderecos", nome: "Adereços" },
  { id: "eventos", nome: "Eventos & Marcas" },
  { id: "vitrines", nome: "Vitrines & Espaços" },
  { id: "audiovisual", nome: "Audiovisual" }
];

window.TRIBO_PROJETOS = [
  {
    titulo: "Escultura em grande escala",
    cat: "esculturas",
    ano: "",
    image: "",
    descricao: "Peça escultórica de forte presença, desenvolvida do rascunho à finalização para ocupar espaços comerciais, eventos e ativações de marca."
  },
  {
    titulo: "Mockup de produto",
    cat: "mockups",
    ano: "",
    image: "",
    descricao: "Representação tridimensional de produto em pequena ou grande escala, fiel ao design original e pensada para impactar no ponto de venda ou em campanhas."
  },
  {
    titulo: "Adereço cenográfico",
    cat: "aderecos",
    ano: "",
    image: "",
    descricao: "Objetos de cena e adereços sob medida, com acabamento artístico, para produções, ensaios e ambientações."
  },
  {
    titulo: "Cenário para ativação de marca",
    cat: "eventos",
    ano: "",
    image: "",
    descricao: "Composição cenográfica para eventos e ações de marca, combinando peças especiais, escala e identidade visual."
  },
  {
    titulo: "Vitrine cenográfica",
    cat: "vitrines",
    ano: "",
    image: "",
    descricao: "Peças e elementos cenográficos para vitrines e espaços comerciais que contam uma história e convidam a entrar."
  },
  {
    titulo: "Peça para produção audiovisual",
    cat: "audiovisual",
    ano: "",
    image: "",
    descricao: "Elementos cenográficos e esculturas produzidos sob medida para cinema, TV, publicidade e conteúdo digital."
  },
  {
    titulo: "Monumento sob medida",
    cat: "esculturas",
    ano: "",
    image: "",
    descricao: "Monumentos e esculturas especiais produzidos conforme o conceito do cliente, com planejamento de transporte para todo o Brasil."
  },
  {
    titulo: "Protótipo visual em escala",
    cat: "mockups",
    ano: "",
    image: "",
    descricao: "Maquetes e mockups para apresentação de conceitos, lançamentos e exposições."
  },
  {
    titulo: "Instalação para exposição",
    cat: "eventos",
    ano: "",
    image: "",
    descricao: "Peças e instalações cenográficas para exposições e feiras, desenhadas para guiar o olhar do público."
  }
];
