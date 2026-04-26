import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

export type SimpleSelectProps = {
  options?: { label: string; value: string }[];
  value?: string;
  onChange?: (newValue: string | null) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
};
const SimpleSelect = (props: SimpleSelectProps) => {
  const options = props.options || [];

  return (
    <>
      <Combobox
        id={props.id}
        name={props.name}
        value={props.value}
        onValueChange={(v) => props.onChange?.(v)}
        items={options}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className={cn(["justify-between font-normal"])}
            >
              <ComboboxValue />
            </Button>
          }
        />
        <ComboboxContent>
          <ComboboxEmpty>No items found.</ComboboxEmpty>
          <ComboboxInput
            showTrigger={false}
            placeholder={props.placeholder || "Select an option"}
          />
          <ComboboxList>
            {(option) => (
              <ComboboxItem key={option.value} value={option}>
                {option.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </>
  );
};

export default SimpleSelect;
