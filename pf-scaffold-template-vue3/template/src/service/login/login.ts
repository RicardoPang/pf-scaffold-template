import pfRequest from '..'

export function getImage() {
  return pfRequest.get({
    url: 'https://dog.ceo/api/breeds/image/random'
  })
}
