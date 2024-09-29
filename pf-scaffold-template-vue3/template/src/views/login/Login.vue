<template>
  <div class="login">
    <div>
      <el-button type="primary" @click="handleLogin"> Login </el-button>
    </div>
    <div>
      <el-image
        v-if="url"
        style="width: 200px; height: 200px"
        :src="url"
        fit="cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/store/login/login'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const url = ref('')
const loginStore = useLoginStore()

const handleLogin = async () => {
  await loginStore.dogAction()
  const { dog } = storeToRefs(loginStore)
  url.value = dog.value.message
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background: url('../../assets/img/login-bg.svg');
}
</style>
