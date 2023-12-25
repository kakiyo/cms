export type ErrorCode = 401 | 404 | 405 | 406 | 500;

export const errorCode = {
  AUTH_ERR: 401,
  NOT_FOUND_ERR: 404,
  METHOD_ERR: 405,
  PARAMS_ERR: 406,
  SEVER_INTERNAL_ERR: 500,
} satisfies { [key: string]: ErrorCode };

export const getApiError = (code: ErrorCode) => {
  switch (code) {
    case errorCode["AUTH_ERR"]:
      return "認証/認可エラーです";
    case errorCode["NOT_FOUND_ERR"]:
      return "存在しないデータです";
    case errorCode["METHOD_ERR"]:
      return "HTTPメソッドエラーです";
    case errorCode["PARAMS_ERR"]:
      return "パラメータのバリデーションエラーです";
    case errorCode["SEVER_INTERNAL_ERR"]:
      return "サーバーシステムエラーです";
    default:
      return "不明なエラーが発生しました";
  }
};
