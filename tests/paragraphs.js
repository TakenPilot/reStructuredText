import vows from 'vows';
import assert from 'assert';
import path from 'path';
import document from '../src/document';
import fs from 'fs';

vows.describe(__filename).addBatch({
  'paragraphs': {
    topic: function () {
      fs.readFile(path.join(__dirname, 'paragraphs.txt'), {encoding: 'utf8'}, this.callback);
    },

    'we get Infinity': function (topic) {
      const result = document.getSections(topic.split('\n'));

      assert.deepEqual(result, [
        {start: 0, end: 5, indent: 0},
        {start: 6, end: 12, indent: 0},
        {start: 13, end: 20, indent: 0}
      ]);
    }
  }
}).run();
