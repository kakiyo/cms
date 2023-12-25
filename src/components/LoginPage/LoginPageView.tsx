import { LoginInput } from "@/components/LoginPage/LoginInput";

export const LoginPageView = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <img
        src="/test.png"
        width={"100%"}
        height={"100%"}
        style={{ textAlign: "center", objectFit: "cover" }}
        alt={"login_background"}
      />
      <LoginInput />
    </div>
  );
};
