import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

export function Card({ children, onClick, className, href }: CardProps) {
  const combinedClass = `${styles.card} ${className ?? ""}`;

  if (href) {
    return (
      <a href={href} className={combinedClass} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <div
      className={combinedClass}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
