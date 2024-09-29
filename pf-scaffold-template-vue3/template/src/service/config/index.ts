// 生产环境与开发环境的API地址(替换为自己的服务器地址)
const BASE_URL = import.meta.env.PROD
  ? 'https://dog.ceo/api/breeds/image/random'
  : 'https://dog.ceo/api/breeds/image/random'

export const TIME_OUT = 10000
export { BASE_URL }
