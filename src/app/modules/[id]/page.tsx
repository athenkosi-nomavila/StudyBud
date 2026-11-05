import { notFound } from "next/navigation";
import { ModuleHeader } from "@/components/module/ModuleHeader";
import { StudyActions } from "@/components/module/StudyActions";
import { UploadList } from "@/components/module/UploadList";
import { getModule, getUploads } from "@/lib/db/modules";
import { WIDE_PAGE } from "@/lib/layout";

export default async function ModulePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [studyModule, uploads] = await Promise.all([getModule(id), getUploads(id)]);
  if (!studyModule) notFound();

  return (
    <main className="pb-10">
      <ModuleHeader module={studyModule} />
      <div className={`mx-auto flex flex-col gap-7 px-5 pt-5 ${WIDE_PAGE}`}>
        <StudyActions moduleId={studyModule.id} />
        <UploadList moduleId={studyModule.id} uploads={uploads} />
      </div>
    </main>
  );
}
