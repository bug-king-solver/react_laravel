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
import { useExportXmlAndCSVQuery } from "../../store/bookApiSlice";
import { useState } from "react";

const MainHeader = () => {
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState("");
  const [type, setType] = useState("");
  const [apiCall, setApiCall] = useState(false);
  const {} = useExportXmlAndCSVQuery(
    {
      columns: columns,
      type: type,
    },
    { skip: !apiCall }
  );
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
        <form
          className="flex shrink-0 flex-col gap-2 sm:flex-row"
          action=""
          method="get"
        >
          <div className="sm">
            <Select label="Select Columns">
              <Option onClick={() => setColumns("title")}>Only Title</Option>
              <Option onClick={() => setColumns("author")}>Only Author</Option>
              <Option onClick={() => setColumns("both")}>
                Both Title and Author
              </Option>
            </Select>
          </div>
          <div className="sm">
            <Select label="Select Type">
              <Option onClick={() => setType("csv")}>CSV</Option>
              <Option onClick={() => setType("xml")}>XML</Option>
            </Select>
          </div>
          <Button
            className="flex items-center gap-3"
            size="sm"
            onClick={() => setApiCall(true)}
          >
            Export
          </Button>
        </form>
      </div>
      <div className="flex shrink-0 justify-end flex-col gap-2 mb-3 sm:flex-row">
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
      </div>
      <div className="flex flex-col items-center justify-end gap-4 md:flex-row">
        <SearchInput />
      </div>
    </CardHeader>
  );
};

export default MainHeader;
