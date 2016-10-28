Imagine we have books resource

1 - How many pug templates would you create for this resource?


2 - What would be the names of those pages. Write this as a list of named templates and explain What
each template should render?

ANSWER
=========
I would probably have 4 templates/pages:

- views/books/new.pug            ----- New Book Form page
- views/books/show.pug           ----- Book Page
- views/books/index.pug          ----- Display List of Books page
- views/books/edit.pug           ----- Edit Book Form page

if it was movies:

- views/movies/new.pug
- views/movies/show.pug
- views/movies/index.pug
- views/movies/edit.pug

If we wanted to show multiple resources in one page, that page represents a resource/relationship:

- views/library/index.pug  #=> can display both movies and books as a list in one page

If we had a categories list page:

- views/categories/show.pug --- show one category page(show all books in one category)
- views/categories/index.pug -- list of categories page
