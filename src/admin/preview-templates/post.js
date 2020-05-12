import htm from 'https://unpkg.com/htm?module';
import format from 'https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module';

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`<div class="tmpl-post">
      <header>
        <div class="header-container">
          <div class="page-heading container">
            <h1>${entry.getIn(['data', 'title'], null)}</h1>

            <div class="intro">
              <span class="postlist-meta">
                <time class="postlist-date">
                  ${format(
                    entry.getIn(['data', 'date'], new Date()),
                    'dd LLL yyyy',
                  )}
                </time>
                <span class="postlist-reading">X mins</span>
              </span>

              <ul class="tags">
                ${entry.getIn(['data', 'tags'], []).map(
                  (tag) =>
                    html`<li>
                      <a href="#" class="tag" rel="tag">${tag}</a>
                    </li> `,
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>

      <main>
        <p>
          <small
            >description: ${entry.getIn(['data', 'description'], '')}</small
          >
        </p>

        <article>
          ${this.props.widgetFor('body')}
        </article>
      </main>
    </div>`;
  },
});

export default Post;
