<template>
    <div id="app" class="app-container" >

      <div class="UploadTitle">
        <Icon type="ios-cloud-upload-outline"></Icon>上传数据集
      </div>


      <div class="upload">
        <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传数据集</Button>
        </Upload>
      </div>


        <template>
          <div class="form">
          <Form :model="formItem" label-position="top" class="font">
            <FormItem label="数据集名称" >
              <Row>
                <Col span="10">
                  <Input v-model="formItem.collectionName" placeholder="请输入"></Input>
                </Col>
              </Row>
            </FormItem>
            <FormItem label="描述摘要" >
              <Input v-model="formItem.abstractInfo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
            </FormItem>
          <FormItem label="数据特征">
            <CheckboxGroup v-model="formItem.characteristics" >
              <Checkbox style="font-size: 16px;" label="Multivariate">Multivariate</Checkbox>
              <Checkbox style="font-size: 16px;" label="Univariate">Univariate</Checkbox>
              <Checkbox style="font-size: 16px;" label="Sequential">Sequential</Checkbox>
              <Checkbox style="font-size: 16px;" label="Time-Series">Time-Series</Checkbox>
              <Checkbox style="font-size: 16px;" label="Text">Text</Checkbox>
              <Checkbox style="font-size: 16px;" label="Domain-Theory">Domain-Theory</Checkbox>
              <Checkbox style="font-size: 16px;" label="Other">Other</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="属性类型">
            <CheckboxGroup v-model="formItem.attributeTypes">
              <Checkbox style="font-size: 16px;" label="Categorical"></Checkbox>
              <Checkbox style="font-size: 16px;" label="Integer"></Checkbox>
              <Checkbox style="font-size: 16px;" label="Real"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="相关任务">
            <CheckboxGroup v-model="formItem.associatedTasks">
              <Checkbox style="font-size: 16px;" label="Classification"></Checkbox>
              <Checkbox style="font-size: 16px;" label="Regression"></Checkbox>
              <Checkbox style="font-size: 16px;" label="Clustering"></Checkbox>
              <Checkbox style="font-size: 16px;" label="Other"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="实例数">
            <Row>
              <Col span="10">
                <Input v-model="formItem.instances" placeholder="请输入"></Input>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="允许缺省?">
            <RadioGroup v-model="formItem.enableMissing">
              <Radio style="font-size: 16px;" label="yes">Yes</Radio>
              <Radio style="font-size: 16px;" label="no">No</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="来自地区">
            <RadioGroup v-model="formItem.area">
              <Radio style="font-size: 16px;" label="Life">Life</Radio>
              <Radio style="font-size: 16px;" label="Physical">Physical</Radio>
              <Radio style="font-size: 16px;" label="Computer">Computer</Radio>
              <Radio style="font-size: 16px;" label="Social">Social</Radio>
              <Radio style="font-size: 16px;" label="Financial">Financial</Radio>
              <Radio style="font-size: 16px;" label="Business">Business</Radio>
              <Radio style="font-size: 16px;" label="Game">Game</Radio>
              <Radio style="font-size: 16px;" label="Other">Other</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="捐赠时间">
            <Row>
              <Col span="10">
              <DatePicker :type="date" placeholder="选择日期" v-model="formItem.dateDonated"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="Number of Web Hits">
            <Input v-model="formItem.hit" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="相关论文" >
            <Input v-model="formItem.relevantPapers" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem class="title">
            <Button style="font-size: 16px;" type="primary" v-model="formItem.submit">提交</Button>
            <Button type="ghost" style="margin-left: 8px;font-size: 16px;">取消</Button>
          </FormItem>
        </Form>
          </div>
      </template>



  </div>
</template>

<script type="text/javascript">
    import ElCol from "element-ui/packages/col/src/col";

    export default {
      components: {ElCol},
      name: 'app',
        data() {
            return {
              formItem: {
                collectionName:'',
                abstractInfo: '',
                characteristics:[],
                attributeTypes:[],
                associatedTasks:[],
                instances:'',
                enableMissing:'',
                area:'',
                dateDonated: new Date(),
                hits:0,
                relevantPapers:'',
                submit:''
              },
              missingMap:{
                "yes":true,
                "no":false
              }
            }
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
</style>
