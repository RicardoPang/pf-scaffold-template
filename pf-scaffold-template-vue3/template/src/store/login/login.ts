import type { IDog } from '@/types/login'
import { defineStore } from 'pinia'
import { getImage } from '@/service/login/login'
// import router from '@/router'

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): { [key: string]: any } => ({
    dog: {} as IDog
  }),
  actions: {
    async dogAction() {
      const dogResult = await getImage()
      this.dog = dogResult
      // 页面跳转(main页面)
      // if (this.dog?.status === 'success') {
      //   router.push('/main')
      // }
    }
  }
})

export default useLoginStore
