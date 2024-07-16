import { postRequestBody, putRequestBody } from '../../fixtures/testData.json'

describe('CRUD Operations', function () {
  after(function () {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseUrl')}/all/delete`,
    })
  })
  let studentID

  it('POST a new student', function () {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('baseUrl')}`,
      body: postRequestBody,
    }).then((response) => {
      studentID = response.body.STUDENT_ID
    })
  })

  it('GET a new student', function () {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/${studentID}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  /**
   * Create a PUT request
   * Update the student we created
   * Validate the status code is 2xx
   * And console log the response
   */

  it('Update the created student using PUT', () => {
    cy.request({
      method: 'PUT',
      url: `${Cypress.env('baseUrl')}/${studentID}`,
      body: putRequestBody,
    }).then((response) => {
      expect(response.status).to.eq(201)
    })
  })

  it('Get the updated student using GET', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('baseUrl')}/${studentID}`,
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.duration).to.be.below(1000)
      expect(response.body.FIRST_NAME).to.eq(putRequestBody.FIRST_NAME)
    })
  })
})
