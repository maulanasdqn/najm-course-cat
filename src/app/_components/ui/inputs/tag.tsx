import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import { clsx } from "clsx";
import { InputWrap, TInputWrap } from "./wrap";

type TTagInput<T extends FieldValues> = Omit<TInputWrap, "children"> & {
  name: string;
} & UseControllerProps<T>;

export const InputTag = <T extends FieldValues>({ name, label, ...props }: TTagInput<T>) => {
  const { field, fieldState } = useController<T>({ name, ...props });

  const interests = field.value || [];

  const handleRemove = (interest: string) => {
    const updatedInterests = interests.filter((i: string) => i !== interest);
    field.onChange(updatedInterests);
  };

  const handleAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const value = event.currentTarget.value.trim();
      if (value && !interests.includes(value as never)) {
        field.onChange([...interests, value]);
        event.currentTarget.value = "";
      }
    }
  };

  const containerClasses = clsx(
    "border rounded-md p-2 flex flex-wrap gap-2 bg-white",
    fieldState.error ? "border-red-400" : "border-gray-300 focus-within:border-blue-500",
  );

  return (
    <InputWrap label={label} message={fieldState.error?.message}>
      <div className={containerClasses}>
        {interests.map((interest: string, index: number) => (
          <div
            key={index}
            className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full space-x-2"
          >
            <span className="text-sm font-medium">{interest}</span>
            <button
              type="button"
              onClick={() => handleRemove(interest)}
              className="text-orange-500 font-bold focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
        <input
          onKeyDown={handleAdd}
          className="flex-grow border-none outline-none text-gray-700 placeholder-gray-400 focus:ring-0 text-sm"
          placeholder="Dari mana kamu tau tentang ini?"
        />
      </div>
    </InputWrap>
  );
};
