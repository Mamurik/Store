import React from "react";
import styles from "./MyButton.module.css";

interface MyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.myButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default MyButton;
