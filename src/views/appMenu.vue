<template>
<el-row class="container">
    <el-col :md="mdLeft" :sm="smLeft" :xs="0" class="aside">
        <div class="title">
            <img  v-if="!isCollapse" src="@/assets/logo.png">
            <img  v-else src="@/assets/logo2.png">
        </div>
        <el-menu
            :default-active="$route.path"
            :default-openeds="defaultOpen"
            :unique-opened="true"
            :router="true"
            :collapse="isCollapse"
            :hide-timeout='1000'
            class="el-menu-vertical-demo"
            background-color="#1D1E23"
            text-color="#fff"
            active-text-color="#f6ca9d">
            <el-submenu v-for="(item,index) in permissionRoutes"
                        :key="index"
                        :index="item.path">
                <template slot="title">
                    <i class="iconfont" :class="item.meta.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </template>
                <el-menu-item
                    v-for="(el, idx) in item.children"
                    :key="idx"
                    :index="item.path + '/' + el.path">{{el.meta.title}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-col>
    <el-col :md="mdRight" :sm="smRight" :xs="24" class="content">
        <div class="header">
            <div class="xs_logo hidden-sm-and-up">
                <img src="@/assets/logo2.png">
                <!-- <i class="el-icon-s-unfold" @click="dialogVisible = true"></i> -->
                <i class="el-icon-s-unfold" @click="drawer = true"></i>
            </div>
            <div class="i-layout-header-trigger hidden-sm-and-down" >
                <i v-if="!isCollapse" class="el-icon-s-fold" @click="checkFold(0)"></i>
                <i v-else class="el-icon-s-unfold" @click="checkFold(1)"></i>
            </div>
            <div class="user_admin">
                <i v-if="fullVal === 0" class="iconfont icon-quanping hidden-sm-and-down" @click="fullScreen"></i>
                <i v-else class="iconfont icon-suoxiao hidden-sm-and-down" @click="narrow"></i>
                <i class="iconfont icon-ziyuan"></i>
                <img src="@/assets/avatar.gif">
                <el-dropdown @command="command" trigger="click">
                    <span class="el-dropdown-link">
                        admin<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command='a'>修改密码</el-dropdown-item>
                        <el-dropdown-item command='b'>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
            </div>
        </div>
        <router-view></router-view>
        <div class="passDialog">
            <el-dialog title="修改密码" :visible.sync="dialogPass" width="40%">
                <el-form :model="passForm" :rules="rules" ref="passForm">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input type="password" v-model="passForm.oldPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input type="password" v-model="passForm.newPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="repeatPassword">
                        <el-input type="password" v-model="passForm.repeatPassword"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogPass = false">取 消</el-button>
                    <el-button type="primary" @click="dialogPass = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 移动端导航 -->
        <el-drawer :append-to-body="true" :modal-append-to-body="false" size="60%" :show-close="false" :visible.sync="drawer"      :direction="direction">
            <div class="title">
                <img src="@/assets/logo.png">
            </div>
            <el-menu
                :default-active="$route.path"
                :default-openeds="defaultOpen"
                :unique-opened="true"
                :router="true"
                :collapse="isCollapse"
                :hide-timeout='1000'
                class="el-menu-vertical-demo"
                background-color="#1D1E23"
                text-color="#fff"
                active-text-color="#f6ca9d">
                <el-submenu v-for="(item,index) in permissionRoutes"
                            :key="index"
                            :index="item.path">
                    <template slot="title">
                        <i class="iconfont" :class="item.meta.icon"></i>
                        <span slot="title">{{item.meta.title}}</span>
                    </template>
                    <el-menu-item
                        v-for="(el, idx) in item.children"
                        :key="idx"
                        :index="item.path + '/' + el.path">{{el.meta.title}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-drawer>
    </el-col>
</el-row>
</template>
<script>
export default {
  data(){
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.passForm.repeatPassword !== '') {
            this.$refs.passForm.validateField('repeatPassword');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return{
        drawer:false,
        direction:'ltr',
        isCollapse:false,
        defaultOpen:[],
        permissionRoutes:[],
        menuList:[],
        mdRight:20,
        mdLeft:4,
        smLeft:8,
        smRight:16,
        dialogVisible:false,
        fullVal: 0,
        dialogPass:false,
        passForm:{
            oldPassword:'',
            newPassword:'',
            repeatPassword:'',
        },
        rules:{
            oldPassword:[
                { required: true, message: '请输入旧密码', trigger: 'blur' },
            ],
            newPassword: [
                { validator: validatePass, trigger: 'blur' }
            ],
            repeatPassword: [
            { validator: validatePass2, trigger: 'blur' }
            ],
        }
    }
  },
  created(){
    this.defaultOpen.push(`/${this.$route.path.split('/')[1]}`)
    if (this.$route.name === 'appMenu') {
      this.$router.push({ name: 'member' })
    }
  },
  mounted(){
    let array = []
    array = this.$router.options.routes
    array.forEach((ele) => {
        if(ele.children){
            this.permissionRoutes.push(ele)
        }
    });
  },
  methods:{
    checkFold(val){
        if(val === 0){
            this.isCollapse = true
            this.mdRight = 23
            this.mdLeft = 1
            this.smLeft = 2
            this.smRight = 22
        }else{
            this.isCollapse = false
            this.mdRight = 20
            this.mdLeft = 4
            this.smLeft = 8
            this.smRight = 16
        }
    },
    // 点击全屏
    fullScreen(){
        this.fullVal = 1
        let full = document.documentElement
        if(full.requestFullscreen){
            full.requestFullscreen()
        }else if(full.mozRequestFullScreen){
            full.mozRequestFullScreen()
        } else if (full.webkitRequestFullScreen) {
            full.webkitRequestFullScreen()
        }
    },
    // 缩小
    narrow(){
        this.fullVal = 0
        let docE = document
         if (docE.exitFullscreen) {
            docE.exitFullscreen()
        } else if (docE.mozCancelFullScreen) {
            docE.mozCancelFullScreen()
        } else if (docE.webkitCancelFullScreen) {
            docE.webkitCancelFullScreen()
        }
    },
    // 下拉菜单点击事件
    command(val){
        if(val === 'a'){
            this.dialogPass = true
        }else{
            
        }
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
    display: flex;
    background: #F5F7F9;
    .aside{
        height: calc(100vh);
        box-shadow: 1px 0 6px rgba(0,21,41,.35);
        background: #1D1E23;
        .title{
            border-bottom: 1px solid #101117;
            height: 65px;
            color: rgba(246,202,157,.7);
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
        }
        .el-menu{
            border-right: 0px;
            width: auto;
            .el-menu-item{
                min-width: 0;
                padding: 0
            }
            i{
                font-size: 18px;
                margin-right: 10px;
                font-weight: 600;
            }
        }
    }
    .content{
        .header{
            background-color: #303136;
            height: 66px;
            color: #f6ca9d;
            .xs_logo{
                float: left;
                height: 64px;
                padding: 0 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    padding: 0 10px;
                }
                i{
                    font-size: 20px;
                    padding: 0 10px;
                }
                .el-drawer{
                    background: #101117
                }
            }
            .i-layout-header-trigger{
                float: left;
                width: 64px;
                height: 64px;
                font-size: 20px;
                font-weight: 400;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    cursor: pointer;
                }
            }
            .user_admin{
                float: right;
                width: auto;
                padding: 0 20px;
                height: 64px;
                font-size: 18px;
                display: flex;
                align-items: center;
                cursor: pointer;
                .iconfont{
                    font-size: 20px;
                    margin-right: 10px; 
                }
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    margin-right: 5px;
                }
                .el-dropdown{
                    font-size: 16px;
                    color: #f6ca9d;
                }
            }
        }
        .dialogMenu{
            /deep/.el-dialog{
                margin: 0!important;
                background: #1d1e23;
                height: calc(100vh);
                .el-dialog__body{
                    padding: 0;
                    .el-menu{
                        border-right: 0px;
                        width: auto;
                        i{
                            font-size: 18px;
                            margin-right: 10px;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
        .passDialog{
            /deep/ .el-dialog{
                 .el-dialog__footer{
                     text-align: center
                 }
            }
        }
    }
}
</style>