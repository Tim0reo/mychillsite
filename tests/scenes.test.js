const test = require('node:test');
const assert = require('node:assert/strict');
const {sceneForHour} = require('../main/scripts/scenes');

test('local-time scene boundaries, including midnight', () => {
    for (const [hour, expected] of [[0,'night'],[5,'night'],[6,'morning'],[10,'morning'],[11,'day'],[16,'day'],[17,'evening'],[20,'evening'],[21,'night'],[23,'night']]) {
        assert.equal(sceneForHour(hour), expected, `hour ${hour}`);
    }
});
