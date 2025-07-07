// 服务配置文件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import constant from './src/common/constant'

// 在Node.js中，resolve方法用于将路径或路径片段解析为绝对路径，它是 path 模块的一部分，常用于处理文件和目录路径
// import { resolve } from 'path'
import path from 'path'

// vite-plugin-svg-icons 是一个 Vite 插件，用于将本地 SVG 文件转换为可直接在 Vue 组件中使用的图标。这个插件能够自动扫描指定目录下的 SVG 文件，并将其注册为 Vue 组件，从而简化了在 Vue 项目中使用 SVG 图标的过程
// 安装： npm install vite-plugin-svg-icons --save-dev
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 安装自动导入的两个插件：npm install -D unplugin-vue-components unplugin-auto-import
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 安装 Element Plus：npm install element-plus
// 安装 Element Plus 图标：npm install @element-plus/icons-vue
// 安装 Element Plus 图标自动导入的插件：npm i -D unplugin-icons（图标自动引入时需要配合 unplugin-vue-components 组件使用）
// 安装 iconify 图标库中指定的 Element Plus 图标，对应的图标集名叫 ep，即：npm i -D @iconify-json/ep
// 使用方式如下，其中图标默认必须使用为 <i-ep-xxx /> 或 <IEpSearch />
/*
    <el-icon :size="size" :color="color">
      <i-ep-Search />
      <IEpSearch />
    </el-icon>
    <!-- 或者独立使用它，不从父级获取属性 -->
    <i-ep-Search />
    <IEpSearch width="24" height="24" style="margin-right: 8px" />
*/
// 用于 vite 的自动导入配置
import Icons from 'unplugin-icons/vite'
// 解析器引入
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
// 修改为箭头函数方便后续添加变量
export default defineConfig(() => {
    return {
        server: {
            // 将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址
            host: true,
            port: 9999,
            // 设置为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
            strictPort: false,
            // 表示服务器在启动时是否自动打开浏览器并访问指定 URL
            open: true,
            // 代理设置
            proxy: {
                /*
                假设你要调取的接口是 http://aaa.net/api/test，然后你可以在本地调 localhost:8080/api/test，如axios.get('/api/test')
                配置代理后，会做如下转发：
                localhost:8080/api/test -> http://aaa.net/api/test
                localhost:8080/bcma/api/test -> http://aaa.net/bcma/api/test
                */
                // 选项写法
                '/api': {
                    // target: 'http://192.168.132.242:9000',
                    target: constant.targetAddress,
                    // 是否要代理 websockets
                    //   ws: true,
                    // 是否是 https 接口
                    secure: false,
                    // 是否允许修改请求的源地址，即是否跨域
                    changeOrigin: true,
                    /*
                        当你调接口后端的命名没有统一给接口前加 /api 这类的标识，那么你可以自己加，也就是你可以在本地调 localhost:8080/api/test，如axios.get('/api/test')，
                        而你要的目标接口是 http://aaa.net/test，你就可以用 rewrite，遇到 /api 就去找代理 http://aaa.net 并且把 /api 重写为 /。
                        所以转发效果就是：
                        localhost:8080/api/test -> http://aaa.net/test
                    */
                    // 对请求的路径进行重写，将 /api 替换为字符串
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            },
            // 指定服务器响应的 header
            headers: {},
            // 热加载，默认是 true
            hmr: true
        },
        plugins: [
            vue(),
            // 配置 SVG 插件，配置后图标会注册到全局，可以以以下方法直接使用它们，无需显示的导入每个图标，demo 是 SVG 图标的名字
            /*
                <svg>
                    <use :xlink:href="`#icon-demo`"></use>
                </svg>
            */
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
                // svg 图片的 fill 属性不起效果时，使用下面的配置，自动删除原 SVG 图片的 fill 属性
                // svgoOptions: {
                //     full: true,
                //     plugins: [
                //         {
                //             name: 'removeAttrs',
                //             params: {
                //                 attrs: 'fill'
                //             }
                //         }
                //     ]
                // }
            }),
            // 自动导入的配置
            AutoImport({
                // 解析器
                resolvers: [
                    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
                    ElementPlusResolver(),
                    // 解析器配置自动引入的 Icon 组件的统一前缀，默认为 i，设置 false 为不需要前缀
                    /*
                        {prefix}-{collection}-{icon} 使用组件解析器时，必须遵循名称转换才能正确推断图标
                        即可以使用 <IconEpSearch /> 或在代码里使用 IconEpSearch
                    */
                    IconsResolver({
                        // prefix: 'Icon',
                        enabledCollections: ['ep']
                    }),
                ],
                // 自动导入 vue3 的 hooks，导入后就不用再 import { ref, computed } from 'vue'
                imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
                // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
                // dts: 'src/auto-import.d.ts'
            }),
            // 自动导入组件的配置
            Components({
                // 自定义组件的解析器
                resolvers: [
                    // 自动导入 Element Plus 组件
                    ElementPlusResolver(),
                    // 解析器配置 Iconify 使用的集合，如这里的 ep 指定的就是 Iconify 里 element-plus 的图标集合
                    /*
                        {prefix}-{collection}-{icon} 使用组件解析器时，必须遵循名称转换才能正确推断图标
                        即可以使用 <IconEpSearch /> 或在代码里使用 IconEpSearch
                    */
                    IconsResolver({
                        // prefix: 'Icon',
                        // enabledCollections: ['ep', 'flat-color-icons'],
                        // 当图标集名字过长时，可使用集合别名，即用下面的来取代 enabledCollections，可用原名也可用别名
                        alias: {
                            ep: 'ep',
                            fci: 'flat-color-icons'
                        },
                    })
                ],
                // 指定组件位置，默认是src/components，不修改的话 src/components 的组件都不需要手动导入了
                dirs: ['src/components/base'],
                // 组件的有效文件扩展名。
                // extensions: ['vue'],
                // 搜索子目录
                // deep: true,
                // 生成 `components.d.ts` 全局声明，
                // 也接受自定义文件名的路径
                // dts: false,
                // dts: 'src/components.d.ts',
                // 允许子目录作为组件的命名空间前缀。
                // directoryAsNamespace: false,
                // 忽略命名空间前缀的子目录路径
                // 当`directoryAsNamespace: true` 时有效
                // globalNamespaces: [],
                // 默认值：Vue 3 的`true`，Vue 2 的`false`
                // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
                // directives: true,
            }),
            // 自动导入图标的配置
            Icons({
                autoInstall: true,
                // // 缩放
                // scale: 1,
                // // 编译方式
                // compiler: 'vue3',
                // // 默认类名
                // defaultClass: '',
                // // 默认样式
                // defaultStyle: '',
                // // jsx 支持
                // jsx: 'react'
            })
        ],
        // 配置 @ 路径别名，实现 @ 代替 /src
        resolve: {
            // 设置文件 ./src 路径为 @
            alias: {
                // Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径。相反 ./ 会返回你执行 node 命令的路径，例如你的工作路径
                "@": path.resolve(__dirname, './src')
                // '@views': path.resolve(__dirname, 'src') + '/views',
            }
        }
    }
})
