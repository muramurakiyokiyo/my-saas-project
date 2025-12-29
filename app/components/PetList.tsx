'use client'
import { useTranslations } from 'next-intl'
import { useListPets } from '../generated/pets/pets'
import PetListItem from './PetListItem'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PetList() {
  const t = useTranslations('petList')
  const { data: petsData, isLoading: petsLoading, isError: petsError } = useListPets({ limit: 10 })

  if (petsLoading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">{t('loading')}</div>
        </CardContent>
      </Card>
    )
  }

  if (petsError) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-destructive">{t('error')}</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {petsData?.data && petsData.data.length > 0 ? (
          <div className="space-y-4">
            {petsData.data.map((pet) => (
              <PetListItem key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            {t('empty')}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

