import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: project } = await supabase
  .from('project')
  .select()

  return (
    <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Project`s
      </h1>
      <Separator className="w-full " />
      {/* <TodoList todos={project ?? []} /> */}
      {/* <ul className="list-disc font-bold text-xl mb-2">
      {project?.map((project) => (
        <li className="bg-[#181818] text-[#fff] p-10 m-5 rounded-3xl"><a href="#">{project.name}</a></li>
      ))}
      </ul> */}
      <ul className="list-disc font-bold text-xl mb-2">
      {project?.map((project) => (
        <li key={project.id} className="bg-[#181818] text-[#fff] p-10 m-5 rounded-3xl">
          <Link href={`/projects/${encodeURIComponent(project.name)}`}>
            {project.name}
          </Link>
        </li>
      ))}
    </ul>
    </section>
  );
}
