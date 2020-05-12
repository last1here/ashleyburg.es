import Post from '/admin/preview-templates/post.js';
import Note from '/admin/preview-templates/note.js';

CMS.registerPreviewTemplate('blog', Post);
CMS.registerPreviewTemplate('note', Note);

CMS.registerPreviewStyle('/_includes/index.client');
