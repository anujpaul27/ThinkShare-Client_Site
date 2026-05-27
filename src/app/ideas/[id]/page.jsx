// app/ideas/[id]/page.tsx

import IdeaDetailPage from "@/Component/IdeaDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  console.log(id);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) throw new Error("Failed");

    const { data: idea } = await res.json();

    return {
      title: idea.title,
      description: idea.shortDescription,
    };
  } catch (err) {
    return {
      title: "Idea Not Found",
      description: "Could not load the idea.",
    };
  }
}

export default function Page({ params }) {
  return <IdeaDetailPage id={params.id} />;
}
