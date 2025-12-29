'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdatePet, useDeletePet } from '../generated/pets/pets'
import type { Pet } from '../generated/petstore.schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil, Trash2 } from 'lucide-react'

interface PetListItemProps {
  pet: Pet
}

export default function PetListItem({ pet }: PetListItemProps) {
  const t = useTranslations('petListItem')
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(pet.name)
  const [editTag, setEditTag] = useState(pet.tag || '')

  const updatePetMutation = useUpdatePet({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/pets'] })
        setIsEditing(false)
      },
    },
  })

  const deletePetMutation = useDeletePet({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/pets'] })
      },
    },
  })

  const handleSave = () => {
    updatePetMutation.mutate({
      petId: pet.id,
      data: {
        id: pet.id,
        name: editName,
        tag: editTag || undefined,
      },
    })
  }

  const handleCancel = () => {
    setEditName(pet.name)
    setEditTag(pet.tag || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    deletePetMutation.mutate({ petId: pet.id })
  }

  const isPending = updatePetMutation.isPending || deletePetMutation.isPending

  if (isEditing) {
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder={t('namePlaceholder')}
                disabled={isPending}
                className="flex-1"
              />
              <Input
                type="text"
                value={editTag}
                onChange={(e) => setEditTag(e.target.value)}
                placeholder={t('tagPlaceholder')}
                disabled={isPending}
                className="flex-1"
              />
            </div>
            <Button
              onClick={handleSave}
              disabled={isPending || !editName.trim()}
              size="sm"
            >
              {t('save')}
            </Button>
            <Button
              onClick={handleCancel}
              disabled={isPending}
              variant="outline"
              size="sm"
            >
              {t('cancel')}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-lg">{pet.name}</span>
            {pet.tag && (
              <span className="text-sm text-muted-foreground ml-2">
                #{pet.tag}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEditing(true)}
              disabled={isPending}
              variant="outline"
              size="sm"
            >
              <Pencil className="h-4 w-4 mr-2" />
              {t('edit')}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('delete')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('deleteConfirmTitle')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('deleteConfirmDescription', { name: pet.name })}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    {t('delete')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
