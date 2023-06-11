"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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

const brotherhoodRegistrationFormSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Nome deve ter no máximo 255 caracteres",
    }),
  street: z.string().min(3, {
    message: "Rua deve ter no mínimo 3 caracteres",
  }),
  number: z.string().min(1, {
    message: "Número deve ter no mínimo 1 caracteres",
  }),
  city: z.string().min(3, {
    message: "Cidade deve ter no mínimo 3 caracteres",
  }),
  state: z.string().min(2, {
    message: "Estado deve ter no mínimo 2 caracteres",
  }),
  zipCode: z.string().min(8, {
    message: "CEP deve ter no mínimo 8 caracteres",
  }),
  country: z.string().min(3, {
    message: "País deve ter no mínimo 3 caracteres",
  }),
  phone: z
    .string()
    .min(3, {
      message: "Telefone deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Telefone deve ter no máximo 255 caracteres",
    }),
  description: z.string().min(3, {
    message: "Descrição deve ter no mínimo 3 caracteres",
  }),
  type: z.enum(["JUST_MEN", "JUST_WOMEN", "NO_RESTRICTIONS"]),
  capacity: z.number().min(1, {
    message: "Capacidade deve ser maior que 0",
  }),
})

type BrotherhoodRegistrationFormValues = z.input<
  typeof brotherhoodRegistrationFormSchema
>

function getInitials(name: string) {
  const words = name.split(" ")
  const initials = words
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
  return initials
}

export default function BrotherhoodRegistrationPage() {
  const form = useForm<BrotherhoodRegistrationFormValues>({
    defaultValues: {
      name: "",
      street: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      description: "",
      capacity: 0,
    },
    resolver: zodResolver(brotherhoodRegistrationFormSchema),
  })

  const onSubmit = (values: BrotherhoodRegistrationFormValues) => {
    console.log(values)
  }

  const name = useWatch({
    control: form.control,
    name: "name",
  })

  return (
    <Form {...form}>
      {/* TODO: image/cover clickable to edit */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>

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
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                {/* TODO: autocomplete other fields with Via CEP API */}
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>País</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription></FormDescription>
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Escreva aqui sobre a república. Este texto será utilizado no perfil online da república."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de república</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um item" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="JUST_MEN">Masculina</SelectItem>
                  <SelectItem value="JUST_WOMEN">Feminina</SelectItem>
                  <SelectItem value="NO_RESTRICTION">Mista</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade máxima de integrantes</FormLabel>
              <FormControl>
                <Input {...field} />
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
