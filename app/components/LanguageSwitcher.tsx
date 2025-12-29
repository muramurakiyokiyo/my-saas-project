'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/src/i18n/routing'
import { Button } from '@/components/ui/button'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: 'ja' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="fixed top-4 right-4 flex gap-2 z-50">
      <Button
        variant={locale === 'ja' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('ja')}
      >
        日本語
      </Button>
      <Button
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLocale('en')}
      >
        English
      </Button>
    </div>
  )
}
