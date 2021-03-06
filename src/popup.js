/**
 * @fileoverview Main script for popup.html
 */

import 'babel-polyfill';
import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';
import domready from 'domready';
import Constants from './constants';
import { get, put } from './storage';
import GitHubLabelListComponent from './components/github-label-list-component';

domready(async () => {
  const labels = await get('labels');

  $('button.create-labels').on('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, { type: Constants.CLICK, labels });
    });
  });

  render(
    <GitHubLabelListComponent />,
    document.getElementById('react-mount')
  );
});
