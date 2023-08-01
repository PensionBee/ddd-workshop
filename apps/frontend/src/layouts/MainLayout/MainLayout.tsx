import Header from "../../components/Header/Header";
import { Box } from "../../shared/components/Box";
import { Main } from "./MainLayout.styled";

export type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <Box h={69} />
      <Main {...props}>{children}</Main>
      <footer></footer>
    </>
  );
};
