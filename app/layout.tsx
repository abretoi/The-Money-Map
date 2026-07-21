import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Sidebar } from '@/components/reader/Sidebar'
import { TopBar } from '@/components/reader/TopBar'
import { buildOutline } from '@/lib/outline'
import { GoldDefs } from '@/components/art/GoldDefs'

export const metadata: Metadata = {
  title: {
    default: 'The Money Map',
    template: '%s · The Money Map',
  },
  description: 'Navigate Your Journey to Financial Freedom.',
  openGraph: {
    title: 'The Money Map',
    description: 'Navigate Your Journey to Financial Freedom.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
    { media: '(prefers-color-scheme: light)', color: '#fbfbfa' },
  ],
}

/** Applied before paint so a stored theme choice never flashes. */
const THEME_INIT = `
try {
  var t = localStorage.getItem('mm-theme');
  if (t) document.documentElement.setAttribute('data-theme', t);
} catch (e) {}
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const outline = buildOutline()
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body>
        <GoldDefs />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--r-md)] focus:bg-[var(--bg-3)] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <div className="relative z-1 grid min-h-dvh lg:grid-cols-[300px_1fr]">
          <Sidebar />
          <div className="min-w-0">
            <TopBar outline={outline} />
            <main id="main" className="min-w-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
