## /api/signin (signing in)

##### /api/signin/admin

- admin signin

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

##### /api/signin/freelancer

- freelancer signin

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

##### /api/signin/client

- client signin

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

## /api/signup (signing up)

##### /api/signup/freelancer

- freelancer signup

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

##### /api/signup/client

- client signup

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

## /api/admin (admin account)

### /api/admin/account (signing up)

#### /api/admin/account/delete

##### /api/admin/account/delete/freelancer

- delete freelancer

- `DELETE`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

##### /api/admin/account/delete/client

- delete client

- `DELETE`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/admin/project (dealing with projects)

#### /api/admin/project/getAll

- see list of all projects

- `GET`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/admin/project/modify

- modify project unless it's currently ongoing

- `PUT`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/admin/project/delete

- delete project unless it's currently ongoing

- `DELETE`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/admin/team (dealing with teams)

#### /api/admin/team/modify

- modify team info unless it's currently working on a
  project

- `PUT`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/admin/team/delete

- delete team info unless it's currently working on a
  project

- `DELETE`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

## /api/freelancer (freelancer account)

### /api/freelancer/account (account information)

#### /api/freelancer/account/modify

- modify personal information (except email address)

- `PUT`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/freelancer/portfolio (project portfolio)

#### /api/freelancer/portfolio/getAll

- see list of all completed projects 

- `POST`

- request body

  ```
  {
      sortScheme: 
  }
  ```

- response body

  ```
  
  ```

#### /api/freelancer/portfolio/getInternal

- see list of all completed internal projects 

- `POST`

- request body

  ```
  {
      sortScheme:
  }
  ```

- response body

  ```
  
  ```

#### /api/freelancer/portfolio/getExternal

- see list of all completed external projects 

- `POST`

- request body

  ```
  {
      sortScheme:
  }
  ```

- response body

  ```
  
  ```

#### /api/freelancer/portfolio/registerExternal

- register an external project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/freelancer/project (projects)

#### /api/freelancer/project/getAll

- see list of all available projects

- `GET`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/project/getForMe

- see list of projects satisfying my experience and
  language proficiency

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/project/getInfo

- see detailed information about a particular project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/freelancer/project/apply

- apply for a particular project (must satisfy
  requirements)

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/project/getApplied

- see list of all projects that I applied for

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/project/getCurrent

- see list of all projects that I'm currently working
  on

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/freelancer/finish (submitting a request to finish a project)

#### /api/freelancer/finish/submit

- submit a request to finish the project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/finish/rateClient

- IF the project-finish request was accepted, rate the
  client

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/freelancer/finish/getDenialMessage

- IF the project-finish request was denied, check the
  denial message

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

## /api/client (client account)

### /api/client/project (projects)

#### /api/client/project/register

- register a project to be seen by freelancers

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/project/getCurrent

- see list of all projects I've registered currently being
  worked on

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/project/getRegistered

- see list of all projects I've registered, both completed
  and uncompleted

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/project/getCompleted

- see list of all projects I've registered that have been
  completed

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/project/getApplicants

- see list of applicants (both individual and team) that
  applied to a particular project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/project/acceptedApplicant

- accept an applicant for a particular project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

### /api/client/finish (submitting a request to finish a project)

#### /api/client/finish/getSubmissions

- get list of project-finish requests submitted

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/finish/accept

- accept a project-finish request for a particular
  project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```

#### /api/client/finish/deny

- deny a project-finish request for a particular
  project

- `POST`

- request body

  ```
  
  ```

- response body

  ```
  
  ```


