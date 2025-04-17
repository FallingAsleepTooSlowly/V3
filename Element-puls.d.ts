// 自动导入会在 components.d.ts 文件只导入 GlobalComponents(全局组件) ,
// 但不会导入 ComponentCustomProperties(组件自定义属性)，所以需要我们手动添加此文件并在 tsconfig.json 里导入
export {}
declare global {
  const ElMessage:typeof import('element-plus')['ElMessage']
  const ElLoading:typeof import('element-plus')['ElLoading']
}
