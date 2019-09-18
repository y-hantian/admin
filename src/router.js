import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
import AppMenu from './views/appMenu.vue'
// 会员管理
import Member from './views/membersManagement/member.vue'
import Avatar from './views/auditManagement/avatar.vue'
import MailSettings from './views/systemSetup/mailSettings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/appMenu',
      name: 'appMenu',
      component: AppMenu,
      meta:{
        title:"会员管理",
        icon:'icon-huiyuan'
      },
      children:[
        {
          path:'member',
          name:'member',
          component:Member,
          meta:{
            title:'用户管理'
          }
        }
      ]
    },
    {
      path:'/auditManagement',
      name:'auditManagement',
      component:AppMenu,
      meta:{
        title:'审核管理',
        icon:'icon-shenhe'
      },
      children:[
        {
          path:'avatar',
          name:'avatar',
          component:Avatar,
          meta:{
            title:'头像管理'
          }
        }
      ]
    },
    {
      path:'/systemSetup',
      name:'systemSetup',
      component:AppMenu,
      meta:{
        title:'系统设置',
        icon:'icon-yanjizhushou-shangchuan_xitong'
      },
      children:[
        {
          path:'mailSettings',
          name:'mailSettings',
          component:MailSettings,
          meta:{
            title:'邮件管理',
          }
        }
      ]
    }
  ]
})
