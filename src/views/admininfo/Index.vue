<template>
    <div>
        <div style="background:#eee;padding: 1px">
            <Card :bordered="false">
                <p slot="title">管理员系统设置</p>
                <Row>
                    <Col span="20" offset="2">
                        <Form :model="form" :label-width="80"><br>
                            <Row>
                                <Col span="12">
                                    <Form-item label="标题">
                                        <Input v-model="form.title" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="e-mail">
                                        <Input v-model="form.email" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <Form-item label="电话1">
                                        <Input v-model="form.phone" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <Form-item label="电话2">
                                        <Input v-model="form.phone2" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="地址">
                                        <Input v-model="form.address" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="版权">
                                        <Input v-model="form.copyright" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="关键词"> 
                                        <Input v-model="form.keywords" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label="摘要">
                                        <Input v-model="form.description" type="textarea" placeholder="请输入..."></Input>
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
                                    <Button type="text" v-on:click="form.logo=''" >删除图片</Button>
                                </Col>
                                <Col span="4">
                                    <img :src="form.logo" style="width:200px">
                                </Col>
                            </Row>
                            <Row>
                                <Col span="4">
                                    <Form-item label="admin">
                                        <Input v-model="form.admin" placeholder="请输入"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="4">
                                    <Button type="warning" size="small" v-on:click="pass">修改密码</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="8">
                                    <Form-item>
                                        <Button type="primary" v-on:click="ok_form">提交</Button> 
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <Button type="text" v-on:click="list">重置</Button> 
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Modal
                v-model="modal"
                title="修改密码"
                @on-ok="ok_pass"
                @on-cancel="cancel">
                    <Form :model="formpass" :label-width="80">
                        <Form-item label="旧密码">
                            <Input v-model="formpass.passwordOld" type="password" placeholder="请输入"></Input>
                        </Form-item>
                        <Form-item label="新密码">
                            <Input v-model="formpass.password" type="password" placeholder="请输入"></Input>
                        </Form-item>
                    </Form>
                </Modal>
            </Card>
        </div>
    </div>
</template>

<script>

     export default {
        data(){
             return{
                form: {},
                modal: false,
                formpass:{},
            }
         },
        mounted(){
            this.list();
        },
        methods: {
            async list () {
                let res = await this.$api.admininfo.list();
                // console.log(res);
                if(res){
                    if(res.info){
                        this.form = res.info;
                    }
                }
            },
            async update(form){
                // console.log(form);
                let res = await this.$api.admininfo.update({form:form});
                // console.log(res);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            uploadSuccessImg(res){
                if(res.ret == 200){
                    this.form.logo = res.data;
                    console.log(res);
                }else{
                    this.$Message.error(res.msg);
                }
            },
            ok_form(){
                this.update(this.form);
            },
            pass(){
                this.modal = true;
            },
            async ok_pass () {
                console.log(this.formpass);
                let res = await this.$api.admininfo.passupdate(this.formpass);
                console.log(res);
                if(res){
                    this.list();
                    this.$Message.success('修改成功');
                }
            },
            cancel () {
                this.$Message.info('点击了取消');
            }
        },
     
     }
</script>
