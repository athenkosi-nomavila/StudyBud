import { BackLink } from "@/components/BackLink";
import { NewModuleForm } from "@/components/module/NewModuleForm";
import { FOCUSED_PAGE } from "@/lib/layout";

export default function NewModulePage() {
  return (
    <main className={`mx-auto flex flex-col gap-6 px-5 pt-5 pb-10 ${FOCUSED_PAGE}`}>
      <BackLink href="/" />
      <header>
        <h1 className="text-[30px] leading-none font-extrabold tracking-tight">New module</h1>
        <p className="text-ink-soft pt-1.5 text-[15px] font-semibold">
          One for each subject you&apos;re studying.
        </p>
      </header>
      <NewModuleForm />
    </main>
  );
}
