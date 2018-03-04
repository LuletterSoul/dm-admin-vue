<template>
  <div id="app" class="app-container">
    <Row>
      <Col span="2">&nbsp;</Col>
      <Col span="20">
      <div class="details-container">
        <div class="dataSetTitle">{{ collectionName }}</div>
        <!--<div class="updown">-->
          <!--<Button type="ghost"><a href="">下载数据集</a></Button>-->
          <!--<Button type="ghost"><a href="">下载数据集描述信息</a></Button>-->
        <!--</div>-->

        <Card :bordered="false" class="dataSetCard">
          <p slot="title" style="font-size: 16px">描述摘要:</p>
          <p >{{ abstractInfo }}</p>
        </Card>

        <template>
          <h3 class="updown">描述信息:</h3>
          <Table :columns="columns1" :data="data1"></Table>
          <Table :columns="columns2" :data="data2"></Table>
          <Table :columns="columns3" :data="data3"></Table>
        </template>

        <Card :bordered="false" class="dataSetCard"
              v-for="todo in todos"
              v-bind:key="todo.id"
              v-bind:title="todo.title">
          <p slot="title" style="font-size:16px;">{{ todo.title }}</p>
          <p >{{ todo.info }}</p>
        </Card>
      </div>

      <div class="details-container">
        <Card>
          <div slot="title" >
            <Icon type="arrow-shrink"></Icon>
            <span class="title-font-style"> 数据集文件 </span>
            <Button type="ghost" class="btn-download-sets" :disabled="!checkedSetIds.length" @click="handleDownloadSetZip">下载</Button>
            <Button type="error" class="btn-download-sets" :disabled="!checkedSetIds.length || readOnly" @click="handleDeleteSets">删除</Button>
          </div>
          <a href="#" slot="extra" @click.prevent="uploadDialogVisible = true">
            <Icon type="plus-round"></Icon>
            新增
          </a>
          <el-dialog
            title="新增数据集"
            :visible.sync="uploadDialogVisible"
            width="30%">
            <el-upload
              class="upload-container"
              drag
              action="Deprecated"
              ref="uploadDataSets"
              :on-remove="handleFileRemove"
              :on-preview="handleFilePreview"
              :before-remove="beforeFileRemove"
              :before-upload="handleBeforeUpload"
              :on-success= "handleUploadSuccess"
              :file-list="fileList"
              :auto-upload="false"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <!--<div class="el-upload__tip" slot="tip">只能上传符合模板的.xlsx文件</div>-->
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button @click="uploadDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitUpload">确 定</el-button>
            </span>
          </el-dialog>
          <a href="#" slot="extra" @click.prevent="refreshDataSet()">
            <Icon type="ios-loop-strong"></Icon>
            刷新
          </a>
          <CheckboxGroup v-model="checkedSetIds">
            <animate-transition :link-index="linkIndex"
                                :in-style="'transition.bounceLeftIn'"
                                :out-style="'transition.bounceRightOut'">
              <Alert v-for="(item, index) in dataSets"
                     v-bind:key="item.containerId"
                     type="warning"
                     class="file-alert"
                     :data-index="index">
                <Checkbox :label="item.containerId" class="checkbox-container">
                  {{item.null}}
                </Checkbox>
                <li>
                  <a class="file-download-a">{{ item.fileName }}
                    <a class="file-download-size" >{{ dataSetSizes[index] }}</a>
                  </a>
                </li>
              </Alert>
            </animate-transition>
          </CheckboxGroup>

          <Page :total="totalSets"
                :page-size="listQuery.size"
                :current.sync="fixPage"
                @on-change="handlePageChange"
                @on-page-size-change="handleSizeChange"
                class="page-style"
                size="small"
                show-elevator
                show-total
                show-sizer></Page>
        </Card>
      </div>

      </Col>
    </Row>
  </div>
</template>

