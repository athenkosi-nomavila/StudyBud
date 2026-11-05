import { notFound } from "next/navigation";
import { removeModule, saveModule } from "@/app/modules/actions";
import { BackLink } from "@/components/BackLink";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { ModuleForm } from "@/components/module/ModuleForm";
import { getModule } from "@/lib/db/modules";
import { FOCUSED_PAGE } from "@/lib/layout";

export default async function EditModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studyModule = await getModule(id);
  if (!studyModule) notFound();

  return (
    <main className={`mx-auto flex flex-col gap-6 px-5 pt-5 pb-10 ${FOCUSED_PAGE}`}>
      <BackLink href={`/modules/${id}`} />
      <header>
        <h1 className="text-[30px] leading-none font-extrabold tracking-tight">Edit module</h1>
      </header>
      <ModuleForm action={saveModule.bind(null, id)} initial={studyModule} submitLabel="Save" />
      <div className="border-ink flex flex-col border-t-2 border-dashed pt-6">
        <ConfirmDelete
          label="Delete module"
          question={`Delete ${studyModule.name} and all its notes, quiz and cards?`}
          onDelete={removeModule.bind(null, id)}
        />
      </div>
    </main>
  );
}
