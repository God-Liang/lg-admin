import axios from 'axios'
import { getOssPolicy } from '@/api/system'
export default {
  name: 'Upload',
  props: {
    // 上传列表的内建样式：text、picture、picture-card
    listType: {
      type: String,
      default: 'text'
    },
    // 上传列表数据
    fileList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      formData: {},
      previewImage: '',
      previewVisible: false
    }
  },
  methods: {
    // 获取oss临时权限
    getOssPolicy(filename) {
      getOssPolicy()
        .then(res => {
          this.formData = res.data
          return true
        })
        .catch(() => {
          return false
        })
    },
    // 上传之前
    beforeUpload(file) {
      const isLt50M = file.size / 1024 / 1024 < 50
      const isPolicy = this.getOssPolicy(file.name)
      if (!isLt50M) {
        this.$message.error('不能超过最大限制50MB!')
      }
      return isPolicy && isLt50M
    },
    // 上传之后
    change(file, fileList) {
      this.$emit('change', { file, fileList })
    },
    // 预览
    preview(file) {
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    renderPreview() {
      return (
        <a-modal
          visible={this.previewVisible}
          footer="null"
          {...{
            on: {
              cancel: () => {
                this.previewVisible = false
              }
            }
          }}
        >
          <img alt={this.previewImage} style="width: 100%" src={this.previewImage} />
        </a-modal>
      )
    }
  },
  render() {
    const { listType, fileList } = this.$props
    const isPreview = listType === 'picture-card'
    // 参数
    const uploadProps = {
      attrs: {
        name: 'file', // 发到后台的文件参数名
        multiple: false,
        accept: 'image/*',
        action: 'http://lginsane.oss-cn-shanghai.aliyuncs.com/',
        data: this.formData,
        listType,
        fileList,
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        beforeUpload: this.beforeUpload,
        // 上传成功
        onSuccess(res, file) {
          console.log('onSuccess', res, file)
        },
        // 上传失败
        onError(err, file) {
          console.log('onError', err, file)
        },
        customRequest({ action, data, file, filename, headers, onError, onSuccess }) {
          axios({
            method: 'post',
            url: action,
            headers,
            data: {
              ...data,
              file,
              name: filename
            }
          })
            .then(response => {
              onSuccess(response, file, filename)
            })
            .catch(error => {
              onError(error, file, filename)
            })
        }
      }
    }
    // 事件
    const eventProps = {
      on: {
        preview: file => this.preview(file),
        change: (file, fileList) => this.change(file, fileList)
      }
    }
    return (
      <div class="upload-container">
        <a-upload {...uploadProps} {...eventProps}>
          {this.$slots.default}
        </a-upload>
        {isPreview ? this.renderPreview() : null}
      </div>
    )
  }
}
