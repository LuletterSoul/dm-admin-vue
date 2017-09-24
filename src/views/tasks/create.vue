<template>
  <div class="page">

    <div class="title">
      <i class="el-icon-upload2"></i>新建任务
    </div>

    <div>
      <div class="form1">
        <el-form ref="form" :label-position="labelPosition" :model="temp" >
        <el-form-item label="任务编号">
          <el-input style="width: 200px;" v-model="temp.taskId">
          </el-input>
        </el-form-item>

        <el-form-item
          v-for="(domain, index) in domains"
          :key="domain.key"
          :prop="'domains.' + index + '.value'"
          :label="'选择数据集' + index">
          <el-cascader
            :options="dataSetOptions"
            v-model="domain.value"
            @change="handleChange">
          </el-cascader>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
          <el-button @click="addDomain" class="add">关联数据集</el-button>


        <el-form-item label="选择算法">
          <el-select style="width: 450px;" v-model="temp.algorithmId" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="开始时间">
           <el-date-picker type="date" placeholder="选择日期" v-model="temp.startTime">
           </el-date-picker>
        </el-form-item>

        <el-form-item label="截止时间">
          <el-date-picker type="date" placeholder="选择日期" v-model="temp.finishTime">
          </el-date-picker>
        </el-form-item>


        <el-form-item class="button">
          <el-button type="primary" @click="create">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'app',
    data () {
      return {
        labelPosition: 'top',
        options: [{
          value: '选项1',
          label: '01'
        }, {
          value: '选项2',
          label: '02'
        }, {
          value: '选项3',
          label: '03'
        }, {
          value: '选项4',
          label: '04'
        }, {
          value: '选项5',
          label: '05'
        }
        ],
        temp: {
          taskId: '',
          selectionId: [],
          algorithmId: [],
          startTime: '',
          finishTime: ''
        },
        dataSetOptions: [{
          value: 'characteristics',
          label: '数据特征',
          children: [{
            value: 'Multivariate',
            label: '多变量',
            children: [{
              value: 'lalalal',
              label: '一致数据集'
            }, {
              value: 'fankui',
              label: '反馈数据集'
            }, {
              value: 'xiaolv',
              label: '效率数据集'
            }]
          },
            {
              value: 'Univariate',
              label: '单变量',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Sequential',
              label: '按序',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Time-Series',
              label: '时序',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Text',
              label: '文本',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Domain-Theory',
              label: '畴理论',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }
          ]
        }, {
          value: 'attributeTypes',
          label: '属性类型',
          children: [{
            value: 'Categorical',
            label: '分类的',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }]
          }, {
            value: 'Integer',
            label: '整型',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }]
          }, {
            value: 'Real',
            label: '实数',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }]
          }]
        }, {
          value: 'associatedTasks',
          label: '相关任务',
          children: [{
            value: 'Classification',
            label: '分类',
            children: [{
              value: 'lalalal',
              label: '一致数据集'
            }, {
              value: 'fankui',
              label: '反馈数据集'
            }, {
              value: 'xiaolv',
              label: '效率数据集'
            }]
          },
            {
              value: 'Regression',
              label: '回归',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Clustering',
              label: '聚类',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            },
            {
              value: 'Other',
              label: '其他',
              children: [{
                value: 'cexiangdaohang',
                label: '侧向导航'
              }, {
                value: 'dingbudaohang',
                label: '顶部导航'
              }]
            }
          ]}
        ],
        domains: [{
          value: ''
        }],
      };
    },
    methods:{
      create() {
        createTask(this.temp).then(response => {
          let message = response.message;
          this.$message({
            message:message,
            type:'success',
            duration:1500
          });
          this.taskList.unshift(this.temp);
        });
      },
      removeDomain(item) {
        var index = this.domains.indexOf(item)
        if (index !== -1) {
          this.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
  }
</script>

<style>
  .title{
    margin-bottom: 20px;
    width:20%;
    font:bold 36px 微软雅黑;
  }
  div{
    background-color:transparent;
    margin:0px auto;
  }
  .form1{
    width: 50%;
    height: 100%;
    padding: 30px;
  }
  .page{
    padding:20px;
  }
  .button{
    clear: both;
    margin-top: 40px;
    margin-bottom: 20px;
    width:40%;
  }
  .add{
    position:absolute;
    top:275px;
    left:862px;
  }
</style>
