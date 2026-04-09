import styles from "./filteritem.module.css";
import classNames from "classnames";

type filterItemProps = {
  name: string;
  label: string;
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
  children?: React.ReactNode;
  selectedValues?: string[];
};

export default function FilterItem({
  name,
  label,
  activeFilter,
  setActiveFilter,
  children,
  selectedValues = [],
}: filterItemProps) {
  const isActive = activeFilter === name;
  const hasSelected = selectedValues.length > 0;

  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isActive || hasSelected,
        })}
        onClick={() => setActiveFilter(isActive ? null : name)}
      >
        {label}

        {hasSelected && (
          <span className={styles.filter__count}>{selectedValues.length}</span>
        )}
      </div>

      {isActive && (
        <div className={styles.filter__list}>
          <div className={styles.filter__listInner}>{children}</div>
        </div>
      )}
    </div>
  );
}
