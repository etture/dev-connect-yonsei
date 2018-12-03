## Host: *https://dev-connect-yonsei.herokuapp.com*

# API Endpoints

- [signing in (/api/signin)](#apisignin-(signing-in)) 

  - [x] [/api/signin/admin](#apisigninadmin) `POST`
  - [x] [/api/signin/freelancer](#apisigninfreelancer) `POST`
  - [x] [/api/signin/client](#apisigninclient) `POST`

- [signing up (/api/signup)](#apisignup-(signing-up))

  - [x] [/api/signup/freelancer](#apisignupfreelancer) `POST`
  - [x] [/api/signup/client](#apisignupclient) `POST`

- [admin account (/api/admin)](#apiadmin-(admin-account))

  - [deleting accounts (/api/admin/account/delete)](#apiadminaccountdelete)
    - [x] [/api/admin/account/delete/freelancer](#apiadminaccountdeletefreelancer) `DELETE`
    - [x] [/api/admin/account/delete/client](#apiadminaccountdeleteclient) `DELETE`

  - [dealing with projects (/api/admin/project)](#apiadminproject-(dealing-with-projects))
      - [ ] [/api/admin/project/getAll](#apiadminprojectgetall) `GET`
      - [ ] [/api/admin/project/modify](#apiadminprojectmodify) `PUT`
      - [ ] [/api/admin/project/delete](#apiadminprojectdelete) `DELETE`
  - [dealing with teams (/api/admin/team)](#apiadminteam-(dealing-with-teams)) 
    - [ ] [/api/admin/team/modify](#apiadminteammodify) `PUT`
    - [ ] [/api/admin/team/delete](#apiadminteamdelete) `DELETE`

- [freelancer account (/api/freelancer)](#apifreelancer-(freelancer-account))

  - [account information (/api/freelancer/account)](#apifreelanceraccount-(account-information))
    - [ ] [/api/freelancer/account/modify](#apifreelanceraccountmodify) `PUT`
  - [project portfolio (/api/freelancer/portfolio)](#apifreelancerportfolio-(project-portfolio))
    - [ ] [/api/freelancer/portfolio/getAll](#apifreelancerportfoliogetall) `POST`
    - [ ] [/api/freelancer/portfolio/getInternal](#apifreelancerportfoliogetInternal) `POST`
    - [ ] [/api/freelancer/portfolio/getExternal](#apifreelancerportfoliogetexternal) `POST`
    - [ ] [/api/freelancer/portfolio/registerExternal](#apifreelancerportfolioregisterexternal) `POST`
  - [projects (/api/freelancer/project)](#apifreelancerproject-(projects))
    - [ ] [/api/freelancer/project/getAll](#apifreelancerprojectgetall) `GET`
    - [ ] [/api/freelancer/project/getForMe](#apifreelancerprojectgetforme) `POST`
    - [ ] [/api/freelancer/project/getInfo](#apifreelancerprojectgetinfo) `POST`
    - [ ] [/api/freelancer/project/apply](#apifreelancerprojectapply) `POST`
    - [ ] [/api/freelancer/project/getApplied](#apifreelancerprojectgetapplied) `POST`
    - [ ] [/api/freelancer/project/getCurrent](#apifreelancerprojectgetcurrent) `POST`
  - [related to teams (/api/freelancer/team)](#apifreelancerteam-(related-to-teams))
    - [ ] [/api/freelancer/team/create](#apifreelancerteamcreate) `POST`
    - [ ] [/api/freelancer/team/join](#apifreelancerteamjoin) `POST`
    - [ ] [/api/freelancer/team/leave](#apifreelancerteamleave) `POST`
    - [ ] [/api/freelancer/team/apply](#apifreelancerteamapply) `POST`
    - [ ] [/api/freelancer/team/finish/submit](#apifreelancerteamfinishsubmit) `POST`
    - [ ] [/api/freelancer/team/finish/rateClient](#apifreelancerteamfinishrateclient) `POST`
  - [submitting a request to finish a project (/api/freelancer/finish)](#apifreelancerfinish-(submitting-a-request-to-finish-a-project))
    - [ ] [/api/freelancer/finish/submit](#apifreelancerfinishsubmit) `POST`
    - [ ] [/api/freelancer/finish/rateClient](#apifreelancerfinishrateclient) `POST`

- [client account (/api/client)](#apiclient-(client-account))

  - [projects (/api/client/project)](#apiclientproject-(projects))
    - [ ] [/api/client/project/register](#apiclientprojectregister) `POST`
    - [ ] [/api/client/project/getCurrent](#apiclientprojectgetcurrent) `POST`
    - [ ] [/api/client/project/getRegistered](#apiclientprojectgetregistered) `POST`
    - [ ] [/api/client/project/getCompleted](#apiclientprojectgetcompleted) `POST`
    - [ ] [/api/client/project/getApplicants](#apiclientprojectgetapplicants) `POST`
    - [ ] [/api/client/project/acceptApplicant](#apiclientprojectacceptapplicant) `POST`
  - [submitting a request to finish a project (/api/client/finish)](#apiclientfinish-(submitting-a-request-to-finish-a-project))
      - [ ] [/api/client/finish/getSubmissions](#apiclientfinishgetsubmissions) `POST`
      - [ ] [/api/client/finish/accept](#apiclientfinishaccept) `POST`
      - [ ] [/api/client/finish/reject](#apiclientfinishreject) `POST`
      - [ ] [/api/client/finish/rate](#apiclientfinishrate) `POST`



## /api/signin (signing in)

##### /api/signin/admin

- admin signin

- `POST`

- request body

  ```
  {
      "email": email address,
      "password": password
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "admin_idx": admin idx,
      "error_message": error message is failed
  }
  ```

##### /api/signin/freelancer

- freelancer signin

- `POST`

- request body

  ```
  {
      "email": email address,
      "password": password
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "freelancer_idx": freelancer idx,
      "error_message": error message is failed
  }
  ```

##### /api/signin/client

- client signin

- `POST`

- request body

  ```
  {
      "email": email address,
      "password": password
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "client_idx": client idx,
      "error_message": error message is failed
  }
  ```

## /api/signup (signing up)

##### /api/signup/freelancer

- freelancer signup

- `POST`

- request body

  ```
  {
      "email": email address,
      "password": password,
      "name": name,
      "age": age (integer),
  	"major": major,
  	"phone": phone number (string),
  	"experience": # of years of experience (integer)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "freelancer_idx": freelancer idx,
      "error_message": error message is failed
  }
  ```

##### /api/signup/client

- client signup

- `POST`

- request body

  ```
  {
      "email": email address,
      "password": password,
      "name": "name",
      "phone": phone number (string)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "client_idx": client idx,
      "error_message": error message is failed
  }
  ```

## /api/admin (admin account)

### /api/admin/account

##### /api/admin/account/delete/freelancer

- delete freelancer

- `DELETE`

- request body

  ```
  {
      "freelancer_idx": freelancer idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message is failed
  }
  ```

##### /api/admin/account/delete/client

- delete client

- `DELETE`

- request body

  ```
  {
      "client_idx": client idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message is failed
  }
  ```

### /api/admin/project (dealing with projects)

#### /api/admin/project/getAll

- see list of all available projects

- `GET`

- request body

  ```
  no body required
  ```

- response body

  ```
  {
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		{
              "idx": project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		...
      ]
  }
  ```

#### /api/admin/project/modify

- modify project unless it's currently ongoing

- `PUT`

- request body

  - Must include project idx, then optionally include items to be modified

  ```
  {
      "project_idx": project idx (REQUIRED),
      "start_date": start date (OPTIONAL),
      "end_date": end date (OPTIONAL),
      "min_part": # of minimum participants (OPTIONAL),
      "max_part": # of maximum participants (OPTIONAL),
      "experience": # years experience required (OPTIONAL),
      "pay": pay in Korean Won (OPTIONAL),
      "req_doc": blob of req document if exists (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message is failed
  }
  ```

#### /api/admin/project/delete

- delete project unless it's currently ongoing

- `DELETE`

- request body

  ```
  {
      "project_idx": project idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/admin/team (dealing with teams)

#### /api/admin/team/modify

- modify team info unless it's currently working on a
  project

- `PUT`

- request body

  - Must include team idx, then optionally include items to be modified

  ```
  {
      "team_idx": team idx (REQUIRED),
  	"name": team name (OPTIONAL),
  	"comment": comment (OPTIONAL),
  	"leader_idx": leader idx (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/admin/team/delete

- delete team info unless it's currently working on a
  project

- `DELETE`

- request body

  ```
  {
      "team_idx": team idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

## /api/freelancer (freelancer account)

### /api/freelancer/account (account information)

#### /api/freelancer/account/modify

- modify personal information (except email address)

- `PUT`

- request body

  - Must include freelancer idx, then optionally include items to be modified

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "password": password (OPTIONAL),
      "name": name (OPTIONAL),
      "age": age (integer) (OPTIONAL),
  	"major": major (OPTIONAL),
  	"phone": phone number (string) (OPTIONAL),
  	"experience": # of years of experience (integer) (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/freelancer/portfolio (project portfolio)

#### /api/freelancer/portfolio/getAll

- see list of all completed projects 

- `POST`

- request body

  - must include freelancer idx
  - must include sort scheme, whether to sort projects by start_date, end_date, or pay
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start" OR "end" OR "pay" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  - Each item in the portfolio array has the "int_or_ext" attribute, which tells you whether it's an internal or external project

  ```
  {
      portfolio: [
          {
              "int_or_ext": "int",
              "idx": internal project idx,
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of req document if exists
          },
          {
              "int_or_ext": "ext",
              "idx": external project idx,
              "start_date": start date,
              "end_date": end date,
              "pay": pay in Korean Won,
              "attachment": blob of attached document if exists, 
              "comment": comment on external project
          },
          ...
      ]
  }
  ```

#### /api/freelancer/portfolio/getInternal

- see list of all completed internal projects 

- `POST`

- request body

  - must include freelancer idx
  - must include sort scheme, whether to sort projects by start_date, end_date, or pay
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start" OR "end" OR "pay" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  ```
  {
      internal: [
          {
              "idx": internal project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of req document if exists
          },
          {
              "idx": internal project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of req document if exists
          },
          ...
      ]
  }
  ```

#### /api/freelancer/portfolio/getExternal

- see list of all completed external projects 

- `POST`

- request body

  - must include freelancer idx
  - must include sort scheme, whether to sort projects by start_date, end_date, or pay
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start" OR "end" OR "pay" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  ```
  {
      external: [
          {
              "idx": external project idx (1),
              "start_date": start date,
              "end_date": end date,
              "pay": pay in Korean Won,
              "attachment": blob of attached document if exists, 
              "comment": comment on external project
          },
          {
              "idx": external project idx (2),
              "start_date": start date,
              "end_date": end date,
              "pay": pay in Korean Won,
              "attachment": blob of attached document if exists, 
              "comment": comment on external project
          },
          ...
      ]
  }
  ```

#### /api/freelancer/portfolio/registerExternal

- register an external project

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "start_date": start date (YYYY-MM-DD) (REQUIRED),
      "end_date": end date (YYYY-MM-DD) (REQUIRED),
      "pay": pay in Korean Won (integer) (REQUIRED),
      "attachment": blob of attachment if exists (OPTIONAL),
      "comment": comment on external project (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/freelancer/project (projects)

#### /api/freelancer/project/getAll

- see list of all available projects

- `GET`

- request body

  ```
  no body required
  ```

- response body

  ```
  {
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		{
              "idx": project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		...
      ]
  }
  ```

#### /api/freelancer/project/getForMe

- see list of projects satisfying my experience and
  language proficiency

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx
  }
  ```

- response body

  - get list of projects that satisfy my specs

  ```
  {
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		{
              "idx": project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		...
      ]
  }
  ```

#### /api/freelancer/project/getInfo

- see detailed information about a particular project

- `POST`

- request body

  ```
  {
      "project_idx": internal project idx
  }
  ```

- response body

  ```
  {
      "idx": project idx,
      "client_idx": client idx,
      "start_date": start date,
      "end_date": end date,
      "min_part": # of minimum participants,
      "max_part": # of maximum participants,
      "experience": # years experience required,
      "pay": pay in Korean Won,
      "req_doc": blob of request document if exists,
      "language_req": [
          {
              "language": name of programming language,
              "proficiency": proficiency level (integer)
          },
          {
              "language": name of programming language,
              "proficiency": proficiency level (integer)
          },
          ...
      ]
  }
  ```

#### /api/freelancer/project/apply

- apply for a particular project as an individual (must satisfy
  requirements)

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx,
      "project_idx": project idx
  }
  ```

- response body

  - if success, the application went through successfully
  - doesn't mean you got the project yet
  - if fail, you didn't satisfy the project requirements

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/project/getApplied

- see list of all projects that I applied for

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx
  }
  ```

- response body

  - list of internal projects I've applied to

  ```
  {
      applied: [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		{
              "idx": project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		...
      ]
  }
  ```

#### /api/freelancer/project/getCurrent

- see list of all projects that I'm currently working
  on

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx
  }
  ```

- response body

  ```
  {
      current: [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		{
              "idx": project idx (2),
              "client_idx": client idx,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
  		...
      ]
  }
  ```

### /api/freelancer/team (related to teams)

#### /api/freelancer/team/create

- create a freelancer team

- the freelancer who creates a team becomes the leader

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "name": team name (REQUIRED),
      "comment": comment on team (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/team/join

- join a freelancer team

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx,
      "team_idx": team idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/team/leave

- leave a freelancer team

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx,
      "team_idx": team idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/team/apply

- apply for a particular project as a team (must satisfy
  requirements)

- only the leader can apply for a project as a team

- `POST`

- request body

  - freelancer idx must be that of the team leader

  ```
  {
      "freelancer_idx": freelancer idx,
      "team_idx": team idx,
      "project_idx": project idx
  }
  ```

- response body

  - if success, the application went through successfully
  - doesn't mean your team got the project yet
  - if fail, your team didn't satisfy the project requirements

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/team/finish/submit

- submit a request to finish the project (team)

- `POST`

- request body

  - only team leader can submit team project-finish request

  ```
  {
      "freelancer_idx": freelancer idx (must be team leader),
      "team_idx": team idx,
      "project_idx": project idx
  }
  ```

- response body

  - if success, the request to finish went through successfully
  - doesn't mean you finished the project yet

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/team/finish/rateClient

- IF the project-finish request was accepted, rate the
  client

- `POST`

- request body

  - only team leader can rate client

  ```
  {
      "freelancer_idx": freelancer idx (must be team leader),
      "team_idx": team idx,
      "project_idx": project idx,
      "rating": floating point # from 0 to 5
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/freelancer/finish (submitting a request to finish a project)

#### /api/freelancer/finish/submit

- submit a request to finish the project

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx,
      "project_idx": project idx
  }
  ```

- response body

  - if success, the request to finish went through successfully
  - doesn't mean you finished the project yet

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/freelancer/finish/rateClient

- IF the project-finish request was accepted, rate the
  client

- `POST`

- request body

  ```
  {
      "freelancer_idx": freelancer idx,
      "project_idx": project idx
      "rating": floating point # from 0 to 5
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

## /api/client (client account)

### /api/client/project (projects)

#### /api/client/project/register

- register a project to be seen by freelancers

- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "start_date": start date,
      "end_date": end date,
      "min_part": # of minimum participants,
      "max_part": # of maximum participants,
      "experience": # years experience required,
      "pay": pay in Korean Won,
      "req_doc": blob of request document if exists
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/client/project/getCurrent

- see list of all projects I've registered currently being
  worked on

- `POST`

- request body

  ```
  {
      "client_idx": client_idx
  }
  ```

- response body

  - list of projects with `status` = 'working'

  ```
  {
      current: [
          {
          	"idx": project idx (1),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "working"
          },
          {
          	"idx": project idx (2),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "working"
          },
          ...
      ]
  }
  ```

#### /api/client/project/getRegistered

- see list of all projects I've registered, both completed
  and uncompleted

- `POST`

- request body

  ```
  {
      "client_idx": client idx
  }
  ```

- response body

  - list of all projects I've registered

  ```
  {
      registered: [
          {
          	"idx": project idx (1),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
          {
          	"idx": project idx (2),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists
          },
          ...
      ]
  }
  ```

#### /api/client/project/getCompleted

- see list of all projects I've registered that have been
  completed

- `POST`

- request body

  ```
  {
      "client_idx": client idx
  }
  ```

- response body

  - list of projects with `status` = 'completed'

  ```
  {
      completed: [
          {
          	"idx": project idx (1),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "completed"
          },
          {
          	"idx": project idx (2),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "completed"
          },
          ...
      ]
  }
  ```

#### /api/client/project/getApplicants

- see list of applicants (both individual and team) that
  applied to a particular project

- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "project_idx": project idx
  }
  ```

- response body

  - for each applicant, the `freelancer_or_team` attribute indicates whether it is an individual freelancer or a team
  - for a team, the object includes team information, leader information, and a list of team members in the team in nested objects

  ```
  {
      applicants: [
          {
              "freelancer_or_team": "freelancer",
              "email": email,
              "name": name,
              "age": age,
              "major": major,
              "phone": phone number (string), 
              "experience": # of years of experience,
              "rating": float or null,
              "language_knowledge": [
                  {
                      "language": name of programming language,
              		"proficiency": proficiency level (integer)
                  },
                  {
                      "language": name of programming language,
              		"proficiency": proficiency level (integer)
                  },
                  ...
              ]
          },
          {
              "freelancer_or_team": "team",
              "name": team name,
              "comment": comment on team, 
              "leader": {
              	"email": email,
              	"name": name,
              	"age": age,
              	"major": major,
              	"phone": phone number (string), 
              	"experience": # of years of experience,
              	"rating": float or null,
              	"language_knowledge": [
                  	{
                      	"language": name of programming language,
              			"proficiency": proficiency level (integer)
                  	},
                  	{
                      	"language": name of programming language,
              			"proficiency": proficiency level (integer)
                  	},
                  	...
              		]
              	},
              "team_members": [
                  {
                      "email": email,
              		"name": name,
              		"age": age,
              		"major": major,
              		"phone": phone number (string), 
              		"experience": # of years of experience,
              		"rating": float or null,
              		"language_knowledge": [
                  		{
                      		"language": name of programming language,
              				"proficiency": proficiency level (integer)
                  		},
                  		{
                      		"language": name of programming language,
              				"proficiency": proficiency level (integer)
                  		},
                  		...
              			]
                  },
                  ...
              ]
          }
      ]
  }
  ```

#### /api/client/project/acceptApplicant

- accept an applicant for a particular project

- `POST`

- request body

  - for `freelancer_or_team` attribute, select either of "freelancer" or "team"
  - if "freelancer", `applicant_idx` must be a freelancer idx
  - if "team", `applicant_idx` must be a team idx

  ```
  {
      "client_idx": client idx,
      "project_idx": project idx,
      "freelancer_or_team": "freelancer" or "team",
      "applicant_idx": either freelancer_idx or team_idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/client/finish (submitting a request to finish a project)

#### /api/client/finish/getSubmissions

- get list of project-finish requests submitted

- `POST`

- request body

  ```
  {
      "client_idx": client idx
  }
  ```

- response body

  - list of projects with `status` = 'pending'

  ```
  {
      completed: [
          {
          	"idx": project idx (1),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "pending"
          },
          {
          	"idx": project idx (2),
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of request document if exists,
              "status": "pending"
          },
          ...
      ]
  }
  ```

#### /api/client/finish/accept

- accept a project-finish request for a particular
  project with `status` = 'pending'

- this would change the `status` of the particular project tuple to 'completed'

- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "project_idx": project idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/client/finish/reject

- reject a project-finish request for a particular
  project with `status` = 'pending'

- this would change the `status` of the particular project tuple back to 'working'

- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "project_idx": project idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

#### /api/client/finish/rate

- IF client has accepted the project-finish request, rate the freelancer / team
- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "project_idx": project idx,
      "rating": floating point # from 0 to 5
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

# Schema

- in `internal_project`  table, `status` attribute is one of 'available', 'working', 'pending', or 'completed'. 
  - When an `internal_project` is registered, its `status` is 'available'
  - When it is assigned to a `freelancer` or `team`,  its `status` is 'working'
  - When `freelancer` or `team` submits a request to finish, its `status` is 'pending'
  - If `client` accepts the request to finish, its `status` is turned into 'completed'
    - If `client` rejects the request to finish, its `status` goes back to 'working'
    - When its `status` becomes 'completed', `client` and `freelancer` or `team` can rate each other

```mysql
-- Freelancer Table Create SQL
CREATE TABLE Freelancer
(
  `idx`         INT             NOT NULL    AUTO_INCREMENT,
  `email`       VARCHAR(45)     NOT NULL    COMMENT 'Email address',
  `password`    VARCHAR(255)    NOT NULL    COMMENT 'Password',
  `name`        VARCHAR(45)     NOT NULL    COMMENT 'Name',
  `age`         INT             NOT NULL    COMMENT 'Age',
  `major`       VARCHAR(255)    NOT NULL    COMMENT 'Major',
  `phone`       VARCHAR(13)     NOT NULL    COMMENT 'Phone',
  `experience`  INT             NOT NULL    COMMENT 'Years of experience',
  `rating`      DOUBLE          NULL        COMMENT 'Rating',
  PRIMARY KEY (idx)
);


-- Client Table Create SQL
CREATE TABLE Client
(
  `idx`       INT             NOT NULL    AUTO_INCREMENT,
  `email`     VARCHAR(45)     NOT NULL    COMMENT 'Email address',
  `password`  VARCHAR(255)    NOT NULL    COMMENT 'Password',
  `name`      VARCHAR(100)    NOT NULL    COMMENT 'Name',
  `phone`     VARCHAR(13)     NOT NULL    COMMENT 'Phone',
  `rating`    DOUBLE          NULL        COMMENT 'Rating',
  PRIMARY KEY (idx)
);


-- Internal_project Table Create SQL
CREATE TABLE Internal_project
(
  `idx`         INT       NOT NULL    AUTO_INCREMENT,
  `client_idx`  INT       NOT NULL    COMMENT 'Client idx',
  `start_date`  DATE      NOT NULL    COMMENT 'Start date',
  `end_date`    DATE      NOT NULL    COMMENT 'End date',
  `min_part`    INT       NOT NULL    COMMENT 'Minimum participants',
  `max_part`    INT       NOT NULL    COMMENT 'Maximum participant',
  `experience`  INT       NOT NULL    COMMENT 'Years of experience',
  `pay`         DOUBLE    NOT NULL    COMMENT 'Pay',
  `req_doc`     BLOB      NOT NULL    COMMENT 'Request document',
  `status`      VARCHAR(15) NOT NULL COMMENT 'Status',
  `client_rating` DOUBLE NULL COMMENT 'Rating on client by freelancer',
  `freelancer_rating` DOUBLE NULL COMMENT 'Rating on freelancer by client',
  PRIMARY KEY (idx),
  FOREIGN KEY (client_idx) REFERENCES Client (idx)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Programming_language Table Create SQL
CREATE TABLE Programming_language
(
  `idx`   INT             NOT NULL    AUTO_INCREMENT,
  `name`  VARCHAR(100)    NOT NULL    COMMENT 'Name',
  PRIMARY KEY (idx)
);


-- Team Table Create SQL
CREATE TABLE Team
(
  `idx`         INT             NOT NULL    AUTO_INCREMENT,
  `name`        VARCHAR(255)    NOT NULL    COMMENT 'Name',
  `comment`     VARCHAR(255)    NULL        COMMENT 'Comment',
  `leader_idx`  INT             NOT NULL    COMMENT 'Leader',
  PRIMARY KEY (idx),
  FOREIGN KEY (leader_idx) REFERENCES Freelancer (idx)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- External_project Table Create SQL
CREATE TABLE External_project
(
  `idx`         INT             NOT NULL    AUTO_INCREMENT,
  `start_date`  DATE            NOT NULL    COMMENT 'Start date',
  `end_date`    DATE            NOT NULL    COMMENT 'End date',
  `pay`         DOUBLE          NOT NULL    COMMENT 'Pay',
  `attachment`  BLOB            NULL        COMMENT 'Attachment',
  `comment`     VARCHAR(255)    NULL        COMMENT 'Comment',
  PRIMARY KEY (idx)
);


-- Admin Table Create SQL
CREATE TABLE Admin
(
  `idx`       INT             NOT NULL    AUTO_INCREMENT,
  `email`     VARCHAR(45)     NOT NULL    COMMENT 'Email address',
  `password`  VARCHAR(255)    NOT NULL    COMMENT 'Password',
  PRIMARY KEY (idx)
);



-- Portfolio Table Create SQL
CREATE TABLE Portfolio
(
  `freelancer_idx`   INT    NOT NULL,
  `int_or_ext`       BIT    NOT NULL,
  `int_project_idx`  INT    NULL,
  `ext_project_idx`  INT    NULL,
  FOREIGN KEY (int_project_idx)
  REFERENCES Internal_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (ext_project_idx)
  REFERENCES External_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(freelancer_idx, int_project_idx, ext_project_idx)
);



-- Team_member Table Create SQL
CREATE TABLE Team_member
(
  `team_idx`        INT    NOT NULL,
  `freelancer_idx`  INT    NOT NULL,
  FOREIGN KEY (team_idx)
  REFERENCES Team (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(team_idx, freelancer_idx)
);



-- Programming_language_knowledge Table Create SQL
CREATE TABLE Programming_language_knowledge
(
  `language_idx`    INT    NOT NULL,
  `freelancer_idx`  INT    NOT NULL,
  `proficiency`     INT    NOT NULL,
  FOREIGN KEY (language_idx)
  REFERENCES Programming_language (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE
);


-- Internal_project_language_requirement Table Create SQL
CREATE TABLE Internal_project_language_requirement
(
  `project_idx`   INT    NOT NULL,
  `language_idx`  INT    NOT NULL,
  `proficiency`   INT    NOT NULL,
  FOREIGN KEY (project_idx)
  REFERENCES Internal_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (language_idx)
  REFERENCES Programming_language (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(project_idx, language_idx)
);



-- Current_project Table Create SQL
CREATE TABLE Current_project
(
  `project_idx`     INT    NOT NULL,
  `single_only`     BIT    NOT NULL,
  `team_only`       BIT    NOT NULL,
  `freelancer_idx`  INT    NULL,
  `team_idx`        INT    NULL,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_idx)
  REFERENCES Internal_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team_idx)
  REFERENCES Team (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (project_idx, freelancer_idx, team_idx)
);

CREATE TABLE Application (
  `project_idx` INT NOT NULL,
  `freelancer_or_team` VARCHAR(15) NOT NULL,
  `freelancer_idx`  INT    NULL,
  `team_idx`        INT    NULL,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (project_idx)
  REFERENCES Internal_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team_idx)
  REFERENCES Team (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE (project_idx, freelancer_idx, team_idx)
)
```