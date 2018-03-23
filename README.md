# simple-js-form
A simple js library to create html form that can be updated from a object.

```
var object = {
  customer: {
    name: "John",
    given_name: "Doe",
    email: "johndoe@nomail.com"
  },
  notes: "This is just a note"
};
```
Use
```forms.update("formid", object);```
to update the html form from a object. To show customer name you need to set the input name to ```<input name="customer.name">``` or if you want the notes set the input name to. ```<input name="notes">``` Notice the dot notation in the first one.

Use 
```forms.get("formid", object); ``` 
to get the data entered by the user. the 2nd value object is optional. If it's set then it'll update the given object to what the user entered in the form.
