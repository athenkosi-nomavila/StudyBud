import { notFound } from "next/navigation";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { StudyActions } from "@/components/module/StudyActions";
import { UploadList } from "@/components/module/UploadList";
import { getModule, getUploads } from "@/lib/db/modules";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const studyModule = await getModule(id);
  if (!studyModule) notFound();
  const uploads = await getUploads(id);

  return (
    <main className="mx-auto max-w-md pb-10">
      <ModuleHeader module={studyModule} />
      <div className="flex flex-col gap-7 px-5 pt-5">
        <StudyActions moduleId={studyModule.id} />
        <UploadList moduleId={studyModule.id} uploads={uploads} />
      </div>
    </main>
  );
}
