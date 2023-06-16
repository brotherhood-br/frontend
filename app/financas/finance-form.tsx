"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

const financeFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Nome deve ter no máximo 255 caracteres",
    }),
  description: z.string().min(3, {
    message: "Descrição deve ter no mínimo 3 caracteres",
  }),
  value: z.string().min(1, {
    message: "Valor deve conter algum número",
  }),
})

export type FinanceFormValues = z.infer<typeof financeFormSchema>

interface FinanceFormProps {
  defaultValues?: FinanceFormValues
  onSubmit: (data: FinanceFormValues) => void
}

export default function FinanceForm({
  defaultValues,
  onSubmit,
}: FinanceFormProps) {
  const form = useForm<FinanceFormValues>({
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      value: "",
    },
    resolver: zodResolver(financeFormSchema),
  })

  const { isSubmitting } = form.formState

  return (
    <div>
      <h1 className="text-xl">Criar nova meta</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Coloque aqui uma breve descrição da meta"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor total</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2 pb-8">
            <Link href="/financas">
              <Button className="mt-auto w-full" variant="secondary">
                Cancelar
              </Button>
            </Link>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Icons.spinner className="mr-2 animate-spin" />
              ) : null}
              Criar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
