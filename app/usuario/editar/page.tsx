"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import z from "zod"

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

const userEditFormSchema = z.object({
  birthDate: z
    .string()
    .min(10, {
      message:
        "Data de nascimento deve ter 10 caracteres no formato dd/mm/aaaa",
    })
    .max(10, {
      message:
        "Data de nascimento deve ter 10 caracteres no formato dd/mm/aaaa",
    }),
  phone: z
    .string()
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Nome deve ter no máximo 255 caracteres",
    }),
})

type UserEditFormValues = z.input<typeof userEditFormSchema>

export default function UserEdit() {
  const { user } = useAuth()

  // TODO: get data from api

  const form = useForm<UserEditFormValues>({
    defaultValues: {
      birthDate: "06/03/1998",
      phone: "31 98313-3232",
    },
  })

  const onSubmit = (data: UserEditFormValues) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <header className="mb-8 flex items-center gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{user?.initials}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-slate-500">nono@gmail.com</p>
        </div>
      </header>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                {/* TODO: use datepicker to select birthdate */}
                {/* <DatePicker {...field} /> */}
                <Input placeholder="dd/mm/aaaa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                {/* TODO: use a library to handle patterns */}
                {/* https://s-yadav.github.io/react-number-format/docs/pattern_format */}
                <Input placeholder="( ) _____-____" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-auto space-y-2 pb-8">
          <Link href="/">
            <Button className=" w-full" variant="secondary">
              Cancelar
            </Button>
          </Link>
          <Button className="w-full" type="submit">
            Confirmar edição
          </Button>
        </div>
      </form>
    </Form>
  )
}
