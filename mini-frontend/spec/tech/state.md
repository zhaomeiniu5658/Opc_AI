# Pinia 状态管理规范

Store 只保存共享状态和简单赋值动作。复杂业务编排放在 Service 或 Composable 中。

用户身份由 user store 管理，会员权益由 membership store 管理，数字人开关由 app store 管理。
