import type {
    FieldErrors,
    FieldValues,
    Path,
    UseFormRegister,
} from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    type?: string;
};

export function TextInput<T extends FieldValues>({
    label,
    name,
    register,
    errors,
    type = "text",
}: TextInputProps<T>) {
    return (
        <div className="relative z-0 w-full mb-5 group">
            <input
                {...register(name)}
                type={type}
                id={String(name)}
                className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
                placeholder=" "
            />

            <label
                htmlFor={String(name)}
                className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>

            {errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {String(errors[name]?.message)}
                </p>
            )}
        </div>
    );
}