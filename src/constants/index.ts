export const IMAGE_LIST = Array.from({ length: 7 }, (_, i) => ({
  label: `Image ${i + 1}`,
  url: `https://firebasestorage.googleapis.com/v0/b/portfolio-f1335.appspot.com/o/test-images%2Fimage${i + 1}.webp?alt=media`,
}))

export const GET_IMAGE = (i: number) => ({
  label: `Image ${i}`,
  url: `https://firebasestorage.googleapis.com/v0/b/portfolio-f1335.appspot.com/o/test-images%2Fimage${i}.webp?alt=media`,
})
