const searchClient = algoliasearch(
  '<your_application_id>',
  '<search/api/key>'
);

const search = instantsearch({
  indexName: 'wine-reviews',
  searchClient,
  searchFunction(helper) {
    const container = document.querySelector('#hits');
    if (helper.state.query === '') {
      container.style.display = 'none';
    } else {
      container.style.display = '';
    }
    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#searchbox',
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '#hits',
    hitsPerPage: 5,
    templates: {
      item: '<p>{{{_highlightResult.title.value}}}<ul><li>{{{_highlightResult.description.value}}}</li><li>Price: {{{_highlightResult.price.value}}}</li><li>Points: {{{_highlightResult.point.value}}}</li><li>Country: {{{_highlightResult.country.value}}}</li><li>Winery: {{{_highlightResult.winery.value}}}</li><li>Taster: {{{taster}}}</li></ul></p>',
      empty: "No results for the search <em>\"{{query}}\"</em>"
    },
  })
);

search.start();


