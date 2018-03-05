<template>
  <div>
    <el-row>
      <el-col>
        <Card :bordered="false" class="dataSetCard" style="margin-bottom: 50px">
          <p slot="title" style="font-size: 16px">{{ group.groupName }}:</p>
          <el-row>
            <el-col>
              <el-table :data="group.groupMembers"
                        v-loading.body="listLoading"
                        border
                        fit
                        highlight-current-row
                        style="width: 100%">
                <el-table-column  min-width="100px" align="center" :label="$t('p.student.modal.studentId')">
                  <template slot-scope="scope">
                    <span>{{scope.row.studentId}}</span>
                  </template>
                </el-table-column>

                <el-table-column min-width="300px" align="center" :label="$t('p.student.modal.studentName')">
                  <template slot-scope="scope">
                    <span>{{scope.row.studentName}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "editable-group-view",
        props:{
          toGroup:{
            required: Object,
            default: null
          }
        },
        data() {
          return {
            group: this.toGroup,
            listLoading:false,
          }
        }
    }
</script>

<style scoped>
  div{
    background-color:transparent;
    margin:0px auto;
    font-size:16px;
  }
</style>
