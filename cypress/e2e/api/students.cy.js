describe('CRUD Operations', () => {
  after(() => {
    cy.request({
      method: 'DELETE',
      url: `${Cypress.env('baseUrl')}/all/delete`,
    })
  })

  it('Create a new student using POST', () => {
    const postRequestBody = {
      DOB: '1974-07-28',
      EMAIL: 'Sterling.Brakus30@hotmail.com',
      FIRST_NAME: 'Oran',
      LAST_NAME: 'Walsh',
      INSTRUCTOR_ID: 4,
    }

    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl'),
      body: postRequestBody,
    }).then((response) => {
      cy.log(response)

      console.log(JSON.stringify(response.body))
      console.log(JSON.stringify(response.body, null, 2))
      console.log(JSON.stringify(response.body, null, 6))

      expect(response.status).to.equal(201)
      expect(response.duration).to.be.below(500)

      cy.log(response.body['FIRST_NAME'] + ' ' + response.body.FIRST_NAME)
    })
  })
})
