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

    'we get three paragraphs': function (topic) {
      const result = document.getSections(topic.split('\n'));

      assert.deepEqual(result, [
        {start: 0, end: 4, length: 5, indent: 0, type: 'paragraph'},
        {start: 6, end: 11, length: 6, indent: 0, type: 'paragraph'},
        {start: 13, end: 19, length: 7, indent: 0, type: 'paragraph'}
      ]);
    }
  },
  'example1': {
    topic: function () {
      fs.readFile(path.join(__dirname, 'example1.txt'), {encoding: 'utf8'}, this.callback);
    },

    'we get title': function (topic) {
      const result = document.getSections(topic.split('\n'));

      assert.deepEqual(result, [
        {start: 0, end: 1, length: 2, indent: 0, type: 'title'},
        {start: 3, end: 3, length: 1, indent: 0, type: 'paragraph'}
      ]);
    }
  }
}).run();
