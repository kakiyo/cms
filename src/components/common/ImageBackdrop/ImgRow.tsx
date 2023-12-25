import { Grid } from "@mui/material";
import { FC } from "react";

type Props = { imgArr?: Array<string>; rowIndex: number };

export const ImgRow: FC<Props> = (props) => {
  const { rowIndex, imgArr = [] } = props;
  if (imgArr.length < 1) return null;
  return (
    <Grid
      container
      spacing={1}
      justifyContent={"space-evenly"}
      style={{ minHeight: "50%" }}
    >
      {imgArr.map((url: string, index: number) => (
        <Grid
          item
          xs={4}
          style={{ textAlign: "center", height: "100%" }}
          key={`image_row_${rowIndex}_item_${index}`}
        >
          <img
            src={url}
            width="100%"
            height="100%"
            alt=""
            style={{ objectFit: "contain" }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
