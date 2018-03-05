<template>
  <div>
    <transition name="fade" mode="out-in">
      <keep-alive :include='cachedViews'>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'DivideMain',
    data() {
      return {
        dataMiningGroups: [
          {
            "groupName": "Group_2018-03-04 21:17:38",
            "arrangementId": "12",
            "builtTime": "2018-03-04 21:17:38",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb100a7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840339",
                "grade": "2027级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb100a8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840340",
                "grade": "2028级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb100a9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840341",
                "grade": "2029级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb100aa",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840342",
                "grade": "2030级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200ab",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840343",
                "grade": "2031级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200ac",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840344",
                "grade": "2032级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200ad",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840345",
                "grade": "2033级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200ae",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840346",
                "grade": "2034级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200af",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840347",
                "grade": "2035级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200b0",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840348",
                "grade": "2036级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200b1",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840349",
                "grade": "2037级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200b2",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840350",
                "grade": "2038级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb100a7",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840339",
              "grade": "2027级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:38",
            "arrangementId": "24",
            "builtTime": "2018-03-04 21:17:38",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200b3",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840351",
                "grade": "2039级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb200b4",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840352",
                "grade": "2040级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300b5",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840353",
                "grade": "2041级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300b6",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840354",
                "grade": "2042级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300b7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840355",
                "grade": "2043级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300b8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840356",
                "grade": "2044级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300b9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840357",
                "grade": "2045级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300ba",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840358",
                "grade": "2046级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300bb",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840359",
                "grade": "2047级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300bc",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840360",
                "grade": "2048级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300bd",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840361",
                "grade": "2049级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300be",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840362",
                "grade": "2050级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb200b3",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840351",
              "grade": "2039级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:38",
            "arrangementId": "36",
            "builtTime": "2018-03-04 21:17:38",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb300bf",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840363",
                "grade": "2051级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c0",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840364",
                "grade": "2052级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c1",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840365",
                "grade": "2053级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c2",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840366",
                "grade": "2054级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c3",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840367",
                "grade": "2055级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c4",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840368",
                "grade": "2056级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c5",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840369",
                "grade": "2057级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c6",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840370",
                "grade": "2058级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840371",
                "grade": "2059级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840372",
                "grade": "2060级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400c9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840373",
                "grade": "2061级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400ca",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840374",
                "grade": "2062级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb300bf",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840363",
              "grade": "2051级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "48",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400cb",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840375",
                "grade": "2063级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400cc",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840376",
                "grade": "2064级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400cd",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840377",
                "grade": "2065级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb400ce",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840378",
                "grade": "2066级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500cf",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840379",
                "grade": "2067级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d0",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840380",
                "grade": "2068级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d1",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840381",
                "grade": "2069级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d2",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840382",
                "grade": "2070级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d3",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840383",
                "grade": "2071级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d4",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840384",
                "grade": "2072级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d5",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840385",
                "grade": "2073级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d6",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840386",
                "grade": "2074级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb400cb",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840375",
              "grade": "2063级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "60",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840387",
                "grade": "2075级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840388",
                "grade": "2076级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500d9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840389",
                "grade": "2077级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500da",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840390",
                "grade": "2078级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500db",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840391",
                "grade": "2079级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500dc",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840392",
                "grade": "2080级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb500dd",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840393",
                "grade": "2081级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600de",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840394",
                "grade": "2082级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600df",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840395",
                "grade": "2083级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e0",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840396",
                "grade": "2084级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e1",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840397",
                "grade": "2085级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e2",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840398",
                "grade": "2086级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb500d7",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840387",
              "grade": "2075级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "72",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e3",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840399",
                "grade": "2087级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e4",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840400",
                "grade": "2088级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e5",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840401",
                "grade": "2089级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e6",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840402",
                "grade": "2090级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840403",
                "grade": "2091级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840404",
                "grade": "2092级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600e9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840405",
                "grade": "2093级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600ea",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840406",
                "grade": "2094级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600eb",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840407",
                "grade": "2095级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600ec",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840408",
                "grade": "2096级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600ed",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840409",
                "grade": "2097级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600ee",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840410",
                "grade": "2098级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb600e3",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840399",
              "grade": "2087级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "84",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600ef",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840411",
                "grade": "2099级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb600f0",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840412",
                "grade": "2100级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f1",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840413",
                "grade": "2101级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f2",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840414",
                "grade": "2102级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f3",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840415",
                "grade": "2103级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f4",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840416",
                "grade": "2104级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f5",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840417",
                "grade": "2105级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f6",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840418",
                "grade": "2106级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f7",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840419",
                "grade": "2107级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f8",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840420",
                "grade": "2108级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700f9",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840421",
                "grade": "2109级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700fa",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840422",
                "grade": "2110级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb600ef",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840411",
              "grade": "2099级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "96",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700fb",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840423",
                "grade": "2111级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700fc",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840424",
                "grade": "2112级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700fd",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840425",
                "grade": "2113级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700fe",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840426",
                "grade": "2114级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb700ff",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840427",
                "grade": "2115级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb70100",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840428",
                "grade": "2116级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80101",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840429",
                "grade": "2117级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80102",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840430",
                "grade": "2118级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80103",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840431",
                "grade": "2119级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80104",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840432",
                "grade": "2120级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80105",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840433",
                "grade": "2121级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80106",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840434",
                "grade": "2122级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb700fb",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840423",
              "grade": "2111级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "108",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80107",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840435",
                "grade": "2123级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80108",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840436",
                "grade": "2124级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80109",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840437",
                "grade": "2125级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010a",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840438",
                "grade": "2126级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010b",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840439",
                "grade": "2127级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010c",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840440",
                "grade": "2128级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010d",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840441",
                "grade": "2129级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010e",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840442",
                "grade": "2130级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb8010f",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840443",
                "grade": "2131级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb80110",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840444",
                "grade": "2132级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90111",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840445",
                "grade": "2133级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90112",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840446",
                "grade": "2134级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb80107",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840435",
              "grade": "2123级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          },
          {
            "groupName": "Group_2018-03-04 21:17:39",
            "arrangementId": "1",
            "builtTime": "2018-03-04 21:17:39",
            "groupMembers": [
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90113",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840447",
                "grade": "2135级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90114",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840448",
                "grade": "2136级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90115",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840449",
                "grade": "2137级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90116",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840450",
                "grade": "2138级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90117",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840451",
                "grade": "2139级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90118",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840452",
                "grade": "2140级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb90119",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840453",
                "grade": "2141级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb9011a",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840454",
                "grade": "2142级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb9011b",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840455",
                "grade": "2143级",
                "className": "软工二班",
                "profession": "软件工程"
              },
              {
                "userId": "5b66d2cf61dc51550161dc5e2eb9011c",
                "accountStatus": "AVAILABLE",
                "studentName": "刘祥德",
                "studentId": "915106840456",
                "grade": "2144级",
                "className": "软工二班",
                "profession": "软件工程"
              }
            ],
            "groupLeader": {
              "userId": "5b66d2cf61dc51550161dc5e2eb90113",
              "accountStatus": "AVAILABLE",
              "studentName": "刘祥德",
              "studentId": "915106840447",
              "grade": "2135级",
              "className": "软工二班",
              "profession": "软件工程"
            },
            "dataMiningTask": {
              "taskId": "123",
              "taskName": "数据挖掘任务测试1",
              "builtTime": "2018-02-24 15:49:02",
              "plannedStartTime": "2018-02-24 15:49:24",
              "plannedFinishTime": "2018-02-24 15:49:22",
              "status": {
                "value": 1,
                "status": "TO_BE_ASSIGNED",
                "description": "待分配"
              },
              "algorithms": [
                {
                  "algorithmId": 1,
                  "algorithmName": "C4.5"
                },
                {
                  "algorithmId": 2,
                  "algorithmName": "k均值聚类算法"
                },
                {
                  "algorithmId": 3,
                  "algorithmName": "支持向量机"
                }
              ]
            }
          }
        ],
        dataMiningTask: {},
        queryKey: '',
        current: 2
      };
    },
    methods: {
      handleGroupPreview(groupPreview) {
        this.dataMiningGroups = groupPreview.dataMiningGroups;
        this.queryKey = groupPreview.queryKey;
        this.dataMiningTask = groupPreview.dataMiningTask;
        this.current++;
      },
      preStep() {
        this.$store.dispatch('SetStep', this._step - 1);
      },
      nextStep() {
        this.$store.dispatch('SetStep', this._step + 1);
      }
    },
    computed: {
      cachedViews() {
        return this.$store.state.tagsView.cachedViews.join();
      },
      _step() {
        return this.$store.state.group.divide.step;
      }
    }
  }
</script>
