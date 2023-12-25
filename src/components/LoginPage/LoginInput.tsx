import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
} from "@mui/material";
import { FC } from "react";
import { useLogin } from "@/hooks/useLogin";

export const LoginInput: FC = () => {
  const { login } = useLogin();

  return (
    <Card
      style={{
        position: "fixed",
        top: "40vh",
        width: 400,
        left: "calc( 50% - 200px )",
        zIndex: 1000,
        backgroundColor: process.env.NEXT_PUBLIC_COLOR,
        textAlign: "center",
        background: "rgba(149, 33, 33, 0)",
        borderRadius: 16,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(2.5px)",
        WebkitBackdropFilter: "blur(5.5px)",
      }}
    >
      <CardContent>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              fontWeight: "bold",
              fontSize: 14,
              color: "white",
            }}
          >
            <img src={"/SYSTEM.png"} alt="SYSTEM" />
            <div style={{ marginLeft: 8 }}>
              SYSTEM&nbsp;&nbsp;
              {process.env.NEXT_PUBLIC_TITLE}
            </div>
          </Box>
          <span style={{ color: "white" }}>company.inc</span>
        </Box>
      </CardContent>
      <Divider />
      <CardActions
        style={{
          justifyContent: "center",
        }}
      >
        <Button variant={"contained"} onClick={login}>
          Login
        </Button>
      </CardActions>
    </Card>
  );
};
