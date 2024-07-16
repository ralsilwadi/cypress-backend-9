/// <reference types='cypress'/>

const baseURL = `http://www.omdbapi.com`
const apiKey = `cc101c84`
const movieTitle = 'Parasite'
const movieID = `tt6751668`

describe('OMDB API Movie Information', () => {
  it('Get movie information by its title', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?t=${movieTitle}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)

      const { Title, Year, Director, Writer, imdbRating, imdbID } = response.body

      expect(Title).to.eq(movieTitle)
      expect(imdbID).to.match(/^tt\d{7}$/)

      const propertiesToValidate = [Year, Director, Writer, imdbRating]

      // Iterate over properties and assert they are not empty or null
      propertiesToValidate.forEach((property) => {
        expect(property).to.not.be.empty
        expect(property).to.not.be.null
      })
    })
  })

  it('Get movie information by ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?i=${movieID}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)

      const { Title, Year, Director, Writer, imdbRating, imdbID } = response.body

      expect(Title).to.eq(movieTitle)
      expect(imdbID).to.match(/^tt\d{7}$/)

      const propertiesToValidate = [Year, Director, Writer, imdbRating]

      propertiesToValidate.forEach((property) => {
        expect(property).to.not.be.empty
        expect(property).to.not.be.null
      })
    })
  })

  it('Search Movies with Valid Search Query', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?s=${movieTitle}&apikey=${apiKey}`,
    }).then((response) => {
      const expectedKeys = ['Search', 'totalResults', 'Response']

      expect(response.status).to.eq(200)

      Object.keys(response.body).forEach((elem, index) => {
        expect(elem).to.eq(expectedKeys[index])
      })

      expect(Number(response.body.totalResults)).to.be.greaterThan(0)
      expect(response.body.Response).to.eq('True')
      expect(response.body.Search).to.be.an('array')
      expect(response.body.Search.length).to.be.greaterThan(0)

      response.body.Search.forEach((elem) => {
        const propertiesToValidate = [elem.Title, elem.Year, elem.imdbID, elem.Type, elem.Poster]

        propertiesToValidate.forEach((property) => {
          expect(property).to.not.be.empty
          expect(property).to.not.be.null
        })
      })
    })
  })

  it('Search Movies with Invalid Search Query', () => {
    cy.request({
      method: 'GET',
      url: `${baseURL}/?s=${'qweqeqqwe'}&apikey=${apiKey}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.Response).to.eq('False')
      expect(response.body.Error).to.eq('Movie not found!')
    })
  })
})