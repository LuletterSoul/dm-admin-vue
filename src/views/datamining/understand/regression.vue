<template>
  <div>
    <el-row>
      <full-page ref="fullpage" :options="pageOptions">
        <div class="section">
          <el-row style="margin-top: 20px">
            <el-col :offset="17" :span="3">
              <el-select size="medium"
                         clearable
                         v-model="xName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select size="medium"
                         clearable
                         v-model="yName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col>
              <scatter :option="_linearOption">

              </scatter>
            </el-col>
          </el-row>
        </div>
        <div class="section">
          <el-row style="margin-top: 20px">
            <el-col :offset="17" :span="3">
              <el-select size="medium"
                         clearable
                         v-model="xName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select size="medium"
                         clearable
                         v-model="yName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col>
              <scatter :height="'940px'" :option="_expOption">
              </scatter>
            </el-col>
          </el-row>
        </div>
        <div class="section">
          <el-row style="margin-top: 20px">
            <el-col :offset="17" :span="3">
              <el-select size="medium"
                         clearable
                         v-model="xName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-select size="medium"
                         clearable
                         v-model="yName"
                         placeholder="排序">
                <el-option v-for="item in xOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row style="margin-top: 20px">
            <el-col>
              <scatter :height="'940px'" :option="_logOption">
              </scatter>
            </el-col>
          </el-row>
        </div>
      </full-page>
    </el-row>

  </div>
</template>

