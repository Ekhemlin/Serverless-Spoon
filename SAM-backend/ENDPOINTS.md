# Available endpoints:


## Inventory management 


`POST /addItems`					

**Required body  parameters:** 

`id` : id of the user

`items`: an array of cooking ingredients the user wants to add to their inventory 

**Returns on success:**

`inventory` : The updated inventory of the user

&nbsp;

`POST /removeItems`					

**Required body  parameters:** 

`id` : id of the user

`items`: an array of cooking ingredients the user wants to add to their inventory 

**Returns on success:**

`inventory` : The updated inventory of the user

&nbsp;


`GET /getItems`					

**Required query parameters:** 

`id` : id of the user

**Returns on success:**

`inventory` : The inventory of the user

&nbsp;


## Recipe management 

`POST /addRecipes`					

**Required body parameters:** 

`id` : id of the user

`recipeIds`: an array of recipe IDs to add to the user's saved recipe collection

**Returns on success:**

`savedRecipes` : The updated list of saved recipes 


&nbsp;


`POST /removeRecipes`					

**Required body parameters:** 

`id` : id of the user

`recipeIds`: an array of recipe IDs to remove from the user's saved recipe collection

**Returns on success:**

`savedRecipes` : The updated list of saved recipes 


&nbsp;

`GET /getRecipes`					

**Required query parameters:** 

`id` : id of the user

**Returns on success:**

`savedRecipes` :  An array of recipe objects from the [Spoonacular API](https://spoonacular.com/food-api/docs#Get-Recipe-Information)

&nbsp;


## Macro tracking


`POST /addMacros`					

**Required body parameters:** 

`id` : id of the user

`calories`,`fat`,`protein`,`carbs` : number values for the increase in the user's daily macro nutrients   

**Returns on success:**

`macros` : A JSON object containing the user's updated `calories`,`fat`,`protein`,`carbs`values



&nbsp;

`GET /getMacros`					

**Required query parameters:** 

`id` : id of the user

**Returns on success:**

`macros` :  A `macros` object, identical to the one described above 


&nbsp;

`POST /chooseRecipe`					

**Required body parameters:** 

`id` : id of the user

`recipeId` : id of the recipe the user would like to cook 

**Returns on success:**

`macros` : an object containing `calories`,`fat`,`protein`,`carbs` fields for the meal's nutritional value. These values will also be added to the user's tracked daily macros.   

`ingredients` : ingredients the recipe requires  

`missingIngridients` : ingredients the recipe requires and the user does not have in their inventory 

`instructions` : a single string representation of the cooking instructions

`analyzedInstructions` : the cooking instructions broken down into an array form 


&nbsp;


## Finding recipes 


`POST /searchRecipeWithInventory`


**Required body parameters:** 

`id` : id of the user

**Returns on success:**

`recipes` : An array of recipe objects from the Spoonacular API that contain ingredients the user has in their inventory 

&nbsp;

`POST /searchRecipeWithItems`


**Required body parameters:** 

`id` : id of the user

`items` : array of ingredients that the recipes should contain

**Returns on success:**

`recipes` : An array of recipe objects from the Spoonacular API

&nbsp;

`POST /searchRecipeWithQuery`


**Required body parameters:** 

`id` : id of the user

`query` : query for the recipe search 


**Optional body parameters:** 

`cuisine`: The cuisine(s) of the recipe. [List of available cuisines here](https://spoonacular.com/food-api/docs#Cuisines) 

`excludeCuisine`: The cuisine(s) the recipes must not match

`diet`: The diet for which the recipes must be suitable. [List of available diets here](https://spoonacular.com/food-api/docs#Diets)



**Returns on success:**

`recipes` : An array of recipe objects from the Spoonacular API


## User management 

`POST /createUser`

**Required body parameters:** 

`id` : the UID (generated by a third-party authentication service)

`firstName` : first name of the user 

`lastName` :last name of the user 


**Returns on success:**

`recipes` : An array of recipe objects from the Spoonacular API


&nbsp;


`GET /getUser`

**Required query parameters:** 

`id` : the UID (generated by a third-party authentication service)

**Returns on success:**

`user` : an object that contains the user's `firstName`, `lastName`, `inventory`, and `macros` 