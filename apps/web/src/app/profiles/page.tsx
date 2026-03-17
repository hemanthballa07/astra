import Link from "next/link";
import { PageContainer } from "@/components/shared/PageContainer";

const profiles = [
  { id: "1", name: "Hemanth", accent: "from-violet-500 to-fuchsia-500" },
  { id: "2", name: "Guest", accent: "from-sky-500 to-cyan-500" },
];

export default function ProfilesPage() {
  return (
    <main className="min-h-screen bg-[#050811] text-white">
      <PageContainer className="flex min-h-screen flex-col items-center justify-center py-16">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-violet-300">
          Astra
        </p>
        <h1 className="mb-10 text-center text-4xl font-semibold tracking-tight sm:text-5xl">
          Who&apos;s watching?
        </h1>

        <div className="grid w-full max-w-3xl grid-cols-2 gap-6 sm:grid-cols-3">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              href="/"
              className="group flex flex-col items-center"
            >
              <div
                className={`mb-4 aspect-square w-full max-w-[180px] rounded-3xl bg-gradient-to-br ${profile.accent} p-[1px] transition group-hover:scale-[1.02]`}
              >
                <div className="flex h-full items-center justify-center rounded-3xl bg-[#0d121f] text-3xl font-semibold">
                  {profile.name.charAt(0)}
                </div>
              </div>
              <span className="text-base text-white/80 group-hover:text-white">
                {profile.name}
              </span>
            </Link>
          ))}

          <button className="group flex flex-col items-center">
            <div className="mb-4 flex aspect-square w-full max-w-[180px] items-center justify-center rounded-3xl border border-dashed border-white/15 bg-[#0d121f] text-4xl text-white/60 transition group-hover:border-white/25 group-hover:text-white">
              +
            </div>
            <span className="text-base text-white/60 group-hover:text-white">
              Add Profile
            </span>
          </button>
        </div>
      </PageContainer>
    </main>
  );
}