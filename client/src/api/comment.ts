import request from "@/utils/request";

export const getList = (params: Record<string, any>) => {
  return request({
    url: "/comments/list",
    method: "get",
    params,
  });
};

export const addComment = (data: Record<string, any>) => {
  return request({
    url: "/comments/add",
    method: "post",
    data,
  });
};
