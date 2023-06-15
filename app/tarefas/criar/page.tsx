"use client"

import { format } from "date-fns"
import { useForm } from "react-hook-form"
import z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/icons"

const responsibleList = [
  { label: "Vanderli Almeida", value: "b94d27b9" },
  { label: "Lucas Fernando", value: "b94d27b2" },
  { label: "John Doe", value: "b94d27b1" },
] as const

const TasksFormValues = z.object({
  title: z
    .string()
    .min(3, {
      message: "Título deve ter no mínimo 3 caracteres",
    })
    .max(255, {
      message: "Título deve ter no máximo 255 caracteres",
    }),
  description: z.string().min(3, {
    message: "Descrição deve ter no mínimo 3 caracteres",
  }),
  expireOn: z.date({
    required_error: "Data de expiração é obrigatória",
  }),
  responsible: z.string().min(3, {
    message: "Responsável deve ter no mínimo 3 caracteres",
  }),
  frequency: z.enum(["WEEKLY", "MONTHLY", "NONE"]),
})

type TasksFormValues = z.input<typeof TasksFormValues>

export default function TasksCreatePage() {
  const form = useForm<TasksFormValues>({
    defaultValues: {
      title: "",
      description: "",
      responsible: "",
    },
  })

  const onSubmit = (values: TasksFormValues) => {
    console.log(values)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8 space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
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
                <FormLabel>Descrição da tarefa</FormLabel>
                <FormControl>
                  <Textarea placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="expireOn"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Vencimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          " w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="responsible"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Responsável</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? responsibleList.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Selecione um usuário"}
                        <Icons.chevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    {/* FIX: search element on type */}
                    <Command>
                      <CommandInput placeholder="Procure um usuário" />
                      <CommandEmpty>Nenhum usuário encontrado.</CommandEmpty>
                      <CommandGroup>
                        {responsibleList.map((responsible) => (
                          <CommandItem
                            value={responsible.value}
                            key={responsible.value}
                            onSelect={(value) => {
                              form.setValue("responsible", value)
                            }}
                          >
                            <Icons.check
                              className={cn(
                                "mr-2 h-4 w-4",
                                responsible.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {responsible.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequência</FormLabel>
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
                    <SelectItem value="NONE">Nenhuma</SelectItem>
                    <SelectItem value="WEEKLY">Semanal</SelectItem>
                    <SelectItem value="MONTHLY">Mensal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*
          {isEditMode ? (
            <div className="space-y-2 pb-8">
              <Link href="/republica">
                <Button className="mt-auto w-full" variant="secondary">
                  Cancelar
                </Button>
              </Link>
              <Button className="w-full" type="submit">
                Confirmar edição
              </Button>
            </div>
          ) : (
            <Button className="mt-auto w-full" type="submit">
              Criar minha república
            </Button>
          )} */}

          <Button className="mt-auto w-full" type="submit">
            Criar Tarefa
          </Button>
        </form>
      </Form>
    </div>
  )
}
