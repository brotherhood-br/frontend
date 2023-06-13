"use client"

import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRegistration } from "@/hooks/useRegistration"
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

const registrationFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Nome deve ter no máximo 255 caracteres",
    }),
  birthDate: z
    .string()
    .regex(
      /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/([0-9]{4})$/,
      "Data de nascimento deve ser no formato dd/mm/aaaa"
    )
    .transform((str) => str.split("/").reverse().join("-")),
  phone: z
    .string()
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Nome deve ter no máximo 255 caracteres",
    }),
})

export type UserRegistrationFormValues = z.input<typeof registrationFormSchema>

export default function RegistrationPage() {
  const router = useRouter()
  const { setUser } = useRegistration()
  const form = useForm<UserRegistrationFormValues>({
    defaultValues: {
      name: "",
      birthDate: "",
      phone: "",
    },
    resolver: zodResolver(registrationFormSchema),
  })

  const onSubmit = (values: UserRegistrationFormValues) => {
    setUser(values)
    router.push("/republica/registrar")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button className="mt-auto w-full" type="submit">
          Enviar
        </Button>
      </form>
    </Form>
  )
}
