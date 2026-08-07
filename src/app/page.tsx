import TextContentForm from "@/components/content-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-200 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl mb-6 text-center">
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight sm:text-4xl">
          Content Submission Studio
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm sm:text-base">
          Interactive text submission form featuring real-time input validation, character tracking, and accessible field error reporting.
        </p>
      </div>

      <TextContentForm />
    </main>
  );
}
