import type { ComponentProps } from 'react'

type IconProps = ComponentProps<'svg'>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable={false}
      {...props}
    >
      {children}
    </svg>
  )
}

export function LogoMark(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden focusable={false} {...props}>
      <rect width="32" height="32" fill="var(--accent)" />
      <path
        d="M5 17h5l2.5-6 4 11 3-8 1.5 3H27"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="2.6"
        strokeLinecap="square"
      />
    </svg>
  )
}

export const PlusIcon = (p: IconProps) => <Icon {...p}><path d="M12 5v14M5 12h14" /></Icon>
export const SearchIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Icon>
)
export const ArrowLeftIcon = (p: IconProps) => <Icon {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>
export const ChevronRightIcon = (p: IconProps) => <Icon {...p}><path d="m9 18 6-6-6-6" /></Icon>
export const ExternalLinkIcon = (p: IconProps) => (
  <Icon {...p}><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></Icon>
)
export const PauseIcon = (p: IconProps) => <Icon {...p}><path d="M9 5v14M15 5v14" /></Icon>
export const PlayIcon = (p: IconProps) => <Icon {...p}><path d="M7 4.5v15l12-7.5z" /></Icon>
export const PencilIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4" /></Icon>
)
export const TrashIcon = (p: IconProps) => (
  <Icon {...p}><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" /></Icon>
)
export const XIcon = (p: IconProps) => <Icon {...p}><path d="M18 6 6 18M6 6l12 12" /></Icon>
export const CheckIcon = (p: IconProps) => <Icon {...p}><path d="m5 12 5 5L20 7" /></Icon>
export const AlertIcon = (p: IconProps) => (
  <Icon {...p}><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></Icon>
)
export const SunIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></Icon>
)
export const MoonIcon = (p: IconProps) => <Icon {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></Icon>
export const MonitorIcon = (p: IconProps) => (
  <Icon {...p}><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></Icon>
)
export const GlobeIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></Icon>
)
export const ActivityIcon = (p: IconProps) => <Icon {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></Icon>
export const GithubIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z" />
  </svg>
)
export const MailIcon = (p: IconProps) => (
  <Icon {...p}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></Icon>
)
export const FileIcon = (p: IconProps) => (
  <Icon {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h6" /></Icon>
)
export const ClockIcon = (p: IconProps) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>
)
export const ZapIcon = (p: IconProps) => <Icon {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9z" /></Icon>
export const LinkedinIcon = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable={false} {...p}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)
export const ArrowRightIcon = (p: IconProps) => <Icon {...p}><path d="M5 12h14M13 5l7 7-7 7" /></Icon>
export const ArrowUpRightIcon = (p: IconProps) => <Icon {...p}><path d="M7 17 17 7M8 7h9v9" /></Icon>
