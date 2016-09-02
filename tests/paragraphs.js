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
  'transitions': {
    topic: function () {
      fs.readFile(path.join(__dirname, 'transitions.txt'), {encoding: 'utf8'}, this.callback);
    },

    'we get transition': function (topic) {
      const result = document.getSections(topic.split('\n'));

      assert.deepEqual(result, [
        {start: 0, end: 0, length: 1, indent: 0, type: 'paragraph'},
        {start: 2, end: 2, length: 1, indent: 0, type: 'transition'},
        {start: 4, end: 4, length: 1, indent: 0, type: 'paragraph'},
        {start: 6, end: 6, length: 1, indent: 0, type: 'paragraph'},
        {start: 8, end: 8, length: 1, indent: 0, type: 'paragraph'},
        {start: 10, end: 10, length: 1, indent: 0, type: 'transition'},
        {start: 12, end: 12, length: 1, indent: 0, type: 'paragraph'}
      ]);
    }
  },
  'titles': {
    topic: function () {
      fs.readFile(path.join(__dirname, 'titles.txt'), {encoding: 'utf8'}, this.callback);
    },

    'we get title': function (topic) {
      const result = document.getSections(topic.split('\n'));

      assert.deepEqual(result, [
        {start: 0, end: 1, length: 2, indent: 0, type: 'title'},
        {start: 3, end: 3, length: 1, indent: 0, type: 'paragraph'},
        {start: 5, end: 7, length: 3, indent: 0, type: 'title'},
        {start: 9, end: 9, length: 1, indent: 0, type: 'paragraph'},
        {start: 11, end: 13, length: 3, indent: 0, type: 'title'},
        {start: 15, end: 15, length: 1, indent: 0, type: 'paragraph'}
      ]);
    }
  }
}).run();
