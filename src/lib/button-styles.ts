import { cn } from './cn'

const base = 'label inline-flex h-10 items-center gap-2 border px-4 transition-colors [&_svg]:size-3.5'

export const buttonStyles = {
  primary: cn(base, 'border-accent bg-accent text-accent-fg hover:border-fg hover:bg-fg hover:text-bg'),
  secondary: cn(base, 'border-border-strong text-fg hover:bg-fg hover:text-bg'),
}
