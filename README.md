# Event Scheduler

A phone app created for a project in VCOM462 - its purpose is to create a schedule of events in the area based off of the users' preferences.

## Setup repo

    * Create a folder on your pc where you want to store the project
    * CD to the folder
    * Type: git clone https://github.com/phamc2/project2-phoneapp.git
    * CD into the newly downloaded project folder
    
## Basic workflow
If you have your own workflow, that's fine, do whatever is comfortable for you. This is a basic workflow of how to use github through CLI. This is good practice to prevent corruption of the master files and allows multiple people to work on the project at the same time.

    1. ALWAYS make sure you are on master: git checkout master
    2. ALWAYS update to the latest version of the project before working: git pull origin master
    3. Create a new branch to work off of: git checkout -b newBranchName
    4. Work (Write code, stress test, etc.)
    5. To save your progress/ the changes you've made: git add .
    6. COMMIT YOUR WORK or it will be lost: git commit -m "Type a msg here to generally explain your changes"
    7. Before pushing, make sure your master is up to date:
            git checkout master
            git pull origin master
            git checkout branchNameCreatedOnStep3
            git merge master
    8. The master file on your pc should now match the one on git: git push origin branchNameCreatedOnStep3
    9. Create a pull request merging your new branch into master

## Usage

#### PhoneGap CLI

The hello-world template is the default when you create a new application using the [phonegap-cli][phonegap-cli-url].

    phonegap create my-app

Create an app using this template specifically:

    phonegap create my-app --template hello-world

To see a list of other available PhoneGap templates:

    phonegap template list

## [config.xml][config-xml]

#### android-minSdkVersion (Android only)

Minimum SDK version supported on the target device. Maximum version is blank by default.

This template sets the minimum to `14`.

    <preference name="android-minSdkVersion" value="14" />

#### &lt;access ...&gt; (All)

This template defaults to wide open access.

    <access origin="*" />

It is strongly encouraged that you restrict access to external resources in your application before releasing to production.

For more information on whitelist configuration, see the [Cordova Whitelist Guide][cordova-whitelist-guide] and the [Cordova Whitelist Plugin documentation][cordova-plugin-whitelist]

## [www/index.html][index-html]

#### Content Security Policy (CSP)

The default CSP is similarly open:

    <meta http-equiv="Content-Security-Policy" content="default-src * 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *" />

Much like the access tag above, you are strongly encouraged to use a more restrictive CSP in production.

A good starting point declaration might be:

    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: 'unsafe-inline' https://ssl.gstatic.com; style-src 'self' 'unsafe-inline'; media-src *" />

For more information on the Content Security Policy, see the [section on CSP in the Cordova Whitelist Plugin documentation][cordova-plugin-whitelist-csp].

Another good resource for generating a good CSP declaration is [CSP is Awesome][csp-is-awesome]


[phonegap-cli-url]: http://github.com/phonegap/phonegap-cli
[cordova-app]: http://github.com/apache/cordova-app-hello-world
[bithound-img]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world/badges/score.svg
[bithound-url]: https://www.bithound.io/github/phonegap/phonegap-app-hello-world
[config-xml]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/config.xml
[index-html]: https://github.com/phonegap/phonegap-template-hello-world/blob/master/www/index.html
[cordova-whitelist-guide]: https://cordova.apache.org/docs/en/dev/guide/appdev/whitelist/index.html
[cordova-plugin-whitelist]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist
[cordova-plugin-whitelist-csp]: http://cordova.apache.org/docs/en/latest/reference/cordova-plugin-whitelist#content-security-policy
[csp-is-awesome]: http://cspisawesome.com
