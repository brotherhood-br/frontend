import { api } from "@/lib/api"
import { getNameInitials } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Task {
  id: string
  title: string
  responsibleName: string
  responsibleImg: string
  description: string
  expiresOn: string
  frequency: "WEEKLY" | "MONTHLY" | "NONE"
}

const translateFrequency = (frequency: string) => {
  const frequencyTypes = {
    WEEKLY: "Semanal",
    MONTHLY: "Mensal",
    NONE: "Nenhuma",
  }

  return frequencyTypes[frequency as keyof typeof frequencyTypes]
}

const getData = async (id: string) => {
  return {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    title: "Lavar Banheiro",
    responsibleName: "Lucas",
    responsibleImg: "",
    description: "Sint laboris do aute in aute labore culpa.",
    expiresOn: "2023-06-22T00:05:48.755Z",
    frequency: "NONE",
    status: "FINISHED",
  }
  // return api.get(`/tasks/${id}`) as Promise<Task>
}

interface TaskPageProps {
  params: { id: string }
}

export default async function TaskPage({ params }: TaskPageProps) {
  const task = await getData(params.id)

  return (
    <div>
      <h1 className="text-2xl font-bold">{task.title}</h1>

      <section className="my-4 flex gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={task.responsibleImg} />
          <AvatarFallback>
            {getNameInitials(task.responsibleName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <p className="text-slate-500">Responsável</p>
          <p className="text-xl font-bold">{task.responsibleName}</p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-slate-500">Descrição</p>
          <p className="text-md">{task.description}</p>
        </div>

        <div>
          <p className="text-slate-500">Vencimento</p>
          <p className="text-md">{task.expiresOn}</p>
        </div>

        <div>
          <p className="text-slate-500">Frequência</p>
          <p className="text-md">{translateFrequency(task.frequency)}</p>
        </div>
      </section>
    </div>
  )
}
