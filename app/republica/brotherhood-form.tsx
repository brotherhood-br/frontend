"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import { getNameInitials } from "@/lib/utils"
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
  type: z.enum(["JUST_MEN", "JUST_WOMEN", "NO_RESTRICTIONS"], {
    required_error: "Tipo de república é obrigatório",
  }),
  // TODO: validate capacity is a number
  capacity: z.string().min(1, {
    message: "Capacidade deve possuir um valor",
  }),
})

export type BrotherhoodRegistrationFormValues = z.input<
  typeof brotherhoodRegistrationFormSchema
>

export interface BrotherhoodFormProps {
  defaultValues?: BrotherhoodRegistrationFormValues
  onSubmit: (data: BrotherhoodRegistrationFormValues) => void
}

export default function BrotherhoodForm({
  defaultValues,
  onSubmit,
}: BrotherhoodFormProps) {
  const isEditMode = !!defaultValues

  const form = useForm<BrotherhoodRegistrationFormValues>({
    defaultValues: defaultValues ?? {
      name: "",
      street: "",
      number: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      description: "",
      capacity: "",
    },
    resolver: zodResolver(brotherhoodRegistrationFormSchema),
  })

  const { isSubmitting } = form.formState

  const name = useWatch({
    control: form.control,
    name: "name",
  })

  return (
    <Form {...form}>
      {/* TODO: avatar/cover clickable to edit */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
      </Avatar>

      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da república</FormLabel>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>

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

        {/* TODO: add field of main characteristics (Combobox shadcn) */}

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
                  <SelectItem value="NO_RESTRICTIONS">Mista</SelectItem>
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

        {isEditMode ? (
          <div className="space-y-2 pb-8">
            <Link href="/republica">
              <Button className="mt-auto w-full" variant="secondary">
                Cancelar
              </Button>
            </Link>
            <Button className="w-full" type="submit">
              {isSubmitting ? <Icons.spinner className="animate-spin" /> : null}
              Confirmar edição
            </Button>
          </div>
        ) : (
          <Button className="mt-auto w-full" type="submit">
            {isSubmitting ? <Icons.spinner className="animate-spin" /> : null}
            Criar minha república
          </Button>
        )}
      </form>
    </Form>
  )
}
