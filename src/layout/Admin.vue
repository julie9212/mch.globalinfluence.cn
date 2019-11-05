<template>
    <Layout>
      <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
              <div class="layout-logo">
                <p style="color:#fff">julie后台管理</p> 
                <!-- <img src="./assets/logo.png" style="width:50%"> -->
              </div>
              <div class="layout-nav">
                  <MenuItem name="1" @click="putUps(0)">
                  <Icon type="ios-contact" style="font-size:18px" />
                      julie
                  </MenuItem>
                  <MenuItem name="2" @click="putUps(0)">
                      <Icon type="ios-keypad"></Icon>
                      首页
                  </MenuItem>
                  <MenuItem name="3">
                        <!-- <Icon type="ios-analytics"></Icon>
                        设置 -->
                    <Dropdown>
                        <a href="javascript:void(0)">
                            <Icon type="ios-analytics"></Icon>
                            设置
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item>驴打滚</Dropdown-item>
                            <Dropdown-item>炸酱面</Dropdown-item>
                            <Dropdown-item disabled>豆汁儿</Dropdown-item>
                            <Dropdown-item>冰糖葫芦</Dropdown-item>
                            <Dropdown-item divided>北京烤鸭</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                  </MenuItem>
                  <MenuItem name="4">
                      <Icon type="ios-paper"></Icon>
                      退出
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
                      <MenuItem name="1-2">数据1</MenuItem>
                      <MenuItem name="1-3">数据2</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                      <template slot="title">
                          <Icon type="ios-keypad"></Icon>
                          栏目管理
                      </template>
                      <MenuItem name="2-1">
                        <router-link to="/column">栏目管理</router-link>
                      </MenuItem>
                      <MenuItem name="2-2">
                        <router-link to="/listcontent/all">内容管理</router-link>
                      </MenuItem>
                      <MenuItem name="2-3">其他栏目</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          用户管理
                      </template>
                      <MenuItem name="3-1">
                        <router-link to="/user">用户信息</router-link>
                      </MenuItem>
                      <MenuItem name="3-2">加入申请</MenuItem>
                  </Submenu>
                  <Submenu name="4">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          合作管理
                      </template>
                      <MenuItem name="4-1">加入申请</MenuItem>
                  </Submenu>
                  <Submenu name="5">
                      <template slot="title">
                          <Icon type="ios-analytics"></Icon>
                          系统
                      </template>
                      <MenuItem name="5-1">系统基本参数</MenuItem>
                      <MenuItem name="5-2">系统用户管理</MenuItem>
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
    
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 90px;
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
