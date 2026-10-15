import { createProxyMiddleware } from "http-proxy-middleware";

const restreamJsonBody = (proxyReq, req) => {
  const contentType = req.headers["content-type"] || "";

  if (contentType.includes("multipart/form-data")) {
    return;
  }

  if (!req.body || Object.keys(req.body).length === 0) {
    return;
  }

  const bodyData = JSON.stringify(req.body);

  proxyReq.setHeader("Content-Type", "application/json");
  proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
  proxyReq.write(bodyData);
};

const createServiceProxy = (target) => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        if (req.headers["x-user-id"]) {
          proxyReq.setHeader("x-user-id", req.headers["x-user-id"]);
        }

        restreamJsonBody(proxyReq, req);
      }
    }
  });
};

export default createServiceProxy;
