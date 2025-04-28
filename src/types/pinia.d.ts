/**
 * 类型定义
*/

// 用户信息
declare interface UserInfo<T = any> {
    userName: string,
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
