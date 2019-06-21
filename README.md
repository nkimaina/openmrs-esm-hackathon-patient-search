# openmrs-esm-hackathon-patient-search

Navbar for hackathon

## Instructions

1. `npm install`
2. Run it on a certain port, `npm start -- --https --no-inline --port 8085`
3. Go to https://openmrs-spa.org/openmsr/spa/login in a browser.
4. Now [trust all insecure localhost requests](https://superuser.com/questions/772762/how-can-i-disable-security-checks-for-localhost).
5. Open up the browser console and run the following commands:

```js
importMapOverrides.addOverride(
  "@hackathon/patient-search",
  "https://localhost:8085/patient-search.js"
);
```

6. Refresh the page.
7. Login with username `admin` and password `admin123`.
8. Modify something in the nav bar
9. In the browser, refresh the page. You should see your code modified.

.container {
flex-direction: column;
align-items: center;
display: flex;
margin-top: 35px;
font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
"Lucida Sans Unicode", Geneva, Verdana, sans-serif;
font-size: 12px;
width: 500px;
margin: 76px auto 0 auto;
background-color: white;
border-radius: 5px;
box-shadow: 0 10px 30px -24px #b3b3b3;
padding: 16px;
}
