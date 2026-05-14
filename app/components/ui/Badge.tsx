import { clsx } from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: Props) {
  return (
    <span className={clsx("inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide", className)}>
      {children}
    </span>
  );
}
