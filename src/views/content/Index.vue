<template>
    <div>
        <div style="background:#eee;padding: 1px">
            <Card :bordered="false">
                <p slot="title">{{title}}</p>
                    <Row>
                        <Col span="20" offset="2">
                            <Form :model="form" :label-width="80"><br>
                                <Row>
                                    <Col span="12">
                                        <Form-item label="标题">
                                            <Input v-model="form.title" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="8">
                                        <Form-item label="小标题">
                                            <Input v-model="form.title_small" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                 <Row>
                                    <Col span="6">
                                    <Form-item label="外部链接">
                                            <Radio-group v-model="form.is_url">
                                                <Radio label="1">开启</Radio>
                                                <Radio label="0">关闭</Radio>
                                            </Radio-group>
                                        </Form-item>
                                    </Col>
                                    <Col span="12">
                                        <Form-item label="外链">
                                            <Input v-model="form.url" placeholder="请输入链接地址"></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="4">
                                        <Form-item label="来源">
                                            <Input v-model="form.source" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="4">
                                        <Form-item label="作者">
                                            <Input v-model="form.writer" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="3">
                                        <Form-item label="排序">
                                            <Input v-model="form.sort" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                    <Col span="3">
                                        <Form-item label="点赞">
                                            <Input v-model="form.good" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="3">
                                        <Form-item label="权限">
                                            <Radio-group v-model="form.authority">
                                                <Radio label="0">all</Radio>
                                                <Radio label="1">vip</Radio>
                                            </Radio-group>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="16">
                                        <Form-item label="关键字">
                                            <Input v-model="form.keyword" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="16">
                                        <Form-item label="摘要">
                                            <Input v-model="form.abstract" type="textarea" placeholder="请输入..."></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <!-- <Row>
                                    <Col span="16">
                                        <Form-item label="视频连接">
                                            <Input v-model="form.video_url" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                </Row> -->
                                <Row>
                                    <Col span="6">
                                        <Form-item label="所属栏目">
                                            <Select v-model="form.column_id">
                                                <Option v-for="item in column" :value="item.id">{{item.pid_name}} => {{ item.name }}</Option>
                                            </Select>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <Form-item label="上传图片">
                                        <Upload
                                            action="http://mchapi.globalinfluence.cn/admin.php/admin/system/upload"
                                            :on-success="uploadSuccessImg">
                                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                                        </Upload>
                                        </Form-item>
                                    </Col>
                                    <Col span="2">
                                       <Button type="text" v-on:click="form.img_url=''" >删除图片</Button>
                                    </Col>
                                    <Col span="4">
                                       <img :src="form.img_url" style="height:100px">
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <Form-item label="上传视频">
                                        <Upload
                                            action="http://mchapi.globalinfluence.cn/admin.php/admin/system/upload"
                                            :on-success="uploadSuccessVideo">
                                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                                        </Upload>
                                        </Form-item>
                                    </Col>
                                    <Col span="2">
                                        {{form.video_url}}
                                       <Button type="text" v-on:click="form.video_url=''" >删除视频</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="16">
                                        <Form-item label="视频连接">
                                            <Input v-model="form.video_url" placeholder="请输入"></Input>
                                        </Form-item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="6">
                                        <Form-item label="上传报告">
                                        <Upload
                                            action="http://mchapi.globalinfluence.cn/admin.php/admin/system/upload"
                                            :on-success="uploadSuccessFile">
                                            <Button icon="ios-cloud-upload-outline">上传文件</Button>
                                        </Upload>
                                        </Form-item>
                                    </Col>
                                    <Col span="2">
                                        {{form.file_url}}
                                       <Button type="text"  v-on:click="form.file_url=''" >删除文件</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                        <div class="edit_container" style="height:700px">
                                            <quill-editor 
                                                v-model="form.content" 
                                                ref="myQuillEditor" 
                                                :options="editorOption" 
                                                @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                                                @change="onEditorChange($event)"
                                                style="height:600px">
                                            </quill-editor>
                                            <!-- <button v-on:click="saveHtml">保存</button> -->
                                        </div>  
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="24">
                                         <Form-item>
                                            <Button type="primary" @click="saveHtml">提交</Button>
                                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <Button type="warning" @click="$router.back(-1)">返回</Button>
                                            <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                            <Button type="text" @click="list">重置</Button> 
                                        </Form-item>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
            </Card>
        </div>
    </div>
</template>

<script>

import { quillEditor } from 'vue-quill-editor'
// 工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline'],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['image'],                                // remove formatting button
    ]

     export default {
        data(){
             return{
                editorOption: {
                    theme:'snow',   
                },
                title:'添加内容',
                form: {
                    title: '',
                    title_small: '',
                    source:'',
                    writer:'',
                    sort:0,
                    good:0,
                    authority:0,
                    keyword:'',
                    abstract:'',
                    column_id:'',
                    img_url:'',
                    video_url:'',
                    file_url:'',
                    content: ``,
                    url:'',
                    is_url:'',
                },
                column: [],
            }
         },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill;
            },
        },
        mounted(){
            this.list();
        },
        methods: {
            async list () {
                let n = this.$route.params;
                // console.log(n);
                let res = await this.$api.content.list(n);
                console.log(res);
                if(res){
                    if(res.info){
                        this.title = '修改内容';
                        this.form = res.info;
                        this.form.is_url = res.info.is_url+'';
                        this.form.authority = res.info.authority + '';
                    }
                    this.column = res.column;
                }
            },
            async insert(form){
                // console.log(form);
                let res = await this.$api.content.insert(form);
                if(res){
                    this.list();
                    this.$Message.success('添加成功');
                    this.$router.go(-1)
                }
            },
            async update(form){
                // console.log(form);
                let res = await this.$api.content.update({form:form});
                // console.log(res);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                    this.$router.go(-1);
                }
            },
            // 编辑器开始=======================================
            onEditorReady(editor) {}, // 准备编辑器
            onEditorBlur(){}, // 失去焦点事件
            onEditorFocus(val,editor){
                console.log(val); // 富文本获得焦点时的内容
                // console.log(val.container.innerHTML); 
                // console.log(this.$refs.myQuillEditor.quill); 
                // editor.enable(false); // 在获取焦点的时候禁用
            }, // 获得焦点事件
            onEditorChange(){

            }, // 内容改变事件
            saveHtml:function(event){
                // alert(this.form.content);
                if(this.$route.params.id == 'insert'){
                    this.insert(this.form);
                }else{
                    this.update(this.form);
                }
                
            },
            // 编辑器结束=======================================
            uploadSuccessImg(res){
                if(res.ret == 200){
                    this.form.img_url = res.data;
                    // console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            uploadSuccessVideo(res){
                if(res.ret == 200){
                    this.form.video_url = res.data;
                    // console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            uploadSuccessFile(res){
                if(res.ret == 200){
                    this.form.file_url = res.data;
                    // console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
        },
        modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
              ['blockquote', 'code-block'],     //引用，代码块
  
              [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
              [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
              [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
              [{ 'direction': 'rtl' }],             // 文本方向
  
  
              [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
  
  
              [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
              [{ 'font': [] }],     //字体
              [{ 'align': [] }],    //对齐方式
  
  
              ['clean'],    //清除字体样式
              ['image','video']    //上传图片、上传视频
  
            ]
          },
     }
</script>
