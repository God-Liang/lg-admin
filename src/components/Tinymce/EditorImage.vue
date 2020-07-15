<template lang="pug">
  .upload-container.tinymacUpload
    a-button(size="small" icon="cloud-upload" type="primary" @click="visible = true") 上传
    a-modal(
      title="上传"
      :visible="visible"
      @ok="uploadConfirm"
      @cancel="uploadCancel")
      Upload(list-type="picture-card" :file-list="fileList" @change="handleChange")
        a-icon(type="plus")
</template>
<script>
import Upload from '@/components/Upload'
export default {
  name: 'TinymacUpload',
  components: { Upload },
  data() {
    return {
      headers: {},
      visible: false,
      fileList: [],
      imgList: []
    }
  },
  methods: {
    uploadConfirm() {},
    uploadCancel() {
      this.visible = false
    },
    handleChange({ file, fileList }) {
      this.fileList = fileList
      console.log(this.fileList)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .anticon-eye-o {
  display: none;
}
</style>
