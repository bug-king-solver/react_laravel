import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, Input } from "@material-tailwind/react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store/redux-hooks";
import { changeSearchValues } from "../../store/bookStatusAction";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const validationSchema = z.object({
    searchKey: z
      .string()
      .min(1, { message: "Searchkey must be at least 1 characters." }),
    isTitle: z.boolean(),
    isAuthor: z.boolean(),
  });
  type ValidationSchema = z.infer<typeof validationSchema>;
  const defaultValues = {
    searchKey: "",
    isTitle: false,
    isAuthor: false,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    defaultValues,
    resolver: zodResolver(validationSchema),
  });
  const onSubmit: SubmitHandler<ValidationSchema> = (
    data: ValidationSchema
  ) => {
    const searchKey = data.searchKey;
    let searchField;
    if (data.isAuthor && !data.isTitle) {
      searchField = "author";
    } else if (data.isTitle && !data.isAuthor) {
      searchField = "title";
    } else if (
      (data.isAuthor && data.isTitle) ||
      (!data.isAuthor && !data.isTitle)
    ) {
      searchField = "title&author";
    }
    const searchValues = {
      isSearched: true,
      searchKey: searchKey,
      searchField: searchField,
    };
    dispatch(changeSearchValues(searchValues));
  };
  return (
    <div className="w-full md:w-72">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="search"
          className="h-5 w-5"
          crossOrigin={"search"}
          {...register("searchKey")}
          icon={
            <FontAwesomeIcon
              className=""
              onClick={handleSubmit(onSubmit)}
              icon={faSearch}
            />
          }
        />
        {
          <p className="text-start text-xs italic text-red-500 mt-2">
            {" "}
            {errors.searchKey?.message}
          </p>
        }
        <div className="flex justify-start gap-5">
          <Checkbox
            label="Title"
            crossOrigin={"isTitle"}
            {...register("isTitle")}
          />
          <Checkbox
            label="Author"
            crossOrigin={"isAuthor"}
            {...register("isAuthor")}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
