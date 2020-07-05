---
title: Site update
date: 2020-07-05T21:00:00.000Z
description: I decided to use lockdown to update my site using some modern tech.
tags:
  - site-updates
layout: post
post: true
---

I decided to use these strange times during the lockdown of the UK to update my
site from an outdated single static file into something a little more
advanced. In this post I'll give a _quick_ summary of this process and the
decisions I made along the way.

## Planning

Before starting this project I outlined what I wanted to achieve with this
update. I managed to break this down into a few main goals. The first was to
introduce a blog to the site, ideally I wanted to write in Markdown with basic
asset hosting. Secondly, I wanted to keep it as simple as possible to
maintain/update and deploy, the previous deployment process was lacking in every
way, think FTP with drag and drop. I wanted not only to have blog posts on the
site but to be able to post external links to articles I enjoyed whilst being
able to add simple notes of one or two sentences for quick thoughts.

For styling I was happy with the simple layout of the previous version of the
site. Finally, it had to be fast, for what I wanted from the site there was no
need to have an overly bloated website with megabytes of CSS/JavaScript etc
simple small html pages should be enough.

## Research

Based on the requirements and previous experience I decided the site would use
some form of static site generator. Things such as plugins, changable themes and
more advanced CMS features just seemed out of scope for my personal site and
more hassle than it would be worth. Keeping my ear fairly close to the ground
within this area there were multiple options I knew of:

- 11ty - a node based generator. Multiple writing and template formating.
- Gatsby - react based static site generator. Component based theming.
- Hugo - GO lang static site generator. Fast generation.

Based on a quick assessment of these three options I decided to go with 11ty.
There were a few reasons for this: I'm not too familiar with GO so that took
hugo out of the race. The component based nature of Gatsby would make the site
highly customisable and great at interacting with external datasources, but for
a very _basic_ site just seemed like overkill.

With 11ty, I would be able to get the site set up in a handful of template files
and some basic configuration. It also met all the requirements I set out and has
a lot of points of extensibilty should I wish to take advantage of this in the
future. During this research I also decided I would be moving my hosting. For
this, Netlify seemed like the suitable choice. They offer a great solution for
hosting static sites, with easy deployments which I'll go into further detail
with later. They also offer a Git integrated [CMS](https://www.netlifycms.org/)
that will allow me to manage the posts without needing to use Git, I see myself
correcting all my typos with this.

## Development

The development process was straight forward and took a couple of hours
stretched across a few days. This post probably took longer to write. There are
plenty of boilerplate projects to start from, I used the
[eleventy-base-blog](https://github.com/11ty/eleventy-base-blog) as the base for
this site. This boilerplate uses nunjunks as the templating lanuage and markdown
as the writing format. Modifying the templates to accept the custom post types
of external links and notes I wanted was as simple as a couple of if statements
and some HTML. I could then optionally turn a post into a link or note using the
yaml config of the post. As mentioned I wanted to keep the site pretty similar
in term as style as the old version, so I just reused the previous site styles
as a set base styles. There were a handful of new UI elements added for the new
blog pages, navigation and image size styles. All of this can be seen in the
[index.client.css](https://github.com/last1here/ashleyburg.es/blob/master/src/_includes/index.client.css).

A few more plugins were added for syntax highlight, read time estimation and the
ability to define image sizes in markdown. Basic SEO was setup by default for which I
added some social meta tags to improve this a bit. As highlighted earlier an
import goal for the site was to be pretty fast, as all the components of the
site are simple html and images it was already fast at this point. But, there
was 2 tiny files being requested on every page for the required JS and CSS,
inlining and minifying these into the HTML as part of the build process
decreased the average load time by a few 100ms. Caching these files would have
helped for returning visitors but as the files are so small the added size to the
html is negligable. The final configuration to get this all working can be seen
in the
[.eleventy.js](https://github.com/last1here/ashleyburg.es/blob/master/.eleventy.js)
file.

Next was setting up Netlify CMS. The initial set up was as simple as adding a
`/admin` folder with an `index.html` that imported the required js files from a
CDN. Making sure 11ty copied this over to the `_site` folder during build was a
[single](https://github.com/last1here/ashleyburg.es/blob/master/.eleventy.js#L103)
line change. After that configuring the admin panel to support the three post
types is done via a `config.yml` file. A couple of advanced customisations were
added such as the custom preview templates for the editor and the local Git
repository editing beta feature.

## Deployment

The previous version of the site had a pretty tedious deployment process. It
involved me manually uploading the source files to the server via FTP every time
an update was needed, probably why I hadn't updated it in years. Netlify greatly
improved this with automatic deployments straight from Github. From within the
Netlify UI selecting the repo to deploy, the build script and the resulting dist
folder to publish, had it set up and auto-deploying in seconds.

Finally pointing my domain to Netlify's load balancer was completed following
their
[documentation](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/#configure-a-subdomain).
This was probably one of the harder tasks to achieve as I still had files and
other sub-sites I was hosting for friends and family (mainly Wordpress), on my
previous setup. Moving these into the new site would clutter the repo and in the
case of the sub-sites would not really be possible. I was able to come up with a
simple solution that involved pointing the primary domain to Netlify and use
[redirects](https://docs.netlify.com/routing/redirects/#app) to point to a
secondary domain I will use for the previous host.

## Conclusion

In conclusion 11ty is an easy to use and customisable static site generator. The
overall setup of the site was pretty quick, you can see the end result on the
page you're currently on or visit the [home page](/). Netlify simplifys the
deployment process which will remove that excuse for me to not post things, I'm
sure I'll find another. The finished site fulfills all the goels I set at the
beginning although I have future plans for a handful of nice to haves features.
At some point I will get around to adding them. Leaving them here to hold myself
accountable;

- Previous post navigation.
- In post navigation, add some way to jump between artical heading.
- Complex excerpt images and formating.
- Article references sections, could use something like [markdown-it
  footnotes](https://github.com/markdown-it/markdown-it-footnote) and some
  custom styles.
- Figure/image captions within markdown.
