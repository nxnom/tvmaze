import { it, expect, describe, jest } from '@jest/globals';

import countComment from '../countComment.js';
import { openPopup } from '../popup.js';

describe('countComment', () => {
  const comment = {
    username: 'user1',
    comment: 'comment1',
    creation_date: '2023-01-01',
  };

  let details;
  let targetEl;
  let popupEl;

  beforeEach(() => {
    targetEl = document.createElement('div');
    popupEl = document.createElement('div');
    details = { comments: [] };
  });

  it('should count the comment count', () => {
    // Arrange
    details.comments = [comment];

    // Act
    openPopup(details, popupEl, null, targetEl);

    // Assert
    expect(countComment(popupEl)).toBe(1);
  });

  it('should count the correct comment count when add a new comment', async () => {
    // Arrange
    const commentFormSubmitMock = jest.fn(() => comment);
    openPopup(details, popupEl, commentFormSubmitMock, targetEl);

    // Act
    const formEl = popupEl.querySelector('#comment-form');
    formEl.dispatchEvent(new Event('submit'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Assert
    expect(countComment(popupEl)).toBe(1);
  });
});
