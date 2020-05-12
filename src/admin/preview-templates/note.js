import htm from 'https://unpkg.com/htm?module';
import format from 'https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module';

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
  render() {
    const entry = this.props.entry;

    return html`<div class="container">
      <ul class="postlist">
        <li class="postlist-item postlist-item-note">
          <h2>${entry.getIn(['data', 'title'], null)}</h2>
          <small class="external-mark">(note)</small>
          <span class="postlist-meta">
            <time class="postlist-date">
              ${format(
                entry.getIn(['data', 'date'], new Date()),
                'dd LLL yyyy',
              )}
            </time>
          </span>
          <div class="postlist-summary">
            ${this.props.widgetFor('body')}
          </div>
        </li>
      </ul>
    </div>`;
  },
});

export default Post;
