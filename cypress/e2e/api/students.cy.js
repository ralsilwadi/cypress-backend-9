describe('CRUD Operations', () => {
  it('Create a new student using POST', () => {
    cy.request({
      method: 'POST',
      url: Cypress.env('baseUrl'),
      body: {
        DOB: '1976-12-29',
        EMAIL: 'lets-a-go@gmail.com',
        FIRST_NAME: 'Super',
        LAST_NAME: 'Mario',
        INSTRUCTOR_ID: 4,
      },
    })
  })
})
