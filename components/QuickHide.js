import classNames from "classnames";
import { useState } from "react";
import { Padlock } from "./Icons";

export default function QuickHide() {
  const [hidden, setHidden] = useState(true);

  return (
    <div className="absolute w-[100vw] h-[100vh]">
      <div className="absolute bottom-3 left-3 group is-hidden">
        <Padlock />
      </div>
    </div>
  );
}
