export default function ChatHeader() {
  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
      <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
        AI
      </div>
      <div>
        <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Mortgage Assistant
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">Online</p>
      </div>
    </div>
  );
}
