import { it, expect, describe, jest } from '@jest/globals';

import countComment from '../countComment.js';
import { openPopup } from '../popup.js';

const comment = {
  username: 'user1',
  comment: 'comment1',
  creation_date: '2023-01-01',
};

describe('countComment', () => {
  it('should count the comment elements from DOM', () => {
    // Arrange
    const details = { comments: [comment] };
    const targetEl = document.createElement('div');
    const popupEl = document.createElement('div');

    // Act
    openPopup(details, popupEl, null, targetEl);

    // Assert
    expect(countComment(popupEl)).toBe(1);
  });
});

describe('openPopup', () => {
  let details;
  let targetEl;
  let popupEl;

  beforeEach(() => {
    targetEl = document.createElement('div');
    popupEl = document.createElement('div');
    details = { comments: [] };
  });

  it('should display comment count', () => {
    // Arrange
    details.comments = [comment];

    // Act
    openPopup(details, popupEl, null, targetEl);

    // Assert
    const commentCountEl = popupEl.querySelector('#comment-count');
    const count = countComment(popupEl).toString();
    expect(commentCountEl.textContent).toBe(count);
  });

  it('should increase the comment count if new comments are added', async () => {
    // Arrange
    const commentFormSubmitMock = jest.fn(() => comment);
    openPopup(details, popupEl, commentFormSubmitMock, targetEl);

    // Act
    const formEl = popupEl.querySelector('#comment-form');
    formEl.dispatchEvent(new Event('submit'));
    formEl.dispatchEvent(new Event('submit'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert
    const commentCountEl = popupEl.querySelector('#comment-count');
    expect(commentCountEl.textContent).toBe('2');
  });
});
