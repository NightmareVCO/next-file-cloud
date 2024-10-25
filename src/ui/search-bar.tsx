import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z
    .string()
    .min(0, { message: "Query must be at least 1 character" })
    .max(100, { message: "Query must be at most 100 characters" }),
});

export type SearchBarProperties = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export function useSearchBar({ setQuery }: SearchBarProperties) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setQuery(values.query);
  };

  return { form, onSubmit };
}

export function SearchBar({ query, setQuery }: SearchBarProperties) {
  const { form, onSubmit } = useSearchBar({ query, setQuery });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row gap-x-4 justify-center items-center"
    >
      <div>
        <Input
          isClearable
          defaultValue={query}
          variant="bordered"
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50  text-slate-400 pointer-events-none flex-shrink-0" />
          }
          {...register("query")}
        />
        {errors.query && <p className="text-red-500">{errors.query.message}</p>}
      </div>

      <Button
        type="submit"
        color="primary"
        variant="shadow"
        isDisabled={form.formState.isSubmitting}
      >
        Search
      </Button>
    </form>
  );
}
