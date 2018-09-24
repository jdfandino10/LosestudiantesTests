describe('Los estudiantes login', function() {

    beforeEach(function() {
      cy.visit('https://losestudiantes.co');
      cy.contains('Cerrar').click();
      cy.contains('Ingresar').click();
    });

    it('Visits los estudiantes and fails at login', function() {
      cy.get('.cajaLogIn').find('input[name="correo"]').click().type("wrongemail@example.com");
      cy.get('.cajaLogIn').find('input[name="password"]').click().type("12kjfahksfadh34");
      cy.get('.cajaLogIn').contains('Ingresar').click();
      cy.contains('El correo y la contraseña que ingresaste no figuran en la base de datos. Intenta de nuevo por favor.');
    });

    it('Can\'t create account with existing login', function() {
      cy.get('.cajaSignUp').find('input[name="nombre"]').click().type("José Daniel");
      cy.get('.cajaSignUp').find('input[name="apellido"]').click().type("Fandiño");
      cy.get('.cajaSignUp').find('input[name="correo"]').click().type("jd.fandino10@uniandes.edu.co");
      cy.get('.cajaSignUp').find('input[name="password"]').click().type("asdfzxcv");
      cy.get('.cajaSignUp').find('select[name="idPrograma"]').select('22');
      cy.get('.cajaSignUp').find('input[name="acepta"]').click();
      cy.get('.cajaSignUp').contains('Registrarse').click();
      cy.contains('Ya existe un usuario registrado con el correo');
      cy.contains('Ok').click();
    });

    it('Can login with existing account', function() {
      cy.get('.cajaLogIn').find('input[name="correo"]').click().type("jd.fandino10@uniandes.edu.co");
      cy.get('.cajaLogIn').find('input[name="password"]').click().type("asdfzxcv");
      cy.get('.cajaLogIn').contains('Ingresar').click();
      cy.get('.usrImage');
    });
});

describe('Los estudiantes professor search', function() {

  beforeEach(function() {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
  });
  it('Finds existing profssor', function() {
    cy.get('form[role="search"] input').type('mario linares', {force: true});
    cy.contains('Mario Linares Vasquez - Ingeniería de Sistemas');
  });
  it('Doesn\'t find unexisting profssor', function() {
    cy.get('form[role="search"] input').type('lalo landa', {force: true});
    cy.contains('No se encontraron profesores ni materias');
  });
});

describe('Los estudiantes professor page', function() {
  beforeEach(function() {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
    cy.get('form[role="search"] input').type('mario linares', {force: true});
    cy.contains('Mario Linares Vasquez - Ingeniería de Sistemas').click();
  });
  it('Can navigate to professor page', function() {
    cy.get('.infoProfesor');
  });
  it('Filters coments by subject', function() {
    cy.get('.statsProfesorDropdown').find('input[name="id:ISIS1206"]').click();
    cy.wait(2000); // Wait 2 seconds for the animation
    cy.get('.sobreCalificacion').each(function(elem) {
      expect(elem.text()).to.contain('Estructuras De Datos');
    });
  });
});

describe('Los estudiantes subject search', function() {

  beforeEach(function() {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
  });
  it('Finds existing subject', function() {
    cy.get('form[role="search"] input').type('calculo diferencial', {force: true});
    cy.contains('Calculo Diferencial - MATE1203 - Matemáticas');
  });
  it('Doesn\'t find unexisting profssor', function() {
    cy.get('form[role="search"] input').type('pruebas manuales', {force: true});
    cy.contains('No se encontraron profesores ni materias');
  });
});

describe('Los estudiantes subject page', function() {
  beforeEach(function() {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
    cy.get('form[role="search"] input').type('calculo diferencial', {force: true});
    cy.contains('Calculo Diferencial - MATE1203 - Matemáticas').click();
  });
  it('Can navigate to professor page', function() {
    cy.get('.infoProfesor').contains('Calculo Diferencial - MATE1203');
  });
  it('Filters coments by professor', function() {
    cy.get('.statsProfesorDropdown').find('input[name="id:668"]').click();
    cy.wait(2000); // Wait 2 seconds for the animation
    cy.get('.sobreCalificacion').each(function(elem) {
      expect(elem.text()).to.contain('Alexander Murcia Mazo');
    });
  });
});
