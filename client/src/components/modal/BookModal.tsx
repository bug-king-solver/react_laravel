import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import OutsideClickHandler from "react-outside-click-handler";
import { changeBookModalStatus } from "../../store/bookStatusAction";
import { ModalStatus } from "../../store/type";
import {
  useCreateBookMutation,
  useGetBookQuery,
  useUpdateBookMutation,
} from "../../store/bookApiSlice";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const BookModal = () => {
  const modalStatus = useAppSelector(
    (state) => state.bookStatus.modalStatus.modalStatus
  );
  const currentId = useAppSelector(
    (state) => state.bookStatus.modalStatus.currentId
  );
  const isOpen: boolean = modalStatus === "edit" ? true : false;
  const status =
    modalStatus === "open" || modalStatus === "edit" ? true : false;
  const { data: book } = useGetBookQuery(currentId as number, {
    skip: !isOpen,
  });
  const dispatch = useAppDispatch();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const validationSchema = z.object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 5 characters." }),
    author: z
      .string()
      .min(1, { message: "Author name must be at least 5 characters." }),
    isPublished: z.boolean(),
    body: z
      .string()
      .min(1, { message: "Body must be at least 20 characters." }),
  });
  type ValidationSchema = z.infer<typeof validationSchema>;
  const defaultValues = {
    title: "",
    author: "",
    isPublished: false,
    body: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });
  useEffect(() => {
    if (!currentId) {
      reset(defaultValues);
    } else if (book)
      reset({
        title: book.title,
        author: book.author,
        isPublished: book.status,
        body: book.body,
      });
  }, [book, currentId]);
  const onSubmit: SubmitHandler<ValidationSchema> = (
    data: ValidationSchema
  ) => {
    const formData = {
      title: data.title,
      author: data.author,
      body: data.body,
      status: data.isPublished,
    };
    isOpen ? updateBook({ ...formData, id: currentId }) : createBook(formData);
    dispatch(
      changeBookModalStatus({
        modalStatus: ModalStatus.CLOSE,
        currentId: undefined,
      })
    );
  };
  const onHandleSubmit = () => {
    dispatch(
      changeBookModalStatus({
        modalStatus: ModalStatus.CLOSE,
        currentId: undefined,
      })
    );
  };
  return (
    <Dialog
      size="xs"
      open={status}
      handler={onHandleSubmit}
      className="bg-transparent shadow-none"
    >
      <OutsideClickHandler
        onOutsideClick={() =>
          dispatch(
            changeBookModalStatus({
              modalStatus: ModalStatus.CLOSE,
              currentId: undefined,
            })
          )
        }
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              {isOpen ? "Update Book" : "Add New Book"}
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Title"
              size="lg"
              crossOrigin={"title"}
              {...register("title")}
            />
            <p className="text-start text-xs italic text-red-500">
              {errors.title?.message}
            </p>
            <Input
              label="Author"
              size="lg"
              crossOrigin={"author"}
              {...register("author")}
            />
            <p className="text-start text-xs italic text-red-500">
              {errors.author?.message}
            </p>
            <div className="-ml-2.5">
              <Checkbox
                label="Published"
                crossOrigin={"isPublished"}
                {...register("isPublished")}
              />
            </div>
            <Textarea label="Description" {...register("body")} />
            <p className="text-start text-xs italic text-red-500">
              {errors.body?.message}
            </p>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={handleSubmit(onSubmit)}
              fullWidth
              color="green"
              className="mb-4"
            >
              {isOpen ? "Update" : "Add"}
            </Button>
            <Button
              variant="text"
              onClick={() =>
                dispatch(
                  changeBookModalStatus({
                    modalStatus: ModalStatus.CLOSE,
                    currentId: undefined,
                  })
                )
              }
              fullWidth
              color="red"
            >
              Cancel
            </Button>
          </CardFooter>
        </Card>
      </OutsideClickHandler>
    </Dialog>
  );
};

export default BookModal;
