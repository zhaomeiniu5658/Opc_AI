# API 调用规范

所有 HTTP 请求通过 src/api/request.js 进入。开发阶段 VITE_USE_MOCK=true 时使用 src/api/mock 数据，不依赖后端服务。

API 层只描述请求路径和参数，接口返回到业务形态的适配在 Service 层完成。
