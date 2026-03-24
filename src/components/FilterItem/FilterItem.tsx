import styles from "./filteritem.module.css";
import classNames from "classnames";

type Props = {
  name: string;
  label: string;
  activeFilter: string | null;
  setActiveFilter: (value: string | null) => void;
  children?: React.ReactNode;
};

export default function FilterItem({
  name,
  label,
  activeFilter,
  setActiveFilter,
  children,
}: Props) {
  const isActive = activeFilter === name;

  const handleClick = () => {
    setActiveFilter(isActive ? null : name);
  };

  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: isActive,
        })}
        onClick={handleClick}
      >
        {label}
      </div>

      {isActive && (
        <div className={styles.filter__list}>
          <div className={styles.filter__listInner}>{children}</div>
        </div>
      )}
    </div>
  );
}