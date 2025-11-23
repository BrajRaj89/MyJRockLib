# MyJRock JS Library ($$$)

A lightweight, dependency-free JavaScript library inspired by jQuery — designed to simplify frontend development with clean syntax, powerful utilities, and built-in UI plugins.  
MyJRock helps developers perform AJAX requests, create modals, validate forms, render grids, manage accordions, and manipulate UI elements effortlessly.

## ⭐ Features

### 1. Simple AJAX API
- Easy GET/POST calls  
- Auto JSON handling  
- Optional `sendJson: true`  
- Failure callback support  

### 2. DOM Helpers
- `$$$(id)` selector (similar to jQuery’s `$`)  
- `.value()`, `.html()`, `.fillComboBox()`, etc.  

### 3. UI Plugins
- Modal system with attributes  
- Accordion with automatic initialization  
- Grid plugin (if included)  
- Auto `<select>` population  

### 4. Form Validation Engine
- Rule-based configuration  
- Custom messages  
- Error-pane linking  
- Checkbox state validation  

---

## 📦 Installation

```html
<link rel="stylesheet" href="myjrock.css">
<script src="myjrock.js"></script>
```

## 🚀 Quick Examples
### AJAX GET Example

```html
// JavaScript code
$$$.ajax({
  url: "servletOne",
  methodType: "GET",
  success: function(responseData) {
    var data = JSON.parse(responseData);
  },
  failure: function() {
    alert("Some error occurred");
  }
});
```

### AJAX POST with JSON
```html
// JavaScript code
$$$.ajax({
  methodType: "POST",
  url: "servletThree",
  data: customerObject,
  sendJson: true,
  success: function(responseData) {
    console.log(responseData);
  }
});
```

### Auto-Fill Example
```html
// JavaScript code
$$$("designationCode").fillComboBox({
  dataSource: designations,
  text: "title",
  value: "code",
  firstOption: {
    text: "<select Designation>",
    value: -1
  }
});
```

### Modal Example
```html
// JavaScript code
$$$.modals.show("ab");
<!-- HTML code -->

<div id="ab" forModal="true" header="Heading" footer="Footer"
     size="500x300" closeButton="true"
     beforeOpening="fn()" afterClosing="fn()">
  Content...
</div>
```

### Form Validation Example
```html
// JavaScript code
var valid = $$$("someForm").isValid({
  "nm": {
    required: true,
    "max-length": 20,
    error_pane: "nmErrorSection",
    error: {
      required: "Name required",
      "max-length": "Max 20 characters"
    }
  },
  "ct": {
    invalid: -1,
    error_pane: "ctErrorSection",
    errors: {
      invalid: "Select city"
    }
  }
});
```

## 🧩 Attributes/Plugins Overview

| Feature     | How to Enable       | Notes                         |
|-------------|----------------------|-------------------------------|
| Accordion   | `accordion="true"`   | Auto-initialized              |
| Modal       | `forModal="true"`    | Supports callbacks & size     |
| Grid        | Custom tag / JS      | Depends on your library       |
| Validation  | `.isValid()`         | Rule-based system             |




