# simple-js-form
A simple js library to create html form that can be updated from a object.

use
```forms.update("formid", object);```
to update the html form from a object

```json
{
  customer: {
    name: "John",
    given_name: "Doe",
    email: "johndoe@nomail.com"
  },
  notes: "This is just a note"
}
```
to get the customer name set the input name="customer.name" or if you want the notes set the input name="notes"

call 
```forms.get("formid"); ``` 
to get the data entered by the user
