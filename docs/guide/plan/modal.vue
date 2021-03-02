<template>
<div class="modal-background" v-show="show">
  <div class="modal-wrapper">
    <div class="modal-header">
      {{title}}
    </div>
    <div class="modal-content">
      <slot></slot>
    </div>
    <div class="modal-footer">
      <button type="button" @click="confirm" class="btn  confirm">确定</button>
      <button type="button" @click="cancel" class="btn cancel">取消</button>
    </div>
  </div>
</div>
</template>

<script>

  export default {
    name:'',
    props:{
      show:{
        type:Boolean,
        default:false
      },
      title:{
        type:String,
        default:'弹窗标题'
      }
    },
    methods: {
      confirm(){
        this.$emit('onConfirm')
      },
      cancel(){
        this.$emit('onCancel')
      }
    },
  }

</script>
<style scoped>
.modal-background{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  z-index: 10;
}
.modal-wrapper{
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 200px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.modal-header{
  height: 60px;
  line-height: 60px;
  background: #ffffff;
  border-bottom: 1px solid #000000;
}
.modal-footer{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
}

.btn{
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 400;
  padding: 12px 20px;
  border: 1px solid transparent;
  line-height: 1;
  border-radius: 4px;
  cursor: pointer;
  user-select: none;
  outline: none;
}

.confirm{
  background: #007bff;
  color: #ffffff;
  border-color: #007bff;
  margin-right: 15px;

}
.cancel{
  border-color: #dcdfe6;
  background-color: #fff;
  color: #606266;
}


</style>
