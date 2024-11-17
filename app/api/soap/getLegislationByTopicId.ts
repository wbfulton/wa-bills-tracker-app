import { Biennium } from "app/types/legislation";
import { LegislationTopicSearch } from "express/src/types";

export const getLegislationByTopicId = async (
  biennium: Biennium,
  topicId: number
): Promise<LegislationTopicSearch> => {
  try {
    const res = await fetch(
      `http://localhost:8080/legislation/topic-search/${biennium}/${topicId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);

    return new Promise(() => []);
  }
};
