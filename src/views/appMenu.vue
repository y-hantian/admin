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
            @open="handleOpen"
            @close="handleClose"
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
                <i class="el-icon-s-unfold" @click="dialogVisible = true"></i>
            </div>
            <div class="i-layout-header-trigger hidden-sm-and-down" >
                <i v-if="!isCollapse" class="el-icon-s-fold" @click="checkFold(0)"></i>
                <i v-else class="el-icon-s-unfold" @click="checkFold(1)"></i>
            </div>
            <div class="user_admin">
                <img src="@/assets/avatar.gif">
                <span>admin</span>
            </div>
        </div>
        <router-view></router-view>
        <el-dialog :visible.sync="dialogVisible" :show-close="false" width="60%">
            <img src="@/assets/logo.png">
            <el-menu
                :default-active="$route.path"
                :default-openeds="defaultOpen"
                :unique-opened="true"
                :router="true"
                :collapse="isCollapse"
                :hide-timeout='1000'
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
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
        </el-dialog>
    </el-col>
</el-row>
</template>
<script>
export default {
  data(){
    return{
        isCollapse:false,
        defaultOpen:[],
        permissionRoutes:[],
        menuList:[],
        mdRight:20,
        mdLeft:4,
        smLeft:8,
        smRight:16,
        dialogVisible:false
    }
  },
  created(){
    this.defaultOpen.push(`/${this.$route.path.split('/')[1]}`)
    //   console.log(this.defaultOpen)
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
    handleOpen(){

    },
    handleClose(){

    },
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
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    margin-right: 5px;
                }
            }
        }
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
}
</style>