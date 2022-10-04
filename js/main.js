import renderBookCardList from './component/book-card-list.js'
import { getAllBookData, insertBookData } from './local-storage/local-storage.js'

document.addEventListener('DOMContentLoaded', () => {
  const finishedBookCardList = document.getElementById('finished-book-card-list')
  const unfinishedBookCardList = document.getElementById('unfinished-book-card-list')

  // get all book data from local storage and create book card based on book data
  renderBookCardList(getAllBookData(), finishedBookCardList, unfinishedBookCardList)

  // Submit Button when user inser new book data
  const submitBookBtn = document.getElementById('submit-book-btn')
  submitBookBtn.addEventListener('click', () => {
    let isValid = true

    const titleInputField = document.getElementById('title-input-field')
    const titleInvalidMsg = document.getElementById('input-title-invalid-msg')

    const authorInputField = document.getElementById('author-input-field')
    const authorInvalidMsg = document.getElementById('input-author-invalid-msg')

    const yearInputField = document.getElementById('year-input-field')
    const yearInvalidMsg = document.getElementById('input-year-invalid-msg')

    const finishedReadingCheckbox = document.getElementById('finished-reading-checkbox')

    // Show Invalid message when title input value is null
    if (titleInputField.value === '' || typeof titleInputField === 'string') {
      isValid = false
      titleInvalidMsg.classList.remove('is-invisible')
    } else if (titleInvalidMsg.classList.contains('is-invisible') === false) {
      titleInvalidMsg.classList.add('is-invisible')
    }

    if (authorInputField.value === '' || typeof authorInputField === 'string') {
      isValid = false
      authorInvalidMsg.classList.remove('is-invisible')
    } else if (authorInvalidMsg.classList.contains('is-invisible') === false) {
      authorInvalidMsg.classList.add('is-invisible')
    }

    if (yearInputField.value === '' || typeof yearInputField === 'number' ||
    yearInputField.value.length > 4) {
      isValid = false
      yearInvalidMsg.classList.remove('is-invisible')
    } else if (yearInvalidMsg.classList.contains('is-invisible') === false) {
      yearInvalidMsg.classList.add('is-invisible')
    }

    if (isValid) {
      // hide all invalid message while user successfuly submit data
      if (titleInvalidMsg.classList.contains('is-invisible') === false) {
        titleInvalidMsg.classList.add('is-invisible')
      }

      if (authorInvalidMsg.classList.contains('is-invisible') === false) {
        authorInvalidMsg.classList.add('is-invisible')
      }

      if (yearInvalidMsg.classList.contains('is-invisible') === false) {
        yearInvalidMsg.classList.add('is-invisible')
      }

      const bookData = {
        title: titleInputField.value,
        author: authorInputField.value,
        year: yearInputField.value,
        isComplete: finishedReadingCheckbox.checked
      }

      insertBookData(bookData)
      renderBookCardList(getAllBookData(), finishedBookCardList, unfinishedBookCardList)

      // reset all input field when insert book data process is success
      titleInputField.value = ''
      authorInputField.value = ''
      yearInputField.value = ''
      finishedReadingCheckbox.checked = false
    }
  })
})
