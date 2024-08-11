import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import cn from "classnames";

type Props = {
  isSelected?: boolean;
} & PropsWithChildren;

export const CategoryTag = ({ children, isSelected }: Props) => {
  return (
    <span className={cn(styles.root, isSelected && styles["selected"])}>
      {children}
    </span>
  );
};
