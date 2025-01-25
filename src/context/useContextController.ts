import { useState } from "react";
import { ContextKey, ContextStore } from "./ContextModel";
import { useProfileStore } from "./stores";

export const useContextController = () => {
    // To add/modify a context:
    // 1. Add a new state variable, or create a hook to manage the state
  const [value, setValue] = useState("Hello, World!");
  const [secondValue, setSecondValue] = useState("Second Value");
  const {profile, updateProfile} = useProfileStore();


  // 2. Add the new state variable to the context object, and update the ContextStore interface
  const context: ContextStore = {
    value,
    secondValue,
    profile,
  };

  // 3. Add a new function to update the context, and update the ContextKey enum
  const updateContext = (key: ContextKey, value: any) => {
    switch (key) {
      case ContextKey.value:
        setValue(value);
        break;
      case ContextKey.secondValue:
        setSecondValue(value);
        break;
    case ContextKey.PROFILE:
        updateProfile(value);
        break;
      default:
        break;
    }
  }

    return {
        context,
        updateContext,
    };
};