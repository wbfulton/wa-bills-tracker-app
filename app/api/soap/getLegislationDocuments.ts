import { Biennium, LegislativeDocument } from "@/lib/types";

export const getLegislationDocuments = async ({
  biennium,
  text,
}: {
  biennium: Biennium;
  text: string;
}): Promise<Array<LegislativeDocument>> => {
  try {
    const res = await fetch(`http://localhost:8080/documents`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        biennium,
        namedLike: text,
      }),
    });

    const data = await res.json();

    return data;
  } catch (error) {
    console.log(error);
    return new Promise(() => []);
  }
};
