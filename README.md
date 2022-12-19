# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Just run `npm install` to install all dependencies. Node v16 > is preferable.

## Structure

Form consists of parent wrapper, which handles the form, and children, which are react elements.
Whole package is imported as one Element, so it is easier to use and navigate.

**Usage / Import**

```jsx
import FormItems from './components/form-items';

// parent wrapper
<FormItems.FormWrapper data={jsonData} submitTitle="Submit test form" title="Form" onSubmit={getData} />;
```

**<FormItems.FormWrapper>** accepts data, which is input structure for the form (check the JSON folder and `form-schema.json`). You can provide `title` prop and `submitTitle` which will change submit button. `onSubmit` callback is mandatory. From it, you will get all of the form data, when it is validated, and than you can manipulate with the data.

### List of available components

-   Input - **<FormItems.Input>**
-   TextArea - **<FormItems.TextArea>**
-   Checkbox - **<FormItems.Checkbox>**
-   RadioButton - **<FormItems.RadioButton>**
-   Dropdown - **<FormItems.Dropdown>**

Whole package is designed to use json for building forms. In the `<FormItems.FormWrapper />` you can check for all of the props that each component accepts (they are linked to JSON file).

For now you can use validation as follows:

If you pass prop `required` as boolean `required: true`, that means that filed is required and it will show default message "This field is required". Alternatively you can pass it as a string: `required: "This is my error message"`, this will presume that field is required and will show this message. Third option is to send it as an object: `required : { "isRequired": true, "message": "Example of error message from JSON" }`.

-   Input - **<FormItems.Input>** -
    -   For this component you can also pass `regex` prop, which will act as custom validator. For now, it is limited to one validation per component
    -   Add it as `regex: {isRequired: "your-regex", message: "message"}`
    -   **Must be a valid regex in order to work!**
    -   For Input component you can also specify `type` prop (text, number, email, password etc., check the JSON for examples)

TextArea currently doesn't support regex. It will be added if required.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
