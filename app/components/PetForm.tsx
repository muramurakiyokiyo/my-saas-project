'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPetSchema, type CreatePetInput } from '../../src/schemas/petSchema'
import apiClient from '@/src/api/client'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function PetForm() {
  const t = useTranslations('petForm')
  const queryClient = useQueryClient()
  
  // 多言語対応のスキーマを生成
  const schema = useMemo(() => {
    return createPetSchema({
      nameRequired: t('validation.nameRequired'),
      nameMaxLength: t('validation.nameMaxLength'),
      tagRequired: t('validation.tagRequired'),
    })
  }, [t])
  
  const form = useForm<CreatePetInput>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      tag: '',
    },
  })
  
  const { isValid } = form.formState

  const createPetsMutation = useMutation({
    mutationFn: async (data: CreatePetInput) => {
      return await apiClient.post('/pets', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/pets'] as const })
      form.reset()
      toast.success(t('success'))
    },
    // エラーハンドリングは共通インターセプターで処理されるため、onErrorは削除
  })

  const onSubmit = (data: CreatePetInput) => {
    createPetsMutation.mutate(data)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('nameLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('namePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tagLabel')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('tagPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isValid || createPetsMutation.isPending}
              className="w-full"
            >
              {createPetsMutation.isPending ? t('submitting') : t('submit')}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
