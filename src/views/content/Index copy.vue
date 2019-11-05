<template>
    <div>
        <h2>内容管理</h2>
        <Row>
            <!-- <Col span="2">
                <Button type="info" @click="add">内容列表</Button>
            </Col> -->
        </Row><br>

        
        <quill-editor
          v-model="content"
          :content="content"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>


    </div>
</template>
<script>

import { quillEditor } from 'vue-quill-editor'

export default {
  data () {
    return {
      name: 'register-modules-example',
      content: `1231`,
      editorOption: {
        modules: {
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: {
toolbar: {
  container: toolbarOptions,
  handlers: {
    'image': function (value) {
      if (value) {
        // 调用element UI图片上传
        document.querySelector('#uploadImg .el-upload').click()
      } else {
        this.quill.format('image', false)
      }
    }
  }
},                
            }
          }
        }
      }
    }
  },
  methods: {
    onEditorBlur (editor) {
      // console.log('editor blur!', editor)
      console.log(editor)
    },
    onEditorFocus (editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      // console.log('editor ready!', editor)
    }
  }
}
</script>
