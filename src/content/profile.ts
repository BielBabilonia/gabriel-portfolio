/**
 * Everything personal on the page lives here. Edit this file to update the portfolio.
 * Text that changes per language is { en, pt }. Links set to null are hidden.
 * Source: résumé (EN/PT) and LinkedIn. Keep it factual: recruiters compare it with the CV.
 */

export interface Localized {
  en: string
  pt: string
}

export interface Profile {
  name: string
  title: Localized
  tagline: Localized
  location: Localized
  /** IANA time zone used for the live clock. */
  timeZone: string
  openToWork: boolean
  languages: Localized
  links: {
    github: string | null
    linkedin: string | null
    email: string | null
  }
}

export interface Skill {
  id: string
  name: Localized
  description: Localized
  /** Main focus: highlighted on the page. */
  primary?: boolean
  tech: string[]
}

/** live: deployed website. building: in development. done: finished, not a website. */
export type ProjectState = 'live' | 'building' | 'done'

export interface Project {
  id: string
  name: string
  state: ProjectState
  description: Localized
  /** Live URL (required for "live" projects). */
  url: string | null
  repo: string | null
  image: string | null
  /** ISO date the project went live. */
  launchedAt: string | null
  stack: string[]
}

export interface Experience {
  /** "YYYY-MM". */
  start: string
  /** "YYYY-MM", or null for a current role. */
  end: string | null
  title: Localized
  /** Company or school. */
  org: string
  body: Localized
}

export const profile: Profile = {
  name: 'Gabriel de Souza Rezende Sobral',
  title: { en: 'Frontend Developer · React & TypeScript', pt: 'Desenvolvedor Frontend · React & TypeScript' },
  tagline: {
    en: 'Mechatronics Engineer turned frontend developer. I build web and mobile apps with React, TypeScript and React Native, and I’m comfortable crossing into the backend to integrate APIs, debug production issues and own a feature end to end.',
    pt: 'Engenheiro Mecatrônico que virou desenvolvedor frontend. Construo apps web e mobile com React, TypeScript e React Native, e fico à vontade indo para o backend para integrar APIs, investigar problemas em produção e cuidar de uma feature de ponta a ponta.',
  },
  location: { en: 'Aracaju, Brazil', pt: 'Aracaju, Brasil' },
  timeZone: 'America/Sao_Paulo',
  openToWork: true,
  languages: { en: 'PT · EN · ES', pt: 'PT · EN · ES' },
  links: {
    github: 'https://github.com/BielBabilonia',
    linkedin: 'https://www.linkedin.com/in/gabriel-r-sobral/',
    email: 'gabrielrezendesobral@gmail.com',
  },
}

export const skills: Skill[] = [
  {
    id: 'frontend',
    primary: true,
    name: { en: 'Frontend', pt: 'Frontend' },
    description: {
      en: 'Built a warehouse and work-order system from scratch to production: ~20 screens, route-level RBAC, drag-and-drop Kanban and dashboards with CSV/PDF export.',
      pt: 'Construí um sistema de almoxarifado e ordens de serviço do zero até produção: ~20 telas, RBAC por rota, Kanban com arrastar e soltar e dashboards com exportação em CSV/PDF.',
    },
    tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'HTML & CSS', 'Vitest', 'Playwright'],
  },
  {
    id: 'mobile',
    name: { en: 'Mobile', pt: 'Mobile' },
    description: {
      en: 'Maintain a React Native camera-viewing app with native Android/iOS SDKs. Fixed native UI issues, built auth rules and led the App Store submission through approval.',
      pt: 'Mantenho um app React Native de visualização de câmeras com SDKs nativos Android/iOS. Corrigi problemas de UI nativa, implementei regras de autenticação e conduzi a publicação na App Store até a aprovação.',
    },
    tech: ['React Native', 'Expo (bare workflow)', 'Native modules', 'App Store'],
  },
  {
    id: 'backend',
    name: { en: 'Backend & data', pt: 'Backend e dados' },
    description: {
      en: 'Integrate frontends with REST APIs and JWT auth, query PostgreSQL to diagnose data issues, and ship with Docker.',
      pt: 'Integro frontends com APIs REST e autenticação JWT, consulto PostgreSQL para diagnosticar problemas de dados e publico com Docker.',
    },
    tech: ['REST APIs', 'JWT', 'PostgreSQL / SQL', 'Python', 'Docker'],
  },
  {
    id: 'fullstack',
    name: { en: 'Full-stack', pt: 'Full-stack' },
    description: {
      en: 'Own problems beyond my scope: investigated IoT connectivity (MQTT latency and packet loss) and reviewed C#/.NET code, finding a calculation bug, a memory risk and a data exposure.',
      pt: 'Assumo problemas além do meu escopo: investiguei a conectividade IoT (latência e perda de pacotes MQTT) e revisei código C#/.NET, encontrando um erro de cálculo, um risco de memória e uma exposição de dados.',
    },
    tech: ['C# / .NET (review)', 'MQTT', 'Git'],
  },
  {
    id: 'ai',
    name: { en: 'AI-assisted development', pt: 'Desenvolvimento com IA' },
    description: {
      en: 'Use AI as a core tool to build, review and debug, always validating the output. Built internal AI tools: a support chatbot and a multi-agent Python CLI.',
      pt: 'Uso IA como ferramenta central para construir, revisar e depurar, sempre validando o resultado. Construí ferramentas internas com IA: um chatbot de suporte e uma CLI multiagente em Python.',
    },
    tech: ['Claude Code', 'LLM APIs', 'Ollama', 'Multi-agent systems'],
  },
]

