# AllspringTechHubLandingPage

<!-- provides for back-to-top link -->
<a name="readme-top"></a>

<!-- PROJECT LOGO, TITLE, DESCRIPTION -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Allspringer Experience Landing Page aka TechHub</h3>

  <p align="center">
    TechHub front page - Links for support, guidance for requesting tickets
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<!-- within each listitem is alink to the section
 further down in the readme -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

<!--- use thie example below to add a screenshot if desirted --->
[![Product Name Screen Shot][product-screenshot]](https://example.com)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
* ![Javascript]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![PapaParse][papaparse.com]][PapaParse-url]
* [![PHP][php.net]][PHP-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Any hosting service supporting PHP and the ability for PHP to upload files to the server will suffice.  Below are instructions to self-host on Appache 2 running on Linux

### Prerequisites

* Apache web server
  ```sh
  sudo apt update
  sudo apt upgrade
  sudo apt install apache2
  ```
* PHP
  ```sh
  sudo apt install libapache2-mod-php8.2
  ```


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Allspring-Cloud/AllspringTechHubLandingPage.git
   ```
2. Deploy the site
   ```
   Copy the contents of teh repos html folder to Apache's html folder on teh server
   ```
3. Change the ownership of the 'data', 'logs' and 'upload' folders to the Apache user
   ```sh
   # this assumes the Apache user is 'www-data'
   sudo chown -R www-data:www-data data
   sudo chown -R www-data:www-data upload
   sudo chown -R www-data:www-data logs
   ```
4. Make the 'data', 'logs' and 'upload' folders writable for the Apache user
   ```sh
   # this assumes the Apache user is 'www-data'
   sudo chmod -R 777 data
   sudo chmod -R 777 upload
   sudo chmod -R 777 logs
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES 
Use this section to define formatting for links/logos
-->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links 
https://shields.io/
-->
[product-screenshot]: images/screenshot.png
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[papaparse.com]: https://img.shields.io/badge/PapaParse-0769AD?style=for-the-badge&logo=papaparse&logoColor=white
[PapaParse-url]: https://www.papaparse.com/
[Javascript]: https://img.shields.io/badge/Javascript-dfca09?style=for-the-badge&logo=javascript&logoColor=ffffff
[php.net]: https://img.shields.io/badge/PHP-777BB4?logo=php&logoColor=white
[PHP-url]: https://www.php.net/
