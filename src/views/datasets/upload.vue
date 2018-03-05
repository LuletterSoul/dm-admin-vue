<template>
    <div id="app" class="app-container" >
      <div class="UploadTitle">
        <Icon type="ios-cloud-upload-outline"></Icon>数据集录入
      </div>
      <div class="step-upload">
        <Steps :current="currentStep">
          <Step title="数据集描述"></Step>
          <Step title="文件上传"></Step>
          <Step title="提交"></Step>
        </Steps>
      </div>
      <div class="upload">

      </div>
      <transition name="fade" >
        <template v-if="currentStep===0">
          <div class="form">
            <Form :model="collectionModel" label-position="top" class="font" :rules="ruleInline">
              <FormItem label="数据集名称" prop="collectionName">
                <Row>
                  <Col span="10">
                  <Input v-model="collectionModel.collectionName" placeholder="请输入"></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="描述摘要" >
                <Input v-model="collectionModel.abstractInfo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
              </FormItem>
              <FormItem label="数据特征" prop="dataSetChars">
                <CheckboxGroup v-model="collectionModel.dataSetCharIds" >
                  <transition-group name="list">
                    <Checkbox style="font-size: 16px;" v-for="item in dataSetCharOptions" :key="item.charId" :label="item.charId">
                      {{ item.englishName }}-{{ item.chineseName }}
                    </Checkbox>
                  </transition-group>
                </CheckboxGroup>
              </FormItem>

              <FormItem label="属性类型" prop="attributeCharIds">
                <CheckboxGroup v-model="collectionModel.attributeCharIds">
                  <transition-group name="list">
                    <Checkbox style="font-size: 16px;" v-for="item in attrCharOptions" :key="item.charId" :label="item.charId">
                      {{ item.englishName }}-{{ item.chineseName }}
                    </Checkbox>
                  </transition-group>
                  <!--<Checkbox style="font-size: 16px;" label="Categorical"></Checkbox>-->
                  <!--<Checkbox style="font-size: 16px;" label="Integer"></Checkbox>-->
                  <!--<Checkbox style="font-size: 16px;" label="Real"></Checkbox>-->
                </CheckboxGroup>
              </FormItem>
              <FormItem label="相关任务" prop="associatedTaskIds">
                <CheckboxGroup v-model="collectionModel.associatedTaskIds">
                  <transition-group name="list">
                    <Checkbox style="font-size: 16px;" v-for="item in associatedTaskOptions" :key="item.typeId" :label="item.typeId">
                      {{ item.englishName }}-{{ item.chineseName }}
                    </Checkbox>
                  </transition-group>
                  <!--<Checkbox style="font-size: 16px;" label="Classification"></Checkbox>-->
                  <!--<Checkbox style="font-size: 16px;" label="Regression"></Checkbox>-->
                  <!--<Checkbox style="font-size: 16px;" label="Clustering"></Checkbox>-->
                  <!--<Checkbox style="font-size: 16px;" label="Other"></Checkbox>-->
                </CheckboxGroup>
              </FormItem>
              <FormItem label="实例数">
                <Row>
                  <Col span="10">
                  <Input v-model="collectionModel.numberOfInstances" placeholder="请输入"></Input>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="允许缺省?">
                <RadioGroup v-model="collectionModel.isMissingValues">
                  <Radio style="font-size: 16px;" label="true">
                    <Icon type="checkmark"></Icon>
                    <span>Yes</span>
                  </Radio>
                  <Radio style="font-size: 16px;" label="false">
                    <Icon type="close-round"></Icon>
                    <span>No</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="来自地区" prop="areaId">
                <RadioGroup v-model="collectionModel.areaId">
                  <transition-group name="list">
                    <Radio v-for="item in areaTypeOptions" :label="item.areaId" :key="item.areaId" style="font-size: 16px;">
                      {{ item.chineseName }}
                    </Radio>
                  </transition-group>
                </RadioGroup>
              </FormItem>
              <FormItem label="捐赠时间">
                <Row>
                  <Col span="10">
                  <DatePicker type="date" placeholder="选择日期" v-model="rowDonatedDate" value="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              <FormItem label="访问量">
                <Input v-model="collectionModel.hits" placeholder="请输入"></Input>
              </FormItem>
              <FormItem label="相关论文" >
                <Input v-model="collectionModel.relevantPapers" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>
              </FormItem>
            </Form>
          </div>
        </template>
      </transition>
      <transition name="fade">
        <template v-if="currentStep===1">
          <template>
            <div class="form">
              <Form ref="formDynamic" :model="formDynamic" :label-width="80" label-position="top">
                <FormItem
                  v-for="(item, index) in formDynamic.items"
                  :key="index"
                  :label="'文件描述' + (index + 1)"
                  :prop="'items.' + index + '.value'"
                  :rules="{required: true, message: '项目' + (index + 1) +'不能为空', trigger: 'blur'}">
                  <Form label-position="left" >
                    <FormItem label="文件名" >
                      <Row>
                        <Col span="12">
                        <Input type="text" style="font-size: 14px;" v-model="item.value"
                               :placeholder="files[index] === undefined ? '请输入' :files[index].name" >
                        </Input>
                        </Col>
                        <Col span="2" offset="1">
                        <Button type="ghost" style="font-size: 14px" @click="handleFileRemove(index,files[index])">删除</Button>
                        </Col>
                        <Col span="4">
                        <Upload
                          ref="setUpload"
                          :before-upload="handleUpload"
                          :show-upload-list="false"
                          action="">
                          <Button type="ghost" style="font-size: 14px"  icon="ios-cloud-upload-outline">选择要上传的数据集</Button>
                        </Upload>
                        </Col>
                      </Row>
                      <Row>
                        <Col span="24">
                        <div style="margin-left: 20px" v-if="files[index] !== null&&files[index]!==undefined">
                          <Icon type="clipboard"></Icon>
                          <span>
                            {{ files[index].name }}
                          </span>
                          <!--<Button type="text"-->
                          <!--@click="upload"-->
                          <!--:loading="loadingStatus">-->
                          <!--{{ loadingStatus ? '上传中' : '点击上传' }}</Button>-->
                        </div>
                        </Col>
                      </Row>
                    </FormItem >
                    <FormItem   label="备注" style="margin-top: 10px">
                      <Row>
                        <Col span="12">
                        <Input style="font-size: 16px" type="text" v-model="item.fileDescription" placeholder="请输入..."/>
                        </Col>
                      </Row>
                    </FormItem>
                  </Form>
                </FormItem>
                <FormItem  style="margin-top: 10px">
                  <Row>
                    <Col span="12">
                    <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
                    </Col>
                  </Row>
                </FormItem>
              </Form>
            </div>
          </template>
        </template>
      </transition>
      <transition name ="fade">
        <data-set v-if="currentStep===2" :data-set="dataSetInfo">
        </data-set>
      </transition>
      <template>
        <Form>
          <FormItem  v-if="currentStep!==2" style="margin-left: 540px">
            <!--<Button style="font-size: 16px;" type="success" v-waves @click="handleUploadSubmit">一键上传</Button>-->
            <Button style="font-size: 16px;" type="primary" v-waves @click="pre">上一步</Button>
            <Button style="font-size: 16px;" type="primary" v-waves @click="next">下一步</Button>
            <Button type="ghost" style="font-size: 16px;">取消</Button>
          </FormItem>
            <FormItem v-if="currentStep===2" style="width: 540px;">
              <Button :loading="uploadWaiting" type="success" style="margin-top: 20px" size="large" waves long @click="handleUploadSubmit">确认录入</Button>
              <Button style="margin-top: 10px" type="ghost" size="large" long @click="currentStep-=1">上一步</Button>
            </FormItem>
        </Form>
      </template>
  </div>
