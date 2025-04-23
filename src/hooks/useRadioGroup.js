// hooks/useRadioGroup.js
import { useState } from "react";

export default function useRadioGroup(initialValue) {
  const [selected, setSelected] = useState(initialValue);

  const handleChange = (value) => {
    setSelected(value);
  };

  return {
    selected,
    handleChange,
  };
}
