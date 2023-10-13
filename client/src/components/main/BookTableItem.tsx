import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { changeBookModalStatus } from "../../store/bookStatusAction";
import { ModalStatus } from "../../store/type";

const BookTableItem = ({ title, body, author, status, classes, id }: any) => {
  const dispatch = useDispatch();
  const onHandleDelete = (id: number) => {
    dispatch(
      changeBookModalStatus({ modalStatus: ModalStatus.REMOVE, currentId: id })
    );
  };
  const onHandleEdit = (id: number) => {
    dispatch(
      changeBookModalStatus({ modalStatus: ModalStatus.EDIT, currentId: id })
    );
  };
  return (
    <tr>
      <td className={classes}>
        <div className="flex items-center gap-3">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {title}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {author}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {body}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="w-max">
          <Chip
            variant="ghost"
            size="sm"
            value={status ? "published" : "pending"}
            color={status ? "green" : "blue-gray"}
          />
        </div>
      </td>
      <td className={classes}>
        <div className="flex justify-around">
          <Tooltip content="Edit Book">
            <IconButton variant="text" onClick={() => onHandleEdit(id)}>
              <FontAwesomeIcon icon={faPencil} />
            </IconButton>
          </Tooltip>
          <Tooltip content="Remove Book">
            <IconButton variant="text" onClick={() => onHandleDelete(id)}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default BookTableItem;
