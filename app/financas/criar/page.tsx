"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { getNameInitials } from "@/lib/utils"
import { useAuth } from "@/hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  priority: z.enum(["HIGH", "MEDIUM", "LOW"], {
    required_error: "Tipo de ta é obrigatório",
  }),
  value: z.string().refine((value) => value !== "", {
    message: "Capacidade deve possuir um valor",
  }),
})

type FinanceFormValues = z.infer<typeof financeFormSchema>

export interface FinanceFormProps {
  defaultValues?: FinanceFormValues
  onSubmit: (data: FinanceFormValues) => void
}

export default function BrotherhoodCreateFinance({
  onSubmit,
}: FinanceFormProps) {
  const form = useForm<FinanceFormValues>({
    defaultValues: {
      name: "",
      description: "",
      value: "",
    },
    resolver: zodResolver(financeFormSchema),
  })

  const { isSubmitting } = form.formState

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Criar nova finança</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da finança</FormLabel>
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
                    placeholder="Escreva aqui uma breve descrição sobre da finança."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um item" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HIGH">Alta</SelectItem>
                    <SelectItem value="MEDIUM">Média</SelectItem>
                    <SelectItem value="LOW">Baixa</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2 pb-8">
            <Link href="/republica">
              <Button className="mt-auto w-full" variant="secondary">
                Cancelar
              </Button>
            </Link>
            <Button className="w-full" type="submit">
              {isSubmitting ? <Icons.spinner className="animate-spin" /> : null}
              Criar Tarefa
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
