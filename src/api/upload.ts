import request from '@/utils/request'

const uploadApi = {
    // 上传单一文件接口
    uploadSingleFile: (data: object) => {
        return request({
            url: '/upload/uploadSingleFile',
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
            url: '/upload/uploadMultipleFiles',
            method: 'post',
            data
        })
    },
    // 分段上传文件接口
    uploadChunkFile: (data: object) => {
        return request({
            url: '/upload/uploadChunkFile',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
    }
}

export default uploadApi;
