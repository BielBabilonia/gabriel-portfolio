export const en = {
  'meta.title': '{name} · Portfolio',
  'skip': 'Skip to content',

  'banner.portfolio': 'Portfolio',
  'banner.openToWork': 'Open to work · Remote',
  'banner.contact': 'Get in touch',
  'banner.resume': 'Résumé (PDF)',

  'stats.localTime': 'Local time',
  'stats.timeZoneHint': 'Brasília time',
  'stats.languages': 'Languages',
  'stats.languagesHint': 'Native · Professional · Basic',
  'stats.projects': 'Projects live',
  'stats.projectsHint': 'Deployed to production',
  'stats.based': 'Based in',
  'stats.basedHint': 'Open to remote work',

  'skills.title': 'What I do',
  'skills.subtitle': 'Areas and tools',
  'skills.primary': 'Main focus',

  'projects.title': 'Projects',
  'projects.subtitle': 'Things I’ve built',
  'projects.live': 'Live demo',
  'projects.source': 'Source',
  'projects.liveSince': 'Live since {date}',
  'projects.screenshot': 'Screenshot of {name}',
  'projects.figure': 'Fig. {n} — {name}',
  'projects.building': 'In development',
  'projects.done': 'Completed',

  'experience.title': 'Experience',
  'experience.subtitle': 'Work and education',
  'experience.current': 'Current',
  'experience.present': 'Present',

  'documents.title': 'Documents',
  'documents.subtitle': 'Résumés and cover letter',
  'documents.kind.resume': 'Résumé',
  'documents.kind.cover-letter': 'Cover letter',
  'documents.kind.other': 'Document',

  'contact.title': 'Contact',
  'contact.subtitle': 'The best ways to reach me',
  'contact.email': 'Email',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',

  'footer.built': 'Built with React, TypeScript and Tailwind CSS.',
  'footer.source': 'Source',

  'theme.label': 'Theme',
  'theme.system': 'System',
  'theme.light': 'Light',
  'theme.dark': 'Dark',
  'language.label': 'Language',
} as const

export type MessageKey = keyof typeof en
export type Messages = Record<MessageKey, string>

export const ptBR: Messages = {
  'meta.title': '{name} · Portfólio',
  'skip': 'Pular para o conteúdo',

  'banner.portfolio': 'Portfólio',
  'banner.openToWork': 'Disponível · Remoto',
  'banner.contact': 'Entrar em contato',
  'banner.resume': 'Currículo (PDF)',

  'stats.localTime': 'Horário local',
  'stats.timeZoneHint': 'Horário de Brasília',
  'stats.languages': 'Idiomas',
  'stats.languagesHint': 'Nativo · Profissional · Básico',
  'stats.projects': 'Projetos no ar',
  'stats.projectsHint': 'Publicados em produção',
  'stats.based': 'Localização',
  'stats.basedHint': 'Aberto a trabalho remoto',

  'skills.title': 'O que eu faço',
  'skills.subtitle': 'Áreas e ferramentas',
  'skills.primary': 'Foco principal',

  'projects.title': 'Projetos',
  'projects.subtitle': 'O que eu construí',
  'projects.live': 'Ver demo',
  'projects.source': 'Código',
  'projects.liveSince': 'No ar desde {date}',
  'projects.screenshot': 'Captura de tela do {name}',
  'projects.figure': 'Fig. {n} — {name}',
  'projects.building': 'Em desenvolvimento',
  'projects.done': 'Concluído',

  'experience.title': 'Experiência',
  'experience.subtitle': 'Trabalho e formação',
  'experience.current': 'Atual',
  'experience.present': 'Atual',

  'documents.title': 'Documentos',
  'documents.subtitle': 'Currículos e carta de apresentação',
  'documents.kind.resume': 'Currículo',
  'documents.kind.cover-letter': 'Carta',
  'documents.kind.other': 'Documento',

  'contact.title': 'Contato',
  'contact.subtitle': 'As melhores formas de falar comigo',
  'contact.email': 'E-mail',
  'contact.linkedin': 'LinkedIn',
  'contact.github': 'GitHub',

  'footer.built': 'Feito com React, TypeScript e Tailwind CSS.',
  'footer.source': 'Código',

  'theme.label': 'Tema',
  'theme.system': 'Sistema',
  'theme.light': 'Claro',
  'theme.dark': 'Escuro',
  'language.label': 'Idioma',
}
