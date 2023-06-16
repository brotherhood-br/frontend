"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { googleLogout } from "@react-oauth/google"
import { useQueryClient } from "@tanstack/react-query"
import { format, parseISO } from "date-fns"
import { useForm } from "react-hook-form"
import z from "zod"

import { useUserProfileAsync } from "@/lib/api/hooks/useUsersAsync"
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
import { Icons } from "@/components/icons"

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

interface UserFormProps {
  defaultValues: UserEditFormValues
  onSubmit: (formData: UserEditFormValues) => void
  onCancel?: () => void
}

const UserForm = ({ defaultValues, onSubmit, onCancel }: UserFormProps) => {
  const form = useForm<UserEditFormValues>({
    defaultValues: defaultValues,
  })

  return (
    <Form {...form}>
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
          <Button className=" w-full" variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>

          <Button className="w-full" type="submit">
            Confirmar edição
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default function UserEdit() {
  const [editMode, setEditMode] = useState(false)
  const { user, logout } = useAuth()
  const { data, isLoading } = useUserProfileAsync(user?.id ?? "")
  const router = useRouter()
  const queryClient = useQueryClient()

  const onSubmit = (formData: UserEditFormValues) => {
    console.log(formData)
  }

  const onLogout = () => {
    queryClient.cancelQueries()
    queryClient.clear()
    logout()
    googleLogout()
    router.push("/login")
  }

  return (
    <>
      <header className="mb-8 flex items-center gap-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={data?.picture} />
          <AvatarFallback>{user?.initials}</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-sm text-slate-500">{data?.email}</p>
        </div>
      </header>
      {!!data && (
        <>
          {!editMode && (
            <section className="space-y-6">
              <div>
                <p className="text-sm text-slate-500">Data de nascimento</p>
                <p className="text-md">
                  {format(parseISO(data.birthdate), "dd/MM/yyyy")}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Telefone</p>
                <p className="text-md">{data.phone}</p>
              </div>

              <div className="space-y-2">
                <Button
                  className=" w-full"
                  variant="secondary"
                  onClick={() => setEditMode(true)}
                >
                  Editar perfil
                </Button>
                <Button
                  className=" w-full"
                  variant="destructive"
                  onClick={onLogout}
                >
                  Sair
                </Button>
              </div>
            </section>
          )}
          {editMode && (
            <UserForm
              defaultValues={{
                birthDate: format(parseISO(data.birthdate), "dd/MM/yyyy"),
                phone: data.phone,
              }}
              onSubmit={onSubmit}
              onCancel={() => setEditMode(false)}
            />
          )}
        </>
      )}
      {isLoading && <Icons.spinner className="h-6 w-6 animate-spin" />}
    </>
  )
}
