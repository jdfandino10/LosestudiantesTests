describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and survives monkeys', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click().then(() => {
          randomEvent(100);
        });
    });
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function elementExists(element) {
  return cy.get('body').then(($body) => {
    return $body.find(element).length > 0;
  });
}

function randomClick(monkeysLeft, randomCallback) {
  if(monkeysLeft > 0) {
    elementExists('a').then((exists) => {
      if (!exists) {
        randomCallback(monkeysLeft);
      } else {
        cy.get('a').then($links => {
          var randomLink = $links.get(getRandomInt(0, $links.length));
          if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
            monkeysLeft = monkeysLeft - 1;
          }
          cy.wait(1000);
          randomCallback(monkeysLeft);
        });
      }
    });
  }
}

function randomText(monkeysLeft, randomCallback=randomText) {
    if(monkeysLeft > 0) {
      elementExists('input').then((exists) => {
        if (!exists) {
          randomCallback(monkeysLeft);
        } else {
          cy.get('input[type!=checkbox]').then($inputs => {
            var textToInput = generateRandomText();
            var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
            cy.wrap(randomInput).clear({force: true}).type(textToInput + '{enter}', {force: true});
            monkeysLeft = monkeysLeft - 1;
            cy.wait(1000);
            randomCallback(monkeysLeft);
          });
        }
      });
    }
}

function randomComboBox(monkeysLeft, randomCallback) {
    if(monkeysLeft > 0) {
      elementExists('select').then((exists) => {
        if (!exists) {
          randomCallback(monkeysLeft);
        } else {
          cy.get('select').then($selects => {
            var randomSelect = $selects.get(getRandomInt(0, $selects.length));
            var options = randomSelect.children;
            var valueList = [];
            for (var i = 0; i <  options.length; i++) {
              if (!options[i].disabled) {
                valueList.push(options[i].value);
              }
            }
            var randomValue = valueList[getRandomInt(0, valueList.length)];
            cy.wrap(randomSelect).select(randomValue, {force: true});
            monkeysLeft = monkeysLeft - 1;
            cy.wait(1000);
            randomCallback(monkeysLeft);
          });
        }
      });

    }
}

function randomButtonClick(monkeysLeft, randomCallback) {
    if(monkeysLeft > 0) {
      elementExists('button').then((exists) => {
        if (!exists) {
          randomCallback(monkeysLeft);
        } else {
          cy.get('button').then($buttons => {
            var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
            if(!Cypress.dom.isHidden(randomButton)) {
              cy.wrap(randomButton).click({force: true});
              monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(1000);
            randomCallback(monkeysLeft);
          });
        }
      });
    }
}

function randomEvent(monkeysLeft) {
  cy.wait(1000).then(() => {
    var eventToDo = getRandomInt(0, 4); // retorna entre [0, 4), osea [0, 3]
    if (eventToDo == 0) {
      randomClick(monkeysLeft, randomEvent);
    } else if (eventToDo == 1) {
      randomText(monkeysLeft, randomEvent);
    } else if (eventToDo == 2) {
      randomComboBox(monkeysLeft, randomEvent);
    } else {
      randomButtonClick(monkeysLeft, randomEvent);
    }
  });
}

function generateRandomText() {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890 ';
  var length = getRandomInt(1, 30);
  var string = '';
  for (var i = 0; i < length; i++) {
    string += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return string;
}
