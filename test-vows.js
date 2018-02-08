vows = require('vows')
vows.describe('Division by zero').addBatch({
    'when dividing a number by zero': {
        topic: () => 42 / 0, 
        'we get a value which': {
            'is not a number: function': (topic) => {
                assert.notE
            }
        }  
    }
}
    , () => {

    })