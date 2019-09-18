<template>
    <div class="main">
      <div class="form">
        <h2>管理系统</h2>
        <el-form :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="account">
            <el-input prefix-icon="el-icon-user" type="text" v-model="ruleForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" type="password" v-model="ruleForm.password" autocomplete="off" suffix-icon="el-icon-view"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>
<script>
// import Api from '@/api'
// import { statusCode } from '@/config'
// import { setStorageItem } from '@/utils'
export default {
  data () {
    return {
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      this.$router.push({name:'appMenu'})
      // this.$refs[ruleForm].validate((valid) => {
      //   if (valid) {
      //     const data = this.ruleForm
      //     Api.user.login(data).then((res) => {
      //       console.log(res)
      //     })
      //   }
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
  background-color: #2d3a4b;
  height: 100vh;
  display: flex;
  align-items: center;
  .form{
    width: 30%;
    margin: 0 auto;
    h2{
      text-align: center;
      color: #eee;
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 40px;
    }
    .el-form{
      .el-form-item {
       /deep/ .el-form-item__label{
          color: #eee;
        }
        /deep/.el-form-item__content{
          margin-left: 0 !important;
          height: 55px;
          // border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 5px;
          color: #454545;
          /deep/ .el-input__inner{
            height: 50px;
            background: rgba(0, 0, 0, 0.1);
            border: #7e838a 1px solid;
            border-radius: 5px;
            color: #fff;
          }
        }
        .el-button{
          width: 100%;
        }
      }
    }
  }
}
</style>
