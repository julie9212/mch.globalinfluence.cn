<template>
    <div class="login">
        <div class="login_form">
            <Row >
                <Col span="8" offset="8">
                    <div class="login_style">
                        <h2 slot="title" style="color:#eee">欢迎登录</h2><br>
                        <Form :model="form" inline>
                            <FormItem prop="admin">
                                <Input type="text" v-model="form.admin" placeholder="请输入后台管理员账号">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <br>
                            <FormItem prop="password">
                                <Input type="password" v-model="form.password" placeholder="请输入后台管理员密码">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem><br>
                            <FormItem>
                                <Button type="info" @click="login" long :loading="loading">登录</Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </div>
    </div>   
</template>

<script>
export default {
    data() {
        return {
            loading:false,
            form:{
                admin:'',
                password:''
            },
        }
    },

    methods: {
        async login(){
            this.loading = true;
            let res = await this.$api.common.login(this.form);
            console.log(res);
            if (res) {
                this.$router.push('/');
                this.$Message.success('登录成功');
            }
            this.loading = false;
        },
    },
}   
</script>

<style lang="less" scoped>
.login{
    width: 100%;
        height: 100vh;
        background-image: url('../../public/img/login_bg.jpg');
        background-size: 100% 100%;
        background-position: 50%;
}
.login_form{
    width:100%;
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    overflow: hidden;
}
.login_style{
    width:100%;
    padding: 30px 0;
    border:1px solid #666;
    border-radius: 20px;
    background:rgba(0,0,0,0.4);
}

</style>