<script>
  import Scatter from '@/components/Charts/scatter'
  import EchartStat from 'echarts-stat'
  import echarts from 'echarts';

  export default {
    name: "regression",
    components: {
      Scatter
    },
    props: {
      setName: {
        type: String,
        default: 'Linear Regression'
      }
    },
    data() {
      return {
        xOptions: [{
          key: '1',
          label: '1',
        },
          {
            key: '2',
            label: '2',
          },
          {
            key: '3',
            label: '3',
          },
          {
            key: '4',
            label: '4',
          }],
        yOptions: [{
          key: '1',
          label: '1',
        },
          {
            key: '2',
            label: '2',
          },
          {
            key: '3',
            label: '3',
          },
          {
            key: '4',
            label: '4',
          }],
        pageOptions: {
          licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
          menu: true,
          navigation: true,
        },
        xName: 'x属性',
        yName: 'y属性',
        logData1: [
          [28604, 77, 17096869, 'Australia', 1990],
          [31163, 77.4, 27662440, 'Canada', 1990],
          [1516, 68, 1154605773, 'China', 1990],
          [13670, 74.7, 10582082, 'Cuba', 1990],
          [28599, 75, 4986705, 'Finland', 1990],
          [29476, 77.1, 56943299, 'France', 1990],
          [31476, 75.4, 78958237, 'Germany', 1990],
          [28666, 78.1, 254830, 'Iceland', 1990],
          [1777, 57.7, 870601776, 'India', 1990],
          [29550, 79.1, 122249285, 'Japan', 1990],
          [2076, 67.9, 20194354, 'North Korea', 1990],
          [12087, 72, 42972254, 'South Korea', 1990],
          [24021, 75.4, 3397534, 'New Zealand', 1990],
          [43296, 76.8, 4240375, 'Norway', 1990],
          [10088, 70.8, 38195258, 'Poland', 1990],
          [19349, 69.6, 147568552, 'Russia', 1990],
          [10670, 67.3, 53994605, 'Turkey', 1990],
          [26424, 75.7, 57110117, 'United Kingdom', 1990],
          [37062, 75.4, 252847810, 'United States', 1990]
        ],
        logData2: [
          [44056, 81.8, 23968973, 'Australia', 2015],
          [43294, 81.7, 35939927, 'Canada', 2015],
          [13334, 76.9, 1376048943, 'China', 2015],
          [21291, 78.5, 11389562, 'Cuba', 2015],
          [38923, 80.8, 5503457, 'Finland', 2015],
          [37599, 81.9, 64395345, 'France', 2015],
          [44053, 81.1, 80688545, 'Germany', 2015],
          [42182, 82.8, 329425, 'Iceland', 2015],
          [5903, 66.8, 1311050527, 'India', 2015],
          [36162, 83.5, 126573481, 'Japan', 2015],
          [1390, 71.4, 25155317, 'North Korea', 2015],
          [34644, 80.7, 50293439, 'South Korea', 2015],
          [34186, 80.6, 4528526, 'New Zealand', 2015],
          [64304, 81.6, 5210967, 'Norway', 2015],
          [24787, 77.3, 38611794, 'Poland', 2015],
          [23038, 73.13, 143456918, 'Russia', 2015],
          [19360, 76.5, 78665830, 'Turkey', 2015],
          [38225, 81.4, 64715810, 'United Kingdom', 2015],
          [53354, 79.1, 321773631, 'United States', 2015]
        ],
        logData: [
          [28604, 77],
          [31163, 77.4],
          [1516, 68],
          [13670, 74.7],
          [28599, 75],
          [29476, 77.1],
          [31476, 75.4],
          [28666, 78.1],
          [1777, 57.7],
          [29550, 79.1],
          [2076, 67.9],
          [12087, 72],
          [24021, 75.4],
          [43296, 76.8],
          [10088, 70.8],
          [19349, 69.6],
          [10670, 67.3],
          [26424, 75.7],
          [37062, 75.4],
          [44056, 81.8],
          [43294, 81.7],
          [13334, 76.9],
          [21291, 78.5],
          [38923, 80.8],
          [37599, 81.9],
          [44053, 81.1],
          [42182, 82.8],
          [5903, 66.8],
          [36162, 83.5],
          [1390, 71.4],
          [34644, 80.7],
          [34186, 80.6],
          [64304, 81.6],
          [24787, 77.3],
          [23038, 73.13],
          [19360, 76.5],
          [38225, 81.4],
          [53354, 79.1]
        ],
        linearData: [
          [0.067732, 3.176513],
          [0.42781, 3.816464],
          [0.995731, 4.550095],
          [0.738336, 4.256571],
          [0.981083, 4.560815],
          [0.526171, 3.929515],
          [0.378887, 3.52617],
          [0.033859, 3.156393],
          [0.132791, 3.110301],
          [0.138306, 3.149813],
          [0.247809, 3.476346],
          [0.64827, 4.119688],
          [0.731209, 4.282233],
          [0.236833, 3.486582],
          [0.969788, 4.655492],
          [0.607492, 3.965162],
          [0.358622, 3.5149],
          [0.147846, 3.125947],
          [0.63782, 4.094115],
          [0.230372, 3.476039],
          [0.070237, 3.21061],
          [0.067154, 3.190612],
          [0.925577, 4.631504],
          [0.717733, 4.29589],
          [0.015371, 3.085028],
          [0.33507, 3.44808],
          [0.040486, 3.16744],
          [0.212575, 3.364266],
          [0.617218, 3.993482],
          [0.541196, 3.891471],
          [0.045353, 3.143259],
          [0.126762, 3.114204],
          [0.556486, 3.851484],
          [0.901144, 4.621899],
          [0.958476, 4.580768],
          [0.274561, 3.620992],
          [0.394396, 3.580501],
          [0.87248, 4.618706],
          [0.409932, 3.676867],
          [0.908969, 4.641845],
          [0.166819, 3.175939],
          [0.665016, 4.26498],
          [0.263727, 3.558448],
          [0.231214, 3.436632],
          [0.552928, 3.831052],
          [0.047744, 3.182853],
          [0.365746, 3.498906],
          [0.495002, 3.946833],
          [0.493466, 3.900583],
          [0.792101, 4.238522],
          [0.76966, 4.23308],
          [0.251821, 3.521557],
          [0.181951, 3.203344],
          [0.808177, 4.278105],
          [0.334116, 3.555705],
          [0.33863, 3.502661],
          [0.452584, 3.859776],
          [0.69477, 4.275956],
          [0.590902, 3.916191],
          [0.307928, 3.587961],
          [0.148364, 3.183004],
          [0.70218, 4.225236],
          [0.721544, 4.231083],
          [0.666886, 4.240544],
          [0.124931, 3.222372],
          [0.618286, 4.021445],
          [0.381086, 3.567479],
          [0.385643, 3.56258],
          [0.777175, 4.262059],
          [0.116089, 3.208813],
          [0.115487, 3.169825],
          [0.66351, 4.193949],
          [0.254884, 3.491678],
          [0.993888, 4.533306],
          [0.295434, 3.550108],
          [0.952523, 4.636427],
          [0.307047, 3.557078],
          [0.277261, 3.552874],
          [0.279101, 3.494159],
          [0.175724, 3.206828],
          [0.156383, 3.195266],
          [0.733165, 4.221292],
          [0.848142, 4.413372],
          [0.771184, 4.184347],
          [0.429492, 3.742878],
          [0.162176, 3.201878],
          [0.917064, 4.648964],
          [0.315044, 3.510117],
          [0.201473, 3.274434],
          [0.297038, 3.579622],
          [0.336647, 3.489244],
          [0.666109, 4.237386],
          [0.583888, 3.913749],
          [0.085031, 3.22899],
          [0.687006, 4.286286],
          [0.949655, 4.628614],
          [0.189912, 3.239536],
          [0.844027, 4.457997],
          [0.333288, 3.513384],
          [0.427035, 3.729674],
          [0.466369, 3.834274],
          [0.550659, 3.811155],
          [0.278213, 3.598316],
          [0.918769, 4.692514],
          [0.886555, 4.604859],
          [0.569488, 3.864912],
          [0.066379, 3.184236],
          [0.335751, 3.500796],
          [0.426863, 3.743365],
          [0.395746, 3.622905],
          [0.694221, 4.310796],
          [0.27276, 3.583357],
          [0.503495, 3.901852],
          [0.067119, 3.233521],
          [0.038326, 3.105266],
          [0.599122, 3.865544],
          [0.947054, 4.628625],
          [0.671279, 4.231213],
          [0.434811, 3.791149],
          [0.509381, 3.968271],
          [0.749442, 4.25391],
          [0.058014, 3.19471],
          [0.482978, 3.996503],
          [0.466776, 3.904358],
          [0.357767, 3.503976],
          [0.949123, 4.557545],
          [0.41732, 3.699876],
          [0.920461, 4.613614],
          [0.156433, 3.140401],
          [0.656662, 4.206717],
          [0.616418, 3.969524],
          [0.853428, 4.476096],
          [0.133295, 3.136528],
          [0.693007, 4.279071],
          [0.178449, 3.200603],
          [0.199526, 3.299012],
          [0.073224, 3.209873],
          [0.286515, 3.632942],
          [0.182026, 3.248361],
          [0.621523, 3.995783],
          [0.344584, 3.563262],
          [0.398556, 3.649712],
          [0.480369, 3.951845],
          [0.15335, 3.145031],
          [0.171846, 3.181577],
          [0.867082, 4.637087],
          [0.223855, 3.404964],
          [0.528301, 3.873188],
          [0.890192, 4.633648],
          [0.106352, 3.154768],
          [0.917886, 4.623637],
          [0.014855, 3.078132],
          [0.567682, 3.913596],
          [0.068854, 3.221817],
          [0.603535, 3.938071],
          [0.53205, 3.880822],
          [0.651362, 4.176436],
          [0.901225, 4.648161],
          [0.204337, 3.332312],
          [0.696081, 4.240614],
          [0.963924, 4.532224],
          [0.98139, 4.557105],
          [0.987911, 4.610072],
          [0.990947, 4.636569],
          [0.736021, 4.229813],
          [0.253574, 3.50086],
          [0.674722, 4.245514],
          [0.939368, 4.605182],
          [0.235419, 3.45434],
          [0.110521, 3.180775],
          [0.218023, 3.38082],
          [0.869778, 4.56502],
          [0.19683, 3.279973],
          [0.958178, 4.554241],
          [0.972673, 4.63352],
          [0.745797, 4.281037],
          [0.445674, 3.844426],
          [0.470557, 3.891601],
          [0.549236, 3.849728],
          [0.335691, 3.492215],
          [0.884739, 4.592374],
          [0.918916, 4.632025],
          [0.441815, 3.75675],
          [0.116598, 3.133555],
          [0.359274, 3.567919],
          [0.814811, 4.363382],
          [0.387125, 3.560165],
          [0.982243, 4.564305],
          [0.78088, 4.215055],
          [0.652565, 4.174999],
          [0.87003, 4.58664],
          [0.604755, 3.960008],
          [0.255212, 3.529963],
          [0.730546, 4.213412],
          [0.493829, 3.908685],
          [0.257017, 3.585821],
          [0.833735, 4.374394],
          [0.070095, 3.213817],
          [0.52707, 3.952681],
          [0.116163, 3.129283]
        ],
        expData: [
          [1, 4862.4],
          [2, 5294.7],
          [3, 5934.5],
          [4, 7171.0],
          [5, 8964.4],
          [6, 10202.2],
          [7, 11962.5],
          [8, 14928.3],
          [9, 16909.2],
          [10, 18547.9],
          [11, 21617.8],
          [12, 26638.1],
          [13, 34634.4],
          [14, 46759.4],
          [15, 58478.1],
          [16, 67884.6],
          [17, 74462.6],
          [18, 79395.7]
        ]
      }
    },
    methods: {},
    computed: {
      _linearReg() {
        let regression = EchartStat.regression('linear', this.linearData);
        regression.points.sort(function (a, b) {
          return a[0] - b[0];
        });
        return regression;
      },
      _expReg() {
        let regression = EchartStat.regression('exponential', this.expData);
        regression.points.sort(function (a, b) {
          return a[0] - b[0];
        });
        return regression;
      },
      _logReg() {
        return EchartStat.regression('logarithmic',this.logData);
      },
      _expOption() {
        return {
          title: {
            text: '1981 - 1998 gross domestic product GDP (trillion yuan)',
            left: 'center',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            splitNumber: 20
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          series: [{
            name: 'scatter',
            type: 'scatter',
            label: {
              emphasis: {
                show: true
              }
            },
            data: this.expData
          }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: this._expReg.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  formatter: this._expReg.expression,
                  textStyle: {
                    color: '#333',
                    fontSize: 14
                  }
                }
              },
              data: [{
                coord: this._expReg.points[this._expReg.points.length - 1]
              }]
            }
          }]
        }
      },
      _linearOption() {
        return {
          title: {
            text: this.setName,
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'value',
            name: this.xName,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          yAxis: {
            type: 'value',
            min: 1.5,
            name: this.yName,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          series: [{
            name: 'scatter',
            type: 'scatter',
            label: {
              emphasis: {
                show: true,
                position: 'left',
                textStyle: {
                  color: 'blue',
                  fontSize: 16
                }
              }
            },
            data: this.linearData
          }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: this._linearReg.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  formatter: this._linearReg.expression,
                  textStyle: {
                    color: '#333',
                    fontSize: 14
                  }
                }
              },
              data: [{
                coord: this._linearReg.points[this._linearReg.points.length - 1]
              }]
            }
          }]
        }
      },
      _logOption() {
        return {
          legend: {
            data: ['1990', '2015']
          },
          title: {
            text: '1990 and 2015 per capita life expectancy and GDP'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          xAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          yAxis: {
            type: 'value',
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
          },
          series: [{
            name: '1990',
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(120, 36, 50, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgb(251, 118, 123)'
                }, {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }])
              }
            },
            data: this.logData1
          }, {
            name: '2015',
            type: 'scatter',
            symbolSize: function (data) {
              return Math.sqrt(data[2]) / 5e2;
            },
            label: {
              emphasis: {
                show: true,
                formatter: function (param) {
                  return param.data[3];
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: 'rgba(25, 100, 150, 0.5)',
                shadowOffsetY: 5,
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgb(129, 227, 238)'
                }, {
                  offset: 1,
                  color: 'rgb(25, 183, 207)'
                }])
              }
            },
            data: this.logData2
          }, {
            name: 'line',
            type: 'line',
            lineStyle: {
              normal: {
                color: '#2f4554'
              }
            },
            smooth: true,
            showSymbol: false,
            data: this._logReg.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  formatter:this._logReg.expression,
                  textStyle: {
                    color: '#333',
                    fontSize: 14
                  }
                }
              },
              data: [{
                coord: this._logReg.points[this._logReg.points.length - 1]
              }]
            }
          }]
        }
      }
    }
  }
</script>

<style scoped>

</style>
