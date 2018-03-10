<template>
    <div style="padding-bottom:10px;padding-top:15px;display: inline-block;margin-left: 5px" @click="handleClick">
      <Tooltip :content="_groupInfo" placement="top">
        <Badge :count="10">
          <div style="cursor: pointer">
            <Avatar style="background-color: #87d068" icon="person" shape="square">
              <router-link to="/foo">Go to Foo</router-link>
            </Avatar>
          </div>
        </Badge >
      </Tooltip>
    </div>
</template>

<script>
    export default {
        props:{
          group:{
            groupId:'',
            groupName:'',
            arrangementId:''
          },
          newActions:0,
        },
        name: "group-avatar",
      methods:{
        handleClick() {
          this.$emit('click');
        } ,
      },
      computed:{
          _groupInfo() {
            return this.group.arrangementId + ' : ' + this.group.groupName;
          }
      }
    }
</script>

<style scoped>

</style>
