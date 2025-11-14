import request from "@/utils/request";

export function getPostList(params: Record<string, any> = {}) {
  return request({
    url: "/posts/list",
    method: "get",
    params,
  });
}

export function getPostBySlug(slug: string) {
  return request({
    url: `/posts/list/${slug}`,
    method: "get",
  });
}

export function createPost(data: FormData | Record<string, any>) {
  return request({
    url: "/posts/add",
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function updatePost(id: string, data: FormData | Record<string, any>) {
  return request({
    url: `/posts/update/${id}`,
    method: "post",
    data,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
