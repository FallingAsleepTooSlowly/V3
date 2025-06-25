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
    }
}

export default uploadApi;
