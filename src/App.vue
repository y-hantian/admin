<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>

export default {

}
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,"\5FAE\8F6F\96C5\9ED1",Arial,sans-serif;
 /deep/ .el-drawer{
      .el-drawer__header{
        margin: 0;
        padding: 0;
      }
      .el-drawer__body{
        background-color: #1D1E23; 
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
  }
}
</style>
