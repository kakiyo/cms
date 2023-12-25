import { Backdrop } from "@mui/material";
import { FC } from "react";
import { ImgRow } from "./ImgRow";

type Props = {
  open: boolean;
  closeBackDrop: () => void;
  imageArray: Array<string>;
};

export const ImageBackdrop: FC<Props> = (props) => {
  const { open, closeBackDrop, imageArray } = props;
  return (
    <Backdrop
      open={open}
      onClick={closeBackDrop}
      style={{ flexDirection: "column" }}
    >
      <ImgRow imgArr={imageArray.slice(0, 3)} rowIndex={1} />
      <ImgRow imgArr={imageArray.slice(3)} rowIndex={2} />
    </Backdrop>
  );
};
