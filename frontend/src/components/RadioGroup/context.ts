import { createContext, useContext, type ChangeEvent } from "react";
import type { OptionValue } from "./types";

export const RadioGroupContext = createContext<
    | {
          groupName: string;
          internalSelectedValue?: OptionValue;
          setInternalSelectedValue: (selectedValue: OptionValue) => void;
          onSelected?: (event: ChangeEvent<HTMLInputElement>) => void;
          buttonTextGap?: string;
      }
    | undefined
>(undefined);

export function useRadioGroupContext() {
    const context = useContext(RadioGroupContext);
    if (context === undefined) {
        throw new Error("Error: Could not use radio group context.");
    }

    return context;
}
