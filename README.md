<p align="center">
   <img src="https://i.ibb.co/ZNX0Y6S/header.jpg" alt="Twitter Clone" alt="header" border="0">
</p>

# Twitter Clone API

[![Author](https://img.shields.io/badge/author-RamonMacêdo-457b9d?style=flat-square)](https://github.com/RamonMacedo)
[![Stars](https://img.shields.io/github/stars/RamonMacedo/remote-work-test?color=457b9d&style=flat-square)](https://github.com/RamonMacedo/remote-work-test/stargazers)
[![Contributors](https://img.shields.io/github/contributors/RamonMacedo/remote-work-test?color=457b9d&style=flat-square)](https://github.com/RamonMacedo/remote-work-test/graphs/contributors)

# :pushpin: Table of Contents

* [Features](#rocket-features)
* [Installation](#construction_worker-installation)
* [Getting Started](#runner-getting-started)
* [FAQ](#postbox-faq)
* [License](#closed_book-license)

# :rocket: Features

* Users CRUD
* Posts CRUD
* Comments CRUD
* Users can also create and edit their comments in other Posts, and the authenticated user of Post no can delete other users' comments.

# :construction_worker: Installation

**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then in order to clone the project via HTTPS, run this command:**

```git clone https://github.com/RamonMacedo/remote-work-test.git```

# :runner: Getting Started

Run the transactions in order to configure the database schema

```yarn or npm typeorm migration:run```

Run the following command in order to start the application in a development environment:

  ```
  // Start the server
     yarn dev
  ```
  
## Status Codes

Twitter Clone returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 422 | `UNAUTHORIZED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |

# :postbox: Faq

**Question:** What are the tecnologies used in this project?

**Answer:** The tecnologies used in this project are [NodeJS](https://nodejs.org/en/) + [Express Framework](http://expressjs.com/en/) to handle the server and [Typeorm](https://typeorm.io/)

# :closed_book: License

Released in 2020.
This project is under the [MIT license](https://github.com/RamonMacedo/remote-work-test/master/LICENSE).

Made with love by [Ramon Macedo](https://github.com/RamonMacedo) 🖤🚀