<script type="text/javascript">
  import FileSaver from 'file-saver'
  import {
    fetchOptions,
    getCollection,
    getSets,
    addSet,
    fetchCollectionList,
    downloadSetZip,
    deleteBatchDataSets
  } from 'api/datasets';
  export default {
    props: {
      //只读
      readOnly:false,
      toCollection:{}
    },
    name: 'DataSetDetail',
    created() {
      this.collectionId = this.$route.query.collectionId;
      //路由直接进入
      if (this.collectionId) {
        this.getCollectionById(this.collectionId);
        this.getDataSets(this.collectionId);
      }
      //依赖prop传入的collection
      else if(this.toCollection.collectionId){
        this.collection = this.toCollection;
        this.collectionId = this.toCollection.collectionId;
        this.getDataSets(this.collectionId);
      }
    },
    data() {
      return {
        uploadDialogVisible: false,
        isDataSetRefresh: false,
        checkedSetIds: [],
        listQuery: {
          page: 0,
          size: 10,
          sort: "containerId,ASC",
        },
        linkIndex: true,
        totalSets: 0,
        columns1: [
          {
            title: '特征',
            key: 'dataSetChars'
          },
          {
            title: '属性类型',
            key: 'attributeChars'
          },
          {
            title: '相关任务',
            key: 'associatedTasks'
          }
        ],
        columns2: [
          {
            title: '实例数',
            key: 'numberOfAttributes'
          },
          {
            title: '允许缺省?',
            key: 'isMissingValues'
          }
        ],
        columns3: [
          {
            title: '来自地区',
            key: 'area'
          },
          {
            title: '捐赠时间',
            key: 'dateDonated'
          },
          {
            title: 'Number of Web Hits',
            key: 'hits'
          }
        ],
        todos: [
          {
            id: 1,
            title: '来源:',
            info: 'Song Xi Chen, csx \'@\' gsm.pku.edu.cn, Guanghua School of Management, ' +
            'Center for Statistical Science, Peking University.'
          },
          {
            id: 4,
            title: '相关论文:',
            info: 'Liang, X., S. Li, S. Zhang, H. Huang, and S. X. Chen (2016), PM2.5 data reliability, ' +
            'consistency, and air quality assessment in five Chinese cities, J. Geophys. Res. Atmos., 121, 10220â€“10236.'
          },
        ],
        collection: {
          collectionId: '',
          collectionName: '',
          area: '',
          associatedTasks: [],
          attributeCharacteristics: [],
          dataSetCharacteristics: [],
          dataSetFolderPath: '',
          descriptions: [],
          isMissingValues: '',
          numberOfInstances: 0
        },
        dataSets: [],
        fileList: []
      };
    },
    methods: {
      async handleBeforeUpload(file) {
        //新建一个Form data 类型的文件
        let fd = new FormData();
        fd.append('file', file);
        //发起上传请求
        //生成一个上传进度查询key
        const uuid_v1 = require('uuid/v1');
        let progress_uuid = uuid_v1();
        let vm = this;
        addSet(this.collectionId, fd, progress_uuid).then((res) => {
          this.$message({
            message: '上传成功',
            type: 'info',
            duration: 1500
          });
          vm.uploadDialogVisible = false;
          vm.refreshDataSet();
        }).catch(error => {
          console.log(error);
        });
      },
      handleUploadSuccess(response, file, fileList) {
        this.uploadDialogVisible = false;
        this.$message({
          message: '上传成功',
          type: 'info',
          duration: 1500
        });
      },
      handleFileChange(file, fileList) {
        this.fileList = fileList;
      },
      handleFileRemove(file, fileList) {
        console.log(file, fileList);
      },
      handleFilePreview(file) {
        console.log(file.response);
      },
      beforeFileRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      submitUpload() {
        this.$refs.uploadDataSets.submit();
      },
      handleDownloadSetZip() {
        downloadSetZip(this.collectionId, this.checkedSetIds).then((res) => {
          const effectiveFileName = res.headers['x-suggested-filename'];
          FileSaver.saveAs(res.data, effectiveFileName);
        }).catch((res) => {
          console.error("Could not download the zip files from the backend.", res);
        });
      },
      handleSizeChange(val) {
        this.listQuery.size = val;
        this.getDataSets(this.collectionId);
      },
      handlePageChange(val) {
        this.listQuery.page = val - 1;
        this.getDataSets(this.collectionId);
      },
      checkedContainers() {
        let vm = this;
        let checkedContainers = [];
        this.checkedSetIds.forEach(c => {
          vm.dataSets.forEach(d => {
            if (d.containerId === c) {
              checkedContainers.push(d);
            }
          })
        });
        return checkedContainers;
      },
      handleDeleteSets() {
        let vm = this;
        this.$confirm('此操作将删除对应的数据集文件, 是否继续?', '确定删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteBatchDataSets(this.checkedSetIds).then(() => {
            vm.$message({
              message: '删除成功',
              type: 'success',
              duration: 1500
            });
            let checked = vm.checkedContainers();
            checked.forEach(s => {
              let index = vm.dataSets.indexOf(s);
              vm.dataSets.splice(index, 1);
            });
            vm.checkedSetIds = [];
          }).catch(error => {

          });
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: '取消删除'
          });
        });
      },
      refreshDataSet() {
        this.getDataSets(this.collectionId);
      },
      getCollectionById(collectionId) {
        let vm = this;
        this.loading = true;
        getCollection(collectionId).then(response => {
          vm.collection = response;
          vm.loading = false;
        }).catch(error => {
          console.log(error);
        })
      },
      getDataSets(collectionId) {
        let vm = this;
        vm.linkIndex = true;
        this.isDataSetRefresh = true;
        getSets(collectionId, Object.assign({}, this.listQuery)).then(res => {
          vm.dataSets = res.content;
          vm.totalSets = res.totalElements;
          this.isDataSetRefresh = false;
        })
      },
      downloadDataSet(containerId) {

      }
    },
    computed: {
      collectionName() {
        return this.collection.collectionName;
      },
      fixPage() {
        return this.listQuery.page + 1;
      },
      dataSetSizes() {
        var numeral = require('numeral');
        numeral.defaultFormat('0.00');
        return this.dataSets.map(d => {
          return numeral((d.size) / (1024 * 1024)).format() + ' MB';
        });
      },
      abstractInfo() {
        return this.collection.abstractInfo;
      },
      data1() {
        return [
          {
            dataSetChars: this.collection.dataSetCharacteristics.map(char => char.englishName).join(),
            attributeChars: this.collection.attributeCharacteristics.map(attr => attr.englishName).join(),
            associatedTasks: this.collection.associatedTasks.map(task => task.englishName).join()
          }
        ]
      },
      data2() {
        return [{
          instances: this.collection.numberOfInstances,
          enableMissing: this.collection.isMissingValues
        }]
      },
      data3() {
        return [
          {
            area: this.collection.area.englishName,
            dateDonated: this.collection.dateDonated,
            hits: 6558
          }
        ]
      },
    }
  };
