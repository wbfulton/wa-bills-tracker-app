import { Biennium, LegislationTopicSearch } from "@/lib/types";

export const getLegislationByTopicId = async (
  biennium: Biennium,
  topicId: number
): Promise<LegislationTopicSearch> => {
  try {
    const res = await fetch(
      `http://localhost:8080/legislation/${biennium}/topic-search/${topicId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
