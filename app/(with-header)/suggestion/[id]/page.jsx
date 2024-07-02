import { fetchSuggestionData } from "@/components/Features/api";
import Suggestion from "@/components/suggestion/Suggestion";

export const generateMetadata = async ({ params: { id } }) => {
  const suggestion = await fetchSuggestionData(id);

  return {
    title: suggestion?.metadata?.title,
    description: suggestion.summary,
  };
};

const SuggestionPage = async ({ params: { id } }) => {
  return <Suggestion id={id} />;
};

export default SuggestionPage;
