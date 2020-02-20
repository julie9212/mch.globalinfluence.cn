<template>
    <Layout>
      <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="layout-logo">
                <p style="color:#fff">julie后台管理系统</p> 
              </div>
              <div class="layout-nav">
                  <MenuItem name="1" @click="putUps(0)">
                  <Icon type="ios-contact" style="font-size:18px" />
                      {{admin.admin}}
                  </MenuItem>
                  <MenuItem name="2" @click="putUps(0)">
                      <Icon type="ios-keypad"></Icon>
                      首页
                  </MenuItem>
                  <MenuItem name="3">
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <Icon type="ios-analytics"></Icon>
                            设置
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>设置1</Dropdown-item>
                            <Dropdown-item>设置2</Dropdown-item>
                            <Dropdown-item disabled>设置3</Dropdown-item>
                            <Dropdown-item>设置4</Dropdown-item>
                            <Dropdown-item divided>设置5</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                  </MenuItem>
                  <MenuItem name="4">
                      <p @click="out">
                          <Icon type="ios-paper"></Icon>退出
                      </p>
                      
                  </MenuItem>
              </div>
          </Menu>
      </Header>

        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
              <Menu active-name="1-1" theme="light" width="auto" :open-names="['1']">
                  <Submenu name="1">
                      <template slot="title">
                          <Icon type="ios-navigate"></Icon>
                          综合数据
                      </template>
                      <MenuItem name="1-1">
                        <router-link to="/">首页</router-link>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="2">
                      <template slot="title">
                          <Icon type="ios-keypad"></Icon>
                          栏目管理
                      </template>
                      <MenuItem name="2-1">
                        <router-link to="/column">栏目管理</router-link>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="3">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          提交管理
                      </template>
                      <MenuItem name="3-1">
                        <router-link to="/examine">文章审核</router-link>
                      </MenuItem>
                      <MenuItem name="3-2">
                        <router-link to="/application">合作申请</router-link>
                      </MenuItem>
                      <MenuItem name="3-3">
                        <router-link to="/meeting">参会申请</router-link>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="4">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          用户管理
                      </template>
                      <MenuItem name="4-1">
                        <router-link to="/user">用户信息</router-link>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="5">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          广告管理
                      </template>
                      <MenuItem name="5-1">
                        <router-link to="/ad">广告</router-link>
                      </MenuItem>
                  </Submenu>
                  <Submenu name="6">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          系统
                      </template>
                      <MenuItem name="6-1">
                        <router-link to="/admininfo">系统基本参数</router-link>
                      </MenuItem>
                  </Submenu>
              </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
              <Breadcrumb :style="{margin: '24px 0'}">
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem>Components</BreadcrumbItem>
                  <BreadcrumbItem>Layout</BreadcrumbItem>
              </Breadcrumb>
              <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                  <router-view/>
              </Content>
              <div class="layout-copy">
                    2011-2016 &copy; TalkingData
              </div>
          </Layout>
      </Layout>
    </Layout>
</template>

<script scoped>
export default {
    data(){
        return {
            admin:[],
        }
    },
    mounted(){
        this.getInfo();
    },
    methods:{
        async getInfo(){
            let res = await this.$api.common.loginInfo();
            if (res) {
                this.admin = res;
            }
        },
        async outInfo(){
            let res = await this.$api.common.out();
            if (res) {
                this.$router.push('/login');
                this.$Message.success('退出成功');
            }
        },
        out(){
             this.$Modal.confirm({
                title:"提示",
                content:"确定要退出登录吗",
                onOk:() =>{
                    this.outInfo();
                }
            })
        }
    }
}
</script>

<style>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 120px;
    height: 45px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}

a{
    color: #515a6e;
}
.ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu) a{
    color: #2d8cf0;
    background: #f0faff;
    z-index: 2;
}

.layout-nav a{
    color:#d7dde4
}

.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active a, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover a, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active a, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover a {
    color: #fff;
}

.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
</style>
