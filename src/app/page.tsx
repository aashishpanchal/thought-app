import { AddThought } from "@/components/add-thought";
import { addThought } from "./actions/thought.action";
import prisma from "@/database/db.config";
import ThoughtCard from "@/components/thought-card";

export default async function Home() {
  const thoughts = await prisma.thought.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return (
    <main className="container mt-14">
      <div className="text-end">
        <AddThought action={addThought} />
      </div>
      {/* display thoughts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-2">
        {thoughts.map((thought) => (
          <ThoughtCard key={thought.id} data={thought} />
        ))}
      </div>
    </main>
  );
}