export const projects: Project[] = [
  {
    id: 'upwatch',
    name: 'Upwatch',
    state: 'live',
    description: {
      en: 'Uptime monitoring dashboard and public status page. Live polling, optimistic updates, latency charts, EN/PT-BR and dark mode, with the whole backend simulated in the browser.',
      pt: 'Dashboard de monitoramento de uptime e página de status pública. Polling ao vivo, atualizações otimistas, gráficos de latência, EN/PT-BR e modo escuro, com todo o backend simulado no navegador.',
    },
    url: 'https://upwatch-gamma.vercel.app',
    repo: 'https://github.com/BielBabilonia/Upwatch',
    image: '/projects/upwatch.png',
    launchedAt: '2026-10-29',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zod', 'MSW', 'Recharts', 'Tailwind CSS', 'Playwright'],
  },
  {
    id: 'ai-dev-team',
    name: 'AI Dev Team',
    state: 'done',
    description: {
      en: 'Multi-agent CLI that simulates a dev team (tech lead, developer, QA and reviewer), running local models via Ollama with automatic fallback to external LLM providers.',
      pt: 'CLI multiagente que simula um time de desenvolvimento (tech lead, dev, QA e revisor), rodando modelos locais via Ollama com fallback automático para provedores externos de LLM.',
    },
    url: null,
    repo: null, // TODO: add the GitHub link if the repo is public
    image: null,
    launchedAt: null,
    stack: ['Python', 'Ollama', 'LLM APIs'],
  },
  {
    id: 'caixa',
    name: 'Caixa',
    state: 'building',
    description: {
      en: 'Personal finance app built around a daily spending-limit engine, with transactions captured by a native Android notification-reading service. Started from a 24-page technical spec with ADRs.',
      pt: 'App de finanças pessoais baseado em um motor de limite diário de gastos, com lançamentos capturados por um serviço nativo Android que lê notificações. Começou por uma especificação técnica de 24 páginas com ADRs.',
    },
    url: null,
    repo: null,
    image: null,
    launchedAt: null,
    stack: ['React Native', 'Expo', 'SQLite', 'Android native service'],
  },
]

/** Work and education, newest first. */
export const experience: Experience[] = [
  {
    start: '2026-03',
    end: null,
    title: { en: 'Software Developer (React / React Native)', pt: 'Desenvolvedor de Software (React / React Native)' },
    org: 'Pulsatrix Tecnologia da Informação',
    body: {
      en: 'CCTV and IoT company. Built the Conecte.Âncora web frontend from scratch to production, maintain the Conecte Mobile app and led its App Store approval.',
      pt: 'Empresa de CCTV e IoT. Construí o frontend web do Conecte.Âncora do zero até produção, mantenho o app Conecte Mobile e conduzi sua aprovação na App Store.',
    },
  },
  {
    start: '2024-08',
    end: '2026-01',
    title: { en: 'Business Development Intern', pt: 'Estagiário em Desenvolvimento de Negócios' },
    org: 'Radix',
    body: {
      en: 'Prepared technical and commercial proposals, supported project estimates and took part in scoping meetings.',
      pt: 'Elaborei propostas técnico-comerciais, apoiei estimativas de projetos e participei de reuniões de definição de escopo.',
    },
  },
  {
    start: '2023-06',
    end: '2025-01',
    title: { en: 'Commercial Director and Project Member', pt: 'Diretor Comercial e Membro Projetista' },
    org: 'Projet Consultoria Jr.',
    body: {
      en: 'Consulting projects for real clients, from requirements to delivery. Taught me that code exists to solve real problems.',
      pt: 'Projetos de consultoria para clientes reais, do levantamento de requisitos à entrega. Me ensinou que código existe para resolver problemas reais.',
    },
  },
  {
    start: '2021-01',
    end: '2025-12',
    title: { en: 'B.Eng. in Mechatronics Engineering', pt: 'Bacharelado em Engenharia Mecatrônica' },
    org: 'Universidade Tiradentes (UNIT)',
    body: {
      en: 'Engineering background that makes it easier to work with hardware, IoT and technical teams.',
      pt: 'Formação em engenharia que facilita o trabalho com hardware, IoT e times técnicos.',
    },
  },
]

export type DocumentKind = 'resume' | 'cover-letter' | 'other'

export interface DocumentInfo {
  kind: DocumentKind
  lang: 'en' | 'pt'
  title: Localized
}

/**
 * Optional nicer titles for files in /documents, keyed by file name.
 * Files not listed here still show up: kind and language are guessed from the name.
 */
export const documentInfo: Record<string, DocumentInfo> = {
  'resume-gabriel-rezende-EN.pdf': {
    kind: 'resume',
    lang: 'en',
    title: { en: 'Résumé', pt: 'Currículo em inglês' },
  },
  'curriculo-gabriel-rezende.pdf': {
    kind: 'resume',
    lang: 'pt',
    title: { en: 'Résumé in Portuguese', pt: 'Currículo' },
  },
  'curriculo-gabriel-rezende-IA.pdf': {
    kind: 'resume',
    lang: 'pt',
    title: { en: 'Résumé in Portuguese, AI-assisted development focus', pt: 'Currículo com foco em desenvolvimento com IA' },
  },
  'cover-letter-gabriel-rezende.pdf': {
    kind: 'cover-letter',
    lang: 'en',
    title: { en: 'Cover letter', pt: 'Carta de apresentação (inglês)' },
  },
}
