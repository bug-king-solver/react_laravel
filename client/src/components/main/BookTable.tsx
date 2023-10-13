import {
  Button,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import BookTableItem from "./BookTableItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useGetBooksQuery } from "../../store/bookApiSlice";
import { useAppSelector } from "../../store/redux-hooks";

const BookTable = () => {
  const TABLE_HEAD = ["Title", "Author", "Body", "Status", ""];
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const searchValues = useAppSelector((state) => state.bookStatus.searchValues);
  const {
    data: bookResponse,
    isLoading,
    isError,
  } = useGetBooksQuery({
    page,
    sortColumn,
    sortOrder,
    searchKey: searchValues.searchKey,
    searchField: searchValues.searchField,
  });
  const handleSortByTag = (index: number) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortColumn(TABLE_HEAD[index]);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <>
      <CardBody className="overflow-scroll p-0 mt-5">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  onClick={() => handleSortByTag(index)}
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <FontAwesomeIcon icon={faSort} />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookResponse?.books?.map(
              ({ id, title, body, author, status }, index) => {
                const isLast = index === bookResponse.books?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <BookTableItem
                    key={index}
                    {...{ title, body, author, status, classes, id }}
                  />
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === bookResponse?.last_page}
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </>
  );
};

export default BookTable;
