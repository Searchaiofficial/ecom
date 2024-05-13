import HeaderWrapper from "@/components/HeaderWrapper/HeaderWrapper";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderWrapper />
      {children}
    </>
  );
};

export default Layout;
