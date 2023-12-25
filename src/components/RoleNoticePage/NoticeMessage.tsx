import { Typography } from "@mui/material";
import React from "react";

const NoticeMessage: React.FC = () => {
  return (
    <>
      <Typography>■ SYSTEMの権限付与について</Typography>
      <Typography>・以下を参照してください </Typography>
      <Typography>
        {/* TODO: リンクの修正 */}
        <a href="">URL</a>
      </Typography>
      <Typography>※基本的に各チームにて対応できるようになってます。</Typography>
    </>
  );
};
export default NoticeMessage;
