/**
 * 类型定义
*/

// 用户信息
/*
    T 就是泛型，<>里的泛型相当于定义了一个类型变量，可通过链式传递给参数类型和返回类型
    例：
        function identity <T>(value: T) : T {
            return value;
        }
*/
declare interface UserInfo<T = any> {
    id: number | null,
    name: string,
    roles: string[],
    portrait: string
}
declare interface UserInfosState {
	userInfo: UserInfo;
}

// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
	tagsViewRoutes: T[];
	isTagsViewCurrenFull: Boolean;
}

// 文件对象
declare interface fileObject {
    name: string,
    percentage: number,
    raw: Object,
    size: number,
    status: string,
    uid: any
}
