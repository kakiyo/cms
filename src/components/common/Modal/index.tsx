import ClearIcon from "@mui/icons-material/Clear";
import { Backdrop, Box, Button, Fade, Grid, Modal, Paper } from "@mui/material";
import { FC } from "react";
import { useGetModalState, useModalSetter } from "@/store/modal";

export const CmsModal: FC = () => {
  const modalState = useGetModalState();
  const { closeModal } = useModalSetter();
  return (
    <Modal
      open={modalState.open}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "1% 1%",
        zIndex: 10,
      }}
    >
      <Fade in={modalState.open}>
        <Paper
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <Grid container style={{ padding: 16, maxHeight: "90vh" }}>
            <Grid
              container
              justifyContent={"space-between"}
              style={{ maxHeight: "80px", width: "100%" }}
            >
              <Box style={{ fontSize: 24, textAlign: "left" }}>
                {modalState.header}
              </Box>
              <Button onClick={closeModal}>
                <ClearIcon />
              </Button>
            </Grid>
            <Grid
              container
              style={{
                maxHeight: "calc( 90vh - 80px )",
                width: "100%",
              }}
              justifyContent={"center"}
            >
              {modalState.contents}
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Modal>
  );
};
