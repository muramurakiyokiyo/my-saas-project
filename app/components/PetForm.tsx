'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPetSchema, type CreatePetInput } from '../../src/schemas/petSchema'
import axios from 'axios'
import { toast } from 'sonner'
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
  const queryClient = useQueryClient()
  const form = useForm<CreatePetInput>({
    resolver: zodResolver(createPetSchema),
    defaultValues: {
      name: '',
      tag: '',
    },
  })

  const createPetsMutation = useMutation({
    mutationFn: async (data: CreatePetInput) => {
      return await axios.post('/pets', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/pets'] as const })
      form.reset()
      toast.success('ペットを登録しました')
    },
    onError: () => {
      toast.error('エラーが発生しました。もう一度お試しください。')
    },
  })

  const onSubmit = (data: CreatePetInput) => {
    createPetsMutation.mutate(data)
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>新規ペット登録</CardTitle>
        <CardDescription>新しいペットの情報を入力してください</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input placeholder="ペットの名前" {...field} />
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
                  <FormLabel>タグ</FormLabel>
                  <FormControl>
                    <Input placeholder="例: トイプードル" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={createPetsMutation.isPending}
              className="w-full"
            >
              {createPetsMutation.isPending ? '登録中...' : '登録'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
