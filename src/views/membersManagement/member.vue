<template>
    <div class="main">
        <p class="title">用户管理</p>
        
        <div class="content">
            <div class="sel_title">
                <el-button type="danger">批量删除</el-button>
                <div class="sel_input">
                    <el-input v-model="key" placeholder="请输入关键字"></el-input>
                    <el-button type="primary">搜索</el-button>
                    <el-button type="primary">添加</el-button>
                </div>
            </div>
            <div class="table">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import Api from '@/api'
export default {
  data () {
    return {
      tableData: [],
      key: '',
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 用户列表
    userList () {
      const data = {
        pageNumber: this.pageInfo.pageNumber,
        pageSize: this.pageInfo.pageSize,
        key: this.key
      }
      Api.user.userList(data).then((res) => {

      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main{
    background: #fff;
    margin: 20px;
    border-radius: 2px;
    .title{
        font-size: 16px;
        font-weight: 600px;
        text-align: left;
        padding: 5px;
        // border-bottom: 10px solid #F1F4F9;
        // margin-bottom: 10px
    }
    .content{
        // display: flex;
        // justify-content: space-between;
        .sel_title{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 2px solid #F1F4F9;
            .sel_input{
                display: flex;
                align-items: center;
                .el-input{
                    margin-right: 5px
                }
            }
        }
        .table{
            padding: 10px
        }
    }
}
</style>
