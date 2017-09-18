<template>
    <div id="app" class="app-container" >

      <div id="title">
        <Icon type="ios-cloud-upload-outline"></Icon>上传数据集
      </div>

      <!--<div id="line">-->
        <!--<img src="../../assets/line.png"/>-->
      <!--</div>-->

      <div id="upload">
        <Upload action="//jsonplaceholder.typicode.com/posts/">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传数据集</Button>
        </Upload>
      </div>


      <div id="form">
        <template>
          <h2 style="margin-bottom: 20px">上传描述信息：</h2>
          <Form :model="formItem" label-position="top" >
          <FormItem label="Abstract">
            <Input v-model="formItem.abstract" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
          </FormItem>
          <FormItem label="Data Set Characteristics">
            <CheckboxGroup v-model="formItem.characteristics">
              <Checkbox label="Multivariate"></Checkbox>
              <Checkbox label="Univariate"></Checkbox>
              <Checkbox label="Sequential"></Checkbox>
              <Checkbox label="Time-Series"></Checkbox>
              <Checkbox label="Text"></Checkbox>
              <Checkbox label="Domain-Theory"></Checkbox>
              <Checkbox label="Other"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="Attribute Characteristics">
            <CheckboxGroup v-model="formItem.attributeType">
              <Checkbox label="Categorical"></Checkbox>
              <Checkbox label="Integer"></Checkbox>
              <Checkbox label="Real"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="Associated Tasks">
            <CheckboxGroup v-model="formItem.associatedTasks">
              <Checkbox label="Classification"></Checkbox>
              <Checkbox label="Regression"></Checkbox>
              <Checkbox label="Clustering"></Checkbox>
              <Checkbox label="Other"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="Number of Instances">
            <Input v-model="formItem.instances" placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="Missing Values?">
            <RadioGroup v-model="formItem.enableMissing">
              <Radio label="yes">Yes</Radio>
              <Radio label="no">No</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="Area">
            <RadioGroup v-model="formItem.area">
              <Radio label="Life">Life</Radio>
              <Radio label="Physical">Physical</Radio>
              <Radio label="Computer">Computer</Radio>
              <Radio label="Social">Social</Radio>
              <Radio label="Financial">Financial</Radio>
              <Radio label="Business">Business</Radio>
              <Radio label="Game">Game</Radio>
              <Radio label="Other">Other</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="Date Donated">
            <Row>
              <Col span="10">
              <DatePicker type="date" placeholder="选择日期" v-model="formItem.dateDonated"></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <!--<FormItem label="Number of Web Hits">-->
            <!--<Input v-model="formItem.numOfWebHits" placeholder="请输入"></Input>-->
          <!--</FormItem>-->
          <!--<FormItem label="Source">-->
            <!--<Input v-model="formItem.source" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>-->
          <!--</FormItem>-->
          <!--<FormItem label="Data Set Information" >-->
            <!--<Input v-model="formItem.dataSetInfo" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>-->
          <!--</FormItem>-->
          <!--<FormItem label="Attribute Information" >-->
            <!--<Input v-model="formItem.attInfo" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>-->
          <!--</FormItem>-->
          <FormItem label="Relevant Papers" >
            <Input v-model="formItem.relevantePapers" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>
          </FormItem>
          <!--<FormItem label="Papers That Cite This Data Set" >-->
            <!--<Input v-model="formItem.papers" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>-->
          <!--</FormItem>-->
          <!--<FormItem label="Citation Request" >-->
            <!--<Input v-model="formItem.citation" type="textarea" :autosize="{minRows: 2,maxRows: 50}" placeholder="请输入..."></Input>-->
          <!--</FormItem>-->
          <FormItem id="title">
            <Button type="primary" v-model="formItem.submit">提交</Button>
            <Button type="ghost" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </template>
      </div>


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
                abstract: '',
                characteristics:[],
                attributeType:[],
                associatedTasks:[],
                instances:'',
                enableMissing:'',
                area:'',
                dateDonated: '',
 //               numOfWebHits:'',
//                source:'',
 //               dataSetInfo:'',
  //              attInfo:'',
                relevantePapers:'',
//                papers:'',
 //               citation:'',
   //             submit:''
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
  #title{
    width:20%;
    font:bold 36px 微软雅黑;
  }
  #line{
    width:58%;
  }
  #upload{
    width:12%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #form{
    width:50%;
    font-size:14px ;
  }
</style>
