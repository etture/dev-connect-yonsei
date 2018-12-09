## Host: *https://dev-connect-yonsei.herokuapp.com*

##### Admin Login

###### email: admin@gmail.com

###### password: admin

###### admin_key: adminkey1234

#### [Important note about internal project `status`](#schema)

- language proficiency level: 0 ~ 10

# API Endpoints

- #### <span style="color: green; font-weight: bold">signing in (/api/signin)</span>

  - [x] [/api/signin/admin](#apisigninadmin) `POST`
  - [x] [/api/signin/freelancer](#apisigninfreelancer) `POST`
  - [x] [/api/signin/client](#apisigninclient) `POST`

- #### <span style="color: green; font-weight: bold">signing up (/api/signup)</span>

  - [x] [/api/signup/freelancer](#apisignupfreelancer) `POST`
  - [x] [/api/signup/client](#apisignupclient) `POST`

- #### <span style="color: green; font-weight: bold">admin account (/api/admin)</span>

  - seeing list of accounts (/api/admin/account)
    - [x] [/api/admin/account/getFreelancers](#apiadminaccountgetfreelancers) `POST`
    - [x] [/api/admin/account/getClients](#apiadminaccountgetclients) `POST`
    - [x] [/api/admin/account/getAllUsers](#apiadminaccountgetallusers) `POST`
    - [x] [/api/admin/account/getTeams](#apiadminaccountgetteams) `POST`
    - [x] [/api/admin/account/getFreelancerByIdx](#apiadminaccountgetfreelancerbyidx) `POST`
    - [x] [/api/admin/account/getClientByIdx](#apiadminaccountgetclientbyidx) `POST`
  - deleting accounts (/api/admin/account/delete)
    - [x] [/api/admin/account/delete/freelancer](#apiadminaccountdeletefreelancer) `DELETE`
    - [x] [/api/admin/account/delete/client](#apiadminaccountdeleteclient) `DELETE`
  - dealing with projects (/api/admin/project)
      - [x] [/api/admin/project/getAll](#apiadminprojectgetall) `GET`
      - [x] [/api/admin/project/modify](#apiadminprojectmodify) `PUT`
      - [x] [/api/admin/project/delete](#apiadminprojectdelete) `DELETE`
  - dealing with teams (/api/admin/team) 
    - [x] [/api/admin/team/modify](#apiadminteammodify) `PUT`
    - [x] [/api/admin/team/delete](#apiadminteamdelete) `DELETE`

- #### <span style="color: green; font-weight: bold">freelancer account (/api/freelancer)</span>

  - account information (/api/freelancer/account)
    - [x] [/api/freelancer/account/getInfo](#apifreelanceraccountgetinfo) `POST`
    - [x] [/api/freelancer/account/modify](#apifreelanceraccountmodify) `PUT`
    - [x] [/api/freelancer/account/modifyLanguages](#apifreelanceraccountmodifylanguages) `POST`
  - project portfolio (/api/freelancer/portfolio)
    - [x] [/api/freelancer/portfolio/getAll](#apifreelancerportfoliogetall) `POST`
    - [x] [/api/freelancer/portfolio/getInternal](#apifreelancerportfoliogetInternal) `POST`
    - [x] [/api/freelancer/portfolio/getExternal](#apifreelancerportfoliogetexternal) `POST`
    - [x] [/api/freelancer/portfolio/registerExternal](#apifreelancerportfolioregisterexternal) `POST`
  - projects (/api/freelancer/project)
    - [x] [/api/freelancer/project/getAll](#apifreelancerprojectgetall) `GET`
    - [x] [/api/freelancer/project/getForMe](#apifreelancerprojectgetforme) `POST`
    - [x] [/api/freelancer/project/getInfo](#apifreelancerprojectgetinfo) `POST`
    - [x] [/api/freelancer/project/apply](#apifreelancerprojectapply) `POST`
    - [x] [/api/freelancer/project/getApplied](#apifreelancerprojectgetapplied) `POST`
    - [x] [/api/freelancer/project/getCurrent](#apifreelancerprojectgetcurrent) `POST`
  - related to teams (/api/freelancer/team)
    - [x] [/api/freelancer/team/create](#apifreelancerteamcreate) `POST`
    - [x] [/api/freelancer/team/join](#apifreelancerteamjoin) `POST`
    - [x] [/api/freelancer/team/leave](#apifreelancerteamleave) `POST`
    - [x] [/api/freelancer/team/getForTeam](#apifreelancerteamgetforteam)`POST`
    - [x] [/api/freelancer/team/apply](#apifreelancerteamapply) `POST`
    - [x] [/api/freelancer/team/finish/submit](#apifreelancerteamfinishsubmit) `POST`
    - [x] [/api/freelancer/team/finish/rateClient](#apifreelancerteamfinishrateclient) `POST`
  - submitting a request to finish a project (/api/freelancer/finish)
    - [x] [/api/freelancer/finish/submit](#apifreelancerfinishsubmit) `POST`
    - [x] [/api/freelancer/finish/rateClient](#apifreelancerfinishrateclient) `POST`

- #### <span style="color: green; font-weight: bold">client account (/api/client)</span>

  - account (/api/client/account)
    - [x] [/api/client/account/getInfo](#apiclientaccountgetinfo) `POST`
    - [x] [/api/client/account/modify](#apiclientaccountmodify) `PUT`
  - projects (/api/client/project)
    - [x] [/api/client/project/register](#apiclientprojectregister) `POST`
    - [x] [/api/client/project/getCurrent](#apiclientprojectgetcurrent) `POST`
    - [x] [/api/client/project/getRegistered](#apiclientprojectgetregistered) `POST`
    - [x] [/api/client/project/getCompleted](#apiclientprojectgetcompleted) `POST`
    - [x] [/api/client/project/getApplicants](#apiclientprojectgetapplicants) `POST`
    - [x] [/api/client/project/acceptApplicant](#apiclientprojectacceptapplicant) `POST`
  - responding to a request to finish a project (/api/client/finish)
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
  	"experience": # of years of experience (integer),
  	"languages": [
          {
              "language_idx": language idx,
              "proficiency": proficiency from 0 ~ 10
          },
          ... (more languages)
  	]
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

### seeing list of accounts (/api/admin/account)

##### /api/admin/account/getFreelancers

- get list of all freelancers

- `POST`

- request body

  ```
  {
  	"admin_key": admin key
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "freelancers": [
          {
          	"idx": idx (1),
              "email": email,
              "name": name,
              "age": age,
              "major": major,
              "phone": phone number (string), 
              "experience": # of years of experience,
              "rating": float or null
          },
          {
          	"idx": idx (2),
              "email": email,
              "name": name,
              "age": age,
              "major": major,
              "phone": phone number (string), 
              "experience": # of years of experience,
              "rating": float or null
          },
          ...
      ]
  }
  ```

##### /api/admin/getClients

- get list of all clients

- `POST`

- request body

  ```
  {
      "admin_key": admin key
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "clients": [
          {
              "idx": idx (1),
              "email": email address,
              "name": name,
              "phone": phone number,
              "rating": float or null
          },
          {
              "idx": idx (2),
              "email": email address,
              "name": name,
              "phone": phone number,
              "rating": float or null
          },
          ...
      ]
  }
  ```

##### /api/admin/getAllUsers

- get list of all users

- `POST`

- request body

  ```
  {
      "admin_key": admin key
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "freelancers": [
          {
          	"idx": idx (1),
              "email": email,
              "name": name,
              "age": age,
              "major": major,
              "phone": phone number (string), 
              "experience": # of years of experience,
              "rating": float or null
          },
          {
          	"idx": idx (2),
              "email": email,
              "name": name,
              "age": age,
              "major": major,
              "phone": phone number (string), 
              "experience": # of years of experience,
              "rating": float or null
          },
          ...
      ],
      "clients": [
          {
              "idx": idx (1),
              "email": email address,
              "name": name,
              "phone": phone number,
              "rating": float or null
          },
          {
              "idx": idx (2),
              "email": email address,
              "name": name,
              "phone": phone number,
              "rating": float or null
          },
          ...
      ]
  }
  ```

##### /api/admin/account/getTeams

- get list of teams

- `POST`

- request body

  ```
  {
      "admin_key": admin key
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed,
      "teams": [
              {
              "idx": idx,
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
          	},
          	...
          ]
  }
  ```

##### /api/admin/account/getFreelancerByIdx

- get info for a single freelancer by idx

- `POST`

- request body

  ```
  {
      "admin_key": admin key,
      "freelancer_idx": freelancer idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed,
      "freelancer": {
          "idx": freelancer idx,
          "email": email address,
          "name": name, 
          "age": age,
          "major": major, 
          "phone": phone number, 
          "experience": years of experience, 
          "rating": rating
      }
  }
  ```

##### /api/admin/account/getClientByIdx

- get info for a single client by idx

- `POST`

- request body

  ```
  {
      "admin_key": admin key, 
      "client_idx": client idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed,
      "client": {
          "idx": idx,
          "email": email address,
          "name": name, 
          "phone": phone number, 
          "rating": rating
      }
  }
  ```

### /api/admin/account/delete

##### /api/admin/account/delete/freelancer

- delete freelancer

- `DELETE`

- request body

  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
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

  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
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
      "success": true / false,
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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
  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
      "project_idx": project idx (REQUIRED),
      "name": project name (OPTIONAL),
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

  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
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
  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
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

  - admin access requires `admin_key` attribute

  ```
  {
      "admin_key": admin key,
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

#### /api/freelancer/account/getInfo

- get personal information (except password)

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
      "success": true / false,
      "error_message": error message if failed,
      "info": {
          "idx": freelancer idx,
          "email": email address,
          "name": name, 
          "age": age,
          "major": major, 
          "phone": phone number, 
          "experience": years of experience, 
          "rating": rating
      }
  }
  ```

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

#### /api/freelancer/account/modifyLanguages

- modify programming language knowledge

- `POST`

- request body

  - must include all languages known by freelancer and their proficiency
    - e.g. if adding a new languages, must include all current languages + new language
    - e.g. if modifying existing languages, still include all languages, with the modified parameters

  ```
  {
      "freelancer_idx": freelancer idx,
      "languages": [
          {
              "language_idx": language idx,
              "proficiency": proficiency
          },
          {
              "language_idx": language idx,
              "proficiency": proficiency
          },
          ...
      ]
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

- see list of all of freelancer's completed projects, both internal and external

- `POST`

- request body

  - must include freelancer idx
  - must include sort scheme, whether to sort projects by start_date, end_date, pay, or registered_at
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start_date" OR "end_date" OR "pay" OR "registered_at" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  - Each item in the portfolio array has the "int_or_ext" attribute, which tells you whether it's an internal or external project

  ```
  {
      "success": true / false,
      "internal": [
          {
              "idx": internal project idx,
              "client_idx": client idx,
              "name": project name,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of req document if exists
          },
          {
              "idx": internal project idx,
              "client_idx": client idx,
              "name": project name,
              "start_date": start date,
              "end_date": end date,
              "min_part": # of minimum participants,
              "max_part": # of maximum participants,
              "experience": # years experience required,
              "pay": pay in Korean Won,
              "req_doc": blob of req document if exists
          },
          ...
      ],
      "external": [
      	{
              "idx": external project idx,
              "name": project name,
              "start_date": start date,
              "end_date": end date,
              "pay": pay in Korean Won,
              "attachment": blob of attached document if exists, 
              "comment": comment on external project
          },
          {
              "idx": external project idx,
              "name": project name,
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

- see list of all of freelancer's completed internal projects 

- `POST`

- request body

  - must include freelancer idx
  - must include sort scheme, whether to sort projects by start_date, end_date, pay, or registered_at
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start_date" OR "end_date" OR "pay" OR "registered_at" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "internal": [
          {
              "idx": internal project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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
  - must include sort scheme, whether to sort projects by start_date, end_date, pay, or registered_at
  - must include asc/desc, whether to sort project in ascending or descending order

  ```
  {
      "freelancer_idx": freelancer idx (REQUIRED),
      "sort_scheme": "start_date" OR "end_date" OR "pay" OR "registered_at" (REQUIRED),
      "asc_desc": "asc" OR "desc" (REQUIRED)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "external": [
          {
              "idx": external project idx (1),
              "name": project name,
              "start_date": start date,
              "end_date": end date,
              "pay": pay in Korean Won,
              "attachment": blob of attached document if exists, 
              "comment": comment on external project
          },
          {
              "idx": external project idx (2),
              "name": project name,
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
      "name": project name (REQUIRED),
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
      "success": true / false,
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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
      "success": true / false,
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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
      "success": true / false,
      "project": {
          "idx": project idx,
      	"client_idx": client idx,
      	"name": project name,
      	"start_date": start date,
      	"end_date": end date,
      	"min_part": # of minimum participants,
      	"max_part": # of maximum participants,
      	"experience": # years experience required,
      	"pay": pay in Korean Won,
      	"req_doc": blob of request document if exists
      },
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
      "success": true / false,
      applied: [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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
      "success": true / false,
      current: [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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

#### /api/freelancer/team/getForTeam

- get the list of projects that a particular team can apply for

- `POST`

- request body

  - must include team idx

  ```
  {
      "team_idx": team idx
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "projects": [
          {
              "idx": project idx (1),
              "client_idx": client idx,
              "name": project name,
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
              "name": project name,
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

#### /api/freelancer/team/apply

- apply for a particular project as a team (must satisfy
  requirements)

- only the leader can apply for a project as a team

- `POST`

- request body

  - freelancer idx must be that of the team leader

  ```
  {
      "freelancer_idx": freelancer idx (must be team leader),
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

### /api/client/account

#### /api/client/account/getInfo

- get personal information (except password)

- `POST`

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
      "error_message": error message if failed,
      "info": {
          "idx": idx,
          "email": email address,
          "name": name, 
          "phone": phone number, 
          "rating": rating
      }
  }
  ```

#### /api/client/account/modify

- modify personal information (except email address)

- `PUT`

- request body

  - Must include client idx, then optionally include items to be modified

  ```
  {
      "client_idx": client idx (REQUIRED),
      "password": password (OPTIONAL),
      "name": name (OPTIONAL),
      "phone": phone number (string) (OPTIONAL)
  }
  ```

- response body

  ```
  {
      "success": true / false,
      "error_message": error message if failed
  }
  ```

### /api/client/project (projects)

#### /api/client/project/register

- register a project to be seen by freelancers

- `POST`

- request body

  ```
  {
      "client_idx": client idx,
      "name": project name,
      "start_date": start date,
      "end_date": end date,
      "min_part": # of minimum participants,
      "max_part": # of maximum participants,
      "experience": # years experience required,
      "pay": pay in Korean Won,
      "req_doc": blob of request document if exists,
      "languages": // list of language requirements
      	[
              {
                  "language_idx": language idx,
                  "proficiency": proficiency
              },
              {
                  "language_idx": language idx,
                  "proficiency": proficiency
              },
              ...
      	]
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
      "success": true / false,
      current: [
          {
          	"idx": project idx (1),
          	"name": project name,
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
          	"name": project name,
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
      "success": true / false,
      registered: [
          {
          	"idx": project idx (1),
          	"name": project name,
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
          	"name": project name,
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
      "success": true / false,
      completed: [
          {
          	"idx": project idx (1),
          	"name": project name,
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
          	"name": project name,
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

  - for a team, the object includes team information, leader information, and a list of team members in the team in nested objects

  ```
  {
      "success": true / false,
      applicants: {
          freelancers: [
              {
              "idx": idx,
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
          ],
          teams: [
              {
              "idx": idx,
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
          	},
          	...
          ]
      }
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
      "success": true / false,
      "pending": [
          {
          	"idx": project idx (1),
          	"name": project name,
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
          	"name": project name,
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
  `name`        VARCHAR(255) NOT NULL COMMENT 'Project name',
  `start_date`  DATE      NOT NULL    COMMENT 'Start date',
  `end_date`    DATE      NOT NULL    COMMENT 'End date',
  `min_part`    INT       NOT NULL    COMMENT 'Minimum participants',
  `max_part`    INT       NOT NULL    COMMENT 'Maximum participant',
  `experience`  INT       NOT NULL    COMMENT 'Years of experience',
  `pay`         DOUBLE    NOT NULL    COMMENT 'Pay',
  `registered_at` TIMESTAMP NOT NULL DEFAULT NOW(),
  `req_doc`     BLOB      NULL    COMMENT 'Request document',
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
  `freelancer_idx`  INT    NOT NULL,
  `name` VARCHAR(255) NOT NULL COMMENT 'Project name',
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
  `admin_key` VARCHAR(100) NOT NULL COMMENT 'Admin key',
  PRIMARY KEY (idx)
);



-- Portfolio Table Create SQL
-- Internal projects completed by freelancer or team
-- `freelancer_or_team` either of "freelancer" or "team"
CREATE TABLE Completed_project
(
  `project_idx`  INT    NOT NULL,
  `freelancer_or_team`  VARCHAR(15)    NOT NULL,
  `freelancer_idx`   INT    NULL,
  `team_idx` INT NULL,
  FOREIGN KEY (project_idx)
  REFERENCES Internal_project (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (team_idx)
  REFERENCES Team (idx) ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(project_idx, freelancer_idx, team_idx)
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
  `freelancer_idx`  INT    NOT NULL,
  `language_idx`    INT    NOT NULL,
  `proficiency`     INT    NOT NULL,
  FOREIGN KEY (language_idx)
  REFERENCES Programming_language (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (freelancer_idx)
  REFERENCES Freelancer (idx)  ON DELETE CASCADE ON UPDATE CASCADE,
  UNIQUE(language_idx, freelancer_idx)
);


-- Internal_project_language_requirement Table Create SQL
-- `single_or_team` either of "single", "team", or "both"
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
-- `freelancer_or_team` either of "freelancer" or "team"
CREATE TABLE Current_project
(
  `project_idx`     INT    NOT NULL,
  `freelancer_or_team`  VARCHAR(15)    NOT NULL,
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