---
title: Site update
description: I've decided to update my site using some more modern tech.
date: 2020-05-02
tags:
  - site-updates
layout: post
post: true
---

I decided to use this strange time within the world to update my site from an
aging single page manual html to something a little more advanced. In this post
I'll give a quick summary of the decisions I made and the reasons why. One of
the primary reasons to update my site was to use it as more of a personal
portfolio, something the previous iteration didnt particularly offer.

## Planning

The intial step I

<!-- ## Features

```js/2-3
// this is a command
function myCommand() {
	let counter = 0;
	counter++;
}

// Test with a line break above this line.
console.log('Test');
``` -->

## Deployment

The previous version of the site had a pretty tedious deployment process, it
involved me manually uploading the source files to the server via FTP every time
an update was needed, probably why I didnt update it in years. To improve this,
during the updates of the site alternative options were explored. Potential
solutions involved moving hosting provider to a service like Netlify. Although
migrating the site would be faily trival and the deployment process would be
vastly improved there are various services linked to the current hosting
provider such as email that would require a more complex changes.

So to improve on deployments and not become a time-sink using a middle ground
was settled on. Github Actions was used to achieve this. Using actions allows
both the building of the site and the deployment to be contained in a single
yaml file. There is a FTP action that allows simple file copy over FTP so there
was no requirement to move hosting provider. You can see the whole action script
on the [Github repo](https://github.com/last1here/ashleyburg.es) for this site.

## Future plans

I have future plans for a handful of nice to haves at some point I will get
around to adding them, leaving them here to hold myself accountable;

- Previous post navigation.
- In post navigation, add some way to jump between artical heading.
- Complex excerpt images and formating.
- Article references sections, could use [markdown-it
  footnotes](https://github.com/markdown-it/markdown-it-footnote).
- Figure/image captions within markdown.
