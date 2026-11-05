import { BottomNav } from "@/components/BottomNav";
import { UploadForm } from "@/components/upload/UploadForm";
import { getModules } from "@/lib/db/modules";
import { FOCUSED_PAGE } from "@/lib/layout";

export default async function UploadPage({
  searchParams,
}: {
  searchParams: Promise<{ module?: string }>;
}) {
  const { module: moduleId } = await searchParams;
  const modules = await getModules();
  const defaultModuleId = modules.find((m) => m.id === moduleId)?.id;

  return (
    <>
      <main className={`mx-auto flex flex-col gap-6 px-5 pt-7 pb-32 ${FOCUSED_PAGE}`}>
        <header>
          <h1 className="text-[30px] font-extrabold tracking-tight">Add notes</h1>
          <p className="pt-1 text-[17px] font-semibold">
            Upload lecture notes or slides to study from.
          </p>
        </header>
        <UploadForm modules={modules} defaultModuleId={defaultModuleId} />
      </main>
      <BottomNav />
    </>
  );
}
