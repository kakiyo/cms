import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  // 画像ファイルのパス
  const imagePath = path.join(
    process.cwd(),
    "src/pages/api/resource/124x20.png"
  );
  const imagePath2 = path.join(
    process.cwd(),
    "src/pages/api/resource/620x347.png"
  );

  // 画像を非同期で読み込む
  if (id === "1") {
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        // レスポンスヘッダーを設定してPNGファイルを返す
        res.setHeader("Content-Type", "image/png");
        res.status(200).send(data);
      }
    });
  }
  if (id === "2") {
    fs.readFile(imagePath2, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).end();
      } else {
        // レスポンスヘッダーを設定してPNGファイルを返す
        res.setHeader("Content-Type", "image/png");
        res.status(200).send(data);
      }
    });
  }
};

export default handler;
