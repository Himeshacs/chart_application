import React from "react";
import Button from "@mui/material/Button";
import { ButtonProps } from "../types/types";

const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  variant ,
  children,
  className
}) => {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled} className={className} fullWidth>
      {children}
    </Button>
  );
};

export default ButtonComponent;