</script>

<style scoped="scss">
  div{
    background-color:transparent;
    margin:0px auto;
    font-size:16px;
  }
  .dataSetTitle{
    margin-top: 20px;
    margin-bottom: 20px;
    font:bold 36px 微软雅黑;
  }
  .updown{
    margin-top: 20px;
    margin-bottom: 20px;
    font-size:16px;
  }
  .details-container{
    margin: 40px;
  }
  .title-font-style{
    font-weight:bold;
  }
  /*.data-set-file-container {*/
    /*margin-top: 40px;*/
  /*}*/
  .file-download-a{
    background: 0 0;
    font-style: italic;
    text-decoration: none;
    cursor: pointer;
    transition: color .2s ease;
  }

  .page-style{
    margin-top: 50px;
  }

  .file-alert{
    margin-top: 3px;
    border: 1px solid #d5e8fc;
    background-color: #eaf4fe;
  }
  .file-download-size{
    color: #ffac2d;
    position: absolute;
    right:10%;
  }
  .btn-download-sets{
    margin-left: 10px;
  }
  .checkbox-container{
    position: absolute;
    right: 0;
  }

  .data-set-file-spin-container{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    background-color: hsla(0,0%,100%,.9);
  }
  .dataSetCard{
    background-color: transparent;
    font-size:16px;
  }

  .list-complete-item {
    transition: all 1s;
    display: inline-block;
  }
  .list-complete-enter, .list-complete-leave-to
    /* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
</style>
