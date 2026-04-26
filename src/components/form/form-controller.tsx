import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";
import {
  Controller,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseFormReturn,
  type UseFormStateReturn,
} from "react-hook-form";

interface FormControllerProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: React.ReactNode;
  className?: string;
  classNameLabel?: string;
  maxLength?: number;
  onRandom?: () => void;
  render: ({
    field,
    fieldState,
    formState,
    isError,
    ariaDescribedby,
  }: {
    field: ControllerRenderProps<T, Path<T>>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
    isError: boolean;
    ariaDescribedby: string | undefined;
  }) => React.ReactElement;
}
const FormController = <T extends FieldValues>({
  form,
  name,
  label,
  render,
  className,
  classNameLabel,
  maxLength,
  onRandom,
}: FormControllerProps<T>) => {
  const id = useId();
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field, fieldState, formState }) => {
        const error = fieldState.error;
        const isError = !!error;

        const errorId = isError ? `${id}-error` : undefined;
        const descriptionId = errorId;

        const valueLength = String(field.value ?? "").length;
        const shouldShowBottomSection = isError || maxLength;

        return (
          <div className={cn(["flex flex-col flex-1", className])}>
            {label && (
              <Label
                htmlFor={id}
                className={cn([
                  "text-left mb-2",
                  onRandom ? "flex justify-between items-center" : "",
                  classNameLabel,
                ])}
              >
                {onRandom ? (
                  <>
                    <span>{label}</span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onRandom();
                      }}
                      className="text-xs py-0 m-0 border rounded px-2 cursor-pointer"
                    >
                      Random
                    </button>
                  </>
                ) : (
                  label
                )}
              </Label>
            )}

            {/* Render the actual input component */}
            {render({
              field,
              fieldState,
              formState,
              isError,
              ariaDescribedby: descriptionId,
            })}
            {shouldShowBottomSection && (
              <div className="flex justify-between mt-1 min-h-4">
                {isError && (
                  <p id={errorId} className="text-xs text-destructive">
                    {String(error.message)}
                  </p>
                )}
                {maxLength && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    {valueLength}/{maxLength}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormController;
