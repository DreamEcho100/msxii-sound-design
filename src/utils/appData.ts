const handleDefaultImagesPath = (path: string) => `/images/${path}`

const fakeProductsBaseData = [
  {
    id: 1,
    title: 'Loops Go Crazy Vol. 5',
    price: 26.99,
    image: {
      src: handleDefaultImagesPath(
        'e6b9160e7b1a4bcfd9c8903c6b599305abd525fb.png'
      ),
      alt: ''
    }
  },
  {
    id: 2,
    title: 'Schlump Loops Bundle',
    price: 369.99,
    image: {
      src: handleDefaultImagesPath(
        'cdf81d3835669a8af7c9b66cf2e0a098d0e62e69.png'
      ),
      alt: ''
    }
  },
  {
    id: 3,
    title: 'The Horns of Ivory Soul Vol. 1',
    price: 437.84,
    image: {
      src: handleDefaultImagesPath(
        '17ee6b38a84b6a0fbb09316f5e46c8c0d039c40e.png'
      ),
      alt: ''
    }
  },
  {
    id: 4,
    title: 'R&B Soul Guitar Loops Vol. 1',
    price: 24.99,
    image: {
      src: handleDefaultImagesPath(
        'c01cc1aeb8019c3d4605c89f0f27cf8d89b48307.png'
      ),
      alt: ''
    }
  },
  {
    id: 5,
    title: 'High Art Vol. 1 - Tastemakers Edition',
    price: 26.99,
    image: {
      src: handleDefaultImagesPath(
        'cdf81d3835669a8af7c9b66cf2e0a098d0e62e69.png'
      ),
      alt: ''
    }
  },
  {
    id: 6,
    title: 'Cassettes & Pedals Bundle',
    price: 39.99,
    image: {
      src: handleDefaultImagesPath(
        'cab913d3485600dd99e93f305b788f0cf3aefe5e.png'
      ),
      alt: ''
    }
  },
  {
    id: 7,
    title: 'Sammich Kit 12',
    price: 27.99,
    image: {
      src: handleDefaultImagesPath(
        '87b6dec7d5bcf2c68d8bc2c35d17733ec4fbc969.png'
      ),
      alt: ''
    }
  }
]

export const fakeProductsData = [
  ...fakeProductsBaseData,
  ...fakeProductsBaseData,
  ...fakeProductsBaseData,
  ...fakeProductsBaseData
].map((product) => ({ key: `${Date.now()}-${Math.random()}`, ...product }))
