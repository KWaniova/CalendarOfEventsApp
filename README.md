Node - express -graphQL

```
query {
	users {
    # __typename
    id
    firstName
    lastName
    email
  },
  userByID(id: 2){
    firstName
    lastName
  }
}


# mutation {
#   createUser(firstName: "Luna", lastName: "Lovegood", email: "luna@luna.com", password: "LunaLuna"){
#     firstName, lastName
#   }
# }
```
