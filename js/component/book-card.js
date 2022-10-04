import { changeBookStatus, getAllBookData, deleteBookData, editBookData } from '../local-storage/local-storage.js'
import renderBookCardList from './book-card-list.js'
import { closeModal } from '../bulma/bulma-modal.js'

const renderBookCard = (book) => {
  const elms = {
    bookCardClass: 'unfinished-book-card',
    markButtonText: 'Finished',
    markButtonClass: 'is-success'
  }

  if (book.isComplete === true) {
    elms.bookCardClass = 'finished-book-card'
    elms.markButtonText = 'Unfinished'
    elms.markButtonClass = 'is-danger'
  }

  // create book card node
  const bookCard = document.createElement('div')
  bookCard.classList.add(elms.bookCardClass)

  const bookCardBtnList = document.createElement('div')
  bookCardBtnList.classList.add('book-card-button-list')

  // Create Edit Button
  const editBtn = document.createElement('button')
  editBtn.classList.add('button')
  editBtn.classList.add('book-edit-btn')
  editBtn.classList.add('js-modal-trigger')
  editBtn.setAttribute('data-target', 'edit-book-modal')

  const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  editSvg.setAttributeNS(null, 'viewBox', '0 0 512 512')

  const editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  editPath.setAttributeNS(null, 'd', 'M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z')

  editSvg.appendChild(editPath)
  editBtn.appendChild(editSvg)
  bookCardBtnList.appendChild(editBtn)

  // Create Delete Button
  const deleteBtn = document.createElement('button')
  deleteBtn.classList.add('button')
  deleteBtn.classList.add('book-delete-btn')
  deleteBtn.classList.add('js-modal-trigger')
  deleteBtn.setAttribute('data-target', 'delete-confirmation-modal')

  const deleteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  deleteSvg.setAttributeNS(null, 'viewBox', '0 0 448 512')

  const deletePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  deletePath.setAttributeNS(null, 'd', 'M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z')

  deleteSvg.appendChild(deletePath)
  deleteBtn.appendChild(deleteSvg)
  bookCardBtnList.appendChild(deleteBtn)

  // create book title text on book card
  const bookCardTitle = document.createElement('div')
  bookCardTitle.classList.add('book-title')

  const titleText = document.createTextNode(book.title)
  bookCardTitle.appendChild(titleText)

  // create book author text on book card
  const bookCardAuthor = document.createElement('div')
  bookCardAuthor.classList.add('book-author')

  const authorText = document.createTextNode(book.author)
  bookCardAuthor.appendChild(authorText)

  // create book year text on book card
  const bookCardYear = document.createElement('div')
  bookCardYear.classList.add('book-year')
  bookCardYear.classList.add('is-flex')
  bookCardYear.classList.add('is-justify-content-space-between')

  const yearText = document.createTextNode(book.year)
  bookCardYear.appendChild(yearText)

  // create mark as finsihed Button or mark as unfinished button
  const markBtn = document.createElement('button')
  markBtn.classList.add('button')
  markBtn.classList.add(elms.markButtonClass)
  markBtn.classList.add('book-mark-button')
  markBtn.classList.add('mt-4')

  const markBtnText = document.createTextNode(`Mark As ${elms.markButtonText}`)
  markBtn.appendChild(markBtnText)

  bookCardYear.appendChild(markBtn)

  // insert all main component to book card node
  bookCard.appendChild(bookCardBtnList)
  bookCard.appendChild(bookCardTitle)
  bookCard.appendChild(bookCardAuthor)
  bookCard.appendChild(bookCardYear)

  const finishedBookCardList = document.getElementById('finished-book-card-list')
  const unfinishedBookCardList = document.getElementById('unfinished-book-card-list')

  markBtn.addEventListener('click', () => {
    changeBookStatus(book.id)
    renderBookCardList(getAllBookData(), finishedBookCardList, unfinishedBookCardList)
  })

  editBtn.addEventListener('click', () => {
    const titleEditField = document.getElementById('title-edit-field')
    const authorEditField = document.getElementById('author-edit-field')
    const yearEditField = document.getElementById('year-edit-field')

    const titleInvalidMsg = document.getElementById('edit-title-invalid-msg')
    const authorInvalidMsg = document.getElementById('edit-author-invalid-msg')
    const yearInvalidMsg = document.getElementById('edit-year-invalid-msg')

    titleInvalidMsg.classList.add('is-invisible')
    authorInvalidMsg.classList.add('is-invisible')
    yearInvalidMsg.classList.add('is-invisible')

    titleEditField.value = book.title
    authorEditField.value = book.author
    yearEditField.value = book.year

    const editModalBtn = document.getElementById('edit-book-btn')
    editModalBtn.onclick = () => {
      let isValid = true

      if (titleEditField.value === '' || typeof titleEditField === 'string') {
        isValid = false
        titleInvalidMsg.classList.remove('is-invisible')
      } else if (titleInvalidMsg.classList.contains('is-invisible') === false) {
        titleInvalidMsg.classList.add('is-invisible')
      }

      if (authorEditField.value === '' || typeof authorEditField === 'string') {
        isValid = false
        authorInvalidMsg.classList.remove('is-invisible')
      } else if (authorInvalidMsg.classList.contains('is-invisible') === false) {
        authorInvalidMsg.classList.add('is-invisible')
      }

      if (yearEditField.value === '' || typeof yearEditField === 'number' ||
        yearEditField.value.length > 4) {
        isValid = false
        yearInvalidMsg.classList.remove('is-invisible')
      } else if (yearInvalidMsg.classList.contains('is-invisible') === false) {
        yearInvalidMsg.classList.add('is-invisible')
      }

      if (isValid === true) {
        if (titleInvalidMsg.classList.contains('is-invisible') === false) {
          titleInvalidMsg.classList.add('is-invisible')
        }

        if (authorInvalidMsg.classList.contains('is-invisible') === false) {
          authorInvalidMsg.classList.add('is-invisible')
        }

        if (yearInvalidMsg.classList.contains('is-invisible') === false) {
          yearInvalidMsg.classList.add('is-invisible')
        }

        const searchInput = document.getElementById('search-title-input')
        searchInput.value = ''

        const submitData = {
          id: book.id,
          title: titleEditField.value,
          author: authorEditField.value,
          year: yearEditField.value
        }

        editBookData(submitData)
        renderBookCardList(getAllBookData(), finishedBookCardList, unfinishedBookCardList)

        titleEditField.value = ''
        authorEditField.value = ''
        yearEditField.value = ''

        const ediBookModal = document.getElementById('edit-book-modal')
        closeModal(ediBookModal)
      }
    }
  })

  deleteBtn.addEventListener('click', () => {
    const deleteModalBody = document.getElementById('delete-confirmation-modal-body')
    if (deleteModalBody.lastChild) {
      deleteModalBody.removeChild(deleteModalBody.lastChild)
    }

    const p = document.createElement('p')
    const text = document.createTextNode(`Are you sure want to delete "${book.title}" Book?`)

    p.appendChild(text)
    deleteModalBody.appendChild(p)
    const deleteModalBtn = document.getElementById('delete-confirm-btn')
    deleteModalBtn.onclick = () => {
      deleteBookData(book.id)
      renderBookCardList(getAllBookData(), finishedBookCardList, unfinishedBookCardList)
    }
  })

  return bookCard
}

export default renderBookCard
