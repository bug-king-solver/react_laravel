import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useAppSelector } from "../../store/redux-hooks";
import { useDispatch } from "react-redux";
import { changeBookModalStatus } from "../../store/bookStatusAction";
import { ModalStatus } from "../../store/type";
import { useDeleteBookMutation } from "../../store/bookApiSlice";

const ConfirmModal = () => {
  const dispatch = useDispatch();
  const [deleteBook] = useDeleteBookMutation();
  const status =
    useAppSelector((state) => state.bookStatus.modalStatus.modalStatus) ===
    "remove"
      ? true
      : false;
  const currentId = useAppSelector(
    (state) => state.bookStatus.modalStatus.currentId
  );
  const onHandleConfirm = () => {
    dispatch(
      changeBookModalStatus({
        modalStatus: ModalStatus.CLOSE,
        currentId: undefined,
      })
    );
  };
  return (
    <Dialog open={status} handler={onHandleConfirm}>
      <DialogHeader>Are you sure?</DialogHeader>
      <DialogBody divider>
        Do you want to remove this data from database?
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={() =>
            dispatch(
              changeBookModalStatus({
                modalStatus: ModalStatus.CLOSE,
                currentId: undefined,
              })
            )
          }
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={() => {
            deleteBook(currentId);
            dispatch(
              changeBookModalStatus({
                modalStatus: ModalStatus.CLOSE,
                currentId: undefined,
              })
            );
          }}
        >
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ConfirmModal;
