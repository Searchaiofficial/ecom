import Suggestion from "@/components/suggestion/Suggestion";

const SuggestionPage = async ({ params: { id } }) => {
  return <Suggestion id={id} />;
};

export default SuggestionPage;
