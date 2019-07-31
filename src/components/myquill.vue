<template>
<!-- 删 -->
  <div class="quill-editor-example">
    <!-- quill-editor -->
    <quill-editor ref="myTextEditor" style="height:200px" v-model="quillcontent" :options="editorOption">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

export default {
  name: 'my-quill',
  components: {
    quillEditor
  },
  props:['quillcontent'],
  data() {
    return {

      editorOption: {
        placeholder: "请输入反馈问题的内容",
        modules: {
          //工具栏配置
          toolbar: [
            ['clean'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline'],
            ['code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image'],
            [{ 'color': [] }, { 'background': [] }]
          ],

        }
      }
    }
  },
  // methods: {
  //   onEditorBlur(editor) {
  //     console.log('editor blur!', editor)
  //   },
  //   onEditorFocus(editor) {
  //     console.log('editor focus!', editor)
  //   },
  //   onEditorReady(editor) {
  //     console.log('editor ready!', editor)
  //   }
  // },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },
  }

}
</script>

<style lang="scss" scoped>
.quill-editor-example{
  height: 242px;
  width: 100%;
}
</style>