import { redirect } from "next/navigation";

const Page = ({ params }) => {
  return redirect(`/${params.title}/category/all`);
};

export default Page;
