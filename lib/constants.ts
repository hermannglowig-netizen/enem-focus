export const CORES_MATERIAS: Record<string, string> = {
  "Matemática": "bg-blue-100 text-blue-700 border-blue-200",
  "Português": "bg-green-100 text-green-700 border-green-200",
  "História": "bg-orange-100 text-orange-700 border-orange-200",
  "Geografia": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Biologia": "bg-pink-100 text-pink-700 border-pink-200",
  "Física": "bg-purple-100 text-purple-700 border-purple-200",
  "Química": "bg-yellow-100 text-yellow-700 border-yellow-200",
  "Filosofia/Sociologia": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Redação": "bg-red-100 text-red-700 border-red-200",
};

export const CRONOGRAMA_COMPLETO: Record<number, any[]> = {
  1: [
    { dia: "Segunda", tarefas: [{ materia: "Matemática", tema: "Razão, Proporção e Regra de 3" }, { materia: "Português", tema: "Variação Linguística" }] },
    { dia: "Terça", tarefas: [{ materia: "História", tema: "Brasil Colônia" }, { materia: "Biologia", tema: "Ecologia: Conceitos Básicos" }] },
    { dia: "Quarta", tarefas: [{ materia: "Física", tema: "Cinemática (Velocidade Média)" }, { materia: "Geografia", tema: "Cartografia e Escalas" }] },
    { dia: "Quinta", tarefas: [{ materia: "Química", tema: "Modelos Atômicos" }, { materia: "Filosofia/Sociologia", tema: "Surgimento da Filosofia" }] },
    { dia: "Sexta", tarefas: [{ materia: "Redação", tema: "Estrutura do Texto Dissertativo" }, { materia: "Matemática", tema: "Porcentagem" }] }
  ],
  2: [
    { dia: "Segunda", tarefas: [{ materia: "Matemática", tema: "Escalas Numéricas" }, { materia: "Português", tema: "Funções da Linguagem" }] },
    { dia: "Terça", tarefas: [{ materia: "História", tema: "Escravidão no Brasil" }, { materia: "Biologia", tema: "Cadeias e Teias Alimentares" }] },
    { dia: "Quarta", tarefas: [{ materia: "Física", tema: "Movimento Uniforme (MU)" }, { materia: "Geografia", tema: "Geopolítica Mundial" }] },
    { dia: "Quinta", tarefas: [{ materia: "Química", tema: "Tabela Periódica" }, { materia: "Filosofia/Sociologia", tema: "Iluminismo" }] },
    { dia: "Sexta", tarefas: [{ materia: "Redação", tema: "Como fazer uma Tese forte" }, { materia: "Matemática", tema: "Conjuntos Numéricos" }] }
  ],
  3: [
    { dia: "Segunda", tarefas: [{ materia: "Matemática", tema: "Equações de 1º Grau" }, { materia: "Português", tema: "Interpretação de Textos" }] },
    { dia: "Terça", tarefas: [{ materia: "História", tema: "Revolução Industrial" }, { materia: "Biologia", tema: "Ciclos Biogeoquímicos" }] },
    { dia: "Quarta", tarefas: [{ materia: "Física", tema: "MUV (Aceleração)" }, { materia: "Geografia", tema: "Climas do Brasil" }] },
    { dia: "Quinta", tarefas: [{ materia: "Química", tema: "Ligações Químicas" }, { materia: "Filosofia/Sociologia", tema: "Contratualismo" }] },
    { dia: "Sexta", tarefas: [{ materia: "Redação", tema: "Repertório Sociocultural" }, { materia: "Matemática", tema: "Média e Moda (Estatística)" }] }
  ],
  4: [
    { dia: "Segunda", tarefas: [{ materia: "Matemática", tema: "Potenciação e Radiciação" }, { materia: "Português", tema: "Figuras de Linguagem" }] },
    { dia: "Terça", tarefas: [{ materia: "História", tema: "Era Vargas (Parte 1)" }, { materia: "Biologia", tema: "Citologia: Membrana Celular" }] },
    { dia: "Quarta", tarefas: [{ materia: "Física", tema: "Leis de Newton" }, { materia: "Geografia", tema: "Urbanização Brasileira" }] },
    { dia: "Quinta", tarefas: [{ materia: "Química", tema: "Estequiometria Básica" }, { materia: "Filosofia/Sociologia", tema: "Cultura de Massa" }] },
    { dia: "Sexta", tarefas: [{ materia: "Redação", tema: "Argumentação e Conectivos" }, { materia: "Matemática", tema: "Geometria Plana: Áreas" }] }
  ],
  // Você pode seguir este padrão até a semana 28
};