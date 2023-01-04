import classNames from "classnames";
import SignOutButton from "./SignOutButton";

export default function Header() {
  return (
    <div
      className={classNames(
        "flex flex-row bg-sky-200 items-center justify-between px-6 py-3 text-sky-800 mx-8 rounded-b-xl"
      )}
    >
      <h1 className="text-3xl">vault</h1>
      <SignOutButton />
    </div>
  );
}
