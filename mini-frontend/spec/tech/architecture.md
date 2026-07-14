# 技术架构说明

项目采用 Page -> Composable -> Service -> API 的分层架构。Page 只负责展示与交互，Composable 组织页面业务状态，Service 适配业务数据，API 封装请求入口。

Pinia 只保存共享状态，包括用户、会员、权限、应用开关、岗位、简历、推荐、面试和消息。
