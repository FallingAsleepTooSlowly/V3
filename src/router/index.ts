// 路由配置
import routes from './routes';
import { createRouter, createWebHashHistory } from 'vue-router';
 
// 创建路由配置
export const router = createRouter({
    /*
        createWebHistory() 是一种基于浏览器 history API 的路由模式，使用了 HTML5 中的 history.pushState 和 history.replaceState 方法来实现路由跳转。
            这种模式可以使得 URL 更加直观，而且不会在 URL 中添加任何特殊字符。例如，我们可以将路由设置为 /home、/about 等等。
            使用 createWebHistory 时，需要在服务器端进行一些配置。因为使用了 history API，如果直接在浏览器中刷新或直接访问某个路由，服务器将无法识别该路由，并返回 404 错误。
            因此，需要在服务器端配置，将所有的路由请求都返回首页，再由前端代码进行路由的匹配和处理。
            createWebHistory 只支持 HTML5 标准浏览器，对于老版本的浏览器无法使用。

        createWebHashHistory() 是 Vue Router 提供的一种基于浏览器 URL 的 hash 路由模式，它将路由添加到 URL 中的 hash 中，
            例如：/#/home、/#/about。这种模式可以避免服务器配置的问题，而且支持所有浏览器。但是，由于 URL 中添加了 hash，因此在搜索引擎的 SEO 优化中存在一些问题。
    */
    history: createWebHashHistory(),
    routes: [...routes]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    next();
});
 
// 全局后置守卫
router.afterEach((to, from) => { });

export default router;