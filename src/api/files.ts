import request from '@/utils/request'

const filesApi = {
    // 上传单一文件接口
    uploadSingleFile: (data: object) => {
        return request({
            url: '/files/uploadSingleFile',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    },
    // 上传多个文件接口
    uploadMultipleFiles: (data: object) => {
        return request({
            url: '/files/uploadMultipleFiles',
            method: 'post',
            data
        })
    },
    // 分段上传文件接口
    uploadChunkFile: (data: object) => {
        return request({
            url: '/files/uploadChunkFile',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    },
    // 合并上传文件接口
    mergeChunkFile: (data: object) => {
        return request({
            url: '/files/mergeChunkFile',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    }
}

export default filesApi;
