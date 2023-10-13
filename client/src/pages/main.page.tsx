import { Card } from "@material-tailwind/react";
import BookTable from "../components/main/BookTable";
import MainHeader from "../components/main/MainHeader";
import BookModal from "../components/modal/BookModal";
import ConfirmModal from "../components/modal/ConfirmModal";
const MainPage = () => {
  return (
    <>
      <Card className="h-full w-full">
        <MainHeader />
        <BookTable />
      </Card>
      <BookModal />
      <ConfirmModal />
    </>
  );
};

export default MainPage;
