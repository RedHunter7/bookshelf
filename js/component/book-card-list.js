import renderBookCard from './book-card.js'
import { bulmaModalManager } from '../bulma/bulma-modal.js'
import { getAllBookData } from '../local-storage/local-storage.js'

const renderBookCardList = (booksData, finishBookCardListNode, unfinishBookCardListNode) => {
  // remove all Book Card on Book Card List node
  while (finishBookCardListNode.lastChild) {
    finishBookCardListNode.removeChild(finishBookCardListNode.lastChild)
  }

  while (unfinishBookCardListNode.lastChild) {
    unfinishBookCardListNode.removeChild(unfinishBookCardListNode.lastChild)
  }

  booksData.forEach((book) => {
    const bookCard = renderBookCard(book)

    if (book.isComplete === true) {
      finishBookCardListNode.appendChild(bookCard)
    } else {
      unfinishBookCardListNode.appendChild(bookCard)
    }
  })

  // Search Input Manager
  const searchResultSection = document.getElementById('search-result-section')

  const searchInput = document.getElementById('search-title-input')
  const searchBtn = document.getElementById('search-button')
  searchBtn.onclick = () => {
    if (searchInput.value.length > 0) {
      const allBookData = getAllBookData()

      const filteredData = allBookData.filter((book) => {
        const regex = new RegExp(searchInput.value, 'i')
        return regex.test(book.title) === true
      })

      if (searchResultSection.lastChild) {
        searchResultSection.removeChild(searchResultSection.lastChild)
      }

      if (searchResultSection.parentElement.classList.contains('is-hidden') === true) {
        searchResultSection.parentElement.classList.remove('is-hidden')
      }

      const h4 = document.createElement('h4')
      h4.classList.add('title')
      h4.classList.add('is-4')
      h4.classList.add('search-result-text')

      const searchResultText = document.createTextNode(`Search result : ${searchInput.value}`)
      h4.appendChild(searchResultText)
      searchResultSection.appendChild(h4)

      renderBookCardList(filteredData, finishBookCardListNode, unfinishBookCardListNode)
    } else {
      if (searchResultSection.parentElement.classList.contains('is-hidden') === false) {
        searchResultSection.parentElement.classList.add('is-hidden')
      }

      const allBookData = getAllBookData()
      renderBookCardList(allBookData, finishBookCardListNode, unfinishBookCardListNode)
    }
  }

  // reset search button to reset book card list to default condition
  const resetSearchBtn = document.getElementById('reset-search-button')
  resetSearchBtn.onclick = () => {
    if (searchResultSection.parentElement.classList.contains('is-hidden') === false) {
      searchResultSection.parentElement.classList.add('is-hidden')
    }
    searchResultSection.removeChild(searchResultSection.lastChild)

    // reset search input field
    searchInput.value = ''

    // load all book data from localstorage
    const allBookData = getAllBookData()
    renderBookCardList(allBookData, finishBookCardListNode, unfinishBookCardListNode)
  }

  bulmaModalManager()
}

export default renderBookCardList