</template>

<script type="text/javascript">
    import ElCol from "element-ui/packages/col/src/col";
    import DataSet from "./detail.vue";
    import {formatDate} from '@/utils/compute';
    import {
      fetchOptions,
      fetchOptionalTaskTypes,
      fetchOptionaAttributeTypes,
      fetchOptionalCollectionChars,
      fetchDataCollectionList,
      deleteCollection,
      createCollection,
      updateCollection,
      addSet,
      deleteCollectionsBatch,
      getDataSetContainer,
      getRelFilePath,
      createDataSetContainer,
      uploadDataSetContainer,
      downloadContianerFile,
      updateDataSetContainer,
      deleteDataSetContainer,
      deleteBatchDataSetContainers
    } from 'api/datasets';
    export default {
      components: {
        DataSet,
        ElCol},
      name: 'app',
        data() {
          return {
            uploadWaiting: false,
            ruleInline: {
              collectionName: [
                {required: true, message: '请填写数据集名', trigger: 'blur'}
              ],
              dataSetCharIds: [
                {required: true, message: '至少选择一个数据特征', trigger: 'blur'}
              ],
              associatedTaskIds: [
                {required: true, message: '至少选择一个任务类型', trigger: 'blur'}
              ],
              attributeCharIds: [
                {required: true, message: '至少选择一个属性类型', trigger: 'blur'}],
              areaId:
                [{required: true, message: '请选择主题地区', trigger: 'blur'}]
            },
            loadingStatus: false,
            files: [],
            formDynamic: {
              items: [
                {
                  file: null,
                  fileDescription: ''
                }
              ],
            },
            currentStep: 0,
            rowDonatedDate:new Date(),
            collectionId:'',
            collectionModel: {
              collectionName: 'Parkinson Disease Spiral Drawings Using Digitized Graphics Tablet Data Set ',
              abstractInfo: 'For Further information about the variables see the file in the data folder.',
              numberOfInstances: 0,
              isMissingValues: 'Yes',
              areaId: 0,
              dateDonated:"",
              hits: 0,
              relevantPapers: 'Liang, X., S. Li, S. Zhang, H. Huang, and S. X. Chen (2016), PM2.5 data reliability, consistency, and air quality assessment in five Chinese cities, J. Geophys. Res. Atmos., 121, 10220â€“10236, [Web Link].\n' +
              '\n',
              dataSetCharIds: [0],
              associatedTaskIds: [0],
              attributeCharIds: [0],
              containerIds: []
            },
            associatedTaskOptions: [],
            areaTypeOptions: [],
            dataSetCharOptions: [],
            attrCharOptions: [],
          };
        },
      created() {
        this.fetchOptionals();
      },
      mounted () {
      },
      computed:{
        dataSetInfo(){
          return {
            collectionName: this.collectionModel.collectionName,
            abstractInfo: this.collectionModel.abstractInfo,
            instances: this.collectionModel.numberOfInstances,
            enableMissing: this.collectionModel.isMissingValues,
            areaId: this.collectionModel.areaId,
            dateDonated: this.rowDonatedDate,
            hits: this.collectionModel.hits,
            relevantPapers: this.collectionModel.relevantPapers,
            dataSetChars: this.collectionModel.dataSetCharIds.map(id => {
              for (let i = 0; i < this.dataSetCharOptions.length; ++i) {
                if (id === this.dataSetCharOptions[i].charId)
                  return this.dataSetCharOptions[i];
              }
            }),
            associatedTasks: this.collectionModel.associatedTaskIds.map(id => {
              for (let i = 0; i < this.associatedTaskOptions.length; ++i) {
                if (id === this.associatedTaskOptions[i].typeId)
                  return this.associatedTaskOptions[i];
              }
            }),
            attributeChars: this.collectionModel.attributeCharIds.map(id => {
              for (let i = 0; i < this.attrCharOptions.length; ++i) {
                if (id === this.attrCharOptions[i].charId)
                  return this.attrCharOptions[i];
              }
            }),
            area: this.areaTypeOptions[this.collectionModel.areaId]
          };
        }
      },
      methods:{
        async handleUploadSubmit(){
          let collection = await createCollection(this.collectionModel);
          //更新已创建容器的Id
          this.collectionId = collection.collectionId;
          this.files.forEach(this.handlePerFile);
          this.createCollectionAfter();
        },
        async handlePerFile(file) {
          let vm = this;
          //新建一个Form data 类型的文件
          let fd = new FormData();
          fd.append('file', file);
          //发起上传请求
          //生成一个上传进度查询key
          const uuid_v1 = require('uuid/v1');
          let progress_uuid = uuid_v1();
          addSet(this.collectionId, fd,progress_uuid).then((res) => {
          }).catch(error => {
            console.log(error);
          });
        },
        async handleUpload(file) {
          this.files.push(file);
        },
        handleReset (name) {
          this.$refs[name].resetFields();
        },
        handleAdd () {
          this.formDynamic.items.push({
            value: ''
          });
        },
        handleFileRemove (index, file) {
          this.files.splice(file, 1);
          this.formDynamic.items.splice(index, 1);
        },
        handleCreate() {
          this.handleUploadSubmit();
        },
        formatDonatedDate: function () {
          this.collectionModel.dateDonated = formatDate(this.rowDonatedDate, 'yyyy-MM-dd HH:mm:ss');
        },
        createCollectionAfter(){
          let vm = this;
          this.$message({
            message: '上传成功',
            type: 'info',
            duration: 1500
          });
          vm.$router.push({path: '/collection/digest'});
        },
        next () {
          if (this.currentStep === 2) {
            this.currentStep = 0;
          } else {
            this.currentStep += 1;
          }
        },
        pre(){
          if(this.currentStep!==0) {
            this.currentStep -= 1;
          }
        },
        fetchOptionals() {
          fetchOptions().then(response =>{
            this.dataSetCharOptions = response.dataSetCharOptions;
            this.associatedTaskOptions = response.associatedTaskOptions;
            this.attrCharOptions = response.attrCharOptions;
            this.areaTypeOptions = response.areaTypeOptions;
          }).catch(error =>{
            console.error(error);
          })
        }
      },
      components:{
        DataSet
      }
    }
</script>

<style>
  div{
    background-color:transparent;
    margin:0px auto;
  }
  .UploadTitle{
    margin-top: 20px;
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  .upload{
    width:12%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .form{
    width:80%;
  }
  .font.ivu-form .ivu-form-item-label{
    font-size:16px;
    font-weight:bold;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(-30px);
  }

  .step-upload{
    margin-left: 200px;
    margin-bottom: 20px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
