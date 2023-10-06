import { ElMessage } from "element-plus";

export function ShowMessage(type, message) {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    grouping: true
  });
}
