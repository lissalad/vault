import classNames from "classnames";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Padlock } from "./Icons";

export default function QuickHide() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="w-[100vw] h-[100vh] fixed">
      <div className="fixed bottom-5 left-5">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
}
