// app/ideas/[id]/page.tsx
import IdeaDetailPage from "@/Component/IdeaDetails";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${id}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch idea");

    const { data: idea } = await res.json();

    return {
      title: idea?.title || "Idea Details",
      description: idea?.shortDescription || "Explore this idea in detail.",
      openGraph: {
        title: idea?.title,
        description: idea?.shortDescription,
      },
    };
  } catch (err) {
    return {
      title: "Idea Not Found",
      description: "Could not load the requested idea.",
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  return <IdeaDetailPage id={id} />;
}