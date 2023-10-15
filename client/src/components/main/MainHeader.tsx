import {
  Button,
  CardHeader,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useAppDispatch } from "../../store/redux-hooks";
import { changeBookModalStatus } from "../../store/bookStatusAction";
import { ModalStatus } from "../../store/type";
import SearchInput from "./SearchInput";
import { useExportXmlAndCSVMutation } from "../../store/bookApiSlice";

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const [exportXmlAndCSV] = useExportXmlAndCSVMutation();
  const onHandleExport = (type: string) => {
    exportXmlAndCSV({ type: type });
  };
  return (
    <CardHeader floated={false} shadow={false} className="rounded-none">
      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Books list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all books
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            className="flex items-center gap-3"
            size="sm"
            onClick={() =>
              dispatch(
                changeBookModalStatus({
                  modalStatus: ModalStatus.OPEN,
                  currentId: undefined,
                })
              )
            }
          >
            Add book
          </Button>
          <div className="sm">
            <Select label="Export as CSV and XML">
              <Option onClick={() => onHandleExport("title")}>
                Only Title
              </Option>
              <Option onClick={() => onHandleExport("author")}>
                Only Author
              </Option>
              <Option onClick={() => onHandleExport("both")}>
                Both Title and Author
              </Option>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
        <SearchInput />
      </div>
    </CardHeader>
  );
};

export default MainHeader;
